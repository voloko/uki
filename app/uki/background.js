include('../uki.js');

(function() {
    var colorRegexp  = /#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?/,
        themeRegexp  = /theme\s*\(\s*([^)]*\s*)\)/,
        cssBoxRegexp = /cssBox\s*\(\s*([^)]*\s*)\)/,
        urlRegexp    = /url\s*\(\s*([^)]*\s*)\)/;
        
    var self = uki.background = function(bg) {
        if (typeof(bg) === 'string') {
            var match;
            if ( match = bg.match(colorRegexp) ) return new self.Css(match[0]);
            if ( match = bg.match(themeRegexp) ) return uki.theme.background( match[1] );
            if ( match = bg.match(cssBoxRegexp) ) return new self.CssBox( match[1] );
            if ( match = bg.match(urlRegexp) ) return new self.Sliced9( {m: [match[1], false, false]} );
        }
        return bg;
    };    
})();
