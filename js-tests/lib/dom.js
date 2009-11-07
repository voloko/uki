// Load jquery
// Minimal broswer api to make it work
var GenericNode = function() {
    this.children = [];
    this.style = {};
    this.nextSibling = null;
}
GenericNode.prototype = {
    appendChild: function(node) {
        this.children.push(node);
        node.parentNode = this;
        node.nextSibling = null;
    },
    insertBefore: function(node, before) {
        this.children.push(node);
        node.parentNode = this;
        node.nextSibling = before;
    },
    removeChild: function(node) {
        node.parentNode = null;
        node.nextSibling = null;
    },
    getElementsByTagName: function() { 
        return  this.children; 
    },
    addEventListener: function() {}
};


global.document = {
    documentElement: {compareDocumentPosition: ''},
    createElement: function() {return new GenericNode(); },
    createComment: function() {return new GenericNode(); },
    getElementsByTagName: function() {},
    documentElement: new GenericNode(),
    getElementById: function() { return new GenericNode(); }
};
global.navigator = {
    userAgent: '',
    toString: function() { return ''; }
};
global.location = {
    href: '',
    toString: function() { return ''; }
};

