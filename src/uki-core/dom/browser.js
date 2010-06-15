
uki.browser = new function() {
    
    var boxShadow;
    this.cssBoxShadow = function() {
        boxShadow = boxShadow || checkPrefixes('box-shadow', 'BoxShadow');
        return boxShadow;
    };
    
    var borderRadius;
    this.cssBorderRadius = function() {
        borderRadius = borderRadius || checkPrefixes('border-radius', 'BorderRadius');
        return borderRadius;
    };
    
    var userSelect;
    this.cssUserSelect = function() {
        userSelect = userSelect || checkPrefixes('user-select', 'UserSelect');
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
    
    this.css = function(string) {
        if (!string) return '';
        return string.replace(/(^|[^-])(box-shadow|border-radius|user-select)/g, function(value) {
            var p;
            if ((p = value.indexOf('box-shadow')) > -1) return value.substr(0, p) + uki.browser.cssBoxShadow();
            if ((p = value.indexOf('border-radius')) > -1) return value.substr(0, p) + uki.browser.cssBorderRadius();
            if ((p = value.indexOf('user-select')) > -1) return value.substr(0, p) + uki.browser.cssUserSelect();
        })
    };
    
    function checkPrefixes (dashProp, camelProp) {
        var e = uki.createElement('div'),
            style = e.style;
            
        if (style['Webkit' + camelProp] !== undefined) {
            return '-webkit-' + dashProp;
        } else if (style['Moz' + camelProp] !== undefined) {
            return '-moz-' + dashProp;
        } else if (style[camelProp.substr(0, 1).toLowerCase() + camelProp.substr(1)] !== undefined) {
            return dashProp;
        } else {
            return 'unsupported';
        }
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
    
    
    
}