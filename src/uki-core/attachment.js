var Container = require('./view/container.js').Container;

var Attachment = require('function').newClass(Container, {
    _setup: function(initArgs) {
        this._dom = initArgs.dom;
        Base._setup.call(this, initArgs);
    },

    _createDom: require('./function').FS,

    parent: function() {
        return null;
    }
);

/* Class methods */
Attachment.attach = function(dom, view) {
    dom = dom || doc.body;
    var id = dom[expando] = dom[expando] || uki.guid++;
    if (!Attachement._instances || !Attachement._instances[id]) {
        Attachement._register(new Attachment({ dom: dom }));
    }
    return Attachement._instances[id].appendChild(view);
};

Attachment._instances = null;

Attachment._register = function(a) {
    if (!Attachement._instances) {
        Attachement._instances = {};
        var timeout = false;

        require('./dom').addListener(root, 'resize', function() {
            if (!timeout) {
                timeout = true;
                setTimeout(function(i,len) {
                    require('./after').after.start();

                    timeout = false;
                    require('./utils').forEach(Attachement._instances, function(a) {
                       a.resized();
                    });

                    require('./after').after.stop();
                }, 1);
            }
        });
    }
    var el = a.dom(),
        id = el[expando] = el[expando] || uki.guid++;

    return (Attachement._instances[id] = a);
};