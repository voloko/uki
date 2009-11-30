include('base.js');

(function() {

var Base = uki.view.Base.prototype,
    self = uki.view.SplitPane = function() {
        this.init.apply(this, arguments);
    };
    
self.prototype = uki.extend({}, Base, {
    init: function() {
        this._thin = false;
        this._vertical = false;
        this._position = 0;
        this._panes = [];
        Base.init.apply(this, arguments);
    },
    
    _domCreate: function() {
        this._dom = uki.createElement('div', Base.defaultCss);
        this._containers = [uki.createElement('div', Base.defaultCss + 'height:100%;'), uki.createElement('div', Base.defaultCss + 'height:100%;')];
        this._handle = uki.createElement('div', Base.defaultCss + 'height:100%;width:5px;border: 0 1px solid #CCC;background:url(' + uki.defaultTheme.images['splitPane-horizontal']().src + ') 50% 50% no-repeat');
        this._dom.appendChild(this._containers[0]);
        this._dom.appendChild(this._containers[1]);
        this._dom.appendChild(this._handle);
    },
    
    _afterInit: function() {
        uki.dom.bind(this._handle, 'dragstart', function(e) { e.returnValue = false });
        
        uki.dom.bind(this._handle, 'mousedown', function(e) {
            _this._dragging = true;
            _this._initialPosition = new uki.geometry.Point(parseInt(_this._handle.style.left, 10), parseInt(_this._handle.style.top, 10));
            uki.dom.drag.start(_this, e);
        });
    },
    
    proportion: function() {
        
    },
    
    drag: function() {
        
    },
    
    dragEnd: function() {
        
    },
    
    pane1: function(comp) {
        if (arguments.length == 0) return this._panes[0];
        
    },
    
    pane2: function(comp) {
        if (arguments.length == 0) return this._panes[0];
        
    },
    
    vertical: function() {
        
    },

    _resize: function(rect) {
        var oldRect = this._rect.clone();
        this._rect = rect;
        
        if (this._childViews.length) {
            for (var i=0; i < this._childViews.length; i++) {
                this._childViews[i].resizeWithOldSize(oldRect, rect);
            };
        }
        this.trigger('resize', {oldRect: oldRect, newRect: rect, source: this});
        
    }
});
    
})();