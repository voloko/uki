var fun   = require('../../../uki-core/function'),
    utils = require('../../../uki-core/utils'),
    dom   = require('../../../uki-core/dom'),

    Mustache = require('../../../uki-core/mustache').Mustache,
    Base     = require('../dataList/renderer').Renderer;


var Renderer = fun.newClass(Base, {

    _template: requireText('list.html'),

    initWithView: function(view) {
        this._view = view;
    },

    renderPack: function(rows, selectedInPack, from) {
        var formatedRows = utils.map(rows, function(row, i) {
            var pos = i + from;
            return {
                columns: this._formatColumns(row, pos, !i),
                row: row,
                index: pos,
                even: pos & 1
            };
        }, this);

        var pack = dom.fromHTML(Mustache.to_html(
            this._template,
            { rows: formatedRows }
        ));

        this._restorePackSelection(pack, selectedInPack || [], from);
        return pack;
    },

    rowAt: function(pack, pos) {
        return pack.childNodes[0].childNodes[pos];
    },
    
    setSelected: function(pack, position, state) {
        var row = this.rowAt(pack, position);
        if (row) { dom.toggleClass(row, 'uki-dataTable-row_selected', state); }
    },
    
    resizeColumn: function(pack, visiblePos, width) {
        var tr = pack.firstChild.childNodes[0],
            td = tr && tr.childNodes[visiblePos];
        if (td) { td.style.width = width + 'px'; }
    },

    _formatColumns: function(row, pos, first) {
        var cols = [];
        this._view.columns().forEach(function(col, i) {
            if (!col.visible) { return; }
            var val = col.key ? utils.prop(row, col.key) : row[i];
            cols[i] = {
                value: col.formatter(val || '', row, pos),
                className: 'uki-dataTable-col-' + i +
                    (col.className ? ' ' + col.className : ''),
                style: first && ('width: ' + col.width + 'px')
            };
        });
        return cols;
    }

});



exports.Renderer = Renderer;
