include('const.js');
include('uki.js');
include('utils.js');

/**
 * Basic utils to work with the dom tree
 * @namespace
 * @author voloko
 */
uki.dom = {
    /**
     * Convenience wrapper around document.createElement
     * Creates dom element with given tagName, cssText and innerHTML
     *
     * @param {string} tagName
     * @param {string=} cssText
     * @param {string=} innerHTML
     * @returns {Element} created element
     */
    createElement: function(tagName, cssText, innerHTML) {
        var e = doc.createElement(tagName);            
        if (cssText) e.style.cssText = cssText;
        if (innerHTML) e.innerHTML = innerHTML;
        e[expando] = uki.guid++;
        return e;
    },
    
    /**
     * Adds a probe element to page dom tree, callbacks, removes the element
     *
     * @param {Element} dom Probing dom element
     * @param {function(Element)} callback
     */
    probe: function(dom, callback) {
        var target = doc.body;
        target.appendChild(dom);
        var result = callback(dom);
        target.removeChild(dom);
        return result;
    },
    
    /**
     * Assigns layout style properties to an element
     *
     * @param {CSSStyleDeclaration} style Target declaration
     * @param {object} layout Properties to assign
     * @param {object=} prevLayout If given assigns only difference between layout and prevLayout
     */
    layout: function(style, layout, prevLayout) {
        prevLayout = prevLayout || {};
        if (prevLayout.left   != layout.left)   style.left   = layout.left + PX;
        if (prevLayout.top    != layout.top)    style.top    = layout.top + PX;
        if (prevLayout.right  != layout.right)  style.right  = layout.right + PX;
        if (prevLayout.bottom != layout.bottom) style.bottom = layout.bottom + PX;
        if (prevLayout.width  != layout.width)  style.width  = MAX(layout.width, 0) + PX;
        if (prevLayout.height != layout.height) style.height = MAX(layout.height, 0) + PX;
        return layout;
    },
    
    /**
     * Computed style for a give element
     *
     * @param {Element} el
     * @returns {CSSStyleDeclaration} style declaration
     */
    computedStyle: function(el) {
        if (doc && doc.defaultView && doc.defaultView.getComputedStyle) {
            return doc.defaultView.getComputedStyle( el, null );
        } else if (el.currentStyle) {
            return el.currentStyle;
        }
    },
    
    /**
     * Checks if parent contains child
     *
     * @param {Element} parent 
     * @param {Element} child 
     * @return {Boolean}
     */
    contains: function(parent, child) {
        try {
            if (parent.contains) return parent.contains(child);
            if (parent.compareDocumentPosition) return !!(parent.compareDocumentPosition(child) & 16);
        } catch (e) {}
        while ( child && child != parent ) {
            try { child = child.parentNode } catch(e) { child = null };
        }
        return parent == child;
    },
    
    createStylesheet: function(code) {
        var style = doc.createElement('style');
        doc.getElementsByTagName('head')[0].appendChild(style);
        if (style.styleSheet) { //IE
            style.styleSheet.cssText = code;
        } else {
            style.appendChild(document.createTextNode(code));
        }
        return style;
    }
    
};

uki.each(['createElement'], function(i, name) {
    uki[name] = uki.dom[name];
});
