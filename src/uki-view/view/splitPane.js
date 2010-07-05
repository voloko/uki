/**
* Horizontal Split Pane
*
* @author voloko
* @name uki.view.HSplitPane
* @class
* @extends uki.view.Container
*/
uki.view.declare('uki.view.HSplitPane', uki.view.Container, function(Base) {
    this._throttle = 0; // do not try to render more often than every Xms
    
    this._setup = function() {
        Base._setup.call(this);
        this._originalRect = this._rect;
        uki.extend(this, {
            _vertical: false,
            _handlePosition: 200,
            _autogrowLeft: false,
            _autogrowRight: true,
            _handleWidth: 7,
            _leftMin: 100,
            _rightMin: 100,
            
            _panes: []
        });
    };
    
    /**
    * @function
    * @name uki.view.HSplitPane#leftMin
    */
    /**
    * @function
    * @name uki.view.HSplitPane#rightMin
    */
    /**
    * @function
    * @name uki.view.HSplitPane#autogrowLeft
    */
    /**
    * @function
    * @name uki.view.HSplitPane#autogrowRight
    */
    /**
    * @function
    * @name uki.view.HSplitPane#throttle
    */
    uki.addProps(this, ['leftMin', 'rightMin', 'autogrowLeft', 'autogrowRight', 'throttle']);
    this.topMin = this.leftMin;
    this.bottomMin = this.rightMin;
    
    /**
    * @function
    * @fires event:handleMove
    * @name uki.view.HSplitPane#handlePosition
    */
    this.handlePosition = uki.newProp('_handlePosition', function(val) {
        this._handlePosition = this._normalizePosition(val);
        this.trigger('handleMove', {source: this, handlePosition: this._handlePosition, dragValue: val });
        this._resizeChildViews();
    });
    
    /**
    * @function
    * @name uki.view.HSplitPane#handleWidth
    */
    this.handleWidth = uki.newProp('_handleWidth', function(val) {
        if (this._handleWidth != val) {
            this._handleWidth = val;
            var handle = this._createHandle();
            this._dom.insertBefore(handle, this._handle);
            this._removeHandle();
            this._handle = handle;
            this._resizeChildViews();
        }
    });
    
    
    this._normalizePosition = function(val) {
        var prop = this._vertical ? 'height' : 'width';
        return MAX(
                this._leftMin,
                MIN(
                    this._rect[prop] - this._rightMin - this._handleWidth,
                    MAX(0, MIN(this._rect ? this._rect[prop] : 1000, val * 1))
                ));
    };
    
    
    this._removeHandle = function() {
        this._dom.removeChild(this._handle);
    };
    
    this._createHandle = function() {
        var handle;
        if (this._vertical) {
            handle = uki.theme.dom('splitPane-vertical', {handleWidth: this._handleWidth});
            handle.style.top = this._handlePosition + PX;
        } else {
            handle = uki.theme.dom('splitPane-horizontal', {handleWidth: this._handleWidth});
            handle.style.left = this._handlePosition + PX;
        }
        
        uki.each(['draggesturestart', 'draggesture', 'draggestureend'], function(i, name) {
            uki.dom.bind(handle, name, uki.proxy(this['_' + name], this));
        }, this);
        
        return handle;
    };
    
    this._createDom = function() {
        this._dom = uki.createElement('div', this.defaultCss);
        this._initClassName();
        for (var i=0, paneML; i < 2; i++) {
            paneML = { view: 'Container' };
            paneML.anchors = i == 1         ? 'left top bottom right' :
                             this._vertical ? 'left top right' :
                                              'left top bottom';
            paneML.rect = i == 0 ? this._leftRect() : this._rightRect();
            this._panes[i] = uki.build(paneML)[0];
            this.appendChild(this._panes[i]);
        };
        this._dom.appendChild(this._handle = this._createHandle());
    };
    
    this._normalizeRect = function(rect) {
        rect = Base._normalizeRect.call(this, rect);
        var newRect = rect.clone();
        if (this._vertical) {
            newRect.height = MAX(newRect.height, this._leftMin + this._rightMin); // force min width
        } else {
            newRect.width = MAX(newRect.width, this._leftMin + this._rightMin); // force min width
        }
        return newRect;
    };
    
    this._resizeSelf = function(newRect) {
        var oldRect = this._rect,
            dx, prop = this._vertical ? 'height' : 'width';
        if (!Base._resizeSelf.call(this, newRect)) return false;
        if (this._autogrowLeft) {
            dx = newRect[prop] - oldRect[prop];
            this._handlePosition = this._normalizePosition(this._handlePosition + (this._autogrowRight ? dx / 2 : dx));
        }
        if (this._vertical) {
            if (newRect.height - this._handlePosition < this._rightMin) {
                this._handlePosition = MAX(this._leftMin, newRect.height - this._rightMin);
            }
        } else {
            if (newRect.width - this._handlePosition < this._rightMin) {
                this._handlePosition = MAX(this._leftMin, newRect.width - this._rightMin);
            }
        }
        return true;
    };
    
    this._draggesturestart = function(e) {
        var offset = uki.dom.offset(this.dom());
        this._posWithinHandle = (e[this._vertical ? 'pageY' : 'pageX'] - offset[this._vertical ? 'y' : 'x']) - this._handlePosition;
        return true;
    };
    
    this._draggesture = function(e) {
        this._updatePositionOnDrag(e);
    };
    
    this._draggestureend = function(e, offset) {
        this._updatePositionOnDrag(e);
    };
    
    this._updatePositionOnDrag = function(e) {
        var offset = uki.dom.offset(this.dom());
        this.handlePosition(e[this._vertical ? 'pageY' : 'pageX'] - offset[this._vertical ? 'y' : 'x'] - this._posWithinHandle);
        if (this._throttle) {
            this._throttleHandler = this._throttleHandler || uki.proxy(function() {
                this.layout();
                this._trottling = false;
            }, this);
            if (this._trottling) return;
            this._trottling = true;
            setTimeout(this._throttleHandler, this._throttle);
        } else {
            this.layout();
        }
    };
    
    
    /**
    * @function
    * @name uki.view.HSplitPane#topPane
    */
    /**
    * @function
    * @name uki.view.HSplitPane#leftPane
    */
    this.topPane = this.leftPane = function(pane) {
        return this._paneAt(0, pane);
    };
    
    /**
    * @function
    * @name uki.view.HSplitPane#bottomPane
    */
    /**
    * @function
    * @name uki.view.HSplitPane#rightPane
    */
    this.bottomPane = this.rightPane = function(pane) {
        return this._paneAt(1, pane);
    };
    
    /**
    * @function
    * @name uki.view.HSplitPane#topChildViews
    */
    /**
    * @function
    * @name uki.view.HSplitPane#leftChildViews
    */
    this.topChildViews = this.leftChildViews = function(views) {
        return this._childViewsAt(0, views);
    };
    
    /**
    * @function
    * @name uki.view.HSplitPane#rightChildViews
    */
    /**
    * @function
    * @name uki.view.HSplitPane#bottomChildViews
    */
    this.bottomChildViews = this.rightChildViews = function(views) {
        return this._childViewsAt(1, views);
    };
    
    this._childViewsAt = function(i, views) {
        if (views === undefined) return this._panes[i].childViews();
        this._panes[i].childViews(views);
        return this;
    };
    
    this._paneAt = function(i, pane) {
        if (pane === undefined) return this._panes[i];
        uki.build.copyAttrs(this._panes[i], pane);
        return this;
    };
    
    this._leftRect = function() {
        if (this._vertical) {
            return new Rect(this._rect.width, this._handlePosition);
        } else {
            return new Rect(this._handlePosition, this._rect.height);
        }
    };
    
    this._rightRect = function() {
        if (this._vertical) {
            return new Rect(
                0, this._handlePosition + this._handleWidth,
                this._rect.width, this._rect.height - this._handleWidth - this._handlePosition
            );
        } else {
            return new Rect(
                this._handlePosition + this._handleWidth, 0, 
                this._rect.width - this._handleWidth - this._handlePosition, this._rect.height
            );
        }
    };
    
    this._resizeChildViews = function() {
        this._panes[0].rect(this._leftRect());
        this._panes[1].rect(this._rightRect());
    };
    
    this._layoutDom = function(rect) {
        Base._layoutDom.call(this, rect);
        this._handle.style[this._vertical ? 'top' : 'left'] = this._handlePosition + 'px';
    };
    
    this._bindToDom = function(name) {
        if (name == 'handleMove') return true;
        return Base._bindToDom.call(this, name);
    };
    
});

/**
* Vertical Split Pane
*
* @author voloko
* @name uki.view.VSplitPane
* @class
* @extends uki.view.HSplitPane
*/
uki.view.declare('uki.view.VSplitPane', uki.view.HSplitPane, function(Base) {
    this._setup = function() {
        Base._setup.call(this);
        this._vertical = true;
    };
});


uki.Collection.addAttrs(['handlePosition']);
