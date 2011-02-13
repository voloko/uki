var jsp  = require('uglify-js').parser,
    pro  = require('uglify-js').uglify,
    fs   = require('fs'),
    path = require('path'),
    util = require('util'),
    cssom = require('cssom'),
    mime = require('connect').utils.mime;
    
var REQUIRE = 'require';
var REQUIRE_TEXT = 'requireText';
var REQUIRE_CSS  = 'requireCss';
var TO_DATA_URI  = 'toDataUri';
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
               var file = resolvePathReal(args[0][1], JS_EXTS);
                   
               if (!state.required[file]) {
                   addFileToAstList(file, true);
               }
               return [this[0], expr, [['num', state.required[file]]] ];
           } else if (expr[0] === 'name' && expr[1] === REQUIRE_TEXT) {
               var file = resolvePathReal(args[0][1], []);
               return ['string', fs.readFileSync(file, 'utf8')];
           } else if (expr[0] === 'name' && expr[1] === REQUIRE_CSS) {
               var file = resolvePathReal(args[0][1], CSS_EXTS);
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
    
function imagePathToDataUri (filePath) {
    var contentType = mime.type( path.extname(filePath) ),
        buffer = fs.readFileSync(filePath);
    return 'data:' + contentType + ';base64,' + buffer.toString('base64');
}
    
function dataUriCssImages (cssPath, string) {
    return string.replace(/url\(([^)]+)\)/, function(_, filePath) {
        var imagePath = path.join( path.dirname(cssPath), filePath );
        return 'url(' + imagePathToDataUri(imagePath) + ')';
    });
}
    
function processCssIncludes (cssPath) {
    var code = fs.readFileSync(cssPath, 'utf8');
    var styleSheet = cssom.parse(code);
    styleSheet.cssRules.forEach(function(rule) {
        var style = rule.style;
        if (style.background) style.background = dataUriCssImages(cssPath, style.background);
        if (style['background-image']) style['background-image'] = dataUriCssImages(cssPath, style['background-image']);
    });
    return styleSheet + '';
}
    
function tryFileExtensions (filePath, extNames) {
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

function resolvePath (filePath, extNames) {
    if (filePath.charAt(0) === '.') {
        return tryFileExtensions( path.join(path.dirname(state.currentPath), filePath), extNames );
    } else {
        var searchPaths = [path.dirname(state.currentPath)].concat(state.searchPaths);
        for (var i=0; i < searchPaths.length; i++) {
            var tryPath = tryFileExtensions( path.join(searchPaths[i], filePath), extNames);
            if (tryPath) return tryPath;
        };
    }
    return false;
}

function resolvePathReal (filePath, extNames) {
    var resolvedPath = resolvePath(filePath, extNames);
    if (!resolvedPath) throw new Error('Path ' + filePath + ' not found.');
    return fs.realpathSync(resolvedPath);
}

function addFileToAstList (filePath, wrap) {
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

function staticRequire (filePath, options) {
    state = exports.state = new_sate();
    filePath = fs.realpathSync(filePath);
    state.currentPath = filePath;
    state.options = options || {};
    state.searchPaths = state.options.searchPaths || [path.dirname(state.currentPath)];
    state.requiredAsts = [];
    
    addFileToAstList(filePath, true);
    
    var code = 'var global = this;';
    code    += 'function require(index) { if (!require.cache[index]) {var module = {exports: {}}; require.modules[index].call(module.exports, global, module); require.cache[index] = module.exports} return require.cache[index]; }\n';
    code    += 'require.modules = []; require.cache = [];';
    var body = jsp.parse(code)[1];
    
    if (state.requiredCssFiles.length) {
        var code = state.requiredCssFiles.map(function(filePath) {
            return processCssIncludes(filePath);
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

exports.parse = staticRequire;

exports.getHandler = function(options) {
    return function(req, res) {
        exports.handle(req, res, options);
    };
};

exports.handle = function(req, res, options) {
    options = options || {};
    var filePath = options.filePath || (req.param(0) + '.js');
    try {
        var ast = staticRequire(filePath, options);
        if (req.param('squeeze')) {
            ast = pro.ast_mangle(ast);
            ast = pro.ast_squeeze(ast);
            ast = pro.ast_squeeze_more(ast);
        }

        var code = pro.gen_code(ast, !req.param('squeeze'));
    } catch (e) {
        require('util').error(e);
        console.log(e.stack);
        var code = 'alert(' + JSON.stringify(e.message + '. Current file ' + exports.state.currentPath) + ')';
    }
    res.writeHead(200, { 
        "Content-Type": 'application/javascript',
        "Content-Length": code.length
    });
    res.end(req.method === "HEAD" ? "" : code);
};