requireCss('./dataList/dataList.css');

var env   = require('../../uki-core/env'),
    fun   = require('../../uki-core/function'),
    utils = require('../../uki-core/utils'),
    dom   = require('../../uki-core/dom'),
    evt   = require('../../uki-core/event'),
    view  = require('../../uki-core/view'),
    build = require('../../uki-core/builder').build,

    Metrics = require('./dataList/metrics').Metrics,
    Renderer = require('./dataList/renderer').Renderer,
    Selection = require('./dataList/selection').Selection,

    Mustache   = require('../../uki-core/mustache').Mustache,
    Base       = require('../../uki-core/view/base').Base,
    Focusable  = require('./focusable').Focusable;


var DataList = view.newClass('DataList', Base, Focusable, {

    _setup: function(initArgs) {
        this._metrics = initArgs.metrics || new Metrics();
        this._renderer = initArgs.metrics || new Renderer();
        this._selection = new Selection();

        this._packSize  = initArgs.packSize || this._packSize;
        this._rowTemplate = initArgs.rowTemplate || this._rowTemplate;

        this._metrics.view(this);
        this._data = [];
        this._packs = {};

        Base.prototype._setup.call(this, initArgs);

        this._selection.on('update',
            fun.bind(this._updateSelection, this));
        this._metrics.on('change.totalHeight',
            fun.bind(this._updateHeight, this));
    },

    _createDom: function(initArgs) {
        this._dom = dom.createElement('div', {
            className: 'uki-dataList uki-dataList_blured' });
        this.tabIndex(1);

        this.on({
            'mousedown': this._mousedown,
            'mouseup': this._mouseup,
            'focus': this._focus,
            'blur': this._blur
        });
        // prevent dragging of selection
        this.on('selectstart dragstart', evt.preventDefaultHandler);
        this.on(this.keyPressEvent(), this._keypress);
    },

    layout: function() {
        if (this._layoutBefore) {
            this._update();
        } else {
            this._initLayout();
        }
        return this;
    },

    _initLayout: function() {
        if (this.data().length) {
            this._metrics.update();

            this._scrollableParent().on('scroll',
                fun.bindOnce(this._scroll, this));

            this._originalUpdate();
            this._layoutBefore = true;
        }
    },

    _reset: function() {
        utils.forEach(this._packs, dom.removeElement);
        this._packs = [];
        this.selectedIndexes([]);
        this._layoutBefore = false;
        if (this._scrollableParent()) {
            this._scrollableParent().removeListener(
                'scroll', utils.bindOnce(this._scroll, this));
        }
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
        var pxs  = this._visiblePixels(),
            dm   = this._metrics.rowDimensions(index),
            maxY = dm.top + dm.height,
            minY = dm.top;

        if (maxY >= pxs[1]) {
            this._scrollableParent().scroll(0, maxY - pxs[1] +
                // hackish overflow to compensate for bottom scroll bar
                (index === this.data().length - 1 ? 100 : 0)
            );
        } else if (minY < pxs[0]) {
            this._scrollableParent().scroll(0, minY - pxs[0]);
        }
        this._update();
        return this;
    },

    template: fun.newDelegateProp('_renderer', 'template'),

    formatter: fun.newDelegateProp('_renderer', 'formatter'),

    key: fun.newDelegateProp('_renderer', 'key'),


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
    debounce: fun.newProp(proto, 'debounce', function(v) {
        this._debounce = v;
        wrapVisChanged.call(this, v, 'debounce');
    }),
    _debounce: 0,

    packSize: fun.newProp('packSize'),
    _packSize: 100,

    renderMoreRows: fun.newProp('renderMoreRows'),
    _renderMoreRows: 60,

    deduceRowHeight: function() {
        var data = this.data(),
            sample = utils.prop(data, 'sampleRow') ||
                (data.slice && data.slice(0, 1)[0]) || '',
            pack = this._renderer.renderPack([sample]);

        this.dom().appendChild(pack);
        var rowHeight = pack.offsetHeight;
        this.dom().removeChild(pack);
        return rowHeight;
    },

    _updateHeight: function() {
        this.dom().style.height = this._metrics.totalHeight() + 'px';
    },

    _scroll: function() {
        this._update();
    },

    _scrollableParent: function() {
        return this.parent();
    },

    _visiblePixels: function() {
        if (!this._scrollableParent()) return [0, 0];

        var rect = this.clientRect(true),
            parentRect = this._scrollableParent().clientRect(true),

            topOffset = rect.top - parentRect.top,
            height = parentRect.height - Math.max(0, topOffset),
            top = -Math.min(0, topOffset);

        return [top, top + height];
    },

    _visibleRows: function() {
        var pxs = this._visiblePixels();

        return this._metrics.rowsForRange(pxs[0], pxs[1]);
    },

    _packsToRender: function() {
        var rows = this._visibleRows();
        return [
            Math.max(0, rows[0] - this._renderMoreRows) / this.packSize() << 0,
            Math.min(this.data().length, rows[1] + this._renderMoreRows) /
                    this.packSize() << 0
        ];
    },

    _schedulePackRender: function(packN, revision) {
        var from = packN * this.packSize();

        if (this.data().loadRange) {
            this.data().loadRange(
                from, this.packSize() + from,
                fun.bind(this._updatePack, this, packN, revision)
            );
        } else {
            this._updatePack(packN, revision, this.data()
                .slice(from, from + this.packSize()));
        }
    },

    _removePack: function(packN) {
        var pack = this._packs[packN];
        delete this._packs[packN];
        dom.removeElement(pack);
    },

    _updatePack: function(packN, revision, rows) {
        this._removePack(packN);
        var startFrom = packN * this._packSize,
            selectedInPack = utils.map(
                this._selection.selectedInRange(
                    startFrom,
                    startFrom + this._packSize),
                function(index) {
                    return index - startFrom;
                });

        this._packs[packN] = this._renderer.renderPack(rows, selectedInPack);

        this._packs[packN].style.top =
            this._metrics.rowDimensions(startFrom).top + 'px';
        this._packs[packN].__revision = revision;
        this.dom().appendChild(this._packs[packN]);
    },

    _update: function() {
        var packNs = this._packsToRender(),
            revision = env.guid++;

        for (var packN=packNs[0]; packN <= packNs[1]; packN++) {
            if (!this._packs[packN]) {
                this._schedulePackRender(packN, revision);
            } else {
                this._packs[packN].__revision = revision;
            }
        };

        utils.forEach(this._packs, function(p, packN) {
            if (p.__revision != revision) this._removePack(packN);
        }, this);
        return this;
    },

    // store original version function so we can instance override
    // _update in throttle and debounce and then revert back
    domForEvent: function(type) {
        return Focusable._domForEvent.call(this, type) ||
            Base.prototype.domForEvent.call(this, type);
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
    selection: function() {
        return this._selection;
    },

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
        var index = this._selection.index();
        return index > -1 && this._data.slice(index, index+1)[0];
    },

    /**
    * Array of the the rows selected
    *
    * Warning! This method will use #slice even for async data
    */
    selectedRows: function() {
        var result = [];
        for (var i=0, indexes = this._selection.indexes(),
            l = indexes.length; i < l; i++) {

            var item = this._data.slice(indexes[i], indexes[i]+1)[0];
            if (item) result.push(item);
        };
        return result;
    },

    keyPressEvent: function() {
        var useKeyPress = env.root.opera ||
            (/mozilla/i.test(env.ua) && !(/(compatible|webkit)/i).test(env.ua));

        return useKeyPress ? 'keypress' : 'keydown';
    },

    _updateSelection: function(e) {
        var rows  = this._visibleRows(),
            from = -1, to,
            state = e.action == 'add';

        // iterate through all _packs to find the min/max index
        utils.forEach(this._packs, function(_, index) {
            if (from < 0) { from = index; }
            to = index + 1;
        });
        from = Math.max(from * this._packSize, e.from);
        to   = Math.min(to   * this._packSize,   e.to);

        for (var i = to; i >= from; i--) {
            this._setSelected(i, state);
        }
    },

    _eventToIndex: function(e) {
        var o = dom.clientRect(this.dom()),
            y = e.pageY - o.top;

        return this._metrics.rowForPosition(y);
    },

    _setSelected: function(index, state) {
        var packN = index / this.packSize() << 0,
            pack = this._packs[packN];
        if (pack) {
            this._renderer.setSelected(pack,
                index - packN * this.packSize(), state);
        }
    },

    _selectionEdit: function(e) {
    },

    // Events
    _mousedown: function(e) {
        var index = this._eventToIndex(e),
            selection = this._selection;

        this._hadFocusOnSelectionStart =
            this.hasFocus() && selection.isSelected(index);

        if (this.multiselect()) {
            this._selectionInProcess = false;
            if (e.shiftKey && !selection.empty()) {
                if (selection.isSelected(index)) {
                    selection.removeRange(
                        Math.min(index + 1, this.lastClickIndex()),
                        Math.max(index - 1, this.lastClickIndex())
                    );
                } else {
                    var indexes = selection.indexes();
                    selection.clear().addRange(
                        Math.min(index, indexes[0]),
                        Math.max(index, indexes[indexes.length - 1])
                    );
                }
                this._triggerSelection();
            } else if (e.metaKey) {
                selection.toggle(index);
                this._triggerSelection();
            } else {
                if (selection.isSelected(index)) {
                    this._selectionInProcess = true;
                    this._hadFocusOnSelectionStart = this.hasFocus();
                } else {
                    selection.indexes([index]);
                    this._triggerSelection();
                }
            }
        } else {
            selection.index(index);
            this._triggerSelection();
        }
        this.lastClickIndex(index);
    },

    _mouseup: function(e) {
        var index = this._eventToIndex(e),
            selection = this._selection;

        if (!this.multiselect() || !this._selectionInProcess) {
            if (this.lastClickIndex() === index && !this.multiselect()) {
                if (this._hadFocusOnSelectionStart) {
                    this._selectionEdit(e);
                }
            }
            return;
        };

        if (this.lastClickIndex() === index && selection.isSelected(index)) {
            if (selection.indexes().length === 1) {
                if (this._hadFocusOnSelectionStart) {
                    this._selectionEdit(e);
                }
            } else {
                selection.indexes([index]);
                this._triggerSelection();
            }
        }
        this._selectionInProcess = false;
    },

    _keypress: function(e) {
        if (!this.hasFocus()) return;

        var selection = this._selection,
            indexes = selection.indexes(),
            nextIndex = -1;

        if (e.which == 38 || e.keyCode == 38) { // UP
            nextIndex = Math.max(0, this.lastClickIndex() - 1);
            e.preventDefault();
        } else if (e.which == 40 || e.keyCode == 40) { // DOWN
            nextIndex =
                Math.min(this.data().length - 1, this.lastClickIndex() + 1);
            e.preventDefault();
        } else if (this.multiselect() && // Ctrl + A
            (e.which == 97 || e.which == 65) && e.metaKey) {

            e.preventDefault();
            selection.clear().addRange(0, this.data().length);
            this._triggerSelection();
        }
        if (nextIndex > -1 && nextIndex != this.lastClickIndex()) {
            if (e.shiftKey && this.multiselect()) {
                if (selection.isSelected(nextIndex)) {
                    selection.toggle(this.lastClickIndex());
                } else {
                    selection.toggle(nextIndex);
                }
            } else {
                selection.index(nextIndex);
            }
            this._triggerSelection();
            this.scrollToIndex(nextIndex);
            this._lastClickIndex = nextIndex;
        }
    },

    _focus: function(e) {
        var selection = this._selection;

        this.removeClass('uki-dataList_blured');
        if (selection.empty() && this.data().length > 0) {
            selection.index(0);
            this.lastClickIndex(0).scrollToIndex(0);
            this._triggerSelection();
        } else {
            if (this._deferedTriggerSelection) {
                this._triggerSelection();
            }
        }
    },

    _blur: function(e) {
        this.addClass('uki-dataList_blured');
    },

    _triggerSelection: function(force) {
        if (this.hasFocus() || force) {
            this.trigger({type: 'selection', target: this});
            this._deferedTriggerSelection = false;
        } else {
            this._deferedTriggerSelection = true;
        }
    },

    triggerSelection: function() {
        this._triggerSelection(true);
        return this;
    }

});

var proto = DataList.prototype;
proto._originalUpdate = proto._update;

function wrapVisChanged(v, method) {
    if (v > 0) {
        this._update = fun[method](this._originalUpdate, v);
    } else {
        this._update = this._originalUpdate;
    }
}


require('../../uki-core/collection').Collection
.addProps([
    'data', 'throttle', 'debounce', 'template', 'formatter', 'key',
    'selection', 'selectedRows', 'selectedRow',
    'selectedIndexes', 'selectedIndex', 'lastClickIndex', 'multiselect'
])
.addMethods([
    'scrollToIndex', 'triggerSelection'
]);

exports.DataList = DataList;
