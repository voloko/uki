include('../uki.js');
include('dom.js');

(function() {
    var dataUrlSupported = document.createElement('canvas').toDataURL;
    
    uki.image = function(url, dataUrl, alpha) {
        var result = new Image();
        if (dataUrlSupported) {
            result.src = dataUrl;
        } else {
            result.src = absolutizeUrl(url);
        } 
        return result;
    };
    
    function absolutizeUrl (url) {
        if (url.indexOf('://') > 0 || url.charAt(0) == '/') return url;
        return (uki.defaultTheme.imagePath || '') + url;
    }
})();
