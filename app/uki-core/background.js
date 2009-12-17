include('uki.js');

(function() {
    var themeRegexp  = /theme\s*\(\s*([^)]*\s*)\)/,
        rowsRegexp = /rows\s*\(\s*([^)]*\s*)\)/,
        cssBoxRegexp = /cssBox\s*\(\s*([^)]*\s*)\)/;
        
    var self = uki.background = function(bg) {
        if (typeof(bg) === 'string') {
            var match;
            /*jsl:ignore*/
            if ( match = bg.match(themeRegexp) ) return uki.theme.background( match[1] );
            if ( match = bg.match(rowsRegexp) ) return new self.Rows( match[1].split(',', 2)[0], match[1].split(',', 2)[1] );
            if ( match = bg.match(cssBoxRegexp) ) return new self.CssBox( match[1] );
            /*jsl:end*/
            return new self.Css(bg);
        }
        return bg;
    };    
})();
