include('../background.js');

/**
 * Adds a div with given cssText to dom()
 *
 * @class
 */
uki.background.LinearGradient = uki.newClass(uki.background.CssBox, new function() {
    
    var CANVAS_GRADIENT_SIZE = 200;
    
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
    
    var urlCache = {};
    function getGradientURL (startColor, endColor, horizontal, stops) {
        var key = startColor + endColor + (horizontal ? 1 : 0) + uki.map(stops, function(stop) { return stop.pos + '-' + stop.color; });
        if (!urlCache[key]) {
        
            var canvas = document.createElement('canvas');
            canvas.width = canvas.height = CANVAS_GRADIENT_SIZE;
        
            var context = canvas.getContext('2d'),
                gradient = context.createLinearGradient(0, 0, horizontal ? CANVAS_GRADIENT_SIZE : 0, horizontal ? 0 : CANVAS_GRADIENT_SIZE);

            gradient.addColorStop(0, startColor);
            gradient.addColorStop(1, endColor);
            for (var i=0; i < stops.length; i++) {
                gradient.addColorStop(stops[i].pos, stops[i].color);
            };
            context.fillStyle = gradient;
            context.fillRect(0, 0, CANVAS_GRADIENT_SIZE, CANVAS_GRADIENT_SIZE);
            urlCache[key] = canvas.toDataURL && canvas.toDataURL();
        }
        return urlCache[key];
    }
    
    function mosFilter (horizontal, startColor, endColor) {
        return 'filter:progid:DXImageTransform.Microsoft.gradient(gradientType=' + (horizontal ? '1' : '0') + ', startColorstr=#FF' + startColor.substr(1) + ', endColorstr=#FF' + endColor.substr(1) + ');';
    }
    
    
    this._createContainer = function() {
        var startColor = this._options.startColor || '#FFFFFF',
            endColor   = this._options.endColor   || '#CCCCCC',
            horizontal = this._options.horizontal,
            stops      = this._options.stops      || [],
            css        = '',
            i          = 0,
            cssProp    = uki.browser.cssLinearGradient(),
            url;
            
        if (cssProp == '-moz-linear-gradient' || cssProp == 'linear-gradient') {
            css += 'background-image:' + cssProp + '(' + (horizontal ? 'left' : 'top') + ', ' + startColor;
            for (;i<stops.length;i++) {
                css += ',' + stops[i].color + ' ' + (stops[i].pos * 100) + '%';
            }
            css += ', ' + endColor + ');';
        } else if (cssProp == '-webkit-gradient') {
            css += 'background-image:' + cssProp + '(linear, 0% 0%, ' + (horizontal ? '100% 0%' : '0% 100%') + ', from(' + startColor + '), to(' + endColor + ')';
            for (;i<stops.length;i++) {
                css += ',color-stop(' + (stops[i].pos * 100) + '%,' + stops[i].color +')';
            }
            css += ');';
        } else if (!uki.browser.canvas() && uki.browser.cssFilter() && stops.length == 0) {
            css += mosFilter(horizontal, startColor, endColor);
        }
        
        var container = uki.createElement('div', uki.browser.css(this._options.css) + ';position:absolute;overflow:hidden;z-index:' + (this._options.zIndex || '-1') + ';' + css, this._options.innerHTML);
        container.className = 'uki-background-CssBox';
        if (css) return container;
        
        if (uki.browser.canvas() && (url = getGradientURL(startColor, endColor, horizontal, stops))) {
            var img = uki.createElement('img', 'position:absolute;left:0;top:0;width:100%;height:100%;z-index:0;');
            img.src = url;
            container.appendChild(img);
        } else if (uki.browser.cssFilter() && stops.length > 0) {
            stops.unshift({ pos: 0, color: startColor });
            stops.push({ pos: 1, color: endColor });
            var child;
            for (;i<stops.length-1;i++) {
                child = uki.createElement('div', 'position:absolute;z-index:-1' + 
                    ';left:'   + (horizontal ? stops[i].pos * 100 - (i && 1) + '%' : '0') +
                    ';top:'    + (horizontal ? '0' : stops[i].pos * 100 - (i && 1) + '%') +
                    ';width:'  + (horizontal ? (stops[i+1].pos - stops[i].pos) * 100 + 1 + '%' : '100%') +
                    ';height:' + (horizontal ? '100%' : (stops[i+1].pos - stops[i].pos) * 100 + 1 + '%') +
                    ';' + mosFilter(horizontal, stops[i].color, stops[i+1].color)
                );
                container.appendChild(child);
            }
        }
        return container;
    };
    
    /**#@-*/
});