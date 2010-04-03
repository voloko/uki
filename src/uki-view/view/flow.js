uki.view.declare('uki.view.VFlow', uki.view.Container, function(Base) {
    this.contentsSize = function() {
        var value = uki.reduce(0, this._childViews, function(sum, e) { 
                return sum + (e.visible() ? e.rect().height : 0); 
            } );
        return new Size( this.contentsWidth(), value );
    };
    
    this.hidePartlyVisible = uki.newProp('_hidePartlyVisible');
    
    this.resizeToContents = function(autosizeStr) {
        this._resizeChildViews();
        return Base.resizeToContents.call(this, autosizeStr);
    }
    
    uki.each(['appendChild', 'removeChild', 'insertBefore'], function(i, name) {
        this[name] = function(arg1, arg2) {
            this._contentChanged = true;
            return Base[name].call(this, arg1, arg2);
        };
    }, this)
    
    this.layout = function() {
        if (this._contentChanged) this._resizeChildViews();
        return Base.layout.call(this);
    };
    
    // resize in layout
    this._resizeChildViews = function() {
        this._contentChanged = false;
        var offset = 0, rect, view;
        for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
            view = childViews[i];
            view.rect(new Rect(view._rect.x, offset, this._rect.width, view._rect.height));
            if (this._hidePartlyVisible) {
                view.visible(view._rect.height + offset <= this._rect.height);
            }
            if (view.visible()) offset += view._rect.height;
        };
    };
});

uki.view.declare('uki.view.HFlow', uki.view.VFlow, function(Base) {
    this.contentsSize = function() {
        var value = uki.reduce(0, this._childViews, function(sum, e) { 
                return sum + (e.visible() ? e.rect().width : 0); 
            } );
        return new Size( value, this.contentsHeight() );
    };
    
    this._resizeChildViews = function() {
        var offset = 0, rect, view;
        for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
            view = childViews[i];
            view.rect(new Rect(offset, view._rect.y, view._rect.width, this._rect.height));
            if (this._hidePartlyVisible) {
                view.visible(view._rect.width + offset <= this._rect.width);
            }
            if (view.visible()) offset += view._rect.width;
        };
    };
    
});
