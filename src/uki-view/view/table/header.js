include('../label.js');

/**
 * @class
 * @extends uki.view.Label
 */
uki.view.declare('uki.view.table.Header', uki.view.Label, function(Base) {
    this._setup = function() {
        Base._setup.call(this);
        this._multiline = true;
        this._resizers = [];
    };
    
    this.columns = uki.newProp('_columns', function(v) {
        this._columns = v;
        this.html(this._createColumns());
        this._createResizers();
    });
    
    this.redrawColumn = function(col) {
        if (this._resizers[col]) {
            uki.dom.unbind(this._resizers[col]);
        }
        var container = doc.createElement('div');
        container.innerHTML = this._columns[col].renderHeader(this.rect().height);
        this._label.replaceChild(container.firstChild, this._label.childNodes[col]);
        if (this._columns[col].resizable()) this._createResizers(col);
    };
    
    this._createColumns = function() {
        var html = [];
        for(var i = 0, offset = 0, columns = this._columns, l = columns.length; i < l; i++) {
            html[html.length] = columns[i].renderHeader(this.rect().height);
        }
        return html.join('')
    };
    
    this._createResizer = function(i) {
        var column = this._columns[i];
        if (column.resizable()) {
            var resizer = column.appendResizer(this._label.childNodes[i], this.rect().height);
            this._bindResizerDrag(resizer, i);
            this._resizers[i] = resizer;
        }
    };
    
    this._createResizers = function() {
        uki.each(this._columns, this._createResizer, this);
    };
    
    this._bindResizerDrag = function(resizer, columnIndex) {
        uki.dom.bind(resizer, 'draggesture', uki.proxy(function(e) {
            var headerOffset = uki.dom.offset(this.dom()),
                offsetWithinHeader = e.pageX - headerOffset.x,
                columnOffset = 0, i, column = this._columns[columnIndex];
            for (i=0; i < columnIndex; i++) {
                columnOffset += this._columns[i].width();
            };
            column.width(offsetWithinHeader - columnOffset);
        }, this));
    };
});