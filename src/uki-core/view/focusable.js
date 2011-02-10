importScripts('../view.js');


uki.view.Focusable = (function() {
    this._focusable = true;

    this.focusableDom = function() {
        return this.dom();
    };

    this.focusable = uki.newProp('_focusable', function(state) {
        this.focusableDom().tabIndex = state ? '1' : '-1';
    });

    this._initFocusable = function() {
        this.focusable(this.focusable());
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

    uki.delegateProp(this, 'tabIndex', 'focusableDom');

    return this;
}).call({});
