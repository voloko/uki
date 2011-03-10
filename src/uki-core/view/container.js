var view  = require('../view'),
    utils = require('../utils'),
    fun   = require('../function'),
    dom   = require('../dom'),
    Base  = require('./base').Base;

/**
 * @class
 * @augments Base
 * @name Container
 */
var Container = view.newClass('Container', Base, {

    _setup: function(initArgs) {
        Base.prototype._setup.call(this, initArgs);
        this._childViews = [];
    },

    destruct: function() {
        this.clear(true);
        Base.prototype.destruct.call(this);
    },

    resized: function() {
        this._resizeSelf();
        this._resizeChildViews();
        return this;
    },

    _resizeSelf: fun.FS,

    _resizeChildViews: function() {
        utils.forEach(this.childViews(), function(view) {
            // do not resize invisible views, save time
            view.visible() && view.resized();
        });
    },

    clear: function(destruct) {
        utils.forEach(this.childViews(), function(child) {
            this.removeChild(child);
            if (destruct !== false) child.destruct();
        }, this);
    },

    /**
     * Sets or retrieves view child view.
     * @param anything build can parse
     *
     * Note: if setting on view with child views, all child view will be removed
     */
    childViews: function(val, destruct/*=true*/) {
        if (val === undefined) return this._childViews;
        this.clear(destruct);
        require('../builder').build(val).forEach(function(child) {
            this.appendChild(child);
        }, this);
        return this;
    },

    firstChild: function() {
        return this.childViews()[0];
    },

    lastChild: function() {
        return this.childViews()[this.childViews().length - 1];
    },

    /**
     * Remove particular child
     */
    removeChild: function(child) {
        child.parent(null);

        var index = child._viewIndex,
            i, l;
        for (i = index+1, l = this._childViews.length; i < l; i++) {
            this._childViews[i]._viewIndex--;
        };
        this._childViews = utils.without(this._childViews, child);
        this._removeChildFromDom(child);
        this._childrenChanged();
        return this;
    },

    _removeChildFromDom: function(child) {
        dom.removeElement(child.dom());
    },

    /**
     * Adds a child.
     */
    appendChild: function(child) {
        child._viewIndex = this._childViews.length;
        this._childViews.push(child);
        child.parent(this);
        this._appendChildToDom(child);
        this._childrenChanged();
        return this;
    },

    _appendChildToDom: function(child) {
        this.dom().appendChild(child.dom());
    },

    /**
     * Insert child before target beforeChild
     * @param {Base} child Child to insert
     * @param {Base} beforeChild Existent child before which we should insert
     */
    insertBefore: function(child, beforeChild) {
        var i, l;
        child._viewIndex = beforeChild._viewIndex;
        for (i = beforeChild._viewIndex, l = this._childViews.length; i < l; i++) {
            this._childViews[i]._viewIndex++;
        };
        this._childViews.splice(beforeChild._viewIndex-1, 0, child);
        child.parent(this);
        this._insertBeforeInDom(child, beforeChild);
        this._childrenChanged();
        return this;
    },

    _insertBeforeInDom: function(child, beforeChild) {
        this.dom().insertBefore(child.dom(), beforeChild.dom());
    },

    _childrenChanged: function() {
        // nice hook
    },

    /**
     * Should return a dom node for a child.
     * Child should append itself to this dom node
     */
    domForChild: function(child) {
        return this.dom();
    }
});


exports.Container = Container;
