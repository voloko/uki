// Load jquery
// Minimal broswer api to make it work
var GenericNode = function() {
    this.childViews = [];
    this.style = {};
    this.nextSibling = null;
    this.listeners = {};
    this.parentNode = null;
}
GenericNode.prototype = {
    appendChild: function(node) {
        this.childViews.push(node);
        node.parentNode = this;
        node.nextSibling = null;
    },
    insertBefore: function(node, before) {
        this.childViews.push(node);
        node.parentNode = this;
        node.nextSibling = before;
    },
    removeChild: function(node) {
        node.parentNode = null;
        node.nextSibling = null;
    },
    getElementsByTagName: function() { 
        return  this.childViews; 
    },
    addEventListener: function(type, handler) {
        this.listeners[type] = this.listeners[type] || [];
        this.listeners[type].push(handler);
    },
    _fireEvent: function(type, e) {
        e = e || {};
        e.type = type;
        e.target = e.target || this;
        for (var i=0, listeners = this.listeners[type] || [], l = listeners.length; i < l; i++) {
            listeners[i].call(this, e);
        };
        if (this != global.document) (this.parentNode || global.document)._fireEvent(type, e);
    }
};


global.document = new GenericNode();
global.document.documentElement = {compareDocumentPosition: ''};
global.document.createElement = function(tagName) {
    var e = new GenericNode(); e.tagName = tagName.toUpperCase(); return e; 
};
global.document.createComment = function() {return new GenericNode(); };
global.document.getElementsByTagName = function() {};
global.document.documentElement = new GenericNode();
global.document.getElementById = function() { return new GenericNode(); };

global.navigator = {
    userAgent: '',
    toString: function() { return ''; }
};
global.location = {
    href: '',
    toString: function() { return ''; }
};

