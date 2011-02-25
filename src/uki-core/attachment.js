var Container = require('./view/container.js').Container,
    after = require('./after').after,
    utils = require('./utils'),
    uki = require('./uki');

var Attachment = require('./function').newClass(Container, {
    typeName: 'Attachment',

    _setup: function(initArgs) {
        this._dom = initArgs.dom;
        uki.addClass(this._dom, 'uki-attachment');
        Container.prototype._setup.call(this, initArgs);
    },

    _createDom: uki.FS,

    parent: function() {
        return null;
    }
});

exports.Attachment = Attachment;

var instances = null;

Attachment.attach = function(dom, view) {
    dom = dom || uki.doc.body;
    var id = dom[uki.expando] = dom[uki.expando] || uki.guid++;
    if (!instances || !instances[id]) {
        register(new Attachment({ dom: dom }));
    }
    return instances[id].appendChild(view);
};

Attachment.instances = function() {
    var atts = [];
    utils.forEach(instances || {}, function(a) {
        atts.push(a);
    });
    return atts;
};



function register(a) {
    if (!instances) {
        instances = {};
        var timeout = false;

        require('./dom/event').addListener(window, 'resize', function() {
            if (!timeout) {
                timeout = true;
                setTimeout(function(i, len) {
                    after.start();

                    timeout = false;
                    utils.forEach(instances, function(a) {
                       a.resized();
                    });

                    after.stop();
                }, 1);
            }
        });
    }
    var el = a.dom(),
        id = el[uki.expando] = el[uki.expando] || uki.guid++;

    return (instances[id] = a);
}
