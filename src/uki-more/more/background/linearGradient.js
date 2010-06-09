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
        this._inset = uki.geometry.Inset.create(this._options.inset) || new uki.geometry.Inset();
        this._insetWidth = this._inset.width();
        this._insetHeight = this._inset.height();

        this._container = this._createContainer();
        this._attached = false;
    };
    
    var svgNs = 'http://www.w3.org/2000/svg';
    function svgHelper (tagName, attrs) {
        var el = document.createElementNS(svgNs, tagName);
        if (attrs) uki.each(attrs, function(name, value) {
            el.setAttribute(name, value);
        });
        return el;
    }
    
    this._createContainer = function() {
        var inset = this._inset,
            startColor = this._options.startColor || '#FFFFFF',
            endColor   = this._options.endColor   || '#CCCCCC',
            horizontal = this._options.horizontal,
            css        = this._options.css + ';position:absolute;overflow:hidden;z-index:' + (this._options.zIndex || '-1') + ';' + 
                         'left:' + inset.left + 'px;top:' + inset.top + 'px;right:' + inset.right + 'px;bottom:' + inset.bottom + 'px;' +
                         'background-image:-moz-linear-gradient(0% 100% ' + (horizontal ? '0%' : '90%') + ', ' + endColor + ', ' + startColor + ');' +
                         'background-image:-webkit-gradient(linear, 0% 0%, ' + (horizontal ? '100% 0%' : '0% 100%') + ', from(' + startColor + '), to(' + endColor + '));'
            
            container = uki.createElement('div', css),
            style = container.style;
        if (!(style.background + '').match(/-moz-linear-gradient|-webkit-gradient/)) {
            if (!window.opera && typeof style.filter !== 'undefined') {
                style.filter = 'progid:DXImageTransform.Microsoft.gradient(gradientType=' + (horizontal ? '1' : '0') + ', startColorstr=#FF' + startColor.substr(1) + ', endColorstr=#FF' + endColor.substr(1) + ');';
            } else {
                var svg = svgHelper('svg'),
                    defs = svgHelper('defs'),
                    grad = svgHelper(
                        'linearGradient',
                        {
                            id: 'gradient_' + (uki.guid++),
                            x1: '0%', y1: '0%',
                            x2: horizontal ? '100%' : '0%',
                            y2: horizontal ? '0%' : '100%'
                        }
                    ),
                    stop1 = svgHelper(
                        'stop',
                        {
                            style: 'stop-color: ' + startColor,
                            offset: '0%'
                        }
                    ),
                    stop2 = svgHelper(
                        'stop',
                        {
                            style: 'stop-color: ' + endColor,
                            offset: '100%'
                        }
                    ),
                    rect = svgHelper('rect', {
                        fill: 'url(#' + grad.id  + ')',
                        x: '0', y: '0', width: '100%', height: '100%'
                    });
                    
                svg.id = 'svg_' + (uki.guid++);
                grad.appendChild(stop1);
                grad.appendChild(stop2);
                defs.appendChild(grad);
                svg.appendChild(defs);
                svg.appendChild(rect);
                container.appendChild(svg);
                svg.style.cssText += 'position:absolute;left:0;top:0;width:100%;height:100%;';
            }
        }
        return container;
    };
    
    /**#@-*/
});