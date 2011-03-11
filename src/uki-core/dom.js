var env = require('./env'),
    utils = require('./utils');


var trans = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};

/**
 * Basic utils to work with the dom tree
 * @namespace
 * @author voloko
 */
module.exports = {
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
        var e = env.doc.createElement(tagName);
        utils.forEach(options || {}, function(value, name) {
            if (name == 'style') { e.style.cssText = value; }
            else if (name == 'html') { e.innerHTML = value; }
            else if (name == 'className') { e.className = value; }
            else { e.setAttribute(name, value); }
        });
        children && utils.forEach(children, function(c) {
            e.appendChild(c);
        });
        return e;
    },

    removeElement: function(element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    },

    createStylesheet: function(code) {
        var style = env.doc.createElement('style');
        env.doc.getElementsByTagName('head')[0].appendChild(style);
        if (style.styleSheet) { //IE
            style.styleSheet.cssText = code;
        } else {
            style.appendChild(env.doc.createTextNode(code));
        }
        return style;
    },

    computedStyle: function(element) {
        if (env.doc.defaultView && env.doc.defaultView.getComputedStyle) {
            return env.doc.defaultView.getComputedStyle(element, null);
        } else if (element.currentStyle) {
            return element.currentStyle;
        }
    },

    fromHTML: function(html) {
        var fragment = env.doc.createElement('div');
        fragment.innerHTML = html;
        return fragment.firstChild;
    },

    // client rect adjusted to window scroll
    clientRect: function(elem, ignoreScroll) {
        var rect = elem.getBoundingClientRect();
        if (ignoreScroll) { return rect; }

        var body = env.doc.body,
            scrollTop  = env.root.pageYOffset || body.scrollTop,
            scrollLeft = env.root.pageXOffset || body.scrollLeft;
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

    addClass: function(elem, classNames) {
        var string = elem.className;
        utils.forEach(classNames.split(/\s+/), function(className) {
            if (!this.hasClass(elem, className)) {
                string += (string ? ' ' : '') + className;
            }
        }, this);
        elem.className = string;
    },

    removeClass: function(elem, classNames) {
        var string = elem.className;
        utils.forEach(classNames.split(/\s+/), function(className) {
            string = utils.trim(string
                .replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), ' ')
                .replace(/\s{2,}/g, ' '));
        }, this);
        elem.className = string;
    },

    toggleClass: function(elem, className, condition) {
        if (condition === undefined) {
            condition = !this.hasClass(elem, className);
        }
        condition ? this.addClass(elem, className) :
            this.removeClass(elem, className);
    },

    /**
     * Converts unsafe symbols to entities
     *
     * @param {string} html
     * @returns {string} escaped html
     */
    escapeHTML: function(html) {
        return (html + '').replace(/[&<>\"\']/g, function(c) { return trans[c]; });
    }
};
