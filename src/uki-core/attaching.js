var utils = require('./utils'),
    env   = require('./env'),
    evt   = require('./event'),
    dom   = require('./dom'),
    fun   = require('./function'),

    Container = require('./view/container.js').Container;


var Attaching = fun.newClass(Container, {
    typeName: 'Attaching',

    _setup: function(initArgs) {
        this._dom = initArgs.dom;
        dom.addClass(this.dom(), 'uki-attaching');
        Container.prototype._setup.call(this, initArgs);
    },

    _createDom: fun.FS,

    parent: function() {
        return null;
    }
});

var instances = null;

Attaching.attach = function(dom, view) {
    dom = dom || env.doc.body;
    var id = dom[env.expando] = dom[env.expando] || env.guid++;
    if (!instances || !instances[id]) {
        register(new Attaching({ dom: dom }));
    }
    return instances[id].appendChild(view);
};

Attaching.instances = function() {
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

        evt.on(env.root, 'resize', function() {
            if (!timeout) {
                timeout = true;
                setTimeout(function(i, len) {
                    timeout = false;
                    utils.forEach(instances, function(a) {
                       a.resized();
                    });
                }, 1);
            }
        });
    }
    var el = a.dom(),
        id = el[env.expando] = el[env.expando] || env.guid++;

    return (instances[id] = a);
}


exports.Attaching = Attaching;
