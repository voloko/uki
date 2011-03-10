requireCss('./dataList/dataList.css');

var env   = require('uki-core/env'),
    fun   = require('uki-core/function'),
    utils = require('uki-core/utils'),
    dom   = require('uki-core/dom'),
    evt   = require('uki-core/event'),
    view  = require('uki-core/view'),
    build = require('uki-core/builder').build,
    
    Binding    = require('./dataList/binding').Binding,
    Mustache   = require('uki-core/mustache').Mustache;
    Base       = require('uki-core/view/base').Base;
    Focusable  = require('uki-core/view/focusable').Focusable;
    Selectable = require('selectable').Selectable;
    

var DataList = view.newClass('DataList', Base, Focusable, Selectable, {}),
    proto = DataList.prototype;
    

/* --------------- Setup --------------*/
/**
* Do not redraw more often then in value ms
*/
fun.addProp(proto, 'throttle', function(v) {
    this._throttle = v;
    if (v > 0) {
        this._visChanged = fun.throttle(this._originalVisChanged, this._throttle);
    } else {
        this._visChanged = this._originalVisChanged;
    }
});
proto._throttle = 0;

/**
* Do redraw only after value ms after last scroll/update
*/
fun.addProp(proto, 'debounce', function(v) {
    this._debounce = v;
    if (v > 0) {
        this._visChanged = fun.debounce(this._originalVisChanged, this._debounce);
    } else {
        this._visChanged = this._originalVisChanged;
    }
});
proto._debounce = 0;

/**
* Mustache template to render a pack of rows
* 
* @function
* @name template
*/
/**
* A function to format a single row value
* 
* @function
* @name formatter
*/
/**
* Size of the pack
* 
* @function
* @name packSize
*/
/**
* Render 60-rows more than the visible zone
* 
* @function
* @name renderMoreRows
*/
/**
* Height of a single row in px, should be constant. If you do not provide one,
* DataList will try to deduce it from the first data row or sampleRow
* 
* @function
* @name rowHeight
*/
fun.addProps(proto, ['template', 'formatter', 'packSize', 'renderMoreRows', 'rowHeight']);

proto._template = requireText('dataList/dataList.html');

proto._formatter = dom.escapeHTML;

proto._packSize = 100;

proto._renderMoreRows = 60;

proto._rowHeight = 0;







/* --------------- Data API --------------*/
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
fun.addProp(proto, 'data', function(d) {
    this._data = d;
    this._reset();
});

/**
* If data is an array of objects DataList will pick the #key property
* from the row. Otherwise the whole row will be used. So you either need
* to provide a formatter that knows how the row is designed or use
* the default formatter and provde a key to pull the correct column.
* @function
* @name key
*/
/**
* #TBD
* Change event on those keys triggers redraw. Probably should be in binding
* @function
* @name changeOnKeys
*/
fun.addProps(proto, ['key', 'changeOnKeys']);

proto._key = null;

proto._changeOnKeys = [];

/**
* Bind representation to colleciton.
* #TBD
*/
proto._createBinding = function() {
    options = utils.extend(this.bindingOptions(), options);
    options.view = this;
    return new Binding(options);
};

/**
* #TBD
* Answers if the row should be redraw on the key change
* @function
* @name shouldRedrawOnPropChange
*/
proto.shouldRedrawOnPropChange = function(key) {
    return this.key() === key || utils.indexOf(this.changeOnKeys(), key) > -1;
};







/* --------------- Selection API -------------- 
* @see view.Selectable for more info
*/
/**
* Index of the row the user either clicked or used keyborad to focus on
* @function
* @name lastClickIndex
*/
fun.addProp(proto, 'lastClickIndex');

/**
* Actual row selected.
* 
* Warning! This method will use #slice even for async data
* @function
*/
proto.selectedRow = function() {
    var index = this.selectedIndex();
    return index > -1 && this._data.slice(index, index+1)[0];
};

/**
* Array of the the rows selected
* 
* Warning! This method will use #slice even for async data
* @function
*/
proto.selectedRows = function() {
    var result = [];
    for (var i=0, indexes = this.selectedIndexes(), l = indexes.length; i < l; i++) {
        var item = this._data.slice(indexes[i], indexes[i]+1)[0];
        if (item) result.push(item);
    };
    return result;
};

