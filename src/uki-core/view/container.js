importScripts('base.js');

/**
 * @class
 * @augments uki.view.Base
 * @name uki.view.Container
 */
uki.view.declare('uki.view.Container', uki.view.Base, function(STATIC, Base) {
    /**#@+ @memberOf uki.view.Container# */

    /** @private */
    this._setup = function(initArgs) {
        Base._setup.call(this, initArgs);
        this._childViews = [];
    };

    this.destruct = function() {
        this.clear(true);
        Base.destruct.call(this);
    };

    this.resized = function() {
        this._resizeSelf();
        this._resizeChildViews();
    };

    this._resizeSelf = uki.FS;

    this._resizeChildViews = function() {
        this.childViews().forEach(function(view) {
            // do not resize invisible views, save time
            view.visible() && view.resized();
        });
    };

    this.clear = function(destruct) {
        this._childViews.forEach(function(child) {
            this.removeChild(child);
            if (destruct!==false) child.destruct();
        }, this);
    };

    /**
     * Sets or retrieves view child view.
     * @param anything uki.build can parse
     *
     * Note: if setting on view with child views, all child view will be removed
     */
    this.childViews = function(val, destruct/*=true*/) {
        if (val === undefined) return this._childViews;
        this.clear(destruct);
        uki.build(val).forEach(function(child) {
            this.appendChild(child);
        }, this);
        return this;
    };

    this.firstChild = function() {
        return this.childViews()[0];
    };

    this.lastChild = function() {
        return this.childViews()[this.childViews().length - 1];
    };

    /**
     * Remove particular child
     */
    this.removeChild = function(child) {
        child.parent(null);

        var index = child._viewIndex,
            i, l;
        for (i=index+1, l = this._childViews.length; i < l; i++) {
            this._childViews[i]._viewIndex--;
        };
        this._childViews = this._childViews.filter(function(elem) { return elem != child; });
        this._removeChildFromDom(child);
        this._childrenChanged();
        return this;
    };

    this._removeChildFromDom = function(child) {
        uki.removeElement(child.dom());
    };

    /**
     * Adds a child.
     */
    this.appendChild = function(child) {
        child._viewIndex = this._childViews.length;
        this._childViews.push(child);
        child.parent(this);
        this._appendChildToDom(child);
        this._childrenChanged();
        return this;
    };

    this._appendChildToDom = function(child) {
        this.dom().appendChild(child.dom());
    };

    /**
     * Insert child before target beforeChild
     * @param {uki.view.Base} child Child to insert
     * @param {uki.view.Base} beforeChild Existent child before which we should insert
     */
    this.insertBefore = function(child, beforeChild) {
        var i, l;
        child._viewIndex = beforeChild._viewIndex;
        for (i=beforeChild._viewIndex, l = this._childViews.length; i < l; i++) {
            this._childViews[i]._viewIndex++;
        };
        this._childViews.splice(beforeChild._viewIndex-1, 0, child);
        child.parent(this);
        this._insertBeforeInDom(child, beforeChild);
        this._childrenChanged();
        return this;
    };

    this._insertBeforeInDom = function(child, beforeChild) {
        this.dom().insertBefore(child.dom(), beforeChild.dom());
    };

    this._childrenChanged = function() {
        // nice hook
    };

    /**
     * Should return a dom node for a child.
     * Child should append itself to this dom node
     */
    this.domForChild = function(child) {
        return this.dom();
    };
   /**#@-*/
});
