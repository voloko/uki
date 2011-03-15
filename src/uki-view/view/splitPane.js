requireCss('./splitPane/splitPane.css');

var fun   = require('../../uki-core/function'),
    utils = require('../../uki-core/utils'),
    view  = require('../../uki-core/view'),
    evt   = require('../../uki-core/event'),
    dom   = require('../../uki-core/dom'),
    build = require('../../uki-core/builder').build,

    Mustache  = require('../../uki-core/mustache').Mustache,
    Container = require('../../uki-core/view/container').Container,
    Focusable = require('../../uki-core/view/focusable').Focusable;


var SplitPane = view.newClass('SplitPane', Container, Focusable, {}),
    proto = SplitPane.prototype;

proto._throttle = 0; // do not try to render more often than every Xms
proto._handlePosition = 200;
proto._leftSpeed = 0;
proto._rightSpeed = 1;
proto._handleWidth = 1;
proto._leftMin = 100;
proto._rightMin = 100;
proto._vertical = false;

proto._setup = function(initArgs) {
    this._vertical = initArgs.vertical || this._vertical;
    this._handleWidth = initArgs.handleWidth || this._handleWidth;
    this._originalWidth = 0;
    this._exts = [];
    Container.prototype._setup.call(this, initArgs);
};

/**
* @function
* @name view.HSplitPane#leftMin
*/
/**
* @function
* @name view.HSplitPane#rightMin
*/
/**
* @function
* @name view.HSplitPane#autogrowLeft
*/
/**
* @function
* @name view.HSplitPane#autogrowRight
*/
/**
* @function
* @name view.HSplitPane#throttle
*/
fun.addProps(proto, ['leftMin', 'rightMin', 'leftSpeed', 'rightSpeed', 'throttle']);
proto.topMin = proto.leftMin;
proto.bottomMin = proto.rightMin;
proto.topSpeed = proto.leftSpeed;
proto.bottomSpeed = proto.rightSpeed;

/**
* @function
* @fires event:handleMove
* @name view.HSplitPane#handlePosition
*/
fun.addProp(proto, 'handlePosition', function(val) {
    if (this._x_width()) {
        // store width after manual (drag or program) position change
        this._prevWidth = this._x_width();

        this._prevPosition = this._handlePosition = this._normalizeHandlePosition(val);
        // resize imidiately
        this.resized();
    } else {
        this._handlePosition = val;
    }
});

proto._normalizeHandlePosition = function(pos) {
    pos = Math.min(pos, this._x_width() - this.rightMin() - this.handleWidth()); // can't move to far to the right
    pos = Math.max(pos, this.leftMin()); // can't move to far to the left
    return pos;
};

proto._moveHandle = function() {
    this._handle.style[this._x_leftName()] = this.handlePosition() + 'px';
};

/**
 * Positions of additional drag zones
 */
proto.extPositions = function(positions) {
    if (positions === undefined) {
        return utils.map(this._exts, function(ext) {
            return this._styleToPos(ext.style);
        }, this);
    }

    utils.forEach(this._exts, function(ext) {
        this._handle.removeChild(ext);
    }, this);

    this._exts = positions.map(function(pos) {
        var ext = dom.createElement('div', {
            className: 'uki-splitPane-handle-ext'
        });
        pos = this._expandPos(pos);
        this._applyPosToStyle(pos, ext.style);
        this._handle.appendChild(ext);
        return ext;
    }, this);
    return this;
};

/**
* @function
* @name view.HSplitPane#handleWidth
*/
proto.handleWidth = function() {
    return this._handleWidth;
};

proto.vertical = function() {
    return this._vertical;
};

/**
 * Treat all splitPanes as vertical (pane|pane)
 * Use _x_methods to adjust to horizontal layout
 */
proto._x_width = function() {
    return this.vertical() ? this.dom().offsetWidth : this.dom().offsetHeight;
};

proto._x_widthName = function() {
    return this.vertical() ? 'width' : 'height';
};

proto._x_leftName = function() {
    return this.vertical() ? 'left' : 'top';
};

proto._x_type = function() {
    return this.vertical() ? 'v' : 'h';
};

proto._x_xName = function() {
    return this.vertical() ? 'x' : 'y';
};

