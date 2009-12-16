uki.view.Toolbar = uki.newClass(uki.view.Container, new function() {
    var proto = this;
    
    proto.buttons = function() {
        
    };
    
    proto._createDom = function() {
        this._dom = uki.createElement('div', this.defaultCss);
        if (this.background()) this.background().attachTo(this);
    };
    
    proto._renderButton = function() {
        
    };
    
    proto.typeName = function() {
        return 'uki.view.Toolbar';
    };
});