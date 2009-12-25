uki.view.SplitPane = uki.newClass(uki.view.Container, new function() {
    var Base = uki.view.Container[PROTOTYPE],
        proto = this;
        
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
        this._paneML = [{childViews:[]}, {childViews: []}];
    };
    
    proto.handlePosition = function(val) {
        if (val === undefined) return this._handlePosition;
        
        this._handlePosition = this._normalizePosition(val) || this._handlePosition;
        this.trigger('handleMove', {source: this, handlePosition: this._handlePosition, dragValue: val });
        
        this._originalHandlePosition = this._originalHandlePosition || this._handlePosition;
        this._resizeChildViews(this._rect);
        return this;
    };
    
    proto._normalizePosition = function(val) {
        if (!this._rect) return val;
        var prop = this._vertical ? 'height' : 'width';
        return MAX(
                this._leftMin,
                MIN(
                    this._rect[prop] - this._rightMin - this._handleWidth,
                    MAX(0, MIN(this._rect ? this._rect[prop] : 1000, val * 1))
                ));
    };
    
    
    uki.addProps(proto, ['vertical', 'leftMin', 'rightMin', 'autogrowLeft', 'autogrowRight', 'handleWidth']);
    proto.topMin = proto.leftMin;
    proto.bottomMin = proto.rightMin;
    
    proto._createHandle = function() {
        var handle;
        if (this._vertical) {
            handle = uki.theme.dom('splitPane-vertical', {handleWidth: this._handleWidth});
            handle.style.top = this._handlePosition + 'px';
        } else {
            handle = uki.theme.dom('splitPane-horizontal', {handleWidth: this._handleWidth});
            handle.style.left = this._handlePosition + 'px';
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
            var offset = uki.dom.offset(_this.dom());
            _this._posWithinHandle = (e[_this._vertical ? 'pageY' : 'pageX'] - offset[_this._vertical ? 'y' : 'x']) - _this._handlePosition;
            uki.dom.drag.start(_this, e);
        });
        
        this._initCommonAttrs();
    };
    
    proto.rect = function(newRect) {
        if (newRect !== undefined) {
            if (this._vertical) {
                newRect.height = MAX(newRect.height, this._leftMin + this._rightMin); // force min width
            } else {
                newRect.width = MAX(newRect.width, this._leftMin + this._rightMin); // force min width
            }
        }
        return Base.rect.call(this, newRect);
    };
    
    proto._resizeSelf = function(newRect) {
        this._originalRect = this._originalRect || newRect;
        var oldRect = this._rect,
            dx, prop = this._vertical ? 'height' : 'width';
        if (!Base._resizeSelf.call(this, newRect)) return false;
        if (this._autogrowLeft) {
            dx = newRect[prop] - oldRect[prop];
            this._handlePosition = this._normalizePosition(this._handlePosition + (this._autogrowRight ? dx / 2 : dx))
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
    
    proto._drag = function(e) {
        var offset = uki.dom.offset(this.dom());
        this.handlePosition(e[this._vertical ? 'pageY' : 'pageX'] - offset[this._vertical ? 'y' : 'x'] - this._posWithinHandle);
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        this.layout();
    };
    
    proto._drop = function(e, offset) {
    };
    
    proto.topPane = proto.leftPane = function(pane) {
        return this._paneAt(0, pane);
    };
    
    proto.bottomPane = proto.rightPane = function(pane) {
        return this._paneAt(1, pane);
    };
    
    proto.topChildViews = proto.leftChildViews = function(views) {
        return this._childViewsAt(0, views);
    };
    
    proto.bottomChildViews = proto.rightChildViews = function(views) {
        return this._childViewsAt(1, views);
    };
    
    proto._childViewsAt = function(i, views) {
        if (views === undefined) return this._paneML[i] ? this._paneML[i].childViews : [];
        this._paneML[i] = {
            childViews: views
        };
        return this;
    };
    
    proto._paneAt = function(i, pane) {
        if (pane === undefined) return this._paneML[i] || this._panes[i];
        this._paneML[i] = pane;
        return this;
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
    
    proto._bindToDom = function(name) {
        if (name == 'handleMove') return true;
        return Base._bindToDom.call(this, name);
    };
    
});

uki.fn.handlePosition = function( value ) { return this.attr( 'handlePosition', value ); };