include('list.js');

uki.view.table = {};

/**
* Table
*
* Uses uki.view.List to render data. Wraps it into scroll pane and ads a header
* @author voloko
* @name uki.view.Table
* @class
* @extends uki.view.Container
*
* @lends uki.view.List#rowHeight as rowHeight
* @lends uki.view.List#data as data
* @lends uki.view.List#packSize as packSize
* @lends uki.view.List#visibleRectExt as visibleRectExt
* @lends uki.view.List#render as render
* @lends uki.view.List#selectedIndex as selectedIndex
* @lends uki.view.List#selectedIndexes as selectedIndexes
* @lends uki.view.List#selectedRow as selectedRow
* @lends uki.view.List#selectedRows as selectedRows
* @lends uki.view.List#lastClickIndex as lastClickIndex
* @lends uki.view.List#textSelectable as textSelectable
* @lends uki.view.List#multiselect as multiselect
* @lends uki.view.List#redrawRow as redrawRow
* @lends uki.view.List#addRow as addRow
* @lends uki.view.List#removeRow as removeRow
* @lends uki.view.List#focusable as lastClickIndex
* @lends uki.view.List#focus as focus
* @lends uki.view.List#blur as blur
* @lends uki.view.List#hasFocus as hasFocus
*
*/
uki.view.declare('uki.view.Table', uki.view.Container, function(Base) {
    var propertiesToDelegate = 'rowHeight data packSize visibleRectExt render selectedIndex selectedIndexes selectedRows selectedRow focus blur hasFocus lastClickIndex focusable textSelectable multiselect'.split(' ');
    
    this._rowHeight = 17;
    this._headerHeight = 17;
    this._listImpl = 'uki.view.List';
    
    uki.each(propertiesToDelegate, function(i, name) { uki.delegateProp(this, name, '_list'); }, this);
    
    this._setup = function() {
        Base._setup.call(this);
        this._columns = [];
        this.defaultCss += 'overflow:hidden;';
    };
    
    this._style = function(name, value) {
        this._header.style(name, value);
        return Base._style.call(this, name, value);
    };
    
    /**
    * @function
    * @return {uki.view.List}
    * @name uki.view.Table#list
    */
    this.list = function() {
        return this._list;
    };
    
    /**
    * @function
    * @return {uki.view.table.Header}
    * @name uki.view.Table#header
    */
    this.header = function() {
        return this._header;
    };
    
    /**
    * @function
    * @param {Array.<uki.view.table.Column>} c
    * @name uki.view.Table#columns
    */
    this.columns = uki.newProp('_columns', function(c) {
        for (var i = 0; i < this._columns.length; i++) {
            this._columns[i].unbind();
        }
        this._columns = uki.build(c);
        this._totalWidth = 0;
        for (i = 0; i < this._columns.length; i++) {
            this._columns[i].position(i);
            this._columns[i].bind('beforeResize', uki.proxy(function() {
                this._updateTotalWidth();
                this._scrollPane.layout();
            }, this));
        };
        this._updateTotalWidth();
        this._header.columns(this._columns);
    });
    
    /**
    * @function
    * @param {Number} row
    * @param {Number} col
    * @name uki.view.Table#redrawCell
    */
    this.redrawCell = function(row, col) {
        var item = this._list._itemAt(row);
        if (item) {
            var cell, container = doc.createElement('div');
            container.innerHTML = this.columns()[col].render(
                this.data()[row],
                new Rect(0, row*this.rowHeight(), this.list().width(), this.rowHeight()),
                row
            );
            cell = container.firstChild;
            item.replaceChild(cell, item.childNodes[col]);
        }
        return this;
    };
    
    uki.each(['redrawRow', 'addRow', 'removeRow'], function(i, name) {
        this[name] = function() {
            this.list()[name].apply(this.list(), arguments);
            return this;
        };
    }, this)
    
    /**
    * @function
    * @param {Number} col
    * @name uki.view.Table#redrawColumn
    */
    this.redrawColumn = function(col) {
        var from = this._list._packs[0].itemFrom,
            to   = this._list._packs[1].itemTo
        for (var i=from; i < to; i++) {
            this.redrawCell(i, col);
        };
        return this;
    };
    
    this._updateTotalWidth = function() {
        this._totalWidth = 0;
        for (var i=0; i < this._columns.length; i++) {
            this._columns[i].position(i);
            this._totalWidth += this._columns[i].width();
        };
        this._list.minSize(new Size(this._totalWidth, this._list.minSize().height));
        // this._list.rect(new Rect(this._totalWidth, this._list.height()));
        this._header.minSize(new Size(this._totalWidth, 0));
    };
    
    this._createDom = function() {
        Base._createDom.call(this);
        var scrollPaneRect = new Rect(0, this._headerHeight, this.rect().width, this.rect().height - this._headerHeight),
            listRect = scrollPaneRect.clone().normalize(),
            headerRect = new Rect(0, 0, this.rect().width, this._headerHeight),
            listML = { view: this._listImpl, rect: listRect, anchors: 'left top bottom right', render: new uki.view.table.Render(this), className: 'table-list' },
            paneML = { view: 'ScrollPane', rect: scrollPaneRect, anchors: 'left top right bottom', scrollableH: true, childViews: [listML], className: 'table-scroll-pane'},
            headerML = { view: 'table.Header', rect: headerRect, anchors: 'top left right', className: 'table-header' };
            
        uki.each(propertiesToDelegate, function(i, name) { 
            if (this['_' + name] !== undefined) listML[name] = this['_' + name];
        }, this);
        this._scrollPane = uki.build(paneML)[0];
        this._list = this._scrollPane.childViews()[0];
        this._header = uki.build(headerML)[0];
        this._scrollPane.resizeToContents();
        this.appendChild(this._header);
        this.appendChild(this._scrollPane);
        
        this._scrollPane.bind('scroll', uki.proxy(function() {
            // this is kinda wrong but faster than calling rect() + layout()
            this._header.dom().style.left = -this._scrollPane.scrollLeft() + 'px'; 
        }, this));
        
    };
});

uki.Collection.addAttrs(['columns']);

include('table/render.js');
include('table/column.js');
include('table/header.js');
