uki.view.table.Column = uki.newClass(new function() {
    var proto = this;
    
    proto._width = 100;
    proto._offset = 0;
    proto._position = 0;
    proto._css = 'overflow:hidden;position:absolute;font-size:11px;line-height:11px;white-space:nowrap;text-overflow:elipsis;';
    proto._inset = new Inset(3, 5);

    proto.init = function() {};
    
    uki.addProperties(proto, ['width', 'offset', 'position', 'css', 'formatter']);
    
    proto.render = function(row, rect, i) {
        if (!this._template) this._template = this._buildTemplate(rect);
        this._template[1] = this._formatter ? this._formatter(row[this._position]) : row[this._position];
        // console.log(this._template);
        return this._template.join('')
    };
    
    proto._buildTemplate = function(rect) {
        var border = this._position == 0 ? '' : 'border-left:1px solid #CCC;',
            inset = this._inset,
            padding = ['padding:', inset.top, 'px ', inset.right, 'px ', inset.bottom, 'px ', inset.left, 'px;'].join(''),
            height = 'height:' + (rect.height - inset.height()) + 'px;',
            width = 'width:' + (this._width - inset.width()) + 'px;',
            left = 'left:' + this._offset + 'px;',
            tagOpening = ['<div style="', width, left, border, padding, height, this._css, '">'].join('');
        return [tagOpening, '', '</div>'];
    };
});

uki.view.table.NumberColumn = uki.newClass(uki.view.table.Column, new function() {
    var Base = uki.view.table.Column[PROTOTYPE],
        proto = this;

    proto._css = Base._css + 'text-align:right;';
});

uki.view.table.CustomColumn = uki.view.table.Column;