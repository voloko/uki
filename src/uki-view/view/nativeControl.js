requireCss('./nativeControl/nativeControl.css');

var fun   = require('uki-core/function'),
    view  = require('uki-core/view'),
    utils = require('uki-core/utils'),
    dom   = require('uki-core/dom'),
    env   = require('uki-core/env'),
    evt   = require('uki-core/event'),

    Focusable = require('uki-core/view/focusable').Focusable,
    Base      = require('uki-core/view/base').Base;


var ieResize = env.ua.match(/MSIE 6|7/);

/**
* Base class for native control wrappers.
* Map common dom attributes and add binding
*/
var NativeControl = view.newClass('NativeControl', Base, Focusable, {

    domForEvent: function(type) {
        return this._input;
    },

    focusableDom: function() {
        return this._input;
    },

    domForEvent: function(type) {
        return Focusable._domForEvent.call(this, type) ||
            Base.prototype.domForEvent.call(this, type);
    }
});
fun.delegateProp(NativeControl.prototype,
    ['name', 'checked', 'disabled', 'value', 'type'], '_input');



/**
* Radio button with a label
* build({ view: 'nativeControl.Radio', name: 'color', value: 'red', text: 'Red' })
*/
var Radio = view.newClass('nativeControl.Radio', NativeControl, {

    _createDom: function(initArgs) {
        this._input = dom.createElement('input',
            { className: 'uki-nc-radio__input', type: 'radio' });
        this._label = dom.createElement('span',
            { className: 'uki-nc-radio__label' });
        this._dom = dom.createElement(initArgs.tagName || 'label',
            { className: 'uki-nc-radio' }, [this._input, this._label]);
    },

    _bindingOptions: { viewEvent: 'click', viewProp: 'checked', commitChangesViewEvent: 'click' }
});
fun.delegateProp(Radio.prototype, 'html', '_label', 'innerHTML');


/**
* Checkbox with a label
* build({ view: 'nativeControl.Checkbox', name: 'color', value: 'red', text: 'Red' })
*/
var Checkbox = view.newClass('nativeControl.Checkbox', NativeControl, {

    _createDom: function(initArgs) {
        this._input = dom.createElement('input',
            { className: 'uki-nc-checkbox__input', type: 'checkbox' });
        this._label = dom.createElement('span',
            { className: 'uki-nc-checkbox__label' });
        this._dom = dom.createElement(initArgs.tagName || 'label',
            { className: 'uki-nc-checkbox' }, [this._input, this._label]);
    },

    _bindingOptions: Radio.prototype._bindingOptions
});
fun.delegateProp(Checkbox.prototype, 'html', '_label', 'innerHTML');


/**
* Text input
* build({ view: 'nativeControl.Text', value: 'John Smith', placeholder: 'Name?' })
*/
var Text = view.newClass('nativeControl.Text', NativeControl, {

    _createDom: function(initArgs) {
        this._input = dom.createElement('input',
            { className: 'uki-nc-text__input', type: 'text' });
        this._dom = dom.createElement(initArgs.tagName || 'span',
            { className: 'uki-nc-text' });
        this.dom().appendChild(this._input);
    },

    placeholder: fun.newProp('placeholder', function(v) {
        this._placeholder = v;
        if (this._input.placeholder !== undefined) {
            this._input.placeholder = v;
        } else {
            this._initPlaceholder();
            this._placeholderDom.innerHTML = dom.escapeHTML(v);
        }
    }),

    resized: function() {
        NativeControl.prototype.resized.call(this);
        this._updatePlaceholderHeight();
        // manual resize box-sizing: border-box for ie 6,7
        if (ieResize) {
            this._input.style.width = this.dom().offsetWidth - 6;
        }
    },

    _initPlaceholder: function() {
        if (this._initedPlaceholder) return;

        this._initedPlaceholder = true;
        this.addClass('uki-nc-text_with-placeholder');
        this._placeholderDom = dom.createElement('span',
            { className: 'uki-nc-text__placholder' });
        this.dom().insertBefore(this._placeholderDom, this.dom().firstChild);
        evt.on(this._placeholderDom, 'click', fun.bindOnce(function() {
            this.focus();
        }, this));
        this.on('focus blur change keyup', this._updatePlaceholderVis);
        if (this._input.offsetHeight) {
            this._updatePlaceholderHeight();
        }
    },

    _updatePlaceholderVis: function() {
        this._placeholderDom.style.display =  this.hasFocus() || this.value() ? 'none' : '';
    },

    _updatePlaceholderHeight: function() {
        if (!this._placeholderDom) return;
        var targetStyle = this._placeholderDom.style,
            sourceStyle = dom.computedStyle(this._input);

        utils.forEach(['font', 'fontFamily', 'fontSize', 'paddingLeft', 'paddingTop', 'padding'], function(name) {
            if (sourceStyle[name] !== undefined) {
                targetStyle[name] = sourceStyle[name];
            }
        });
        targetStyle.lineHeight = this._input.offsetHeight + (parseInt(sourceStyle.marginTop, 10) || 0)*2 + 'px';
        targetStyle.marginLeft = (parseInt(sourceStyle.marginLeft, 10) || 0) + (parseInt(sourceStyle.borderLeftWidth, 10) || 0) + 'px';
        textProto._updatePlaceholderHeight = fun.FS;
    }
});


/**
* Native browser button
* build({ view: 'nativeControl.Button', value: 'Work!'})
*/
var Button = view.newClass('nativeControl.Button', NativeControl, {

    _createDom: function(initArgs) {
        this._dom = this._input = dom.createElement('input',
            { className: 'uki-nc-button', type: 'button' });
    }
});


/**
* Native browser select
* build({ view: 'nativeControl.Select', options: [
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
var Select = view.newClass('nativeControl.Select', NativeControl, {

    _createDom: function(initArgs) {
        this._input = this._dom = dom.createElement('select',
            { className: 'uki-nc-select uki-nc-select__input' });
    },

    options: fun.newProp('options', function(val) {
        this._options = val;
        this._input.innerHTML = '';
        appendOptions(this._input, val);
        return this;
    })
});

function appendOptions (root, options) {
    var node;
    utils.forEach(options, function(option) {
        if (typeof option === 'string' || typeof option === 'number') {
            option = { text: option, value: option };
        }
        if (option.options) {
            node = dom.createElement('optgroup', {
                label: option.html ? option.html : dom.escapeHTML(option.text)
            });
            appendOptions(node, option.options);
        } else {
            node = dom.createElement('option', {
                html: option.html ? option.html : dom.escapeHTML(option.text),
                value: option.value,
                selected: option.selected
            });
        }
        root.appendChild(node);
    });
}


exports.nativeControl = {
    NativeControl: NativeControl,
    Radio:         Radio,
    Checkbox:      Checkbox,
    Text:          Text,
    Button:        Button,
    Select:        Select
};
