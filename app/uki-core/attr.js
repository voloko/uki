include('uki.js');
include('utils.js');
include('geometry.js');

uki.attr = function(comp, attr, value) {
    if (value !== undefined) {
        if (uki.isFunction(comp[attr])) {
            comp[attr](value);
        } else {
            comp[attr] = value;
        }
        return comp;
    } else {
        if (uki.isFunction(comp[attr])) {
            return comp[attr]();
        } else {
            return comp[attr];
        }
    }
};