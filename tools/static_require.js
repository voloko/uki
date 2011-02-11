var jsp = require('./lib/parse-js'),
    pro = require('./lib/process'),
    fs = require('fs'),
    path = require('path'),
    util = require('util');
    
var REQUIRE = 'require';
var PREFIX  = '__module_';

var included = {},
    includedCount = 0,
    currentDir = '',
    searchPaths = [];
    
var walker = pro.ast_walker(),
    walkers = {
       "call": function(expr, args) {
           if (expr[0] == 'name' && expr[1] == REQUIRE) {
               var stack = walker.stack(),
                   parent = stack[stack.length - 1],
                   file = resolve_real_path(parent[2][0][1]);
                   
               if (included[file]) {
                   return ['name', PREFIX + included[file]];
               } else {
                   var ast = file_to_ast(file, true);
                   return ast;
               }
           }
           return null;
       }
    };
    
function path_to_file (filePath) {
    var ext = path.extname(filePath);
    if (ext) {
        return path.existsSync(filePath) ? filePath : false;
    } else {
        var extNames = ['.js'];
        for (var i=0; i < extNames.length; i++) {
            var tryPath = filePath + extNames[i];
            if (path.existsSync(tryPath)) return tryPath;
        };
    }
    return false;
}

function resolve_path (filePath) {
    if (filePath.charAt(0) === '/') {
        filePath = filePath.substr(1);
        for (var i=0; i < searchPaths.length; i++) {
            var tryPath = path_to_file( path.join(searchPaths[i], filePath) );
            if (tryPath) return tryPath;
        };
    } else {
        return path_to_file( path.join(currentDir, filePath) );
    }
    return false;
}

function resolve_real_path (filePath) {
    var resolvedPath = resolve_path(filePath);
    if (!resolvedPath) throw new Error('Path ' + filePath + ' not found');
    return fs.realpathSync(resolvedPath);
}

function file_to_ast (filePath, wrap) {
    included[filePath] = includedCount++;
    var oldDir = currentDir;
    currentDir = path.dirname(filePath);
    var text = fs.readFileSync(filePath, 'utf8');
    if (wrap) {
        text = '(' + PREFIX + included[filePath] + ' = ' +
                '(function() {var exports = this;' +
                text +
                '\nreturn this;}).call({}))';
    }
    var ast = jsp.parse(text);
    var newAst = walker.with_walkers(walkers, function() {
        return walker.walk(ast);
    });
    currentDir = oldDir;
    return newAst;
}

function static_require (filePath, options) {
    filePath = fs.realpathSync(filePath);
    included = {};
    includedCount = 0;
    currentDir = path.dirname(filePath);
    options = options || {};
    searchPaths = options.searchPaths || [currentDir];
    var ast = file_to_ast(filePath),
        modules = [];
        
    for (var i=1; i < includedCount; i++) {
        modules.push([PREFIX + (i+1)]);
    };
    
    var body = [];
    body.push([ 'var', [[ 'global', ['object', []] ]] ]);
    if (modules.length) body.push([ 'var', modules ]);
    body.push(ast);
    
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