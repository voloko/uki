/**
 * Vertical Flow
 * Arranges child views verticaly, one after another
 *
 * @author voloko
 * @name uki.view.VFlow
 * @class
 * @extends uki.view.Container
 */
uki.view.declare('uki.view.VFlow', uki.view.Container, function(Base) {
    this.contentsSize = function() {
        var value = uki.reduce(0, this._childViews, function(sum, e) { 
                return sum + (e.visible() ? e.rect().height : 0); 
            } );
        return new Size( this.contentsWidth(), value );
    };
    
    this.hidePartlyVisible = uki.newProp('_hidePartlyVisible');
    
    this.resizeToContents = function(autosizeStr) {
        this._resizeChildViews(this._rect);
        return Base.resizeToContents.call(this, autosizeStr);
    }
    
    this.layout = function() {
        return Base.layout.call(this);
    };
    
    // resize in layout
    this._resizeChildViews = function(oldRect) {
        var offset = 0, rect, view;
        for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
            view = childViews[i];
            view.parentResized(oldRect, this._rect);
            view.rect().y = offset;
            // view.rect(new Rect(view._rect.x, offset, view._rect.width, view._rect.height));
            if (this._hidePartlyVisible) {
                view.visible(view._rect.height + offset <= this._rect.height);
            }
            if (view.visible()) offset += view._rect.height;
        };
    };
    
    this.childResized = function() {
        this._needsLayout = true;
        uki.after(uki.proxy(this._afterChildResized, this));
    };
    
    this._contentChanged = this.childResized;
    
    this._afterChildResized = function() {
        this.resizeToContents('height');
        this.parent().childResized(this);
        this.layoutIfNeeded();
    };
    
});

/**
 * Horizontla Flow
 * Arranges child views horizontally
 *
 * @author voloko
 * @name uki.view.HFlow
 * @class
 * @extends uki.view.VFlow
 */
uki.view.declare('uki.view.HFlow', uki.view.VFlow, function(Base) {
    this.contentsSize = function() {
        var value = uki.reduce(0, this._childViews, function(sum, e) { 
                return sum + (e.visible() ? e.rect().width : 0); 
            } );
        return new Size( value, this.contentsHeight() );
    };
    
    this._resizeChildViews = function(oldRect) {
        var offset = 0, rect, view;
        for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
            view = childViews[i];
            view.parentResized(oldRect, this._rect);
            view.rect().x = offset;
            // view.rect(new Rect(offset, view._rect.y, view._rect.width, view._rect.height));
            if (this._hidePartlyVisible) {
                view.visible(view._rect.width + offset <= this._rect.width);
            }
            if (view.visible()) offset += view._rect.width;
        };
    };
    
    this._afterChildResized = function() {
        this.resizeToContents('width');
        this.parent().childResized(this);
        this.layoutIfNeeded();
    };
});
