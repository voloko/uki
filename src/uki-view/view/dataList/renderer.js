var fun   = require('../../../uki-core/function'),
    utils = require('../../../uki-core/utils'),
    dom   = require('../../../uki-core/dom'),

    Mustache = require('../../../uki-core/mustache').Mustache;


var Renderer = fun.newClass({

    template: fun.newProp('template'),
    _template: requireText('dataList.html'),

    formatter: fun.newProp('formatter'),
    _formatter: dom.escapeHTML,

    key: fun.newProp('key'),
    _key: null,
    
    initWithView: fun.FS,

    renderPack: function(rows, selectedInPack, from) {
        var formated = utils.map(rows, function(r, i) {
            i = i + from;
            return {
                value: this._formatRow(r, i),
                row: r,
                index: i,
                even: i & 1
            };
        }, this);

        var pack = dom.fromHTML(Mustache.to_html(
            this._template,
            { rows: formated }
        ));

        this._restorePackSelection(pack, selectedInPack || [], from);
        return pack;
    },

    rowAt: function(pack, pos) {
        return pack.childNodes[pos];
    },

    setSelected: function(pack, position, state) {
        var row = this.rowAt(pack, position);
        if (row) { dom.toggleClass(row, 'uki-dataList-row_selected', state); }
    },

    _formatRow: function(row, pos) {
        return this.formatter()(
            this.key() ? utils.prop(row, this.key()) : row,
            row,
            pos);
    },

    _restorePackSelection: function(pack, selectedInPack, from) {
        for (var i = selectedInPack.length - 1; i >= 0; i--){
            this.setSelected(pack, selectedInPack[i] - from, true);
        };
    }

});



exports.Renderer = Renderer;