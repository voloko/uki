var utils = require('./utils'),
    fun   = require('./function'),

    Collection = require('./collection').Collection;


var Builder = fun.newClass({
    /**
    * @constructor
    */
    init: function(ns) {
        this.namespaces = ns || [global];
        this.build = fun.bind(this.build, this);
    },

    build: function(markup) {
        return withBuilder(this, function() {
            if (markup.length === undefined) {
                markup = [markup];
            }
            return new Collection(utils.map(markup, function(mRow) {
                return this.buildOne(mRow);
            }, this));
        }, this);
    },
    
    buildOne: function(mRow) {
        // return prebuilt rows right away
        if (mRow.typeName) { return mRow; }

        var klass = mRow.view,
            initArgs = mRow.init || {},
            result;

        if (typeof klass === 'string') {
            klass = this.resolvePath(klass);
        }
        if (!klass) {
            throw "builder: Can't find view with type '" + mRow.view + "'";
        } else {
            result = new klass(initArgs);
        }

        copyAttrs(result, mRow);
        return result;        
    },
    
    resolvePath: function(path) {
        for (var i = 0, ns = this.namespaces, length = ns.length, res; i < length; i++) {
            res = utils.path2obj(path, ns[i]);
            if (res) { return res; }
        }
        return false;
    }
});

function copyAttrs(view, mRow) {
    utils.forEach(mRow, function(value, name) {
        if (name == 'view' || name == 'init') { return; }
        utils.prop(view, name, value);
    });
    return view;
}

var defaultBuilder;

function setDefault(builder) {
    exports.build = builder.build;
    exports.namespaces = builder.namespaces;
    defaultBuilder = builder;
}

function withBuilder(builder, callback, context) {
    var oldBuilder = defaultBuilder;
    setDefault(builder);
    var result = callback.call(context || global);
    setDefault(oldBuilder);
    return result;
}

exports.Builder = Builder;
exports.withBuilder = withBuilder;
// expose defaultBuilder to everyone
setDefault(new Builder());
