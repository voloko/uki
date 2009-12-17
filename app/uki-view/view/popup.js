
uki.view.Popup = uki.newClass(uki.view.Container, new function() {
    var Base = uki.view.Container.prototype,
        proto = this;
    
    proto.init = function() {
        Base.init.call(this);
    };
    
    proto.background = function(bg) {
        if (bg === undefined && !this._background) this._background = uki.theme.background('popup-normal');
        return Base.background.call(this, bg);
    };
    
    proto._createDom = function() {
        this._dom = uki.createElement('div', this.defaultCss);
        
        this.selectable(this.selectable());
        this.className(this.className());
        this.background().attachTo(this);
    };
});