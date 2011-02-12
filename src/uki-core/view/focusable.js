var dom = require('../dom'),
    fun = require('../function');

var Focusable = {};

Focusable._focusable = true;

Focusable.focusableDom = function() {
    return this.dom();
};

Focusable.tabIndex = function(value) {
    if (value === undefined) return this.focusableDom().tabIndex;
    this.focusableDom().tabIndex = value;
    if (value && !this._focusableInited) this._initFocusable();
    return this;
};

Focusable._initFocusable = function() {
    this._focusableInited = true;
    dom.addListener(this.focusableDom(), 'focus', fun.bindOnce(this._focus, this));
    dom.addListener(this.focusableDom(), 'blur', fun.bindOnce(this._blur, this));
};

Focusable._destruct = function() {
    dom.removeListener(this.focusableDom(), 'focus', fun.bindOnce(this._focus, this));
    dom.removeListener(this.focusableDom(), 'blur', fun.bindOnce(this._blur, this));
};

Focusable._focus = function() {
    if (this.focusedClass()) this.addClass(this.focusedClass());
};

Focusable._blur = function() {
    if (this.focusedClass()) this.removeClass(this.focusedClass());
};

Focusable.focus = function() {
    this.focusableDom().focus();
    return this;
};

Focusable.blur = function() {
    this.focusableDom().blur();
    return this;
};

Focusable.hasFocus = function() {
    return this.focusableDom() == uki.doc.activeElement;
};

Focusable.focusedClass = fun.newProp('_focusedClass');


exports.Focusable = Focusable;
