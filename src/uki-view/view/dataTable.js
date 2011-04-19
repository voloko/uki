requireCss('./dataTable/dataTable.css');

var fun   = require('../../uki-core/function'),
    utils = require('../../uki-core/utils'),
    dom   = require('../../uki-core/dom'),
    view  = require('../../uki-core/view'),
    build = require('../../uki-core/builder').build,

    Pack      = require('./dataTable/pack').Pack,
    DataList  = require('./dataList').DataList,
    Mustache  = require('../../uki-core/mustache').Mustache,
    Base      = require('../../uki-core/view/base').Base,
    Container = require('../../uki-core/view/container').Container,
    Focusable = require('./focusable').Focusable;


var DataTable = view.newClass('DataTable', Container, {
    columns: function(cols) {
        if (cols === undefined) {
            return this._list.columns();
        }
        cols = table.addColumnDefatuls(cols);
        this._list.columns(cols);
        this._header.columns(cols);
        return this;
    },

    columnWidths: function(v) {
        if (v === undefined) {
            return utils.pluck(this.columns(), 'width');
        }
        this.columns().forEach(function(col, i) {
            if (v[i]) { col.width = v[i]; }
        }, this);
        this._header.columns(this.columns());
        return this;
    },

    list: function() {
        return this._list;
    },

    _createDom: function(initArgs) {
        this._dom = dom.createElement('div', {className: 'uki-dataTable'});

        var c = build([
            { view: initArgs.headerView || DataTableHeader, as: 'header',
              addClass: 'uki-dataTable-header-container',
              on: { resizeColumn: fun.bind(this._resizeColumn, this) } },

            { view: Container, pos: 't:0 l:0 r:0 b:0',
              addClass: 'uki-dataTable-container', as: 'container',
              on: { scroll: fun.bind(this._scrollHeader, this) },
              childViews: [
                { view: initArgs.listView || DataTableList, as: 'list',
                  on: { selection: fun.bind(this.trigger, this) } }
              ] }

        ]).appendTo(this);

        this._header = c.view('header');
        this._header.on('render', fun.bindOnce(this._updateHeaderHeight, this));
        this._container = c.view('container');
        this._list = c.view('list');
    },

    _updateHeaderHeight: function() {
        var pos = this._container.pos();
        pos.t = this._header.clientRect().height + 'px';
        this._container.pos(pos);
    },

    _initLayout: function() {
        this._updateHeaderHeight();
    },

    _scrollHeader: function(e) {
        this._header.scrollTo(this._container.scrollLeft());
    },

    _resizeColumn: function(e) {
        this._list._updateColumnSize(e.column.pos);
    }
});

fun.delegateProp(DataTable.prototype, [
    'data', 'throttle', 'debounce', 'template', 'formatter', 'key',
    'selection', 'selectedRows', 'selectedRow',
    'selectedIndexes', 'selectedIndex', 'lastClickIndex', 'multiselect'
], 'list');

fun.delegateCall(DataTable.prototype, [
    'scrollToIndex', 'triggerSelection'
], 'list');





