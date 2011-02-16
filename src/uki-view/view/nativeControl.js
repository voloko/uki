var uki = require('uki-core'),
    view = uki.view;
    
requireCss('./nativeControl/nativeControl.css');

var nc = module.exports = view.nativeControl = {};

var NativeControl = nc.NativeControl = uki.newClass(uki.view.Base, {}),
    ncProto = NativeControl.prototype;
    
uki.delegateProp(ncProto, ['name', 'checked', 'disabled', 'value', 'type'], '_input');

ncProto._bindingOptions = {};

ncProto.binding = uki.newProp('_binding', function(val) {
    if (this._binding) this._binding.destruct();
    
    this._binding = val && new uki.Binding(this, val.model, 
        uki.extend(this._bindingOptions, val));
});

ncProto.domForEvent = function(type) {
    return this._input;
};




var Radio = nc.Radio = uki.newClass(NativeControl, {}),
    radioProto = Radio.prototype;

radioProto._createDom = function(initArgs) {
    this._input = uki.createElement('input', { className: 'uki-nc-radio__input', type: 'radio', name: initArgs.name });
    this._label = uki.createElement('span', { className: 'uki-nc-radio__label' });
    this._dom = uki.createElement(initArgs.tagName || 'label', { className: 'uki-nc-radio' }, [this._input, this._label]);
};

radioProto._bindingOptions = { viewEvent: 'click', viewProp: 'checked', commitChangesViewEvent: 'click' };
uki.delegateProp(radioProto, 'html', '_label', 'innerHTML');





var Checkbox = nc.Checkbox = uki.newClass(NativeControl, {}),
    cbProto = Checkbox.prototype;

cbProto._createDom = function(initArgs) {
    this._input = uki.createElement('input', { className: 'uki-nc-checkbox__input', type: 'checkbox', name: initArgs.name });
    this._label = uki.createElement('span', { className: 'uki-nc-checkbox__label' });
    this._dom = uki.createElement(initArgs.tagName || 'label', { className: 'uki-nc-checkbox' }, [this._input, this._label]);
};

cbProto._bindingOptions = radioProto._bindingOptions;
uki.delegateProp(cbProto, 'html', '_label', 'innerHTML');





var Text = nc.Text = uki.newClass(NativeControl, {}),
    textProto = Text.prototype;

textProto._createDom = function(initArgs) {
    this._input = uki.createElement('input', { className: 'uki-nc-text__input', type: 'text', name: initArgs.name });
    this._dom = uki.createElement(initArgs.tagName || 'spab', { className: 'uki-nc-text' }, [this._input]);
};

uki.delegateProp(textProto, 'placeholder', '_input');
