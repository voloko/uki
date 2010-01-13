uki.view.table.Column = uki.newClass(new function() {
    var proto = this;
    
    proto._width = 100;
    proto._offset = 0;
    proto._position = 0;
    proto._css = 'overflow:hidden;float:left;font-size:11px;line-height:11px;white-space:nowrap;text-overflow:ellipsis;';
    proto._inset = new Inset(3, 5);

    proto.init = function() {};
    
    uki.addProps(proto, ['width', 'position', 'css', 'formatter', 'label']);
    
    proto.inset = uki.newProp('_inset', function(i) {
        this._inset = Inset.create(i);
    });
    
    proto.render = function(row, rect, i) {
        if (!this._template) this._template = this._buildTemplate(rect);
        this._template[1] = this._formatter ? this._formatter(row[this._position], row) : row[this._position];
        return this._template.join('')
    };
    
    proto.renderHeader = function(height) {
        if (!this._headerTemplate) this._headerTemplate = this._buildHeaderTemplate(height);
        var template = this._headerTemplate;
        template[1] = this.label();
        return template.join('');
    };
    
    proto._buildHeaderTemplate = function(headerHeight) {
        uki.dom.offset.initializeBoxModel();
        var border = 'border:1px solid #CCC;border-top: none;border-left:none;',
            inset  = this._inset,
            padding = ['padding:', inset.top, 'px ', inset.right, 'px ', inset.bottom, 'px ', inset.left, 'px;'].join(''),
            height = 'height:' + (headerHeight - (uki.dom.offset.boxModel ? inset.height() + 1 : 0)) + 'px;',
            width = 'width:' + (this._width - (uki.dom.offset.boxModel ? inset.width() + 1 : 0)) + 'px;',
            tagOpening = ['<div style="', width, border, padding, height, this._css, '">'].join('');
        
        return [tagOpening, '', '</div>'];
    };
    
    proto._buildTemplate = function(rect) {
        uki.dom.offset.initializeBoxModel();
        var border = 'border-right:1px solid #CCC;',
            inset = this._inset,
            padding = ['padding:', inset.top, 'px ', inset.right, 'px ', inset.bottom, 'px ', inset.left, 'px;'].join(''),
            height = 'height:' + (rect.height - (uki.dom.offset.boxModel ? inset.height() : 0)) + 'px;',
            width = 'width:' + (this._width - (uki.dom.offset.boxModel ? inset.width() + 1 : 0)) + 'px;',
            // left = 'left:' + this._offset + 'px;',
            tagOpening = ['<div style="', width, border, padding, height, this._css, '">'].join('');
        return [tagOpening, '', '</div>'];
    };
});

uki.view.table.NumberColumn = uki.newClass(uki.view.table.Column, new function() {
    var Base = uki.view.table.Column[PROTOTYPE],
        proto = this;

    proto._css = Base._css + 'text-align:right;';
});

uki.view.table.CustomColumn = uki.view.table.Column;