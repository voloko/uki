include('nativeControl.js');

uki.view.declare('uki.more.view.NativeCheckbox', uki.more.view.NativeControl, function(Base) {
    this.checked = function(value) {
        if (value === undefined) return this._dom.checked;
        this._dom.checked = this._dom.defaultChecked = value;
        return this;
    };
    
    this.value = this.checked;
    
    var inputSize;
    function initInputSize () {
        if (!inputSize) {
            var input = uki.createElement('input', 'width:auto;height:auto;display:block;');
            input.type = 'checkbox';
            uki.dom.probe(input, function(input) {
                inputSize = [input.offsetWidth, input.offsetHeight];
            });
        }
    }
    
    this._setup = function() {
        Base._setup.call(this);
        this._type = 'checkbox';
    };
    
    this._layoutDom = function(rect) {
        initInputSize();
        var l = {
                left: rect.x + (rect.width - inputSize[0]) / 2,
                top:  rect.y + (rect.height - inputSize[1]) / 2
            };
        
        this._lastLayout = uki.dom.layout(this._dom.style, l, this._lastLayout);
        return true;
    };
});