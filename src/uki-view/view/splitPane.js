uki.view.SplitPane = uki.newClass(uki.view.Container, new function() {
    var Base = uki.view.Container[PROTOTYPE],
        proto = this;
        
    proto.typeName = function() {
        return 'uki.view.SplitPane';
    };
    
    proto._setup = function() {
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
    
    proto.handlePosition = uki.newProp('_handlePosition', function(val) {
        this._handlePosition = this._normalizePosition(val);
        this.trigger('handleMove', {source: this, handlePosition: this._handlePosition, dragValue: val });
        this._resizeChildViews();
    });
    
    proto.handleWidth = uki.newProp('_handleWidth', function(val) {
        if (this._handleWidth != val) {
            this._handleWidth = val;
            var handle = this._createHandle();
            this._dom.insertBefore(handle, this._handle);
            this._removeHandle();
            this._handle = handle;
            this._resizeChildViews();
        }
    });
    
    
    proto._normalizePosition = function(val) {
        var prop = this._vertical ? 'height' : 'width';
        return MAX(
                this._leftMin,
                MIN(
                    this._rect[prop] - this._rightMin - this._handleWidth,
                    MAX(0, MIN(this._rect ? this._rect[prop] : 1000, val * 1))
                ));
    };
    
    
    uki.addProps(proto, ['leftMin', 'rightMin', 'autogrowLeft', 'autogrowRight']);
    proto.topMin = proto.leftMin;
    proto.bottomMin = proto.rightMin;
    
    proto._removeHandle = function() {
        this._dom.removeChild(this._handle);
    };
    
    proto._createHandle = function() {
        var handle;
        if (this._vertical) {
            handle = uki.theme.dom('splitPane-vertical', {handleWidth: this._handleWidth});
            handle.style.top = this._handlePosition + PX;
        } else {
            handle = uki.theme.dom('splitPane-horizontal', {handleWidth: this._handleWidth});
            handle.style.left = this._handlePosition + PX;
        }
        
        uki.dom.drag.watch(handle, this);
        
        return handle;
    };
    
    proto._createDom = function() {
        this._dom = uki.createElement('div', Base.defaultCss);
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
    
    proto._normalizeRect = function(rect) {
        rect = Base._normalizeRect.call(this, rect);
        var newRect = rect.clone();
        if (this._vertical) {
            newRect.height = MAX(newRect.height, this._leftMin + this._rightMin); // force min width
        } else {
            newRect.width = MAX(newRect.width, this._leftMin + this._rightMin); // force min width
        }
        return newRect;
    };
    
    proto._resizeSelf = function(newRect) {
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
    
    proto._acceptDrag = function(e) {
        var offset = uki.dom.offset(this.dom());
        this._posWithinHandle = (e[this._vertical ? 'pageY' : 'pageX'] - offset[this._vertical ? 'y' : 'x']) - this._handlePosition;
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
        if (views === undefined) return this._panes[i].childViews();
        this._panes[i].childViews(views);
        return this;
    };
    
    proto._paneAt = function(i, pane) {
        if (pane === undefined) return this._panes[i];
        uki.build.copyAttrs(this._panes[i], pane);
        return this;
    };
    
    proto._leftRect = function() {
        if (this._vertical) {
            return new Rect(this._rect.width, this._handlePosition);
        } else {
            return new Rect(this._handlePosition, this._rect.height);
        }
    };
    
    proto._rightRect = function() {
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
    
    proto._resizeChildViews = function() {
        this._panes[0].rect(this._leftRect());
        this._panes[1].rect(this._rightRect());
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

uki.view.HorizontalSplitPane = uki.view.SplitPane;
uki.view.VerticalSplitPane = uki.newClass(uki.view.SplitPane, {
    _setup: function() {
        uki.view.SplitPane[PROTOTYPE]._setup.call(this);
        this._vertical = true;
    }
});

uki.fn.handlePosition = function( value ) { return this.attr( 'handlePosition', value ); };