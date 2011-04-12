var fun   = require('../../uki-core/function'),
    dom   = require('../../uki-core/dom'),
    utils = require('../../uki-core/utils'),
    view  = require('../../uki-core/view'),
    build = require('../../uki-core/builder').build,

    Container = require('../../uki-core/view/container').Container,
    Mustache  = require('../../uki-core/mustache').Mustache;


var PLACEHOLDER_CLASSNAME = '__HTMLLayout__';

/**
 * Power to the users!
 */
var HTMLLayout = view.newClass('HTMLLayout', Container, {

    template: fun.newProp('template'),
    _template: '',

    data: fun.newProp('data', function(data) {
        this._data = this._data2views(data);
        this.dom().innerHTML = Mustache.to_html(
            this.template(), this._data2mustache(this.data()));
        this._replacePlaceholders();
    }),
    _data: {},

    childViews: fun.newProp('childViews'),
    _childViews: [],

    _data2views: function(data) {
        var result = utils.isArray(data) ? [] : {};
        // build view declaration
        utils.forEach(data, function(value, key) {
            if (typeof value === 'object') {
                result[key] = value.typeName ? value :
                              value.view     ? build(value)[0] :
                              this._data2views(value);
            } else {
                result[key] = value;
            }
        }, this);
        return result;
    },

    _data2mustache: function(data, prefix) {
        var result = utils.isArray(data) ? [] : {};
        prefix = prefix ? prefix + '.' : '';
        utils.forEach(data, function(value, key) {
            if (typeof value === 'object') {
                if (value.typeName) {
                    result[key] = '<div class="' + PLACEHOLDER_CLASSNAME +
                        '" data-path="' + dom.escapeHTML(prefix + key) +
                        '"></div>';
                    result[key + '__view'] = value;
                } else {
                    result[key] = this._data2mustache(value, prefix + key);
                }
            } else {
                result[key] = value;
            }
        }, this);
        return result;
    },

    _replacePlaceholders: function() {
        this.childViews([]);
        var count = 0,
            placeholders = byClassName(this.dom(), PLACEHOLDER_CLASSNAME);

        utils.forEach(placeholders, function(el) {
            var key   = el.getAttribute('data-path'),
                child = utils.path2obj(key, this.data());

            child._viewIndex = count++;
            child.parent(this);
            el.parentNode.replaceChild(child.dom(), el);
            this._childViews.push(child);
        }, this);
    }
});

function byClassName(dom, className) {
    return utils.toArray(dom.getElementsByClassName(className));
}


require('../../uki-core/collection').Collection
.addProps([
    'data', 'template'
]);
exports.HTMLLayout = HTMLLayout;
