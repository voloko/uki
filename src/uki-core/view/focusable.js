importScripts('../view.js');


uki.view.Focusable = (function() {
    this._focusable = true;

    this.focusableDom = function() {
        return this.dom();
    };
    
    this.tabIndex = function(value) {
        if (value === undefined) return this.focusableDom().tabIndex;
        this.focusableDom().tabIndex = value;
        if (value && !this._focusableInited) this._initFocusable();
        return this;
    };
    
    this._initFocusable = function() {
        this._focusableInited = true;
        uki.dom.addListener(this.focusableDom(), 'focus', uki.bindOnce(this._focus, this));
        uki.dom.addListener(this.focusableDom(), 'blur', uki.bindOnce(this._blur, this));
    };
    
    this._destruct = function() {
        uki.dom.removeListener(this.focusableDom(), 'focus', uki.bindOnce(this._focus, this));
        uki.dom.removeListener(this.focusableDom(), 'blur', uki.bindOnce(this._blur, this));
    };
    
    this._focus = function() {
        if (this.focusedClass()) this.addClass(this.focusedClass());
    };
    
    this._blur = function() {
        if (this.focusedClass()) this.removeClass(this.focusedClass());
    };

    this.focus = function() {
        this.focusableDom().focus();
        return this;
    };

    this.blur = function() {
        this.focusableDom().blur();
        return this;
    };

    this.hasFocus = function() {
        return this.focusableDom() == doc.activeElement;
    };
    
    this.focusedClass = uki.newProp('_focusedClass');

    return this;
}).call({});
