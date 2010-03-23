include('../list/render.js');

uki.view.table.Render = uki.newClass(uki.view.list.Render, new function() {
    this.init = function(table) {
        this._table = table;
    };
    
    this.render = function(row, rect, i) {
        var table = this._table,
            columns = table.columns();
        return uki.map(columns, function(val, j) {
            return columns[j].render(row, rect, i);
        }).join('');
    };
});