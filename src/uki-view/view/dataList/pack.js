var fun   = require('../../../uki-core/function'),
    utils = require('../../../uki-core/utils'),
    view  = require('../../../uki-core/view'),
    dom   = require('../../../uki-core/dom'),

    Mustache = require('../../../uki-core/mustache').Mustache,
    Base     = require('../../../uki-core/view/base').Base;


var Pack = view.newClass('dataList.Pack', Base, {

    template: fun.newProp('template'),

    formatter: fun.newProp('formatter'),

    key: fun.newProp('key'),

    render: function(rows, selectedInPack, globalIndex) {
        this._dom.innerHTML = this._toHTML(rows, globalIndex);
        this._restorePackSelection(selectedInPack || [], globalIndex);
    },

    updateRow: function(index, rows, globalIndex) {
        var tmp = dom.createElement('div', {
            html: this._toHTML(rows, globalIndex)
        });
        var item = this._rowAt(index);
        item.parentNode.replaceChild(tmp.childNodes[0], item);
    },

    setSelected: function(index, state) {
        if (this.dom()) {
            var row = this._rowAt(index);
            if (row) {
                dom.toggleClass(row, 'uki-dataList-row_selected', state);
            }
        }
    },

    _toHTML: function(rows, globalIndex) {
        var formated = utils.map(rows, function(r, i) {
            i = i + globalIndex;
            return {
                value: this._formatRow(r, i),
                row: r,
                index: i,
                even: i & 1
            };
        }, this);

        return Mustache.to_html(
            this.template(), { rows: formated }
        );
    },

    _formatRow: function(row, index) {
        return this.formatter()(
            this.key() ? utils.prop(row, this.key()) : row,
            row,
            index);
    },

    _createDom: function(initArgs) {
        this._dom = dom.createElement('ul', {
            className: 'uki-dataList-pack'
        });
    },

    _restorePackSelection: function(selectedInPack, globalIndex) {
        for (var i = selectedInPack.length - 1; i >= 0; i--){
            this.setSelected(selectedInPack[i] - globalIndex, true);
        };
    },

    _rowAt: function(index) {
        return this.dom().childNodes[index];
    }

});


exports.Pack = Pack;