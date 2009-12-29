
uki.view.Popup = uki.newClass(uki.view.Container, new function() {
    var Base = uki.view.Container[PROTOTYPE],
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
    
    uki.addProps(proto, ['offset', 'relativeTo', 'horizontal', 'flipOnResize']);
    
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
        if (!this.parent()) {
            new uki.Attachment( root, this );
        }
        this.visible(true);
    };
    
    proto.hide = function() {
        this.visible(false);
    };
    
    proto.parentResized = function() {
        this.rect(this._recalculateRect());
    };
    
    proto._calcRectOnContentResize = function(autosize) {
        var newSize = this.contentsSize( autosize ),
            newRect = this.rect().clone();
        
        if (autosize & AUTOSIZE_WIDTH) newRect.width = newSize.width;
        if (autosize & AUTOSIZE_HEIGHT) newRect.height = newSize.height;
        return newRect;
    };
    
    proto._resizeSelf = function(newRect) {
        this._rect = this._normalizeRect(newRect);
        return true;
    };
    
    proto._recalculateRect = function() {
        
        var relativeOffset = uki.view.offset(this._relativeTo),
            relativeAttachment = uki.view.top(this._relativeTo),
            relativeAttachmentOffset = uki.dom.offset(relativeAttachment.dom()),
            relativeRect = this._relativeTo.rect(),
            rect = this.rect().clone(),
            attachment = uki.view.top(this),
            attachmentRect = attachment.rect(),
            attachmentOffset = uki.dom.offset(attachment.dom()),
            position = new Point(),
            hOffset = this._horizontal ? this._offset : 0,
            vOffset = this._horizontal ? 0 : this._offset;
            
        relativeOffset.offset(relativeAttachmentOffset.x, relativeAttachmentOffset.y);
        relativeOffset.offset(-attachmentOffset.x, -attachmentOffset.y);

        if (this._anchors & ANCHOR_RIGHT) {
            position.x = relativeOffset.x + relativeRect.width - (this._horizontal ? 0 : rect.width) + hOffset;
        } else {
            position.x = relativeOffset.x - (this._horizontal ? rect.width : 0) - hOffset;
        }
        
        if (this._anchors & ANCHOR_BOTTOM) {
            position.y = relativeOffset.y + (this._horizontal ? 0 : relativeRect.height) + vOffset;
        } else {
            position.y = relativeOffset.y + (this._horizontal ? relativeRect.height : 0) - rect.height - vOffset;
        }

        return new Rect(position.x, position.y, rect.width, rect.height);
    };
});