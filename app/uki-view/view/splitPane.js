uki.view.SplitPane = uki.newClass(uki.view.Container, new function() {
    var Base = uki.view.Container.prototype,
        Rect = uki.geometry.Rect;

    var proto = this,
        commonVerticalStyle = 'cursor:row-resize;cursor:ns-resize;z-index:200;overflow:hidden;',
        commonHorizontalStyle = 'cursor:col-resize;cursor:ew-resize;z-index:200;overflow:hidden;';
        
    proto.typeName = function() {
        return 'uki.view.SplitPane';
    };
    
    proto.init = function() {
        Base.init.call(this);
        this._vertical = false;
        this._handlePosition = 200;
        this._autogrowLeft = false;
        this._autogrowRight = true;
        this._handleWidth = 7;
        this._leftMin = 100;
        this._rightMin = 100;
        
        this._panes = [];
        this._paneML = [];
    };
    
    proto.handlePosition = function(val) {
        if (val === undefined) return this._handlePosition;
        if (this._rect) {
            var prop = this._vertical ? 'height' : 'width';
            this._handlePosition = Math.max(
                    this._leftMin,
                    Math.min(
                        this._rect[prop] - this._rightMin - this._handleWidth,
                        Math.max(0, Math.min(this._rect ? this._rect[prop] : 1000, val * 1))
                    )) || this._handlePosition;
        } else {
            this._handlePosition = val;
        }
        this._originalHandlePosition = this._originalHandlePosition || this._handlePosition;
        this._resizeChildViews(this._rect);
    };
    
    proto.vertical = uki.newProperty('_vertical');
    proto.leftMin = proto.topMin = uki.newProperty('_leftMin');
    proto.rightMin = proto.topMin = uki.newProperty('_rightMin');
    proto.autogrowTop = proto.autogrowLeft = uki.newProperty('_autogrowLeft');
    proto.autogrowBottom = proto.autogrowRight = uki.newProperty('_autogrowRight');
    proto.handleWidth = uki.newProperty('_handleWidth');
    
    proto._createHandle = function() {
        var handle;
        if (this._vertical) {
            handle = this._handleWidth == 1 ?
                uki.createElement('div', 
                    Base.defaultCss + 'width:100%;height:5px;margin-top:-2px;top:' + this._handlePosition + 'px;' + 
                    commonVerticalStyle + 'background: url(' + uki.theme.image('x').src + ')',
                    '<div style="' + 
                    Base.defaultCss + 'background:#999;width:100%;height:1px;left:0px;top:2px;overflow:hidden;' + 
                    '"></div>') :
                uki.createElement('div', 
                    Base.defaultCss + 'width:100%;height:' + (this._handleWidth - 2) + 'px;top:' + this._handlePosition + 'px;' +
                    'border: 1px solid #CCC;border-width: 1px 0;' + commonVerticalStyle +
                    'background: url(' + uki.theme.image('splitPane-vertical').src + ') 50% 50% no-repeat;');
        } else {
            handle = this._handleWidth == 1 ?
                uki.createElement('div', 
                    Base.defaultCss + 'height:100%;width:5px;margin-left:-2px;left:' + this._handlePosition + 'px;' + 
                    commonHorizontalStyle + 'background: url(' + uki.theme.image('x').src + ')',
                    '<div style="' + 
                    Base.defaultCss + 'background:#999;height:100%;width:1px;top:0px;left:2px;overflow:hidden;' + 
                    '"></div>') :
                uki.createElement('div', 
                    Base.defaultCss + 'height:100%;width:' + (this._handleWidth - 2) + 'px;left:' + this._handlePosition + 'px;' +
                    'border: 1px solid #CCC;border-width: 0 1px;' + commonHorizontalStyle + 
                    'background: url(' + uki.theme.image('splitPane-horizontal').src + ') 50% 50% no-repeat;');
        }
        if (!handle.style.cursor || window.opera) handle.style.cursor = this._vertical ? 'n-resize' : 'e-resize';
        return handle;
    };
    
    proto._createDom = function() {
        this.handlePosition(this.handlePosition()); // force handle position within rect limits
        this._dom = uki.createElement('div', Base.defaultCss);
        if (this._handleWidth <= 3) this._handleWidth = 1;

        this._dom.appendChild(this._handle = this._createHandle());
        
        for (var i=0, paneML; i < 2; i++) {
            this._paneML[i].view = this._paneML[i].view || new uki.view.Container();
            this._paneML[i].anchors = i == 1         ? 'left top bottom right' :
                                      this._vertical ? 'left top right' :
                                                       'left top bottom';
            this._paneML[i].autosize = 'width height';
            this._panes[i] = uki(this._paneML[i])[0];
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
        
        this.className(this.className());
    };
    
    proto._resizeSelf = function(newRect) {
        this._originalRect = this._originalRect || newRect;
        var oldRect = this._rect,
            dx, prop = this._vertical ? 'height' : 'width';
        if (!Base._resizeSelf.call(this, newRect)) return false;
        if (this._autogrowLeft) {
            dx = newRect[prop] - oldRect[prop];
            this._handlePosition += this._autogrowRight ? dx / 2 : dx;
        }
        return true;
    };
    
    proto._drag = function(e, offset) {
        this.handlePosition(this._initialPosition - offset[this._vertical ? 'y' : 'x']);
        this.layout();
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
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
    
    proto.topChildViews = proto.leftChildViews = function(views) {
        this._childViewsAt(0, views);
    };
    
    proto.bottomChildViews = proto.rightChildViews = function(views) {
        this._childViewsAt(1, views);
    };
    
    proto._childViewsAt = function(i, views) {
        if (views === undefined) return this._paneML[i] ? this._paneML[i].childViews : [];
        this._paneML[i] = {
            childViews: views
        };
    };
    
    proto._paneAt = function(i, pane) {
        if (pane === undefined) return this._paneML[i] || this._panes[i];
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
    
    proto._layoutDom = function(rect) {
        Base._layoutDom.call(this, rect);
        this._handle.style[this._vertical ? 'top' : 'left'] = this._handlePosition + 'px';
    };
});