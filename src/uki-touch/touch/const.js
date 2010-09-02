include('../../uki-core/const.js'); 

/**
 * Global uki constants, for speed optimization and better merging
 */
/** @ignore */

    // Device sniffing
var isWebkit = /webkit/i.test(ua),
    isIphone = /iphone/i.test(ua)
    isIpad = /ipad/i.test(ua),
    isAndroid = /android/i.test(ua),
    isTouch = isIphone || isIpad || isAndroid,                                    
    isStandalone = nav.standalone,
    
    // Event sniffing
    touchStart = isTouch ? 'touchstart' : 'mousedown',
    touchMove = isTouch ? 'touchmove' : 'mousemove',
    touchEnd = isTouch ? 'touchend' : 'mouseup',
    
    // CSS3 Translate3d helper
    cssHas3d = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()),
    cssTranslateOpen = 'translate' + (cssHas3d ? '3d(' : '('),
    cssTranslateClose = cssHas3d ? ',0)' : ')';
