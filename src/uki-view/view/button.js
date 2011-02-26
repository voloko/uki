var fun  = require('uki-core/function'),
    view = require('uki-core/view'),
    dom  = require('uki-core/dom'),
    Base = require('uki-core/view/base').Base,
    Focusable = require('./focusable').Focusable;

var Button = fun.newClass(Base, Focusable, {}),
    proto = Button.prototype;

requireCss('./button/button.css');

proto.typeName = 'Button';

proto.confirm = view.newToggleClassProp('uki-button_confirm');

function updateImageOnly () {
    this.toggleClass('uki-button_image-only', !!(this.iconSrc() && !this.html()));
}

proto.html = proto.label = function(value) {
    if (value === undefined) return this._text.innerHTML;
    this._text.innerHTML = value;
    updateImageOnly.call(this);
    return this;
};

proto.disabled = function(state) {
    if (state === undefined) return this._dom.disabled;
    this._dom.disabled = state ? 'disabled' : '';
    this.toggleClass('uki-button_disabled', state);
    return this;
};

fun.addProp(proto, 'iconSrc', function(src) {
    dom.removeElement(this._iconDom);
    this._iconSrc = src;
    if (src) {
        this._iconDom = dom.createElement('img', { className: 'uki-button__icon', src: src });
        this.dom().insertBefore(this._iconDom, this._text);
    }
    updateImageOnly.call(this);
});

proto._createDom = function() {
    this._text = dom.createElement('span', { className: 'uki-button__text' });
    this._dom = dom.createElement('button', { className: 'uki-button', tabIndex: -1 }, [this._text]);
};

proto.destruct = function() {
    Focusable.destruct.call(this);
    Base.destruct.call(this);
};

exports.Button = Button;
