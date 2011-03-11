/**#@+ @ignore */
var utils = require('./utils'),
    Collection = require('./collection').Collection,
    idRegexp = /^#((?:[\w\u00c0-\uFFFF_-]|\\.)+)$/,
    chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
    regexps = [ // enforce order
        { name: 'ID', regexp: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/ },
        { name: 'INST', regexp: /\[\s*instanceof\s+((?:[\w\u00c0-\uFFFF_.-]|\\.)+)\s*\]/ },
        { name: 'PROP', regexp: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/ },
        { name: 'TYPE', regexp: /^((?:[\w\u00c0-\uFFFF\*_\.-]|\\.)+)/ },
        { name: 'POS',  regexp: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/ }
    ],
    posRegexp = regexps.POS,
    posFilters = {
        first: function(i) {
            return i === 0;
        },
        last: function(i, match, array) {
            return i === array.length - 1;
        },
        even: function(i) {
            return i % 2 === 0;
        },
        odd: function(i) {
            return i % 2 === 1;
        },
        lt: function(i, match) {
            return i < match[2] - 0;
        },
        gt: function(i, match) {
            return i > match[2] - 0;
        },
        nth: function(i, match) {
            return match[2] - 0 == i;
        },
        eq: function(i, match) {
            return match[2] - 0 == i;
        }
    },
    reducers = {
        TYPE: function(view, match) {
            var expected = match[1];
            if (expected == '*') { return true; }
            var typeName = utils.prop(view, 'typeName');
            return typeName && typeName.length >= expected.length &&
                ('.' + typeName).indexOf('.' + expected) ==
                    (typeName.length - expected.length);
        },

        INST: function(view, match) {
            var obj = utils.path2obj(match[1]);
            return obj && (view instanceof obj);
        },

        PROP: function(view, match) {
            var result = utils.prop(view, match[1]),
                value = result + '',
                type = match[2],
                check = match[4];

            return result == null ? type === "!=" :
                   type === "="   ? value === check :
                   type === "*="  ? value.indexOf(check) >= 0 :
                   type === "~="  ? (" " + value + " ").indexOf(check) >= 0 :
                   !check         ? value && result !== false :
                   type === "!="  ? value != check :
                   type === "^="  ? value.indexOf(check) === 0 :
                   type === "$="  ? value.substr(value.length - check.length) === check :
                   false;
        },

        ID: function(view, match) {
            return reducers.PROP(view, ['', 'id', '=', '', match[1]]);
        },

        POS: function(view, match, i, array) {
            var filter = posFilters[match[1]];
            return filter ? filter(i, match, array) : false;
        }
    },
    mappers = {
        "+": function(context) {
            return utils.unique(
                utils.pluck(context, 'nextView')
            );
        },

        ">": function(context) {
            return utils.unique(flatten(
                utils.pluck(context, 'childViews')
            ));
        },

        "": function(context) {
            return utils.unique(recChildren(flatten(
                utils.pluck(context, 'childViews')
            )));
        },

        "~": function(context) {
            return utils.unique(flatten(
                utils.map(context, function(view) {
                    return view.parent().childViews().
                        slice((view._viewIndex || 0) + 1);
                })
            ));
        }
    };

function recChildren(views) {
    return flatten(utils.map(views, function(view) {
        return [view].concat(recChildren(utils.prop(view, 'childViews')));
    }));
}

function flatten(array) {
   return utils.reduce(array, function(x, e) {
       return x.concat(e);
   }, []);
}

/**#@-*/

/**
 * @namespace
 */
var Selector = {
    /**
     * Finds views by CSS3 selectors in view tree.
     *
     * @example
     *   find('Label') find all labels on page
     *   find('Box[name=main] > Label') find all immediate descendant
     *                                 Labels in a box with name = "main"
     *   find('> Slider', context) find all direct descendant
     *                            Sliders within given context
     *   find('Slider,Checkbox') find all Sliders and Checkboxes
     *   find('Slider:eq(3)') find 3-d slider
     *
     * @param {string} selector
     * @param {Array.<view.Base>} context to search in
     *
     * @return {Collection} found views
     */
    find: function(selector, context, skipFiltering) {

        // quick return for #id case
        var match;
        if (!context && (match = selector.match(idRegexp))) {
            var element = require('./view').byId(match[1]);
            return new Collection(element ? [element] : []);
        }
        context = context || require('./attaching').Attaching.instances();
        if (context.length === undefined) { context = [context]; }

        var tokens = Selector.tokenize(selector),
            expr   = tokens[0],
            extra  = tokens[1],
            result = context,
            mapper;

        while (expr.length > 0) {
            mapper = mappers[expr[0]] ? mappers[expr.shift()] : mappers[''];
            result = mapper(result);
            if (expr.length === 0) { break; }
            result = Selector.reduce(expr.shift(), result);
        }

        if (extra) {
            result = result.concat(Selector.find(extra, context, true));
        }

        return skipFiltering ? result : new Collection(utils.unique(result));
    },

    /** @ignore */
    reduce: function(exprItem, context) {
        if (!context || !context.length) { return []; }

        var match, found;

        while (exprItem) {
            found = false;
            utils.forEach(regexps, function(row, index) {

                /*jsl:ignore*/
                if (!found && (match = exprItem.match(row.regexp))) {
                /*jsl:end*/
                    found = true;
                    context = utils.filter(context, function(view, index) {
                        return reducers[row.name](view, match, index, context);
                    });
                    exprItem = exprItem.replace(row.regexp, '');
                    return false;
                }
            });
            if (!found) { break; }
        }
        return context;
    },

    /** @ignore */
    tokenize: function(expr) {
        var parts = [], match, extra;

        chunker.lastIndex = 0;

        while ((match = chunker.exec(expr)) !== null) {
            parts.push(match[1]);

            if (match[2]) {
                extra = RegExp.rightContext;
                break;
            }
        }

        return [parts, extra];
    }
};


exports.find = Selector.find;
