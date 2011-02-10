importScripts('../view.js');
importScripts('../utils.js');
importScripts('../builder.js');
importScripts('observable.js');

uki.view.declare('uki.view.Base', uki.view.Observable, uki.view.Styleable, function(STATIC, Observable, Styleable) {

    this.init = function(initArgs) {
      initArgs = initArgs || {};
      this._setup(initArgs);
      this._createDom(initArgs);
      this.dom()[expando] = this.dom()[expando] || uki.guid++;
      uki.view.register(this);
    };

    this.destruct = function() {
        uki.unregisterId(this);
        uki.view.unregister(this);
        Observable.destruct.call(this);
        this.destructed = true;
    };

    this._setup = uki.FS;

    /**#@+ @memberOf uki.view.Base# */

    this._createDom = function(initArgs) {
        this._dom = uki.createElement(initArgs.tagName || 'div');
    };

    /**
     * Called when view was resized
     */
    this.resized = uki.FS;

    /**
     * Get views container dom node.
     * @returns {Element} dom
     */
    this.dom = function() {
        return this._dom;
    };


    uki.delegateProp(this, 'html', '_dom', 'innerHTML');

    this.text = function(v) {
        return this.html( v && uki.escapeHTML(v) );
    };

    /* ------------------------------- Common settings --------------------------------*/
    /**
     * Used for fast (on hash lookup) view searches: uki('#view_id');
     *
     * @param {string=} id New id value
     * @returns {string|uki.view.Base} current id or self
     */
    this.id = function(id) {
        if (id === undefined) return this._dom.id;
        if (this._dom.id) uki.unregisterId(this);
        this._dom.id = id;
        uki.registerId(this);
        return this;
    };

    /**
     * Accessor for dom().className
     * @param {string=} className
     *
     * @returns {string|uki.view.Base} className or self
    */
    uki.delegateProp(this, 'className', 'dom');

    this.addClass = function(className) {
        uki.addClass(this.dom(), className);
        return this;
    };

    this.hasClass = function(className) {
        return uki.hasClass(this.dom(), className);
    };

    this.removeClass = function(className) {
        uki.removeClass(this.dom(), className);
        return this;
    };

    this.toggleClass = function(className, condition) {
        uki.toggleClass(this.dom(), className, condition);
        return this;
    };

    /**
     * Shortcut to set absolute positioning props
     * @param {string|object} p Position string in the form of
     *                          'l:10px t:10px r:30% h:200px'
     */
    this.pos = function(pos) {
        if (pos === undefined) return this._styleToPos(this.dom().style);
        pos = this._expandPos(pos);
        this._applyPosToStyle(pos, this.dom().style);
        return this;
    };

    var rules = [
            'top', 'right', 'left', 'bottom', 'width', 'height',
            'marginLeft', 'marginTop', 'marginBottom', 'marginRight'
        ],
        ruleMap = {
            t: 'top', r: 'right',
            l: 'left', b: 'bottom',
            w: 'width', h: 'height',
            ml: 'marginLeft', mr: 'marginRight',
            mt: 'marginTop', mb: 'marginBottom'
        };

    this._styleToPos = function(style) {
        var res = {};
        rules.forEach(function(rule) {
            if (style[rule]) res[rule] = style[rule];
        });
        return res;
    };

    this._expandPos = function(pos) {
        if (typeof pos === 'string') {
            var p = pos;
            pos = {};
            p.split(/\s+/).forEach(function(rule) {
                var parts = rule.split(':');
                pos[parts[0]] = parts[1];
            });
        }
        uki.forEach(ruleMap, function(longRule, shortRule) {
            if (pos[shortRule]) pos[longRule] = pos[shortRule];
        });
        return pos;
    };

    this._applyPosToStyle = function(pos, style) {
        style.position = 'absolute';
        rules.forEach(function(rule) {
            style[rule] = pos[rule] || '';
        });
    };

    /**
     * Accessor for view visibility.
     *
     * @param {boolean=} state
     * @returns {boolean|uki.view.Base} current visibility state of self
     */
    this.visible = function(state) {
        if (state === undefined) return this._dom.style.display != 'none';

        var origState = this.visible();
        this._dom.style.display = state ? '' : 'none';

        // if we change from invis to vis, and we have dom, and we're attached
        // redraw
        if (state && !origState && this.dom() && this.dom().offsetWidth) this.resized();
        return this;
    };

    /* ----------------------------- Container api ------------------------------*/

    /**
     * Accessor attribute for parent view. When parent is set view appends its #dom
     * to parents #dom
     *
     * @param {?uki.view.Base=} parent
     * @returns {uki.view.Base} parent or self
     */
    this.parent = function(parent) {
        if (parent === undefined) return this._parent;

        this._parent = parent;
        return this;
    };

    /**
     * Accessor for childViews. @see uki.view.Container for implementation
     * @returns {Array.<uki.view.Base>}
     */
    this.childViews = function() {
        return [];
    };

    /**
     * Reader for previous view
     * @returns {uki.view.Base}
     */
    this.prevView = function() {
        if (!this.parent()) return null;
        return this.parent().childViews()[this._viewIndex - 1] || null;
    };

    /**
     * Reader for next view
     * @returns {uki.view.Base}
     */
    this.nextView = function() {
        if (!this.parent()) return null;
        return this.parent().childViews()[this._viewIndex + 1] || null;
    };

    uki.delegateProp(this, ['scrollTop', 'scrollLeft', 'title', 'alt'], 'dom');

    this.scroll = function(dx, dy) {
        if (dx) this.scrollLeft(this.scrollLeft() + dx);
        if (dy) this.scrollTop(this.scrollTop() + dy);
    };

    /* ----------------------------- Layout ------------------------------*/

    /**
     */
    this.clientRect = function(ignoreScroll) {
      return uki.dom.clientRect(this.dom(), ignoreScroll);
    };
});
