var uki = require('uki-core'),
    Base = uki.view.Base,
    Focusable = uki.view.Focusable;

var Button = uki.newClass(Base, Focusable, {});
var proto = Button.prototype;

uki.Stylesheet.add(requireText('./button/button.css'));

proto.typeName = 'Button';

proto.label = function(v) {
    if (v === undefined) return this._input.value;
    this._input.value = v;
    this.toggleClass('uki-button_image-only', !v);
    return this;
};

proto.text = proto.label;

proto.disabled = function(state) {
    if (state === undefined) return this._input.disabled;
    this._input.disabled = state;
    this.toggleClass('uki-button_disabled', state);
    return this;
};

proto.iconSrc = uki.newProp('_icon', function(src) {
    uki.removeElement(this._iconDom);
    this._iconSrc = src;
    if (src) {
        this._iconDom = uki.createElement('img', { className: 'uki-button__icon', src: src });
        this._dom().insertBefore(this._iconDom, this._input);
    }
});

proto._createDom = function() {
    this._input = uki.createElement('input', { type: 'button', className: 'uki-button__input', tabIndex: -1 });
    this._dom = uki.createElement('label', { className: 'uki-button' }, [this._input]);
};

proto.focusableDom = proto.domForEvent = function(type) {
    return this._input;
};

proto.destruct = function() {
    Focusable.destruct.call(this);
    Base.destruct.call(this);
};

proto._focusedClass = 'uki-button_focused';

exports.Button = Button;