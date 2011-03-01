/**
* Copyright (c) 2009 Chris Wanstrath (Ruby)
* Copyright (c) 2010 Jan Lehnardt (JavaScript)
* mustache.js - Logic-less templates in JavaScript
*
* @option preserve-header
**/
var utils = require('./utils'),
    dom   = require('./dom');

// this version of mustache does not support pragmas and tag change
var Renderer = function() {};

var otag = "{{",
    ctag = "}}",
    // CSW - Added "+?" so it finds the tighest bound, not the widest
    sectionRegex = new RegExp(otag + "(\\^|\\#)\\s*(.+)\\s*" + ctag +
        "\n*([\\s\\S]+?)" + otag + "\\/\\s*\\2\\s*" + ctag +
        "\\s*", "mg"),
    tagRegex = new RegExp(otag + "(=|!|>|\\{|%)?([^\\/#\\^]+?)\\1?" +
        ctag + "+", "g"),

    is_array = utils.isArray,
    
    trim = utils.trim;


function includes(needle, haystack) {
    return haystack.indexOf(otag + needle) != -1;
}

// Checks whether a value is thruthy or false or 0
function is_kinda_truthy(bool) {
    return bool === false || bool === 0 || bool;
}

function is_object(a) {
    return a && typeof a == "object";
}

Renderer.prototype = {
    buffer: [],
    context: {},

    render: function(template, context, partials, in_recursion) {
        // reset buffer & set context
        if(!in_recursion) {
            this.context = context;
            this.buffer = []; // TODO: make this non-lazy
        }

        // fail fast
        if(!includes("", template)) {
            if(in_recursion) {
                return template;
            } else {
                this.send(template);
                return;
            }
        }

        var html = this.render_section(template, context, partials);
        if(in_recursion) {
            return this.render_tags(html, context, partials, in_recursion);
        }

        this.render_tags(html, context, partials, in_recursion);
    },

    /*
    Sends parsed lines
    */
    send: function(line) {
        if(line != "") {
            this.buffer.push(line);
        }
    },

    /*
    Tries to find a partial in the curent scope and render it
    */
    render_partial: function(name, context, partials) {
        name = trim(name);
        if(!partials || partials[name] === undefined) {
            throw({message: "unknown_partial '" + name + "'"});
        }
        if(typeof(context[name]) != "object") {
            return this.render(partials[name], context, partials, true);
        }
        return this.render(partials[name], context[name], partials, true);
    },

    /*
    Renders inverted (^) and normal (#) sections
    */
    render_section: function(template, context, partials) {
        if(!includes("#", template) && !includes("^", template)) {
            return template;
        }

        var that = this;

        // for each {{#foo}}{{/foo}} section do...
        return template.replace(sectionRegex,
            function(match, type, name, content) {

            var value = that.find(name, context);
            if(type == "^") { // inverted section
                if(!value || is_array(value) && value.length === 0) {
                    // false or empty list, render it
                    return that.render(content, context, partials, true);
                } else {
                    return "";
                }
            } else if(type == "#") { // normal section
                if(is_array(value)) { // Enumerable, Let's loop!
                    return utils.map(value, function(row) {
                        return that.render(content, that.create_context(row),
                            partials, true);
                    }).join("");
                } else if(is_object(value)) { // Object, Use it as subcontext!
                    return that.render(content, that.create_context(value),
                        partials, true);
                } else if(typeof value === "function") {
                    // higher order section
                    return value.call(context, content, function(text) {
                        return that.render(text, context, partials, true);
                    });
                } else if(value) { // boolean section
                    return that.render(content, context, partials, true);
                } else {
                    return "";
                }
            }
        });
    },

    /*
    Replace {{foo}} and friends with values from our view
    */
    render_tags: function(template, context, partials, in_recursion) {
        // tit for tat
        var that = this;

        var tag_replace_callback = function(match, operator, name) {
            switch(operator) {
                case "!": // ignore comments
                    return "";
                case ">": // render partial
                    return that.render_partial(name, context, partials);
                case "{": // the triple mustache is unescaped
                    return that.find(name, context);
                default: // escape the value
                    return dom.escapeHTML(that.find(name, context));
            }
        };
        var lines = template.split("\n");
        for(var i = 0; i < lines.length; i++) {
            lines[i] = lines[i].replace(tagRegex, tag_replace_callback, this);
            if(!in_recursion) {
                this.send(lines[i]);
            }
        }

        if(in_recursion) {
            return lines.join("\n");
        }
    },

    /*
    find `name` in current `context`. That is find me a value
    from the view object
    */
    find: function(name, context) {
        name = trim(name);

        var value;
        if(is_kinda_truthy(context[name])) {
            value = context[name];
        } else if(is_kinda_truthy(this.context[name])) {
            value = this.context[name];
        }

        if(typeof value === "function") {
            return value.apply(context);
        }
        if(value !== undefined) {
            return value;
        }
        // silently ignore unkown variables
        return "";
    },

    // Utility methods
    // by @langalex, support for arrays of strings
    create_context: function(_context) {
        if(is_object(_context)) {
            return _context;
        } else {
            var iterator = ".";
            var ctx = {};
            ctx[iterator] = _context;
            return ctx;
        }
    }
};

var Mustache = {
    version: "0.3.1-uki",

    /*
    Turns a template and view into HTML
    */
    to_html: function(template, view, partials, send_fun) {
        var renderer = new Renderer();
        if(send_fun) {
            renderer.send = send_fun;
        }
        renderer.render(template, view, partials);
        if(!send_fun) {
            return renderer.buffer.join("\n");
        }
    }
}

exports.Mustache = Mustache;
