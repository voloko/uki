var fun = require('../../../uki-core/function'),
    utils = require('../../../uki-core/utils'),
	view = require('../../../uki-core/view'),

    Container = require('../../../uki-core/observable').Container;


var Editor = view.newClass('Editor', Container, {
	_createDom: function(initArgs) {
		Container.prototype._createDom.call(this, initArgs);
	}
});


exports.Editor = Editor;
