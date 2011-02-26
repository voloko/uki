// high level browser objects
exports.root    = window;
exports.doc     = window.document || {};
exports.docElem = exports.doc.documentElement;
exports.nav     = navigator;
exports.ua      = exports.nav.userAgent;

exports.guid = 1;
exports.expando = 'uki' + (+new Date);
