var uki = require('./uki'),
    utils = require('./utils');

/**
 * Basic utils to work with the dom tree
 * @namespace
 * @author voloko
 */
uki.dom = module.exports = {
    /**
     * Convenience wrapper around document.createElement
     * Creates dom element with given tagName, cssText and innerHTML
     *
     * @param {string} tagName
     * @param {string=} cssText
     * @param {string=} innerHTML
     * @returns {Element} created element
     */
    createElement: function(tagName, options, children) {
        var e = uki.doc.createElement(tagName);
        utils.forEach(options || {}, function(value, name) {
            if (name == 'style') e.style.cssText = value;
            else if (name == 'html') e.innerHTML = value;
            else if (name == 'className') e.className = value;
            else e.setAttribute(name, value);
        });
        children && utils.forEach(children, function(c) {
            e.appendChild(c);
        });
        return e;
    },

    removeElement: function(element) {
        if (element && element.parentNode) element.parentNode.removeChild(element);
    },

    createStylesheet: function(code) {
        var style = uki.doc.createElement('style');
        uki.doc.getElementsByTagName('head')[0].appendChild(style);
        if (style.styleSheet) { //IE
            style.styleSheet.cssText = code;
        } else {
            style.appendChild(uki.doc.createTextNode(code));
        }
        return style;
    },
    
    computedStyle: function(el) {
        if (uki.doc.defaultView && uki.doc.defaultView.getComputedStyle) {
            return uki.doc.defaultView.getComputedStyle( el, null );
        } else if (el.currentStyle) {
            return el.currentStyle;
        }
    },    

    fromHTML: function(html) {
        var fragment = uki.doc.createElement('div');
        fragment.innerHTML = html;
        return fragment.firstChild;
    },

    // client rect adjugested to window scroll
    clientRect: function(elem, ignoreScroll) {
        var rect = elem.getBoundingClientRect();
        if (ignoreScroll) return rect;

        var body = uki.doc.body,
            scrollTop  = window.pageYOffset || body.scrollTop,
            scrollLeft = window.pageXOffset || body.scrollLeft;
        return {
            top: rect.top  + scrollTop,
            left: rect.left + scrollLeft,
            width: rect.width,
            height: rect.height
        };
    },

    hasClass: function(elem, className) {
        return (' ' + elem.className + ' ').indexOf(' ' + className + ' ') > -1;
    },

    addClass: function(elem, className) {
        if (!this.hasClass(elem, className))
            elem.className += (elem.className ? ' ' : '') + className;
    },

    removeClass: function(elem, className) {
        elem.className = elem.className
            .replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), ' ')
            .replace(/\s{2,}/g, ' ');
    },

    toggleClass: function(elem, className, condition) {
        if (condition === undefined) condition = !this.hasClass(elem, className);
        condition ? this.addClass(elem, className) : this.removeClass(elem, className);
    }
};
utils.extend(uki, module.exports);