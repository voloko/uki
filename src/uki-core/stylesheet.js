exports.Stylesheet = {
    queue: [],

    add: function(style) {
        this.queue.push(style);
    },

    apply: function() {
        require('./dom').createStylesheet(this.queue.join('\n'));
        this.queue = [];
    }
};
