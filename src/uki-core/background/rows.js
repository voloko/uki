include('../background.js');

uki.background.Rows = uki.newClass(new function() {
    var proto = this,
        cache = [],
        packSize = 100;
    
    proto.init = function(height, colors) {
        this._height = height || 20;
        this._colors = uki.isArray(colors) ? colors : colors.split(' ');
        this._packSize = CEIL(packSize/this._colors.length)*this._colors.length;
        this._renderedHeight = 0;
        this._visibleExt = 200;
        if (this._colors.length == 1) this._colors = this._colors.concat(['#FFF']);
    };
    
    proto.attachTo = function(comp) {
        this._comp && this.detach();
        this._comp = comp;
        if (!this._container) {
            this._container = uki.createElement(
                'div', 
                'position:absolute;left:0;top:0;width:100%;z-index:-1'
            );
        }
        var _this = this;
        this._layoutHandler = function(e) { _this.layout(e.rect, e.visibleRect); };
        this._comp.dom().appendChild(this._container);
        this._comp.bind('layout', this._layoutHandler);
    };
    
    proto.layout = function(rect, visibleRect) {
        var height = visibleRect ? visibleRect.height + this._visibleExt*2 : rect.maxY();
        while (this._renderedHeight < height) {
            var h = packSize * this._height,
                c = uki.createElement('div', 'height:' + h + 'px;overflow:hidden;width:100%;', getPackHTML(this._height, this._colors));
            this._renderedHeight += h;
            this._container.appendChild(c);
        }
        if (visibleRect) {
            this._container.style.top = CEIL((visibleRect.y - this._visibleExt)/this._height/this._colors.length)*this._height*this._colors.length + 'px';
        }
    };
    
    proto.detach = function() {
        this._comp.dom().removeChild(this._container);
        this._comp = null;
        this._comp.unbind('layout', this._layoutHandler);
    };
    
    function getPackHTML (height, colors) {
        var key = height + ' ' + colors.join(' '),
            rows = [],
            html = [],
            i, l = colors.length;
        if (!cache[key]) {
            for (i=0; i < l; i++) {
                rows[i] = ['<div style="height:', height, 'px;width:100%;overflow:hidden;', 
                            (colors[i] ? 'background:' + colors[i] : ''),
                            '"></div>'].join('');
            };
            for (i=0; i < packSize; i++) {
                html[i] = rows[i%l];
            };
            cache[key] = html.join('');
        }
        return cache[key];
    }
});