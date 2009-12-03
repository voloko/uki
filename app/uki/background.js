include('../uki.js');

(function() {
    var themeRegexp  = /theme\s*\(\s*([^)]*\s*)\)/,
        cssBoxRegexp = /cssBox\s*\(\s*([^)]*\s*)\)/;
        
    var self = uki.background = function(bg) {
        if (typeof(bg) === 'string') {
            var match;
            if ( match = bg.match(themeRegexp) ) return uki.theme.background( match[1] );
            if ( match = bg.match(cssBoxRegexp) ) return new self.CssBox( match[1] );
            return new self.Css(bg);
        }
        return bg;
    };    
})();
