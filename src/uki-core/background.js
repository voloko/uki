include('uki.js');

(function() {
    var nullRegexp = /^\s*null\s*$/,
        themeRegexp  = /theme\s*\(\s*([^)]*\s*)\)/,
        rowsRegexp = /rows\s*\(\s*([^)]*\s*)\)/,
        cssBoxRegexp = /cssBox\s*\(\s*([^)]*\s*)\)/;
        
    /**
     * Transforms a bg string into a background object
     * Supported strings:
     *   theme(bg-name) Takes background with bg-name from uki.theme
     *   rows(30, #CCFFFF, #FFCCFF, #FFFFCC) Creates Rows background with 30px rowHeight and 3 colors
     *   cssBox(border:1px solid red;background:blue) Creates CssBox background with given cssText
     *   url(i.png) or #FFFFFF Creates Css background with single property
     *
     * @param {String} bg
     * @return {uki.background.Base}
     */
    var self = uki.background = function(bg) {
        if (typeof(bg) === 'string') {
            var match;
            /*jsl:ignore*/
            if ( match = bg.match(nullRegexp) ) return new self.Null();
            if ( match = bg.match(themeRegexp) ) return uki.theme.background( match[1] );
            if ( match = bg.match(rowsRegexp) ) return new self.Rows( match[1].split(',', 2)[0], match[1].split(',', 2)[1] );
            if ( match = bg.match(cssBoxRegexp) ) return new self.CssBox( match[1] );
            /*jsl:end*/
            return new self.Css(bg);
        }
        return bg;
    };    
})();