/**
* Redraws the row under the index imideately. If you do not want to redraw the 
* whole pack this method may provide performance benefit. On the other hand if
* you change all the data calling #resized might be faster.
* 
* Warning! This method will use #slice even for async data
* @function
*/
proto.redrawRow = function(index) {
    var item = this._itemAt(index);
    if (!item) return this;
    var pack = this._renderPack(this._data.slice(index, index+1));
    item.parentNode.replaceChild(this._itemWithinPack(pack, 0), item);
    if (this.isSelected(index)) this._setSelected(index, true);
    return this;
};

/**
* Scroll the parent so row at position gets into view
* 
* @function
*/
proto.scrollToPosition = function(position) {
    var pxs  = this._visiblePixels(),
        maxY = (position+1)*this._rowHeight,
        minY = position*this._rowHeight;

    if (maxY >= pxs[1]) {
        this._scrollableParent().scroll(0, maxY - pxs[1] +
            // hackish overflow to compensate for bottom scroll bar
            (position === this.data().length - 1 ? 100 : 0)
        );
    } else if (minY < pxs[0]) {
        this._scrollableParent().scroll(0, minY - pxs[0]);
    }
    this._visChanged();
    return this;
};








/* --------------- Inline editing -------------- */
/**
* Either a view or view description of the row inline editor. 
* See view.dataList.Editor for example.
* 
* @function
* @name editor
*/
fun.addProp(proto, 'editor', function(e) {
    this._editor = build(e)[0];
});

/**
* Is editor open right now?
* 
* @function
* @name editor
*/
proto.editing = function() {
    return this.editor() && this.editor().parent();
};


/**
* Trigger inline editing on the first selected row
* 
* @function
* @name editSelected
*/
proto.editSelected = function() {
    if (!this.editor()) return this;
    this._editorBlur();

    var t = this.selectedIndex() * this.rowHeight();

    this.dom().appendChild(this.editor().dom());

    this.editor()
        .on('finishEdit', fun.bindOnce(this._editorBlur, this))
        .on('move', fun.bindOnce(this._editorMove, this))
        .pos({ top: t+'px', left: 0+'px', right: 0+'px', height: this.rowHeight() + 'px' })
        .visible(true)
        .parent(this)
        .edit({ model: this.selectedRow(), modelProp: this.key() });

    this.lastClickIndex(this.selectedIndex());
    return this;
};





/* --------------- Protected API -------------- */
proto.resized = function() {
    if (this._firstResize()) {
        this._originalVisChanged();
    } else {
        this._visChanged();
    }
    return this;
};

proto._reset = function() {
    utils.forEach(this._packs, dom.removeElement);
    this._packs = [];
    this.clearSelection();
    this._allreadyResized = false;
    if (this._scrollableParent())
        this._scrollableParent().removeListener('scroll', utils.bindOnce(this._scroll, this));
};

proto._setup = function(initArgs) {
    this._data = [];
    this._packs = {};

    this._packSize  = initArgs.packSize || this._packSize;
    this._rowTemplate = initArgs.rowTemplate || this._rowTemplate;

    Base.prototype._setup.call(this, initArgs);
};

proto._createDom = function(initArgs) {
    this._dom = dom.createElement('div', { className: 'uki-dataList uki-dataList_blured' });
    this.tabIndex(1);
    this._initSelectable();

    // prevent dragging of selection
    this.on('selectstart dragstart', evt.preventDefaultHandler);
};

proto.triggerSelection = function() {
    this._triggerSelection(true);
    return this;
};

proto._selectionEdit = function(e) {
    this.editSelected();
};

proto._editorBlur = function(e) {
    if (this.editor() && this.editor().parent()) {

        this.editor()
            .parent(null)
            .removeListener('move', fun.bindOnce(this._editorMove, this))
            .removeListener('finishEdit', fun.bindOnce(this._editorBlur, this));

        dom.removeElement(this.editor().dom());
        if (e && e.remainFocused) this.focus();
    }
};

proto._editorMove = function(e) {
    e.vertical = e.vertical || e.horizontal;
    if (this.moveSelectedIndex(e.vertical)) {
        this.scrollToPosition(this.selectedIndex());
        this.triggerSelection();
        this.editSelected();
    }
};


proto._dataForClipboard = function() {
    return { 'text/plain': this.selectedRows().join("\n") };
};

proto._firstResize = function() {
    if (this._allreadyResized) return false;
    this._calcRowHeight();
    if (this.rowHeight()) {
        this._allreadyResized = true;
        this._scrollableParent().on('scroll', fun.bindOnce(this._scroll, this));
        this._updateHeight();
    }
    return true;
};