proto._createHandle = function() {
    var handle = dom.fromHTML(Mustache.to_html(
        requireText('splitPane/handle.html'),
        { type: this._x_type() }
    ));

    if (this.handleWidth() > 1) {
        handle.style[this._x_widthName()] = this.handleWidth() + 'px';
    } else {
        handle.className += ' ' + 'uki-splitPane-handle_thin';
    }

    utils.forEach(['draggesturestart', 'draggesture', 'draggestureend'], function(name) {
        evt.on(handle, name, fun.bind(this['_' + name], this));
    }, this);

    return handle;
};

proto._createDom = function() {
    this._dom = dom.createElement('div', { className: 'splitPane' });

    build([
        { view: 'Container', addClass: 'uki-splitPane-container uki-splitPane-container_left' },
        { view: 'Container', addClass: 'uki-splitPane-container uki-splitPane-container_right' }
    ]).appendTo(this);

    this._dom.appendChild(this._handle = this._createHandle());
};

proto._throttledChildResize = function() {
    this._resizeChildViews();
};

proto.resized = function() {
    this._moveHandle();

    if (!this._prevWidth) {
        // store and forget
        this._prevWidth = this._x_width();
        this._prevPosition = this.handlePosition();
    } else {
        this._handlePosition = this._normalizeHandlePosition(this._calcDesiredPosition());
        this._moveHandle();
    }
    this._throttledChildResize();
};

proto._calcDesiredPosition = function() {
    var newWidth = this._x_width(),
        diff = newWidth - this._prevWidth,
        totalSpeed = this.leftSpeed() + this.rightSpeed(),
        leftDiff = this.leftSpeed()/(totalSpeed || 1)*diff;

    return this._prevPosition + leftDiff;
};

proto._draggesturestart = function(e) {
    e.cursor = dom.computedStyle(this._handle, null).cursor;
    this._positionBeforeDrag = this.handlePosition();
    this._updatePositionOnDrag(e);
};

proto._draggesture = function(e) {
    this._updatePositionOnDrag(e);
};

proto._draggestureend = function(e) {
    this._updatePositionOnDrag(e, true);
    // use new position as a base for next resize
    this._prevPosition = this.handlePosition();
    this._prevWidth = this._x_width();
};

proto._updatePositionOnDrag = function(e, stop) {
    var pos = this._positionBeforeDrag + e.dragOffset[this._x_xName()];
    this._handlePosition = this._normalizeHandlePosition(pos);
    this._moveHandle();
    this._throttledChildResize();

    this.trigger({
        type: stop ? 'handleStop' : 'handleMove',
        target: this,
        handlePosition: this._handlePosition,
        dragPosition: pos
    });
};


/**
* @function
* @name view.HSplitPane#topChildViews
*/
/**
* @function
* @name view.HSplitPane#leftChildViews
*/
proto.topChildViews = proto.leftChildViews = function(views) {
    return this._childViewsAt(0, views);
};

/**
* @function
* @name view.HSplitPane#rightChildViews
*/
/**
* @function
* @name view.HSplitPane#bottomChildViews
*/
proto.bottomChildViews = proto.rightChildViews = function(views) {
    return this._childViewsAt(1, views);
};

proto._childViewsAt = function(i, views) {
    if (views === undefined) return this._childViews[i].childViews();
    this._childViews[i].childViews(views);
    return this;
};

proto._leftPos = function() {
    var pos = { left: '0px', top: '0px' };
    pos[this._x_widthName()] = this.handlePosition() + 'px';
    pos[this.vertical() ? 'bottom' : 'right'] = '0px';
    return pos;
};

proto._rightPos = function() {
    var pos = { bottom: '0px', right: '0px' };
    pos[this._x_leftName()] = this.handlePosition() + this.handleWidth() + 'px';
    pos[this.vertical() ? 'top' : 'left'] = '0px';
    return pos;
};

proto._resizeChildViews = function() {
    this._childViews[0].pos(this._leftPos()).resized();
    this._childViews[1].pos(this._rightPos()).resized();
};


require('../../uki-core/collection').Collection.addProps([
    'leftMin', 'rightMin', 'leftSpeed', 'rightSpeed', 'throttle',
    'handlePosition', 'extPositions', 'handleWidth', 'vertical'
]);
exports.SplitPane = SplitPane;
