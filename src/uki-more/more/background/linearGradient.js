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
        this._container.style.cssText += ';left:' + inset.left + 'px;top:' + inset.top + 'px;right:' + inset.right + 'px;bottom:' + inset.bottom + 'px;'

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
    
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    function encode64 (input) {
        var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
    			_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
    			_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}

		return output;
    }
    
    this._createContainer = function() {
        var startColor = this._options.startColor || '#FFFFFF',
            endColor   = this._options.endColor   || '#CCCCCC',
            horizontal = this._options.horizontal,
            css        = this._options.css + 'position:absolute;overflow:hidden;z-index:' + (this._options.zIndex || '-1') + ';' + 
                         'background-image:-moz-linear-gradient(' + (horizontal ? 'right' : 'bottom') + ', ' + endColor + ', ' + startColor + ');' +
                         'background-image:-webkit-gradient(linear, 0% 0%, ' + (horizontal ? '100% 0%' : '0% 100%') + ', from(' + startColor + '), to(' + endColor + '));'
            container = uki.createElement('div', css),
            console.log(css);
            style = container.style;
        if (!(style.background + '').match(/-moz-linear-gradient|-webkit-gradient/)) {
            if (!window.opera && typeof style.filter !== 'undefined') {
                style.filter = 'progid:DXImageTransform.Microsoft.gradient(gradientType=' + (horizontal ? '1' : '0') + ', startColorstr=#FF' + startColor.substr(1) + ', endColorstr=#FF' + endColor.substr(1) + ');';
            } else {
                var svg = '<?xml version="1.0" standalone="no"?>' +
                '<svg viewBox="0 0 1 1" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
                    '<defs>' +
                        '<linearGradient id="g" x1="0" y1="0" ' + (horizontal ? 'x2="100%" y2="0"' : 'x2="0" y2="100%"') + '>' +
                            '<stop offset="0%" stop-color="' + startColor + '"/>' +
                            '<stop offset="100%" stop-color="' + endColor + '"/>' +
                        '</linearGradient>' +
                    '</defs>' +
                    '<rect fill="url(#g)" width="1" height="1"/>' +
                '</svg>';
                
                container.innerHTML = '<div style="position:absolute;left:0;top:0;width:100%;height:100%;background: url(data:image/svg+xml;base64,' + encode64(svg) + ')"></div>'
            }
        }
        return container;
    };
    
    /**#@-*/
});