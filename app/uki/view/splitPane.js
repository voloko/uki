include('base.js');

(function() {

var Base = uki.view.Base.prototype,
    marker = 'SplitPane__marker';
    
uki.view.SplitPane = uki.newClass(uki.view.Base, {
    init: function() {
        Base.init.call(this);
        this._thin = false;
        this._vertical = false;
        this._handlePosition = 200;
        this._autogrowLeft = false;
        this._autogrowRight = true;
        
        this._panes = [];
        this._childViews = [[],[]];
        this._rects = [];
    },
    
    handlePosition: function(val) {
        if (val === undefined) return this._handlePosition;
        this._handlePosition = Math.max(0, Math.min(this._rect ? this._rect.width : 1000, val * 1));
        if (this._dom) {
            this._resizeChildViews(this._rect);
            this.layout();
        }
    },
    
    autogrowLeft: uki.newProperty('_autogrowLeft'),
    autogrowRight: uki.newProperty('_autogrowRight'),
    
    _domCreate: function() {
        this._dom = uki.createElement('div', Base.defaultCss);
        this._panes = [
            uki.createElement('div', Base.defaultCss + 'height:100%;'), 
            uki.createElement('div', Base.defaultCss + 'height:100%;')];
        this._handle = uki.createElement(
            'div', 
            Base.defaultCss + 'height:100%;width:5px;left:' + this._handlePosition + 'px;' +
            'border: 1px solid #CCC;border-width: 0 1px;cursor:ew-resize;' +
            'background:url(' + uki.theme.image('splitPane-horizontal').src + ') 50% 50% no-repeat;'
        );
        this._dom.appendChild(this._panes[0]);
        this._dom.appendChild(this._panes[1]);
        this._dom.appendChild(this._handle);
        this._handleWidth = 7;
        
        var _this = this;
        uki.dom.bind(this._handle, 'dragstart', function(e) { e.returnValue = false; });
        
        uki.dom.bind(this._handle, 'mousedown', function(e) {
            _this._dragging = true;
            _this._initialPosition = new uki.geometry.Point(parseInt(_this._handle.style.left, 10), parseInt(_this._handle.style.top, 10));
            uki.dom.drag.start(_this, e);
        });
    },
    
    _drag: function(e, offset) {
        this.handlePosition(this._initialPosition.x - offset.x);
    },
    
    _drop: function(e, offset) {
        this._initialPosition = null;
    },
    
    _updateRect: function(rect) {
        this._rect  = rect;
        this._rects = this._calcPaneRects(rect);
    },
    
    _resizeChildViews: function(rect) {
        var rects = this._calcPaneRects(rect),
            i, k;
        for (k=0; k < 2; k++) {
            if (rects[k].eq(this._rects[k])) continue;
            for (i=0, childViews = this._childViews[k]; i < childViews.length; i++) {
                childViews[i].resizeWithOldSize(this._rects[k], rects[k]);
            };
        }
    },
    
    _calcPaneRects: function(rect) {
        return [ new uki.geometry.Rect(0, 0, this._handlePosition, rect.height),
                 new uki.geometry.Rect(0, 0, rect.width - this._handlePosition, rect.height) ]
    },
    
    removeLeftChild: function(child) {
        this._removeChildFromPane(0, child);
    },
    
    appendLeftChild: function(child) {
        this._appendChildToPane(0, child);
    },
    
    removeRightChild: function(child) {
        this._removeChildFromPane(1, child);
    },
    
    appendRightChild: function(child) {
        this._appendChildToPane(1, child);
    },
    
    childViews: function(views) {
        if (views !== undefined) throw "Can't assign to childViews in split pane. Use leftChildViews/topChildViews";
        return this._childViews[0].concat(this._childViews[1]);
    },
    
    leftChildViews: function(views) {
        return this._childViewsForPane(0, views);
    },
    
    rightChildViews: function(views) {
        return this._childViewsForPane(1, views);
    },
    
    domForChild: function(child) {
        return this._panes[child[marker] = child[marker] || 0];
    },
    
    _childViewsForPane: function(i, views) {
        if (views === undefined) return this._childViews[i];
        uki.each(this._childViews[i], function(tmp, child) {
            this._removeChildFromPane(i, child);
        }, this);
        uki.each(uki.build(views), function(tmp, child) {
            this._appendChildToPane(i, child);
        }, this);
    },
    
    _removeChildFromPane: function(i, child) {
        this._childViews[i] = uki.grep(this._childViews[i], function(elem) { return elem == child; });
        child.parent(null);
    },
    
    _appendChildToPane: function(i, child) {
        child.parent(this);
        child[marker] = i;
        this._childViews[i].push(child);
    },
    
    _domLayout: function(rect) {
        Base._domLayout.call(this, rect);
        uki.dom.layout(this._panes[0].style, {
            width: this._handlePosition, 
            height: rect.height
        });
        uki.dom.layout(this._panes[1].style, {
            left: this._handlePosition + this._handleWidth,
            width: rect.width - this._handlePosition - this._handleWidth, 
            height: rect.height
        });
        this._handle.style.left = this._handlePosition + 'px';
    }
    
    
});
    
})();