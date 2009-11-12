include('../core.js');
include('../core/utils.js');
include('../geometry.js');

uki.attr = uki.core.attr = function(comp, attr, value) {
    if (arguments.length > 2) {
        if (uki.isFunction(comp[attr])) {
            comp[attr](value);
        } else {
            comp[attr] = value;
        }
    } else {
        if (uki.isFunction(comp[attr])) {
            return comp[attr]();
        } else {
            return comp[attr];
        }
    }
};