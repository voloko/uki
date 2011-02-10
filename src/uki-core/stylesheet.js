importScripts('uki.js');
importScripts('dom.js');

uki.Stylesheet = (function() {

    this.queue = [];

    this.add = function(style) {
        this.queue.push(style);
    };

    this.apply = function() {
        uki.createStylesheet(this.queue.join('\n'));
        this.queue = [];
    };

    return this;

}).call({});
