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
        this._stack = 0;
    },

    build: function(markup) {
        if (!this._stack++) {
            this._references = {};
        }
        var collection = withBuilder(this, function() {
            if (markup.length === undefined) {
                markup = [markup];
            }
            return new Collection(utils.map(markup, function(mRow) {
                return this.buildOne(mRow);
            }, this), this._references);
        }, this);
        if (!this._stack--) {
            this._references = null;
        }
        return collection;
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
        if (mRow.as) {
            this._references[mRow.as] = result;
        }

        copyAttrs(result, mRow);
        return result;
    },
    
    resolvePath: function(path) {
        for (var i = 0, ns = this.namespaces, length = ns.length, res; 
            i < length; i++) {
            res = utils.path2obj(path, ns[i]);
            if (res) { return res; }
        }
        return false;
    }
});

function copyAttrs(view, mRow) {
    utils.forEach(mRow, function(value, name) {
        if (name === 'view' || name === 'init' || name === 'as') { return; }
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