proto._calcRowHeight = function() {
    if (!this.data().length) {
        this._rowHeight = 0;
    } else {
        var sample = utils.prop(this.data(), 'sampleRow') || (this.data().slice && this.data().slice(0, 1)[0]) || '',
            p = this._renderPack([sample]);

        this.dom().appendChild(p);
        this._rowHeight = p.offsetHeight;
        this.dom().removeChild(p);
    }
};

proto._updateHeight = function() {
    this.dom().style.height = this.data().length * this.rowHeight() + 'px';
};

proto._scroll = function() {
    this._visChanged();
};

// you may want to overwrite this for complex scenarios
proto._scrollableParent = function() {
    return this.parent();
};

proto._visiblePixels = function() {
    if (!this._scrollableParent()) return [0, 0];

    var rect = this.clientRect(true),
        parentRect = this._scrollableParent().clientRect(true),

        topOffset = rect.top - parentRect.top,
        height = parentRect.height - Math.max(0, topOffset),
        top = -Math.min(0, topOffset);

    return [top, top + height];
};

proto._visibleRows = function() {
    var pxs = this._visiblePixels();

    return [
        pxs[0] / this.rowHeight() << 0,
        pxs[1] / this.rowHeight() + 0.5 << 0
    ];
};

proto._packsToRender = function() {
    var rows = this._visibleRows();
    return [
        Math.max(0, rows[0] - this._renderMoreRows) / this.packSize() << 0,
        Math.min(this.data().length, rows[1] + this._renderMoreRows) / this.packSize() << 0
    ];
};

proto._schedulePackRender = function(packN, revision) {
    var from = packN * this.packSize();

    if (this.data().loadRange) {
        this.data().loadRange(
            from, this.packSize() + from,
            fun.bind(this._updatePack, this, packN, revision)
        );
    } else {
        this._updatePack(packN, revision, this.data().slice(from, from + this.packSize()));
    }
};

proto._removePack = function(packN) {
    var pack = this._packs[packN];
    delete this._packs[packN];
    dom.removeElement(pack);
};

proto._formatRow = function(row, pos) {
    return this._formatter(this._key ? utils.prop(row, this._key) : row, row, pos);
};

proto._updatePack = function(packN, revision, rows) {
    this._removePack(packN);
    this._packs[packN] = this._renderPack(rows);
    this._packs[packN].style.top = packN * this.rowHeight() * this.packSize() + 'px';
    this._packs[packN].__revision = revision;
    this.dom().appendChild(this._packs[packN]);
    this._restorePackSelection(packN);
};

proto._renderPack = function(rows) {
    var formated = utils.map(rows, function(r, i) {
        return { value: this._formatRow(r), index: i, even: i & 1 };
    }, this);

    return dom.fromHTML(Mustache.to_html(
        this._template,
        { rows: formated }
    ));
};

proto._restorePackSelection = function(packN) {
    var indexes = this._selectedIndexes,
        from = packN * this.packSize(),
        to   = from + this.packSize();

    var currentSelection = utils.binarySearch(from, indexes);
    currentSelection = Math.max(currentSelection, 0);

    while(indexes[currentSelection] !== null && indexes[currentSelection] < to) {
        var position = indexes[currentSelection];
        this._setSelected(position, true);
        currentSelection++;
    }
};


/** Selectable API */
proto._selectionFocus = function(e) {
    this.removeClass('uki-dataList_blured');
    Selectable._selectionFocus.call(this, e);
};

proto._selectionBlur = function(e) {
    this.addClass('uki-dataList_blured');
    Selectable._selectionBlur.call(this, e);
};

proto._setSelected = function(position, state) {
    var item = this._itemAt(position);
    if (item) {
        dom.toggleClass(item, 'uki-dataList-row_selected', state);
    }
};

proto._itemAt = function(position) {
    var packN = (position / this.packSize()) << 0,
        pack = this._packs[packN];

    if (!pack) return null;
    return this._itemWithinPack(pack, position - this.packSize() * packN);
};

proto._itemWithinPack = function(pack, packPos) {
    return pack.childNodes[packPos];
};

proto._visChanged = function() {
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
};

// store original version function so we can instance override
// _visChanged in throttle and debounce and then revert back
proto._originalVisChanged = proto._visChanged;

proto.domForEvent = function(type) {
    return Focusable._domForEvent.call(this, type) ||
        Base.prototype.domForEvent.call(this, type);
};


exports.DataList = DataList;
