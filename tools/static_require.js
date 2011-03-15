var jsp  = require('uglify-js').parser,
    pro  = require('uglify-js').uglify,
    fs   = require('fs'),
    path = require('path'),
    util = require('util'),
    cssom = require('cssom'),
    mime = require('mime'),
    url = require('url'),
    mod = require('module');
    
var REQUIRE = 'require';
var REQUIRE_TEXT = 'requireText';
var REQUIRE_CSS  = 'requireCss';
var TO_DATA_URI  = 'toDataUri';
var PREFIX  = '__module_';


function new_sate () {
    return {
        required: {},
        requiredCount: 0,
        requiredAsts: [],
        
        requiredCss: {},
        requiredCssFiles: [],
        requiredCssUsed: false,
        
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
               var file = resolvePath(args[0][1]);
                   
               if (state.required[file] === undefined) {
                   addFileToAstList(file, true);
               }
               return [this[0], expr, [['num', state.required[file]]] ];
           } else if (expr[0] === 'name' && expr[1] === REQUIRE_TEXT) {
               var file = resolvePath(args[0][1]);
               return ['string', fs.readFileSync(file, 'utf8')];
           } else if (expr[0] === 'name' && expr[1] === REQUIRE_CSS) {
               var file = resolvePath(args[0][1]);
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
           } else if (name === '__requiredCss') {
               state.requiredCssUsed = true;
               return null;
           }
           return null;
       }
    };
    
function imagePathToDataUri (filePath) {
    var contentType = mime.lookup( path.extname(filePath) ),
        buffer = fs.readFileSync(filePath);
    return 'data:' + contentType + ';base64,' + buffer.toString('base64');
}

function absoluteImagePath (filePath) {
    return filePath.substring(state.options.serverRoot.length);
}
    
function dataUriCssImages (cssPath, string) {
    return string.replace(/url\(([^)]+)\)/, function(_, filePath) {
        var imagePath = path.join( path.dirname(cssPath), filePath );
        return 'url(' + imagePathToDataUri(imagePath) + ')';
    });
}

function addIEBackground (cssPath, style, sourceValue) {
    if (style['*background-image']) return;
    var filePath = sourceValue.match(/url\(([^)]+)\)/)[1],
        url = path.join( path.dirname(cssPath), filePath );
        
    style.setProperty('*background-image', 'url(' + absoluteImagePath(url) + ')');
}
    
function processCssIncludes (cssPath) {
    var code = fs.readFileSync(cssPath, 'utf8');
    var styleSheet = cssom.parse(code);
    styleSheet.cssRules.forEach(function(rule) {
        var style = rule.style;
        if (style.background) {
            var newBg = dataUriCssImages(cssPath, style.background);
            if (newBg != style.background) {
                addIEBackground(cssPath, style, style.background);
                style.background = newBg;
            }
        }
        if (style['background-image']) {
            var newBg = dataUriCssImages(cssPath, style['background-image']);
            if (newBg != style['background-image']) {
                addIEBackground(cssPath, stle, style['background-image']);
                style['background-image'] = newBg;
            };
        }
    });
    return styleSheet + '';
}
    
function resolvePath (filePath) {
    var resolvedPath = mod._findPath(filePath, 
        [path.dirname(state.currentPath)].concat(state.options.searchPaths));
    if (!resolvedPath) throw new Error('Path ' + filePath + ' not found.');
    return fs.realpathSync(resolvedPath);
}

function addFileToAstList (filePath, wrap) {
    state.required[filePath] = state.requiredCount++;
    var oldPath = state.currentPath;
    state.currentPath = filePath;
    var text = fs.readFileSync(filePath, 'utf8');
    // remove shebang
    text = text.replace(/^\#\!.*/, '');
    var ast;
    if (text.indexOf('@static_require noprocess') === -1) {
        if (wrap) {
            text = '(function(global, module, require) {var exports = this;' + text + '})';
        }
        ast = jsp.parse(text);
        ast = walker.with_walkers(walkers, function() {
            return walker.walk(ast);
        });
    } else {
        if (wrap) {
            text = '(function() { var require = undefined;' + text + '})';
        }
        ast = jsp.parse(text);
    }
    state.currentPath = oldPath;
    state.requiredAsts[state.required[filePath]] = ast;
}

function staticRequire (filePath, options) {
    state = exports.state = new_sate();
    filePath = fs.realpathSync(filePath);
    state.currentPath = filePath;
    var newOptions = {};
    options = Object.create(options || {});
    
    options.searchPaths = options.searchPaths ? options.searchPaths : [];
    options.searchPaths = [path.dirname(state.currentPath)].concat(options.searchPaths);
    
    options.serverRoot = options.serverRoot ? 
        fs.realpathSync(options.serverRoot) : 
        path.dirname(currentPath);
        
    state.options = options;
        
    state.requiredAsts = [];
    
    addFileToAstList(filePath, true);
    
    var code = 'var global = this;';
    code    += 'function require(index) { if (!require.cache[index]) {var module = require.cache[index] = {exports: {}}; require.modules[index].call(module.exports, global, module, require);} return require.cache[index].exports; }\n';
    code    += 'var require_modules = require.modules = []; require.cache = [];';
    var body = jsp.parse(code)[1];
    
    if (state.requiredCssUsed) {
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
                        ['name', 'require_modules'],
                        ['num', i]
                    ],
                    state.requiredAsts[i][1][0][1]
                ]
            ];
    };
    if (options.globalize) {
        var name = options.globalize || 'exports';
        body = body.concat(jsp.parse('global[' + JSON.stringify(name) + '] = require(0);')[1]);
    } else {
        body.push(['stat', ['call', ['name', 'require'], [['num', '0']]]]);
    }
    
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

exports.getAppHandler = function(title, src) {
    return function(req, res) {
        res.send('<!DOCTYPE html><html><head><title>' + title + '</title>' + 
            '<style>body, html { overflow: hidden; width: 100%; hieght: 100%; padding: 0; margin: 0; }</style>' + 
            '</head><body>' +
            '<script src="' + src + '"></script>' +
        '</body></html>');
    };
};

exports.getHandler = function(options) {
    return function(req, res) {
        exports.handle(req, res, options);
    };
};

exports.handle = function(req, res, options) {
    options = options || {};
    var filePath = options.filePath || (url.parse(req.url).pathname.substr(1));
    if (!options.serverRoot) {
        options.serverRoot = process.cwd();
    }
    options.globalize = req.param('globalize');
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
        var code = 'alert(' + JSON.stringify(e.stack + '. Current file ' + exports.state.currentPath) + ')';
        console.log(e.stack);
    }
    res.writeHead(200, { 
        "Content-Type": 'application/javascript',
        "Content-Length": code.length
    });
    res.end(req.method === "HEAD" ? "" : code);
};