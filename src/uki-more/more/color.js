include('../more.js');

(function() {
    
    function rgbToHSL(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min){
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h, s, l];
    }
    
    function filter(val) {
        return (val < 0 || isNaN(val)) ? 0 : ((val > 255) ? 255 : val);  
    }
    
    function modify(val, diff) {
        var result = val;
        if (!isNaN(val)) result += diff; 
        if (result < 0) result = 0;
        if (result > 1) result = 1;
        return result;  
    }
    
    function hslToHexString(h, s, l) {
        var r, g, b;  

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }  

        r = Math.round(r * 255).toString(16);
        g = Math.round(g * 255).toString(16);
        b = Math.round(b * 255).toString(16);
        
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;  

        return '#' + r + g + b;
    }  
    
    
    /**
     * Creates a HSL color from a hex string or numerical [0..255] RGB args
     *
     * @author rsaccon
     * @param {Number | string} Red component or color hex string
     * @param {Number} arg1 Green component 
     * @param {Number} arg1 Blue component 
     * @constructor
     */
    var Color = uki.more.Color = function(arg1, arg2, arg3) {
        var r=255, g=255, b=255;

        if (arguments.length == 1) {

            function process(bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16)
                ];
            }

            var bits = /^(\w{2})(\w{2})(\w{2})$/.exec(arg1);

            if (bits) {
                var channels = process(bits);
                r = filter(channels[0]);
                g = filter(channels[1]);
                b = filter(channels[2]);
            }
        } else if (arguments.length == 3) {
            r = filter(arg1);
            g = filter(arg2);
            b = filter(arg3);
        }

        var hsl = rgbToHSL(r, g, b);
        this.hue = hsl[0];
        this.saturation = hsl[1];
        this.luminance = hsl[2];
    };  
    
    Color.prototype =  /** @lends uki.more.Color.prototype */ { 
        /**
         * Base color
         *
         * @author rsaccon
         * @returns {string} Color as hex string 
         */
        base: function() { 
            return hslToHexString(this.hue, this.saturation, this.luminance); 
        },
        
        /**
         * Increseases the lightness of the Base color
         *
         * @author rsaccon 
         * @param {Number} val  allowed values: [0.0 .. 1.0]
         * @returns {string} Color as hex string 
         */
        lighten: function(val) { 
             return hslToHexString(this.hue, this.saturation, modify(this.luminance, val)); 
        },
        
        /**
         * Decreseases the lightness of the Base color
         *
         * @author rsaccon 
         * @param {Number} val  allowed values: [0.0 .. 1.0]
         * @returns {string} Color as hex string 
         */
        darken: function(val) {
            this.lighten(-1 * val); 
        },
        
        /**
         * Increseases the saturation of the Base color
         *
         * @author rsaccon 
         * @param {Number} val  allowed values: [0.0 .. 1.0]
         * @returns {string} Color as hex string 
         */
        saturate: function(val) { 
            return hslToHexString(this.hue, modify(this.saturation, val), this.luminance); 
        },
        
        /**
         * Decreseases the saturation of the Base color
         *
         * @author rsaccon 
         * @param {Number} val  allowed values: [0.0 .. 1.0]
         * @returns {string} Color as hex string 
         */
        desaturate: function(val) { 
            this.saturate(-1 * val);
        }
    };
})();