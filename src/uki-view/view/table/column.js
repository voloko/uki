/**
 * @class
 * @extends uki.view.Observable
 */
uki.view.table.Column = uki.newClass(uki.view.Observable, new function() {
    this._width = 100;
    this._offset = 0;
    this._position = 0;
    this._minWidth = 0;
    this._maxWidth = 0;
    this._css = 'float:left;white-space:nowrap;text-overflow:ellipsis;';
    this._inset = new Inset(3, 5);
    this._templatePrefix = 'table-';

    this.init = function() {};
    
    uki.addProps(this, ['position', 'css', 'formatter', 'label', 'resizable', 'maxWidth', 'minWidth', 'maxWidth', 'key', 'sort']);
    
    this.template = function() {
        // cache
        return this._template || (this._template = uki.theme.template(this._templatePrefix + 'cell'));
    };
    
    this.headerTemplate = function() {
        var suffix = '';
        if (this.sort() == 'ASC') suffix = '-asc';
        if (this.sort() == 'DESC') suffix = '-desc';
        return uki.theme.template(this._templatePrefix + 'header-cell' + suffix);
    };
    
    this.sortData = function(data) {
        var _this = this;
        return data.sort(function(a, b) {
            return _this._key ? 
                _this.compare(uki.attr(a, _this._key), uki.attr(b, _this._key)) : 
                _this.compare(a[_this._position], b[_this._position]);
        });
        
    };
    
    this.compare = function(a, b) {
        return (a >= b ? 1 : a == b ? 0 : -1) * (this._sort == 'DESC' ? -1 : 1);
    };
    
    /**
     * @fires event:beforeResize
     * @fires event:resize
     */
    this.width = uki.newProp('_width', function(w) {
        var e = {
            oldWidth: this._width,
            source: this
        };
        this._width = this._normailizeWidth(w);
        e.newWidth = this._width;
        this.trigger('beforeResize', e);
        if (this._stylesheet && e.newWidth != e.oldWidth) {
            var rules = this._stylesheet.styleSheet ? this._stylesheet.styleSheet.rules : this._stylesheet.sheet.cssRules;
            rules[0].style.width = this._clientWidth() + PX;
        }
        this.trigger('resize', e);
    });
    
    this._bindToDom = uki.F;
    
    this._normailizeWidth = function(w) {
        if (this._maxWidth) w = MIN(this._maxWidth, w);
        if (this._minWidth) w = MAX(this._minWidth, w);
        return w;
    };
    
    this.inset = uki.newProp('_inset', function(i) {
        this._inset = Inset.create(i);
    });
    
    this.render = function(row, rect, i) {
        this._prerenderedTemplate || this._prerenderTemplate(rect);
        var value = this._key ? uki.attr(row, this._key) : row[this._position];
        this._prerenderedTemplate[1] = this._formatter ? this._formatter(value, row, i) : value;
        return this._prerenderedTemplate.join('');
    };
    
    this.appendResizer = function(dom, height) {
        var resizer = uki.theme.dom('resizer', height);
        dom.appendChild(resizer);
        return resizer;
    };
    
    this.renderHeader = function(height) {
        this._className || this._initStylesheet();
        var x = this.headerTemplate().render({
            data: '<div style="overflow:hidden;text-overflow:ellipsis;*width:100%;height:100%;padding-top:' + this._inset.top + 'px">' + this.label() + '</div>',
            style: '*overflow-y:hidden;' + this._cellStyle(true, height),
            className: this._className
        });
        return x;
    };
    
    this._prerenderTemplate = function(rect) {
        this._className || this._initStylesheet();
        this._prerenderedTemplate = this.template().render({
            data: '\u0001\u0001',
            style: 'overflow:hidden;' + this._cellStyle(false, rect.height),
            className: this._className
        }).split('\u0001');
    };
    
    this._cellPadding = function(skipVertical) {
        var inset = this._inset;
        return ['padding:', (skipVertical ? '0' : inset.top), 'px ', inset.right, 'px ', (skipVertical ? '0' : inset.bottom), 'px ', inset.left, 'px;'].join('');
    };
    
    this._cellHeight = function(skipVertical, height) {
        return 'height:' + (height - (uki.dom.offset.boxModel && !skipVertical ? this._inset.height() : 0)) + 'px;';
    };
    
    this._cellStyle = function(skipVertical, height) {
        return this._css + this._cellPadding(skipVertical) + ';' + this._cellHeight(skipVertical, height);
    };
    
    this._clientWidth = function() {
        return this._width - (uki.dom.offset.boxModel ? this._inset.width() + 1 : 0);
    };
    
    this._initStylesheet = function() {
        if (!this._className) {
            uki.dom.offset.initializeBoxModel();
            this._className = 'uki-table-column-' + (uki.guid++);
            var css = '.' + this._className + ' {width:' + this._clientWidth() + 'px;}';
            this._stylesheet = uki.dom.createStylesheet(css);
        }
    };
});

uki.view.table.NumberColumn = uki.newClass(uki.view.table.Column, new function() {
    var Base = uki.view.table.Column.prototype;

    this._css = Base._css + 'text-align:right;';
    
    this.compare = function(a, b) {
        a*=1;
        b*=1;
        return (a >= b ? 1 : a == b ? 0 : -1) * (this._sort == 'DESC' ? -1 : 1);
    };
});

uki.view.table.CustomColumn = uki.view.table.Column;