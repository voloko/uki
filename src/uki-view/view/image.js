uki.view.declare('uki.view.Image', uki.view.Base, function() {
    this.typeName = function() { return 'uki.view.Image'; };
    
    uki.delegateProp(this, 'src', '_dom');
    
    this._createDom = function() {
        this._dom = uki.createElement('img', this.defaultCss)
    };
});
