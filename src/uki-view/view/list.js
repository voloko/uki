var uki = require('uki-core'),
    Container = uki.view.Container;

var List = uki.newClass(Container, {}),
    proto = List.prototype;

requireCss('./list/list.css');

proto.typeName = 'List';

proto.spacing = uki.view.newClassMapProp({
    none: 'uki-list_spacing-none',
    small: 'uki-list_spacing-small',
    medium: 'uki-list_spacing-medium',
    large: 'uki-list_spacing-large'
});

proto.horizontal = uki.view.newToggleClassProp('uki-list_horizontal');

proto._createDom = function() {
    this._dom = uki.createElement('ul', {
        className: 'uki-list uki-list_spacing-small uki-list_border-none'
    });
};

/* Wrap children in lis */
proto._removeChildFromDom = function(child) {
    this.dom().removeChild(child.dom().parentNode);
};

proto._appendChildToDom = function(child) {
    var listClass = uki.prop(child, 'listRowClass');
    var li = uki.createElement('li', {
        className: 'uki-list-item' + (listClass ? ' ' + listClass : '')
    });
    li.appendChild(child.dom());
    this.dom().appendChild(li);
};

proto._insertBeforeInDom = function(child, beforeChild) {
    this.dom().insertBefore(
        child.dom().parentNode,
        beforeChild.dom().parentNode
    );
};

uki.view.List = exports.List = List;