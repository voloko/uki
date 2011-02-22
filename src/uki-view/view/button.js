var uki = require('uki-core'),
    Base = uki.view.Base,
    Focusable = uki.view.Focusable;

var Button = uki.newClass(Base, Focusable, {}),
    proto = Button.prototype;

requireCss('./button/button.css');

proto.typeName = 'Button';

proto.confirm = uki.view.newToggleClassProp('uki-button_confirm');

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

uki.addProp(proto, 'iconSrc', function(src) {
    uki.removeElement(this._iconDom);
    this._iconSrc = src;
    if (src) {
        this._iconDom = uki.createElement('img', { className: 'uki-button__icon', src: src });
        this.dom().insertBefore(this._iconDom, this._text);
    }
    updateImageOnly.call(this);
});

proto._createDom = function() {
    this._text = uki.createElement('span', { className: 'uki-button__text' });
    this._dom = uki.createElement('button', { className: 'uki-button', tabIndex: -1 }, [this._text]);
};

proto.destruct = function() {
    Focusable.destruct.call(this);
    Base.destruct.call(this);
};

// proto._focusedClass = 'uki-button_focused';

uki.view.Button = exports.Button = Button;