var uki = require('uki-core'),
    Container = uki.view.Container;

var Flow = uki.newClass(Container, {}),
    proto = Flow.prototype;

requireCss('./flow/flow.css');

proto.typeName = 'Flow';

proto.spacing = uki.view.newClassMapProp({
    none: 'uki-flow_spacing-none',
    small: 'uki-flow_spacing-small',
    medium: 'uki-flow_spacing-medium',
    large: 'uki-flow_spacing-large'
});

proto.horizontal = uki.view.newToggleClassProp('uki-flow_horizontal');

proto._createDom = function() {
    this._dom = uki.createElement('ul', {
        className: 'uki-flow uki-flow_spacing-small'
    });
};

/* Wrap children in lis */
proto._removeChildFromDom = function(child) {
    this.dom().removeChild(child.dom().parentNode);
};

proto._appendChildToDom = function(child) {
    var flowClass = uki.prop(child, 'flowRowClass');
    var li = uki.createElement('li', {
        className: 'uki-flow-item' + (flowClass ? ' ' + flowClass : '')
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

uki.view.Flow = exports.Flow = Flow;