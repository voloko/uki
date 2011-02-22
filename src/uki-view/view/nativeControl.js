var uki = require('uki-core'),
    view = uki.view;

requireCss('./nativeControl/nativeControl.css');

var nc = module.exports = view.nativeControl = {};


/**
* Base class for native control wrappers.
* Map common dom attributes and add binding
*/
var NativeControl = nc.NativeControl = uki.newClass(uki.view.Base, uki.view.Focusable, {}),
    ncProto = NativeControl.prototype;

uki.delegateProp(ncProto, ['name', 'checked', 'disabled', 'value', 'type'], '_input');

ncProto._bindingOptions = {};

uki.addProp(ncProto, 'binding', function(val) {
    if (this._binding) this._binding.destruct();

    this._binding = val && new uki.Binding(this, val.model,
        uki.extend(this._bindingOptions, val));
});

ncProto.domForEvent = function(type) {
    return this._input;
};

ncProto.focusableDom = function() {
    return this._input;
};

ncProto.domForEvent = function(type) {
    return uki.view.Focusable._domForEvent.call(this, type) ||
        uki.view.Base.prototype.domForEvent.call(this, type);
};



/**
* Radio button with a label
* uki({ view: 'nativeControl.Radio', name: 'color', value: 'red', text: 'Red' })
*/
var Radio = nc.Radio = uki.newClass(NativeControl, {}),
    radioProto = Radio.prototype;

radioProto.typeName = 'nativeControl.Radio';

radioProto._createDom = function(initArgs) {
    this._input = uki.createElement('input', { className: 'uki-nc-radio__input', type: 'radio' });
    this._label = uki.createElement('span', { className: 'uki-nc-radio__label' });
    this._dom = uki.createElement(initArgs.tagName || 'label', { className: 'uki-nc-radio' }, [this._input, this._label]);
};

radioProto._bindingOptions = { viewEvent: 'click', viewProp: 'checked', commitChangesViewEvent: 'click' };
uki.delegateProp(radioProto, 'html', '_label', 'innerHTML');





/**
* Checkbox with a label
* uki({ view: 'nativeControl.Checkbox', name: 'color', value: 'red', text: 'Red' })
*/
var Checkbox = nc.Checkbox = uki.newClass(NativeControl, {}),
    cbProto = Checkbox.prototype;

cbProto.typeName = 'nativeControl.Checkbox';

cbProto._createDom = function(initArgs) {
    this._input = uki.createElement('input', { className: 'uki-nc-checkbox__input', type: 'checkbox' });
    this._label = uki.createElement('span', { className: 'uki-nc-checkbox__label' });
    this._dom = uki.createElement(initArgs.tagName || 'label', { className: 'uki-nc-checkbox' }, [this._input, this._label]);
};

cbProto._bindingOptions = radioProto._bindingOptions;
uki.delegateProp(cbProto, 'html', '_label', 'innerHTML');





/**
* Text input
* uki({ view: 'nativeControl.Text', value: 'John Smith', placeholder: 'Name?' })
*/
var Text = nc.Text = uki.newClass(NativeControl, {}),
    textProto = Text.prototype;

textProto.typeName = 'nativeControl.Text';

textProto._createDom = function(initArgs) {
    this._input = uki.createElement('input', { className: 'uki-nc-text__input', type: 'text' });
    this._dom = uki.createElement(initArgs.tagName || 'span', { className: 'uki-nc-text' });
    this._dom.appendChild(this._input);
};

uki.addProp(textProto, 'placeholder', function(v) {
    this._placeholder = v;
    if (this._input.placeholder !== undefined) {
        this._input.placeholder = v;
    } else {
        this._initPlaceholder();
        this._placeholderDom.innerHTML = uki.escapeHTML(v);
    }
});

var ieResize = uki.ua.match(/MSIE 6|7/);
textProto.resized = function() {
    NativeControl.prototype.resized.call(this);
    this._updatePlaceholderHeight();
    // manual resize box-sizing: border-box for ie 6,7
    if (ieResize) {
        this._input.style.width = this._dom.offsetWidth - 6;
    }
};

textProto._initPlaceholder = function() {
    if (this._initedPlaceholder) return;
    this._initedPlaceholder = true;
    this.addClass('uki-nc-text_with-placeholder');
    this._placeholderDom = uki.createElement('span', { className: 'uki-nc-text__placholder' });
    this._dom.insertBefore(this._placeholderDom, this._dom.firstChild);
    uki.dom.addListener(this._placeholderDom, 'click', uki.bindOnce(function() {
        this.focus();
    }, this));
    this.on('focus blur change keyup', this._updatePlaceholderVis);
    if (this._input.offsetHeight) {
        this._updatePlaceholderHeight();
    }
};

textProto._updatePlaceholderVis = function() {
    this._placeholderDom.style.display =  this.hasFocus() || this.value() ? 'none' : '';
};

textProto._updatePlaceholderHeight = function() {
    if (!this._placeholderDom) return;
    var targetStyle = this._placeholderDom.style,
        sourceStyle = uki.dom.computedStyle(this._input);

    ['font', 'fontFamily', 'fontSize', 'paddingLeft', 'paddingTop', 'padding'].forEach(function(name) {
        if (sourceStyle[name] !== undefined) {
            targetStyle[name] = sourceStyle[name];
        }
    });
    targetStyle.lineHeight = this._input.offsetHeight + (parseInt(sourceStyle.marginTop) || 0)*2 + 'px';
    targetStyle.marginLeft = (parseInt(sourceStyle.marginLeft) || 0) + (parseInt(sourceStyle.borderLeftWidth) || 0) + 'px';
    textProto._updatePlaceholderHeight = uki.FS;
};




/**
* Native browser button
* uki({ view: 'nativeControl.Button', value: 'Work!'})
*/
var Button = nc.Button = uki.newClass(NativeControl, {}),
    bProto = Button.prototype;

bProto.typeName = 'nativeControl.Button';

bProto._createDom = function(initArgs) {
    this._dom = this._input = uki.createElement('input', { className: 'uki-nc-button', type: 'button' });
};




/**
* Native browser select
* uki({ view: 'nativeControl.Select', options: [
*   { text: 'Default', options: [
*       'red',
*       'blue',
*       'green'
*   ]},
*   { text: 'User', options: [
*       { text: 'favorite', value: 1234522 },
*       { text: 'less favorite', value: 1264522 }
*   ]},
*   { text: 'Custom', value: '' }
* ]})
*/
var Select = nc.Select = uki.newClass(NativeControl, {}),
    sProto = Select.prototype;

sProto.typeName = 'nativeControl.Select';

sProto._createDom = function(initArgs) {
    this._input = this._dom = uki.createElement('select', { className: 'uki-nc-select uki-nc-select__input' });
};

uki.addProp(sProto, 'options', function(val) {
    this._options = val;
    this._input.innerHTML = '';
    appendOptions(this._input, val);
    return this;
});

function appendOptions (root, options) {
    var node;
    options.forEach(function(option) {
        if (typeof option === 'string' || typeof option === 'number') {
            option = { text: option, value: option };
        }
        if (option.options) {
            node = uki.createElement('optgroup', {
                label: option.html ? option.html : uki.escapeHTML(option.text)
            });
            appendOptions(node, option.options);
        } else {
            node = uki.createElement('option', {
                html: option.html ? option.html : uki.escapeHTML(option.text),
                value: option.value,
                selected: option.selected
            });
        }
        root.appendChild(node);
    });
}

