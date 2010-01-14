uki.view.table.Column = uki.newClass(uki.view.Observable, new function() {
    var proto = this;
    
    proto._width = 100;
    proto._offset = 0;
    proto._position = 0;
    proto._minWidth = 40;
    proto._css = 'overflow:hidden;float:left;font-size:11px;line-height:11px;white-space:nowrap;text-overflow:ellipsis;';
    proto._inset = new Inset(3, 5);

    proto.init = function() {};
    
    uki.addProps(proto, ['position', 'css', 'formatter', 'label', 'resizable', 'maxWidth', 'minWidth']);
    
    proto.width = uki.newProp('_width', function(w) {
        this._width = this._normailizeWidth(w);
        this.trigger('beforeResize', {source: this});
        if (this._stylesheet) {
            var rules = this._stylesheet.styleSheet ? this._stylesheet.styleSheet.rules : this._stylesheet.sheet.cssRules;
            rules[0].style.width = this._clientWidth() + PX;
        }
        this.trigger('resize', {source: this});
    });
    
    proto._bindToDom = uki.F;
    
    proto._normailizeWidth = function(w) {
        if (this._maxWidth) w = MIN(this._maxWidth, w);
        if (this._minWidth) w = MAX(this._minWidth, w);
        return w;
    };
    
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
    
    proto._clientWidth = function() {
        return this._width - (uki.dom.offset.boxModel ? this._inset.width() + 1 : 0);
    };
    
    proto._initStylesheet = function() {
        uki.dom.offset.initializeBoxModel();
        if (!this._className) {
            this._className = 'uki-table-column-' + (++uki.dom.guid);
            var css = '.' + this._className + ' {width:' + this._clientWidth() + 'px;}';
            this._stylesheet = uki.dom.createStylesheet(css);
        }
    };
    
    proto._buildHeaderTemplate = function(headerHeight) {
        this._initStylesheet();
        var border = 'border:1px solid #CCC;border-top: none;border-left:none;',
            inset  = this._inset,
            padding = ['padding:', inset.top, 'px ', inset.right, 'px ', inset.bottom, 'px ', inset.left, 'px;'].join(''),
            height = 'height:' + (headerHeight - (uki.dom.offset.boxModel ? inset.height() + 1 : 0)) + 'px;',
            tagOpening = ['<div style="position:relative;', border, padding, height, this._css, '" class="',this._className,'">'].join('');
        
        return [tagOpening, '', '</div>'];
    };
    
    proto._buildTemplate = function(rect) {
        this._initStylesheet();
        var inset = this._inset,
            border = 'border-right:1px solid #CCC;',
            padding = ['padding:', inset.top, 'px ', inset.right, 'px ', inset.bottom, 'px ', inset.left, 'px;'].join(''),
            height = 'height:' + (rect.height - (uki.dom.offset.boxModel ? inset.height() : 0)) + 'px;',
            tagOpening = ['<div style="', border, padding, height, this._css, '" class="',this._className,'">'].join('');
        return [tagOpening, '', '</div>'];
    };
});

uki.view.table.NumberColumn = uki.newClass(uki.view.table.Column, new function() {
    var Base = uki.view.table.Column[PROTOTYPE],
        proto = this;

    proto._css = Base._css + 'text-align:right;';
});

uki.view.table.CustomColumn = uki.view.table.Column;