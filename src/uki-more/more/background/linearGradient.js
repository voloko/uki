include('../background.js');

/**
 * Adds a div with given cssText to dom()
 *
 * @class
 */
uki.more.background.LinearGradient = uki.newClass(uki.background.CssBox, new function() {
    
    /**
     * @param options Object { startColor: '#FFFFFF', endColor: '#CCCCCC', horizontal: true, css: 'border: 1px solid #CCC' }
     */
    this.init = function(options) {
        this._options = options;
        var inset = this._inset = uki.geometry.Inset.create(this._options.inset) || new uki.geometry.Inset();
        
        this._container = this._createContainer();
        var clone = this._container.cloneNode(true);
        clone.style.cssText += ';width:100px;height:100px;';
        uki.dom.probe(clone, uki.proxy(function(c) {
            this._insetWidth = c.offsetWidth - 100 + inset.width();
            this._insetHeight = c.offsetHeight - 100 + inset.height();
        }, this));
        this._container.style.cssText += ';left:' + inset.left + 'px;top:' + inset.top + 'px;right:' + inset.right + 'px;bottom:' + inset.bottom + 'px;';

        this._attached = false;
    };
    
    
    this._createContainer = function() {
        var startColor = this._options.startColor || '#FFFFFF',
            endColor   = this._options.endColor   || '#CCCCCC',
            horizontal = this._options.horizontal,
            css        = this._options.css + 'position:absolute;overflow:hidden;z-index:' + (this._options.zIndex || '-1') + ';' + 
                         'background-image:-moz-linear-gradient(' + (horizontal ? 'right' : 'bottom') + ', ' + endColor + ', ' + startColor + ');' +
                         'background-image:-webkit-gradient(linear, 0% 0%, ' + (horizontal ? '100% 0%' : '0% 100%') + ', from(' + startColor + '), to(' + endColor + '));',
            container = uki.createElement('div', css),
            style = container.style;
        if (!(style.backgroundImage + '').match(/-moz-linear-gradient|-webkit-gradient/)) {
            if (!window.opera && typeof style.filter !== 'undefined') {
                style.filter = 'progid:DXImageTransform.Microsoft.gradient(gradientType=' + (horizontal ? '1' : '0') + ', startColorstr=#FF' + startColor.substr(1) + ', endColorstr=#FF' + endColor.substr(1) + ');';
            } else {
                var canvas = document.createElement('canvas');
                canvas.width = canvas.height = 200;
                
                var context = canvas.getContext('2d'),
                    gradient = context.createLinearGradient(0, 0, horizontal ? 200 : 0, horizontal ? 0 : 200);

                gradient.addColorStop(0, startColor);
                gradient.addColorStop(1, endColor);
                context.fillStyle = gradient;
                context.fillRect(0, 0, 200, 200);
                
                canvas.style.cssText += 'position:absolute;left:0;top:0;width:100%;height:100%;';
                container.appendChild(canvas);
            }
        }
        return container;
    };
    
    /**#@-*/
});