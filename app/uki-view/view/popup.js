
uki.view.Popup = uki.newClass(uki.view.Container, new function() {
    var Base = uki.view.Container.prototype,
        proto = this;
    
    proto.init = function() {
        Base.init.call(this);
        this._offset = 2;
        this._relativeTo = null;
        this._horizontal = false;
        this._flipOnResize = true;
        this._shadow = null;
    };
    
    uki.newProperties(proto, ['offset', 'relativeTo', 'horizontal', 'flipOnResize']);
    
    proto.typeName = function() {
        return 'uki.view.Popup';
    };
    
    proto.background = function(bg) {
        if (bg === undefined && !this._background) this._background = uki.theme.background('popup-normal');
        return Base.background.call(this, bg);
    };
    
    proto.shadow = function(bg) {
        if (bg === undefined && !this._shadow) this._shadow = uki.theme.background('popup-shadow');
        return Base.shadow.call(this, bg);
    };
    
    proto.show = function() {
        new uki.Attachment( doc.body, this );
    };
    
    proto.parentResized = function() {
        this.rect(this._recalculateRect());
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
        
        if (this._autosize && AUTOSIZE_WIDTH) rect.width = relativeRect.width;
        if (this._autosize && AUTOSIZE_HEIGHT) rect.height = relativeRect.height;
        
        // var flipToRight = relativeOffset.x + rect.width + hOffset + (this._horizontal ? relativeRect.width : 0) > attachmentRect.width,
        //     flipToLeft = relativeOffset.x - rect.width - hOffset < 0,
        //     flipToTop = relativeOffset.y + rect.height + vOffset + (this._horizontal ? 0 : relativeRect.height) > attachmentRect.height,
        //     flipToBottom = relativeOffset.x - rect.height - hOffset < 0;
        
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