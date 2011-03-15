requireCss('./text/text.css');

var fun  = require('../../uki-core/function'),
    dom  = require('../../uki-core/dom'),
    view = require('../../uki-core/view'),

    Base = require('../../uki-core/view/base').Base;


var Text = view.newClass('Text', Base, {
    _createDom: function() {
        this._dom = dom.createElement('div', { className: 'uki-text' });
    }
});


var P = view.newClass('P', Base, {
    _createDom: function() {
        this._dom = dom.createElement('p', { className: 'uki-text-p' });
    }
});


var Label = view.newClass('Label', Base, {
    _createDom: function(initArgs) {
        this._dom = dom.createElement(initArgs.tagName || 'label', { className: 'uki-label' });
    },
    
    'for': fun.newDelegateProp('for', 'dom')
});


var Header = view.newClass('Header', Base, {
    _createDom: function() {
        this._dom = dom.createElement('h1', { className: 'uki-header uki-header_size_medium' });
    },

    size: view.newClassMapProp({
        'small': 'uki-header_size_small',
        'medium': 'uki-header_size_medium',
        'large': 'uki-header_size_large'
    })
});

require('../../uki-core/collection').Collection.addProps([
    'for'
]);
exports.Text   = Text;
exports.P      = P;
exports.Label  = Label;
exports.Header = Header;