var DataTableHeader = view.newClass('DataTableHeader', Base, {
    template: fun.newProp('template'),
    _template: requireText('dataTable/header.html'),

    _createDom: function(initArgs) {
        Base.prototype._createDom.call(this, initArgs);
        this.on('draggesturestart', this._dragStart);
        this.on('draggesture', this._drag);
        this.on('draggestureend', this._drag);
    },

    scrollTo: function(offset) {
        this._dom.firstChild.style.marginLeft = -offset + 'px';
    },

    _dragStart: function(e) {
        if (dom.hasClass(e.target, 'uki-dataTable-resizer')) {
            e.draggbale = e.target;
            e.cursor = dom.computedStyle(e.target, null).cursor;
            var index =
                e.target.className.match(/uki-dataTable-resizer_pos-(\d+)/)[1];
            this._draggableColumn = index;
            this._initialWidth = this.columns()[index].width;
        } else {
            e.preventDefault();
        }
    },

    _drag: function(e) {
        var width = this._initialWidth + e.dragOffset.x;

        this._resizeColumn(this._draggableColumn, width);
        this.trigger({
            type: 'resizeColumn',
            source: this,
            column: this.columns()[this._draggableColumn]
        });
    },

    _resizeColumn: function(pos, width) {
        var column = this.columns()[pos];
        if (column.maxWidth > 0) {
            width = Math.min(width, column.maxWidth);
        }
        if (column.minWidth > 0) {
            width = Math.max(width, column.minWidth);
        }
        column.width = width;
        var tr = this.dom().firstChild.firstChild.firstChild,
            td = tr.childNodes[column.visiblePos];
        td.style.width = width + 'px';

        this.dom().firstChild.style.width =
            table.totalWidth(this.columns()) + 'px';
    },

    _formatColumn: function(col) {
        return {
            pos: col.pos,
            label: col.label,
            style: 'width:' + col.width + 'px',
            className: col.className +
                (col.width != col.maxWidth || col.width != col.minWidth ?
                    ' uki-dataTable-header-cell_resizable' : '')
        };
    },

    columns: fun.newProp('columns', function(cols) {
        this._columns = cols;
        fun.deferOnce(fun.bindOnce(this._render, this));
    }),

    _render: function() {
        this._dom.innerHTML = Mustache.to_html(
            this._template,
            {
                columns: this.columns().map(this._formatColumn, this),
                style: 'width:' + table.totalWidth(this.columns()) + 'px'
            });
        this.trigger({ type: 'render' });
    }
});



var DataTableList = view.newClass('DataTableList', DataList, {

    _setup: function(initArgs) {
        initArgs.packView = initArgs.packView || Pack;
        DataList.prototype._setup.call(this, initArgs);
    },

    /**
     * {
     *   key: 'propName',        // optional=index, propName to read from object
     *   className: 'mycls',     // optional='', className to add to a cell
     *   width: 200,             // optional=200, default width in px
     *   minWidth: 100,          // optional=100, minWidth in px
     *   maxWidth: 300,          // optional=-1, maxWidth in px, -1 for now
     *                              maxWidth
     *   visible: true,          // optional=true, should you show the column or
     *                              not
     *   label: 'My Label',      // optional='', used by header
     *   formatter: function(){} // optional, formats value before rendering
     *                           // (ex: numberFormatter, dateFormatter)
     * }
     */
    columns: fun.newProp('columns'),
    _columns: [],
    
    _template: requireText('dataTable/pack.html'),

    _createDom: function(initArgs) {
        DataList.prototype._createDom.call(this, initArgs);
        this.addClass('uki-dataTable-list');
    },

    _updateColumnSize: function(pos) {
        var column = this.columns()[pos];
        utils.forEach(this.childViews(), function(pack) {
            pack.resizeColumn(column.visiblePos, column.width);
        }, this);
    }
});



var table = {
    totalWidth: function(columns) {
        return utils.reduce(columns, function(s, col) {
            return s + (col.visible ? (col.width || 200) : 0);
        }, 0);
    },

    addColumnDefatuls: function(columns) {
        var visiblePos = 0;
        return columns.map(function(col, pos) {
            col = utils.extend({
                visiblePos: visiblePos,
                pos: pos,
                width: 200,
                name: '',
                className: '',
                visible: true,
                formatter: dom.escapeHTML
            }, col);
            col.minWidth = Math.min(col.minWidth || 20, col.width);
            if (col.maxWidth > 0) {
                col.maxWidth = Math.max(col.maxWidth, col.width);
            }
            if (col.visible) {
                visiblePos++;
            }
            return col;
        });
    }
};

exports.DataTable       = DataTable;
exports.DataTableList   = DataTableList;
exports.DataTableHeader = DataTableHeader;
exports.table           = table;
