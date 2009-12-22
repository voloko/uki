uki.view.SplitPane = uki.newClass(uki.view.Container, new function() {
    var Base = uki.view.Container[PROTOTYPE];

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
            this._handlePosition = MAX(
                    this._leftMin,
                    MIN(
                        this._rect[prop] - this._rightMin - this._handleWidth,
                        MAX(0, MIN(this._rect ? this._rect[prop] : 1000, val * 1))
                    )) || this._handlePosition;
        } else {
            this._handlePosition = val;
        }
        this.trigger('handleMove', {source: this, handlePosition: this._handlePosition, dragValue: val });
        
        this._originalHandlePosition = this._originalHandlePosition || this._handlePosition;
        this._resizeChildViews(this._rect);
        return this;
    };
    
    
    uki.addProperties(proto, ['vertical', 'leftMin', 'rightMin', 'autogrowLeft', 'autogrowRight', 'handleWidth']);
    
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
            this._handlePosition += this._autogrowRight ? dx / 2 : dx;
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
        this.handlePosition(e[this._vertical ? 'pageY' : 'pageX'] - offset[this._vertical ? 'y' : 'x']);
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
        // rect = rect.clone();
        // if (this._vertical) {
        //     rect.height = MAX(rect.height, this._leftMin + this._rightMin); // force min width
        // } else {
        //     rect.width = MAX(rect.width, this._leftMin + this._rightMin); // force min width
        // }
        Base._layoutDom.call(this, rect);
        
        this._handle.style[this._vertical ? 'top' : 'left'] = this._handlePosition + 'px';
    };
    
    proto._bindToDom = function(name) {
        if (name == 'handleMove') return true;
        return Base._bindToDom.call(this, name);
    };
    
});