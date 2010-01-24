
uki.view.Popup = uki.newClass(uki.view.Container, new function() {
    var Base = uki.view.Container.prototype,
        proto = this;
    
    proto._setup = function() {
        Base._setup.call(this);
        uki.extend(this, {
            _offset: 2,
            _relativeTo: null,
            _horizontal: false,
            _flipOnResize: true,
            _shadow: null,
            _defaultBackground: 'popup-normal',
            _defaultShadow: 'popup-shadow'
        });
    };
    
    proto._createDom = function() {
        Base._createDom.call(this);
        this.hideOnClick(true);
    };
    
    uki.addProps(proto, ['offset', 'relativeTo', 'horizontal', 'flipOnResize']);
    
    this.hideOnClick = function(state) {
        if (state === undefined) return this._clickHandler;
        if (state != !!this._clickHandler) {
            if (state) {
                this._clickHandler = this._clickHandler || uki.proxy(function(e) {
                    if (uki.dom.contains(this._relativeTo.dom(), e.target)) return;
                    if (uki.dom.contains(this.dom(), e.target)) return;
                    this.hide();
                }, this);
                uki.dom.bind(doc.body, 'mousedown', this._clickHandler);
                uki.dom.bind(root, 'resize', this._clickHandler);
            } else {
                uki.dom.unbind(doc.body, 'mousedown', this._clickHandler);
                uki.dom.unbind(root, 'resize', this._clickHandler);
                this._clickHandler = false;
            }
        }
        return this;
    };
    
    proto.typeName = function() {
        return 'uki.view.Popup';
    };
    
    proto.toggle = function() {
        if (this.parent() && this.visible()) {
            this.hide();
        } else {
            this.show();
        }
    };
    
    proto.show = function() {
        this.visible(true);
        if (!this.parent()) {
            new uki.Attachment( root, this );
        } else {
            this.rect(this._recalculateRect());
            this.layout(this._rect);
        }
    };
    
    proto.hide = function() {
        this.visible(false);
    };
    
    proto.parentResized = function() {
        this.rect(this._recalculateRect());
    };
    
    proto._resizeSelf = function(newRect) {
        this._rect = this._normalizeRect(newRect);
        return true;
    };
    
    proto._layoutDom = function(rect) {
        return Base._layoutDom.call(this, rect);
    };
    
    proto._recalculateRect = function() {
        if (!this.visible()) return this._rect;
        var relativeOffset = uki.dom.offset(this._relativeTo.dom()),
            relativeRect = this._relativeTo.rect(),
            rect = this.rect().clone(),
            attachment = uki.view.top(this),
            attachmentRect = attachment.rect(),
            attachmentOffset = uki.dom.offset(attachment.dom()),
            position = new Point(),
            hOffset = this._horizontal ? this._offset : 0,
            vOffset = this._horizontal ? 0 : this._offset;

        relativeOffset.offset(-attachmentOffset.x, -attachmentOffset.y);

        if (this._anchors & ANCHOR_RIGHT) {
            position.x = relativeOffset.x + relativeRect.width - (this._horizontal ? 0 : rect.width) + hOffset;
        } else {
            position.x = relativeOffset.x - (this._horizontal ? rect.width : 0) - hOffset;
        }
        
        if (this._anchors & ANCHOR_BOTTOM) {
            position.y = relativeOffset.y + (this._horizontal ? relativeRect.height : 0) - rect.height - vOffset;
        } else {
            position.y = relativeOffset.y + (this._horizontal ? 0 : relativeRect.height) + vOffset;
        }
        
        return new Rect(position.x, position.y, rect.width, rect.height);
    };
});


uki.each(['show', 'hide', 'toggle'], function(i, name) {
    uki.fn[name] = function() {
        this.each(function() { this[name](); });
    };
});