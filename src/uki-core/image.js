include('uki.js');
include('dom.js');

/**
 * Creates image element from url
 *
 * @param {string} url Image url
 * @param {string=} dataUrl Data url representation of image, used if supported
 * @param {boolean=} alpha If image has transparent parts
 *
 * @returns {Element}
 */
uki.image = function(url, dataUrl, alpha) {
    var result = new Image();
    if (uki.image.dataUrlSupported && dataUrl) {
        result.src = dataUrl;
    } else {
        result.src = url;
        if (alpha && uki.image.needAlphaFix) {
            var dummy = uki.createElement('div', 'overflow:hidden;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + url + '",sizingMethod="scale")');
            uki.image.load([result], function() {
                dummy.style.width = result.width + 'px';
                dummy.style.height = result.height + 'px';
                dummy.width = result.width;
                dummy.height = result.height;
                if (dummy.onload) dummy.onload();
            });
            return dummy;
        }
    } 
    return result;
};

/**
 * Selects image src depending on browser
 *
 * @param {string} url Image url
 * @param {string=} dataUrl Data url representation of image, used if supported
 * @param {boolean=} alphaUrl Gif image url for IE6
 *
 * @returns {string}
 */
uki.imageSrc = function(url, dataUrl, alphaUrl) {
    if (uki.image.dataUrlSupported && dataUrl) return dataUrl;
    if (alphaUrl && uki.image.needAlphaFix) return alphaUrl;
    return url;
};

/**
 * Image html representation: '<img src="">'
 *
 * @param {string} url Image url
 * @param {string=} dataUrl Data url representation of image, used if supported
 * @param {boolean=} alphaUrl Gif image url for IE6
 * @param {string=} html Additional html
 *
 * @returns {string} html
 */
uki.imageHTML = function(url, dataUrl, alphaUrl, html) {
    if (uki.image.needAlphaFix && alphaUrl) {
        url = alphaUrl;
    } else if (uki.image.dataUrlSupported) {
        url = dataUrl;
    }
    return '<img' + (html || '') + ' src="' + url + '" />';
};

/**
 * Loads given images, callbacks after all of them loads
 *
 * @param {Array.<Element>} images Images to load
 * @param {function()} callback
 */
uki.image.load = function(images, callback) {
    var imagesToLoad = images.length;
    
    uki.each(images, function(i, img) {
        if (!img || img.width) {
            if (!--imagesToLoad) callback();
            return;
        }

        var handler = function() {
                img.onload = img.onerror = img.onabort = null; // prevent mem leaks
                if (!--imagesToLoad) callback();
            };
		img.onload  = handler;
		img.onerror = handler;
		img.onabort = handler;
    });
};

uki.image.dataUrlSupported = doc.createElement('canvas').toDataURL || (/MSIE (8)/).test(ua);
uki.image.needAlphaFix = /MSIE 6/.test(ua);
if(uki.image.needAlphaFix) doc.execCommand("BackgroundImageCache", false, true);
