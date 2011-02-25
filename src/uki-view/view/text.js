requireCss('./text/text.css');

var fun  = require('uki-core/function'),
    dom  = require('uki-core/dom'),
    view = require('uki-core/view'),
    Base = require('uki-core/view/base').Base;

exports.Text = fun.newClass(Base, {
    typeName: 'Text',
    
    _createDom: function() {
        this._dom = dom.createElement('div', { className: 'uki-text' });
    }
});

exports.P = fun.newClass(Base, {
    typeName: 'P',
    
    _createDom: function() {
        this._dom = dom.createElement('p', { className: 'uki-text-p' });
    }
});


exports.Label = fun.newClass(Base, {
    typeName: 'Label',
    
    _createDom: function(initArgs) {
        this._dom = dom.createElement(initArgs.tagName || 'label', { className: 'uki-label' });
    }
});
fun.delegateProp(exports.Label.prototype, 'for', '_dom');



exports.Header = fun.newClass(Base, {
    typeName: 'Header',
    
    _createDom: function() {
        this._dom = dom.createElement('h1', { className: 'uki-header uki-header_size_medium' });
    },
    
    size: view.newClassMapProp({
        'small': 'uki-header_size_small',
        'medium': 'uki-header_size_medium',
        'large': 'uki-header_size_large'
    })
});
