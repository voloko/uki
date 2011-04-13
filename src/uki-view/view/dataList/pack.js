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

    render: function(rows, selectedInPack, from) {
        var formated = utils.map(rows, function(r, i) {
            i = i + from;
            return {
                value: this._formatRow(r, i),
                row: r,
                index: i,
                even: i & 1
            };
        }, this);

        this._dom.innerHTML = Mustache.to_html(
            this.template(), { rows: formated }
        );

        this._restorePackSelection(selectedInPack || [], from);
    },

    setSelected: function(position, state) {
        if (this.dom()) {
            var row = this._rowAt(position);
            if (row) {
                dom.toggleClass(row, 'uki-dataList-row_selected', state);
            }
        }
    },
    
    _formatRow: function(row, pos) {
        return this.formatter()(
            this.key() ? utils.prop(row, this.key()) : row,
            row,
            pos);
    },
    
    _createDom: function(initArgs) {
        this._dom = dom.createElement('ul', {
            className: 'uki-dataList-pack'
        });
    },

    _restorePackSelection: function(selectedInPack, from) {
        for (var i = selectedInPack.length - 1; i >= 0; i--){
            this.setSelected(selectedInPack[i] - from, true);
        };
    },

    _rowAt: function(pos) {
        return this.dom().childNodes[pos];
    }

});


exports.Pack = Pack;