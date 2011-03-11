// high level browser objects
exports.root    = global;
exports.doc     = exports.root.document || {};
exports.docElem = exports.doc.documentElement;
exports.nav     = exports.root.navigator || {};
exports.ua      = exports.nav.userAgent || '';

exports.guid = 1;
exports.expando = 'uki' + (+new Date);
