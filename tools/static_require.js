var jsp  = require('uglify-js').parser,
    pro  = require('uglify-js').uglify,
    fs   = require('fs'),
    path = require('path'),
    util = require('util');
    
var REQUIRE = 'require';
var REQUIRE_TEXT = 'requireText';
var REQUIRE_CSS  = 'requireCss';
var PREFIX  = '__module_';

var JS_EXTS = ['.js'];
var CSS_EXTS = ['.css'];


function new_sate () {
    return {
        required: {},
        requiredCount: 0,
        requiredAsts: [],
        
        requiredCss: {},
        requiredCssFiles: [],
        
        currentPath: '',
        searchPaths: [],
        options: {}
    };
}

var sate = exports.state = null;
    
var walker = pro.ast_walker(),
    walkers = {
       "call": function(expr, args) {
           if (expr[0] === 'name' && expr[1] === REQUIRE) {
               var file = resolve_real_path(args[0][1], JS_EXTS);
                   
               if (!state.required[file]) {
                   file_to_ast(file, true);
               }
               return [this[0], expr, [['num', state.required[file]]] ];
           } else if (expr[0] === 'name' && expr[1] === REQUIRE_TEXT) {
               var file = resolve_real_path(args[0][1], []);
               return ['string', fs.readFileSync(file, 'utf8')];
           } else if (expr[0] === 'name' && expr[1] === REQUIRE_CSS) {
               var file = resolve_real_path(args[0][1], CSS_EXTS);
               if (!state.requiredCss[file]) {
                   state.requiredCss[file] = true;
                   state.requiredCssFiles.push(file);
               }
               return ['num', 1];
           }
           return null;
       },
       "name": function(name) {
           if (name === "__dirname") {
               return ['string', path.dirname(state.currentPath)];
           } else if (name === '__filename') {
               return ['string', state.currentPath];
           }
           return null;
       }
    };
    
function path_to_file (filePath, extNames) {
    var ext = path.extname(filePath);
    if (ext) {
        return path.existsSync(filePath) ? filePath : false;
    } else {
        for (var i=0; i < extNames.length; i++) {
            var tryPath = filePath + extNames[i];
            if (path.existsSync(tryPath)) return tryPath;
        };
    }
    return false;
}

function resolve_path (filePath, extNames) {
    if (filePath.charAt(0) === '.') {
        return path_to_file( path.join(path.dirname(state.currentPath), filePath), extNames );
    } else {
        var searchPaths = [path.dirname(state.currentPath)].concat(state.searchPaths);
        for (var i=0; i < searchPaths.length; i++) {
            var tryPath = path_to_file( path.join(searchPaths[i], filePath), extNames);
            if (tryPath) return tryPath;
        };
    }
    return false;
}

function resolve_real_path (filePath, extNames) {
    var resolvedPath = resolve_path(filePath, extNames);
    if (!resolvedPath) throw new Error('Path ' + filePath + ' not found.');
    return fs.realpathSync(resolvedPath);
}

function file_to_ast (filePath, wrap) {
    state.required[filePath] = state.requiredCount++;
    var oldPath = state.currentPath;
    state.currentPath = filePath;
    var text = fs.readFileSync(filePath, 'utf8');
    if (wrap) {
        text = '(function(global, module) {var exports = this;' + text + '})';
    }
    var ast = jsp.parse(text);
    var newAst = walker.with_walkers(walkers, function() {
        return walker.walk(ast);
    });
    state.currentPath = oldPath;
    state.requiredAsts[state.required[filePath]] = newAst;
}

function static_require (filePath, options) {
    state = exports.state = new_sate();
    filePath = fs.realpathSync(filePath);
    state.currentPath = filePath;
    state.options = options || {};
    state.searchPaths = state.options.searchPaths || [path.dirname(state.currentPath)];
    state.requiredAsts = [];
    
    file_to_ast(filePath, true);
    
    var code = 'var global = this;';
    code    += 'function require(index) { if (!require.cache[index]) {var module = {exports: {}}; require.modules[index].call(module.exports, global, module); require.cache[index] = module.exports} return require.cache[index]; }\n';
    code    += 'require.modules = []; require.cache = [];';
    var body = jsp.parse(code)[1];
    
    if (state.requiredCssFiles.length) {
        var code = state.requiredCssFiles.map(function(filePath) {
            return fs.readFileSync(filePath, 'utf8');
        }).join('\n');
        body.push( ['var', [['__requiredCss', ['string', code]]]] );
    }
    for (var i=0; i < state.requiredCount; i++) {
        body[body.length] =
            [ 'stat', 
                ['assign', 
                    true,
                    ['sub',
                        ['dot', ['name', 'require'], 'modules' ],
                        ['num', i]
                    ],
                    state.requiredAsts[i][1][0][1]
                ]
            ];
    };
    body.push(['stat', ['call', ['name', 'require'], [['num', '0']]]]);
    
    return [ 'toplevel',
      [ [ 'stat',
          [ 'call',
            [ 'function',
              null,
              [],
              body
            ],
            [] ] ] ] ];
    
}

exports.parse = static_require;
exports.gen_code = function(filePath, options) {
    return pro.gen_code(
        static_require(filePath, options),
        options && options.beautify
    );
};