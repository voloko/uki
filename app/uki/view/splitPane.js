include('base.js');

(function() {

var Base = uki.view.Base.prototype,
    marker = 'SplitPane__marker',
    Rect = uki.geometry.Rect;
    
uki.view.SplitPane = uki.newClass(uki.view.Base, new function() {
    var proto = this;
    proto.init = function() {
        Base.init.call(this);
        this._thin = false;
        this._vertical = false;
        this._handlePosition = 200;
        this._autogrowLeft = false;
        this._autogrowRight = true;
        this._handleWidth = 7;
        
        this._panes = [];
        this._paneML = [];
    };
    
    proto.handlePosition = function(val) {
        if (val === undefined) return this._handlePosition;
        if (this._rect) {
            this._handlePosition = Math.max(0, Math.min(this._rect ? this._rect[this._vertical ? 'height' : 'width'] : 1000, val * 1));
        } else {
            this._handlePosition = val;
        }
        this._originalHandlePosition = this._originalHandlePosition || this._handlePosition;
        if (this._dom) {
            this._resizeChildViews(this._rect);
            this.layout();
        }
    };
    
    proto.vertical = uki.newProperty('_vertical');
    proto.autogrowTop = proto.autogrowLeft = uki.newProperty('_autogrowLeft');
    proto.autogrowBottom = proto.autogrowRight = uki.newProperty('_autogrowRight');
    
    proto._domCreate = function() {
        this.handlePosition(this.handlePosition()); // force handle position within rect limits
        this._dom = uki.createElement('div', Base.defaultCss);
        if (this._vertical) {
            this._handle = uki.createElement(
                'div', 
                Base.defaultCss + 'width:100%;height:5px;top:' + this._handlePosition + 'px;' +
                'border: 1px solid #CCC;border-width: 1px 0;cursor:row-resize;cursor:ns-resize;z-index:200;' +
                'background: url(' + uki.theme.image('splitPane-vertical').src + ') 50% 50% no-repeat;'
            );
            
        } else {
            this._handle = uki.createElement(
                'div', 
                Base.defaultCss + 'height:100%;width:5px;left:' + this._handlePosition + 'px;' +
                'border: 1px solid #CCC;border-width: 0 1px;cursor:col-resize;cursor:ew-resize;z-index:200;' +
                'background: url(' + uki.theme.image('splitPane-horizontal').src + ') 50% 50% no-repeat;'
            );
        }
        this._dom.appendChild(this._handle);
        
        for (var i=0, paneML; i < 2; i++) {
            this._panes[i] = new uki.view.Base();
            this._panes[i].childViews(this._paneML[i]);
            this.appendChild(this._panes[i]);
        };
        this._paneML = [];
        this._resizeChildViewsWithRect(this._originalRect, this._originalHandlePosition);
        this._resizeChildViews();
        
        var _this = this;
        uki.dom.bind(this._handle, 'dragstart', function(e) { e.returnValue = false; });
        
        uki.dom.bind(this._handle, 'mousedown', function(e) {
            _this._initialPosition = _this._handlePosition;
            uki.dom.drag.start(_this, e);
        });
    };
    
    proto._updateRect = function(newRect) {
        this._originalRect = this._originalRect || newRect;
        var oldRect = this._rect,
            dx, prop = this._vertical ? 'height' : 'width';
        if (!Base._updateRect.call(this, newRect)) return false;
        if (this._autogrowLeft) {
            dx = newRect[prop] - oldRect[prop];
            this._handlePosition += this._autogrowRight ? dx / 2 : dx;
        }
        return true;
    };
    
    proto._drag = function(e, offset) {
        this.handlePosition(this._initialPosition - offset[this._vertical ? 'y' : 'x']);
    };
    
    proto._drop = function(e, offset) {
        this._initialPosition = null;
    };
    
    proto.topPane = proto.leftPane = function(pane) {
        this._paneAt(0, pane);
    };
    
    proto.bottomPane = proto.rightPane = function(pane) {
        this._paneAt(1, pane);
    };
    
    proto._paneAt = function(i, pane) {
        if (pane === undefined) return this._pane[i];
        this._paneML[i] = pane;
    };
    
    proto._resizeChildViewsWithRect = function(rect, handlePosition) {
        if (!this._panes[0] || !this._panes[1]) return;
        if (this._vertical) {
            this._panes[0].rect(new Rect(rect.width, handlePosition));
            this._panes[1].rect(new Rect(
                0, handlePosition + this._handleWidth,
                rect.width, rect.height - this._handleWidth - handlePosition
            ));
        } else {
            this._panes[0].rect(new Rect(handlePosition, rect.height));
            this._panes[1].rect(new Rect(
                handlePosition + this._handleWidth, 0, 
                rect.width - this._handleWidth - handlePosition, rect.height
            ));
        }
    };
    
    
    proto._resizeChildViews = function() {
        this._resizeChildViewsWithRect(this._rect, this._handlePosition);
    };
    
    proto._domLayout = function(rect, relativeRect) {
        Base._domLayout.call(this, rect, relativeRect);
        this._handle.style[this._vertical ? 'top' : 'left'] = this._handlePosition + 'px';
    }
});
    
})();