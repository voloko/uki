var uki = require('uki-core'),
    Base = uki.view.Base,
    txt = {};

requireCss('./text/text.css');

txt.Text = uki.newClass(Base, {
    typeName: 'Text',
    
    _createDom: function() {
        this._dom = uki.createElement('div', { className: 'uki-text' });
    }
});

txt.P = uki.newClass(Base, {
    typeName: 'P',
    
    _createDom: function() {
        this._dom = uki.createElement('p', { className: 'uki-text-p' });
    }
});


txt.Label = uki.newClass(Base, {
    typeName: 'Label',
    
    _createDom: function(initArgs) {
        this._dom = uki.createElement(initArgs.tagName || 'label', { className: 'uki-label' });
    }
});
uki.delegateProp(txt.Label.prototype, 'for', '_dom');



txt.Header = uki.newClass(Base, {
    typeName: 'Header',
    
    _createDom: function() {
        this._dom = uki.createElement('h1', { className: 'uki-header uki-header_size_medium' });
    },
    
    size: uki.view.newClassMapProp({
        'small': 'uki-header_size_small',
        'medium': 'uki-header_size_medium',
        'large': 'uki-header_size_large'
    })
});



uki.extend(uki.view, txt);
uki.extend(exports, txt);