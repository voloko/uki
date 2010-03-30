uki.view.declare('uki.view.VFlow', uki.view.Container, function(Base) {
    this.contentsSize = function() {
        var value = uki.reduce(0, this._childViews, function(sum, e) { 
                return sum + (e.visible() ? e.rect().height : 0); 
            } );
        return new Size( this.contentsWidth(), value );
    };
    
    this.hidePartlyVisible = uki.newProp('_hidePartlyVisible');
    
    this._layoutChildViews = function() {
        var offset = 0, rect, view;
        for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
            view = childViews[i];
            view.rect(new Rect(view._rect.x, offset, view._rect.width, view._rect.height));
            if (this._hidePartlyVisible) {
                view.visible(view._rect.height + offset <= this._rect.height);
            }
            if (view.visible()) offset += view._rect.height;
        };
        Base._layoutChildViews.call(this);
    };
});

uki.view.declare('uki.view.HFlow', uki.view.Container, function(Base) {
    this.hidePartlyVisible = uki.newProp('_hidePartlyVisible');
    
    this.contentsSize = function() {
        var value = uki.reduce(0, this._childViews, function(sum, e) { 
                return sum + (e.visible() ? e.rect().width : 0); 
            } );
        return new Size( value, this.contentsHeight() );
    };
    
    this._layoutChildViews = function() {
        var offset = 0, rect, view;
        for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
            view = childViews[i];
            view.rect(new Rect(offset, view._rect.y, view._rect.width, view._rect.height));
            if (this._hidePartlyVisible) {
                view.visible(view._rect.width + offset <= this._rect.width);
            }
            if (view.visible()) offset += view._rect.width;
        };
        Base._layoutChildViews.call(this);
    };
    
});
