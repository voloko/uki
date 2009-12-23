include('../list/render.js');

uki.view.table.Render = uki.newClass(uki.view.list.Render, new function() {
    
    var proto = this;
    
    proto.init = function(table) {
        this._table = table;
    };
    
    proto.render = function(row, rect, i) {
        if (!this._template) this._template = this._buildTemplate(rect);
        var table = this._table,
            columns = table.columns();
        this._template[1] = uki.map(columns, function(val, j) {
            return columns[j].render(row, rect, i);
        }).join('');
        return this._template.join('');
    };
    
    proto._buildTemplate = function(rect) {
        var tagOpening = ['<div style="position:relwidth:100%;height:', rect.height, 'px">'].join(',');
        return ['', '', '']
    };
});