/**
 * Global uki constants, for speed optimization and better merging
 */
/** @ignore */
var root = this,
    doc  = root.document || {},
    docElem = doc.documentElement,
    nav = navigator,
    ua  = nav.userAgent,
    arrayPrototype = Array.prototype,
    expando = 'uki' + (+new Date),

    MAX = Math.max,
    MIN = Math.min,
    FLOOR = Math.floor,
    CEIL = Math.ceil;
