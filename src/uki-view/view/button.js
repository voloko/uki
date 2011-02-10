importScripts('../view.js');

uki.view.declare('uki.view.Button', uki.view.Base, uki.view.Focusable, function(STATIC, Base, Focusable) {

    uki.Stylesheet.add(includeText('button/button.css'));
    
    this.label = function(v) {
        if (v === undefined) return this._input.value;
        this._input.value = v;
        this.toggleClass('uki-button_image-only', !v);
        return this;
    };

    this.text = this.label;
    
    this.disabled = function(state) {
        if (state === undefined) return this._input.disabled;
        this._input.disabled = state;
        this.toggleClass('uki-button_disabled', state);
        return this;
    };

    this.iconSrc = uki.newProp('_icon', function(src) {
        uki.removeElement(this._iconDom);
        this._iconSrc = src;
        if (src) {
            this._iconDom = uki.createElement('img', { className: 'uki-button__icon', src: src });
            this._dom().insertBefore(this._iconDom, this._input);
        }
    });

    this._createDom = function() {
        this._input = uki.createElement('input', { type: 'button', className: 'uki-button__input', tabIndex: -1 });
        this._dom = uki.createElement('label', { className: 'uki-button' }, [this._input]);
    };
    
    this.focusableDom = this.domForEvent = function(type) {
        return this._input;
    };
    
    this.destruct = function() {
        Focusable.destruct.call(this);
        Base.destruct.call(this);
    };
    
    this._focusedClass = 'uki-button_focused';
    
    this._initFocusable = function() {
        uki.dom.addListener(this._dom, 'mousedown', uki.bind(function(e) {
            if (this.tabIndex()) uki.defer(uki.bind(this.focus, this));
        }, this));
        Focusable._initFocusable.call(this);
    };

});
