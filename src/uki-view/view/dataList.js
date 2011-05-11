requireCss('./dataList/dataList.css');

var fun   = require('../../uki-core/function'),
    utils = require('../../uki-core/utils'),
    dom   = require('../../uki-core/dom'),
    view  = require('../../uki-core/view'),
    build = require('../../uki-core/builder').build,

    Metrics    = require('./dataList/metrics').Metrics,
    Selection  = require('./dataList/selection').Selection,
    Pack       = require('./dataList/pack').Pack,
    SelectionController =
        require('./dataList/selectionController').SelectionController,

    Container = require('../../uki-core/view/container').Container,
    Focusable = require('./focusable').Focusable;

var DataList = view.newClass('DataList', Container, Focusable, {

    _setup: function(initArgs) {
        this._metrics = initArgs.metrics || new Metrics();
        this._packView = initArgs.packView || Pack;
        this._selectionController = initArgs.selectionController ||
            new SelectionController();
        this._selection = new Selection();

        this._data = [];
        this._rendered = {};

        Container.prototype._setup.call(this, initArgs);

        this._selection.on('update',
            fun.bind(this._updateSelection, this));
        this._metrics.on('change.totalHeight',
            fun.bind(this._updateHeight, this));
    },

    selection: function() {
        return this._selection;
    },

    metrics: function() {
        return this._metrics;
    },

    selectionController: function() {
        return this._selectionController;
    },

    _createDom: function(initArgs) {
        this._dom = dom.createElement('div', {
            className: 'uki-dataList uki-dataList_blured' });
        this.tabIndex(1);
        this.metrics().initWithView(this);
        this.selectionController().initWithView(this);
        this.textSelectable(false);
    },

    layout: function() {
        if (this._layoutBefore) {
            this._wrappedUpdate();
        } else {
            this._initLayout();
        }
        return this;
    },

    _initLayout: function() {
        if (this.data().length) {
            this.metrics().update();
            this.scrollableParent(this.scrollableParent() || this.parent());
            this._update();
            this._layoutBefore = true;
        }
    },

    _reset: function() {
        this.childViews([]);
        this.selectedIndexes([]);
        this._layoutBefore = false;
        this.scrollableParent(null);
        fun.deferOnce(fun.bindOnce(this.layoutIfVisible, this));
    },

    /**
    * Data to render. Data should provide one of the following simple API's:
    * 1. Sync: #slice(from, to) and #length. Any native JS array can do this.
    * 2. Async: #loadRange(from, to, callback), and length.
    *    Please note that syncronous data fetching like selectedRow will use
    *    #slice(from, to) anyway. So it might be worth to provide #slice to.
    *
    * Data may also provide #sampleRow property. It will be used to calculate
    * row hight if rowHeight is not provided.
    * If there's no sampleRow slice(0, 1)[0] will be used.
    */
    data: fun.newProp('data', function(data) {
        this._data = data;
        this._reset();
    }),


    /**
    * Scroll the parent so row at position gets into view
    */
    scrollToIndex: function(index) {
        var range = this._visibleRange(),
            dm    = this.metrics().rowDimensions(index),
            maxY  = dm.top + dm.height,
            minY  = dm.top;

        if (maxY >= range.to) {
            this.scrollableParent().scroll(0, maxY - range.to +
                // hackish overflow to compensate for bottom scroll bar
                (index === this.data().length - 1 ? 100 : 0)
            );
        } else if (minY < range.from) {
            this.scrollableParent().scroll(0, minY - range.from);
        }
        this._wrappedUpdate();
        return this;
    },

    template: fun.newProp('template'),
    _template: requireText('dataList/pack.html'),

    formatter: fun.newProp('formatter'),
    _formatter: dom.escapeHTML,

    key: fun.newProp('key'),
    _key: null,


    // Rendering strategy
    //
    //      ___/__\___
    //      \        /
    //       \      /              ______
    //      <|------|>            (      )
    //       |      |              \    /
    //       |      |             <<    >>
    //       |      |               |  |
    //      _|______|_              |  |
    //     /__________\           _/    \_
    //   _/____________\_        /________\
    //  /________________\      /__________\
    //  \________________/      \__________/
    //
    /**
     * Do not redraw more often then in value ms
     */
    throttle: fun.newProp('throttle', function(v) {
        this._throttle = v;
        wrapVisChanged.call(this, v, 'throttle');
    }),
    _throttle: 0,

    /**
     * Do redraw only after value ms after last scroll/update
     */
    debounce: fun.newProp('debounce', function(v) {
        this._debounce = v;
        wrapVisChanged.call(this, v, 'debounce');
    }),
    _debounce: 0,

    /**
     * When rendering DataList determines visible range. To reduce blinking
     * data list will try to prerender more rows than visible at the moment.
     *
     * Prerender specifies how far should the visible range be extended.
     * 1 means that rendering range is extended before and after visible range
     * for the whole visible height. Equaling to 3 vis heights to render.
     */
    prerender: fun.newProp('prerender'),
    _prerender: 1,

    deduceRowHeight: function() {
        var data = this.data(),
            sample = utils.prop(data, 'sampleRow') ||
                (data.slice && data.slice(0, 1)[0]) || '',
            pack = this._createPack();

        this.appendChild(pack);
        pack.render([sample], [], 0);
        var rowHeight = pack.dom().offsetHeight;
        this.removeChild(pack);
        return rowHeight;
    },

    redrawRow: function(index) {
        var pack = this._packFor(index);
        if (pack) {
            pack.updateRow(
                index - pack.from,
                this.data().slice(index, 1),
                index);
            pack.setSelected(index - pack.from, this.isSelected(index));
        }
    },

    _updateHeight: function() {
        this.dom().style.height = this.metrics().totalHeight() + 'px';
    },

    _scroll: function() {
        this._wrappedUpdate();
    },

    scrollableParent: fun.newProp('scrollableParent', function(v) {
        if (this._scrollableParent) {
            this._scrollableParent.removeListener(
                'scroll', fun.bindOnce(this._scroll, this));
        }
        this._scrollableParent = v;
        if (this._scrollableParent) {
            this._scrollableParent.on(
                'scroll', fun.bindOnce(this._scroll, this));
        }
    }),

    _visibleRange: function() {
        if (!this.scrollableParent()) {
            return null;
        }

        var rect = this.clientRect(true),
            parentRect = this.scrollableParent().clientRect(true),
            topOffset = rect.top - parentRect.top,
            height = parentRect.height - Math.max(0, topOffset),
            top = -Math.min(0, topOffset);

        return { from: top, to: top + height };
    },

    _renderingRange: function() {
        var range = this._visibleRange();
        if (!range) { return null; };
        var h = (range.to - range.from) * this.prerender();

        range.from = Math.max(0, range.from - h);
        range.to = Math.min(this.metrics().totalHeight(), range.to + h);
        return range;
    },

    /**
     * Called when visible range or data changes. Renders data in packs.
     * A pack is:
     *   { from: 100, to: 200, fromPX: 1000, toPX: 2100, dom: [Element] }
     * Creates new packs for not yet rendered ranges and removes obsolete
     * packs.
     */
    _update: function() {
        var range = this._renderingRange();
        if (!range) { return; }

        var packs = this.childViews(),
            fromPX = packs[0] && packs[0].fromPX,
            toPX = packs[0] && packs[packs.length - 1].toPX,
            i, h = range.to - range.from;

        if (packs.length && fromPX <= range.from && toPX >= range.to) {
            // do nothing, everything is rendered as it should
            return;
        } else if (packs.length && fromPX <= range.from) {
            i = 0;
            while (packs[i] && packs[i].toPX < range.from) {
                this.removeChild(packs[i++]);
            }
            packs = packs.slice(i);
            range.from = packs.length ?
                packs[packs.length - 1].toPX : range.from;
            range.to = Math.min(range.from + h, this.metrics().totalHeight());
        } else if (packs.length && toPX >= range.to) {
            i = packs.length - 1;
            while (packs[i] && packs[i].fromPX > range.to) {
                this.removeChild(packs[i--]);
            }
            packs = packs.slice(0, i + 1);
            range.to = packs.length ? packs[0].fromPX : range.to;
            range.from = Math.max(range.to - h, 0);
        } else {
            i = 0;
            while (packs[i]) {
                this.removeChild(packs[i++]);
            }
            packs = [];
        }

        if (range.to > range.from) {
            var rowsRange = this.metrics().rowsForRange(range),
                pack = this._scheduleRenderPack(rowsRange),
                d = this.metrics().rowDimensions(rowsRange.to - 1);

            pack.fromPX = this.metrics().rowDimensions(rowsRange.from).top;
            pack.toPX = d.top + d.height;
            packs.push(pack);

            this._childViews = packs.sort(function(a, b) {
                return a.from - b.from;
            });
        }
    },

    _scheduleRenderPack: function(range) {
        var pack = this._createPack();
        pack.from = range.from;
        pack.to = range.to;
        this.appendChild(pack);

        function render(rows) {
            if (pack.destructed) { return; }
            this._renderPack(pack, range, rows);
        }

        if (this.data().loadRange) {
            this.data().loadRange(
                range.from, range.to,
                fun.bind(render, this)
            );
        } else {
            render.call(this, this.data().slice(range.from, range.to));
        }
        return pack;
    },

    _createPack: function() {
        var pack = new this._packView();
        return pack
            .template(this.template())
            .formatter(this.formatter())
            .key(this.key());
    },

    _renderPack: function(pack, range, rows) {
        var selectedInPack =
            this.selection().selectedInRange(range.from, range.to);

        pack.render(rows, selectedInPack, range.from);
        pack.dom().style.top =
            this.metrics().rowDimensions(range.from).top + 'px';
        return pack;
    },

    // store original version function so we can instance override
    // _update in throttle and debounce and then revert back
    domForEvent: function(type) {
        return Focusable._domForEvent.call(this, type) ||
            Container.prototype.domForEvent.call(this, type);
    },


    //  Selection
    //  _____________________________________________________
    //  |         |                                         |
    //  |         /                                         |
    //  |         \                                         |
    //  |         |                                         |
    //  |        (*)                                        |
    //  |      ((   ))                                      |
    //  |                                                   |
    //  |           @.@         @.@     @.@                 |
    //  |          (---)       (---)   (---)                |
    //  |_________(>---<)_____(>---<)_(>---<)_______________|
    //  |___________________________________________________|
    //  |      A                                            |
    //  |   << @ >>                                         |
    //  |      V                                            |
    //  |                                                   |
    isSelected: fun.newDelegateCall('_selection', 'isSelected'),

    selectedIndexes: fun.newDelegateProp('_selection', 'indexes'),

    selectedIndex: fun.newDelegateProp('_selection', 'index'),

    /**
    * Index of the row the user either clicked or used keyborad to focus on
    */
    lastClickIndex: fun.newProp('lastClickIndex'),

    multiselect: fun.newProp('multiselect'),

    /**
    * Actual row selected.
    *
    * Warning! This method will use #slice even for async data
    */
    selectedRow: function() {
        var index = this.selection().index();
        return index > -1 && this._data.slice(index, index+1)[0];
    },

    /**
    * Array of the the rows selected
    *
    * Warning! This method will use #slice even for async data
    */
    selectedRows: function() {
        var result = [],
            indexes = this.selection().indexes();

        for (var i=0, l = indexes.length; i < l; i++) {
            var item = this._data.slice(indexes[i], indexes[i]+1)[0];
            if (item) result.push(item);
        };
        return result;
    },

    _updateSelection: function(e) {
        var packs = this.childViews(),
            from = packs[0] ? packs[0].from : -1,
            to = packs.length ? packs[packs.length - 1].to :
                this.data().length,
            state = e.action == 'add';

        from = Math.max(from, e.from);
        to = Math.min(to, e.to);

        for (var i = to; i >= from; i--) {
            this._setSelected(i, state);
        }
    },

    _setSelected: function(index, state) {
        var pack = this._packFor(index);
        if (pack) {
            pack.setSelected(index - pack.from, state);
        }
    },

    _packFor: function(index) {
        var packs = this.childViews(),
            pack, i, l;

        for (i = 0, l = packs.length; i < l; i++) {
            pack = packs[i];
            if (pack.from <= index && pack.to > index) {
                return pack;
            }
        }
        return null;
    },

    editSelection: function(e) {
    },

    triggerSelection: function() {
        this.trigger({ type: 'selection', target: this });
        return this;
    }

});

var proto = DataList.prototype;
proto._wrappedUpdate = proto._update;

function wrapVisChanged(v, method) {
    if (v > 0) {
        this._wrappedUpdate = fun[method](this._update, v);
    } else {
        this._wrappedUpdate = this._update;
    }
}

require('../../uki-core/collection').Collection
.addProps([
    'data', 'throttle', 'debounce', 'template', 'formatter', 'key',
    'selection', 'selectedRows', 'selectedRow',
    'selectedIndexes', 'selectedIndex', 'lastClickIndex', 'multiselect'
])
.addMethods([
    'scrollToIndex', 'triggerSelection', 'redrawRow'
]);

exports.DataList = DataList;
