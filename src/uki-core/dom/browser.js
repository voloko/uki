include('../dom.js');

uki.browser = new function() {
    
    var boxShadow;
    this.cssBoxShadow = function() {
        // Opera 10.5 consistently fails to redraw shadows. Easier to switch off
        boxShadow = boxShadow || (root.opera ? 'unsupported' : checkPrefixes('box-shadow'));
        return boxShadow;
    };
    
    var borderRadius;
    this.cssBorderRadius = function() {
        borderRadius = borderRadius || checkPrefixes('border-radius');
        return borderRadius;
    };
    
    var userSelect;
    this.cssUserSelect = function() {
        userSelect = userSelect || checkPrefixes('user-select');
        return userSelect;
    };
    
    var linearGradient;
    this.cssLinearGradient = function() {
        linearGradient = linearGradient || initLinearGradient();
        return linearGradient;
    };
    
    var canvas;
    this.canvas = function() {
        if (canvas === undefined) canvas = !!uki.createElement('canvas').getContext;
        return canvas;
    };
    
    var filter;
    this.cssFilter = function() {
        if (filter === undefined) filter = typeof uki.createElement('div').style.filter != 'undefined';
        return filter;
    };
    
    function swap (obj, src, dst) {
        var v = obj[src];
        obj[src] = undefined;
        obj[dst] = v;
    }
    this.css = function(css) {
        if (!css) return '';
        if (typeof css == 'string') {
            return css.replace(/(^|[^-])(box-shadow|border-radius|user-select)/g, function(value) {
                var p;
                if ((p = value.indexOf('box-shadow')) > -1) return value.substr(0, p) + uki.browser.cssBoxShadow();
                if ((p = value.indexOf('border-radius')) > -1) return value.substr(0, p) + uki.browser.cssBorderRadius();
                if ((p = value.indexOf('user-select')) > -1) return value.substr(0, p) + uki.browser.cssUserSelect();
            });
        }
        
        uki.each(['boxShadow', 'borderRadius', 'userSelect'], function(k, v) {
            if (css[v]) swap(css, v, uki.camalize( uki.browser[ uki.camalize('css-' + v) ]() ) );
        });
        return css;
    };
    
    this.textStyles = 'font fontFamily fontWeight fontSize textDecoration textOverflow textAlign textShadow overflow color'.split(' ');
    
    function checkPrefixes (dashProp) {
        var e = uki.createElement('div'),
            style = e.style,
            prefixes = ['', '-webkit-', '-moz-'];
            
        for (var i=0; i < prefixes.length; i++) {
            if (style[ uki.camalize(prefixes[i] + dashProp) ] !== undefined) return prefixes[i] + dashProp;
        };
        return 'unsupported';
    }
    
    function initLinearGradient () {
        var e = uki.createElement(
                'div', 
                'background-image:-moz-linear-gradient(right,red,red);'+
                'background-image:linear-gradient(right,red,red);'+
                'background-image:-webkit-gradient(linear,0 0,100% 0,from(red),to(red))'
            ),
            style = e.style,
            bgi = style.backgroundImage + '';
            
        if (bgi.indexOf('-moz-linear-gradient') > -1) {
            return '-moz-linear-gradient';
        } else if (bgi.indexOf('-webkit-gradient') > -1) {
            return '-webkit-gradient';
        } else if (bgi.indexOf('linear-gradient') > -1) {
            return 'linear-gradient';
        } else {
            return 'unsupported';
        }
    }
};

uki.initNativeLayout = function() {
    if (uki.supportNativeLayout === undefined) {
        uki.dom.probe(
            uki.createElement(
                'div', 
                'position:absolute;width:100px;height:100px;left:-999em;', 
                '<div style="position:absolute;left:0;right:0"></div>'
            ),
            function(div) {
                uki.supportNativeLayout = div.childNodes[0].offsetWidth == 100 && !root.opera;
            }
        );
    }
};

// uki.supportNativeLayout = false;
