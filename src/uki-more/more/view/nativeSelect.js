include('nativeControl.js');

uki.view.declare('uki.more.view.NativeSelect', uki.more.view.NativeControl, function(Base) {
    
    this._createDom = function() {
        this._dom = uki.createElement('select', 'position:absolute;z-index:100;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;');
        this._initClassName();
        this._initFocusable(this._dom);
    };
    
    uki.delegateProp(this, 'name', '_dom');
    uki.delegateProp(this, 'disabled', '_dom');
    uki.delegateProp(this, 'value', '_dom');
    
    this.options = function(val) {
        if (val === undefined) return uki.map(this._dom.getElementsByTagName('option'), function(option) {
            return { value: option.getAttribute('value'), html: option.innerHTML };
        });
                              
        this._dom.innerHTML = '';
        uki.each(val, function(i, option) {
            var node = uki.createElement('option', '', option.text);
            node.value = option.value;
            node.selected = option.selected;
            this._dom.appendChild(node);
        }, this);
    };
    
});
