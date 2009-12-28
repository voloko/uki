uki.view.Image = uki.newClass(uki.view.Base, new function() {
    var proto = this;
    
    proto.typeName = function() { return 'uki.view.Image'; };
    
    uki.delegateProp(proto, 'src', '_domStyle');
    
    proto._createDom = function() {
        this._dom = uki.createElement('img', this.defaultCss)
        this._dom.src = this._src;
        this._initCommonAttrs();
    };
    
});
