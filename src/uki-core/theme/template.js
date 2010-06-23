include('../theme.js');

/**
 * Simple and fast (2x-15x faster than regexp) html template
 * @example
 *   var t = new uki.theme.Template('<p class="${className}">${value}</p>')
 *   t.render({className: 'myClass', value: 'some html'})
 */
uki.theme.Template = function(code) {
    var parts = code.split('${'), i, l, tmp;
    this.parts = [parts[0]];
    this.names = [];
    for (i=1, l = parts.length; i < l; i++) {
        tmp = parts[i].split('}');
        this.names.push(tmp.shift());
        this.parts.push('');
        this.parts.push(tmp.join('}'));
    };
};

uki.theme.Template.prototype.render = function(values) {
    for (var i=0, names = this.names, l = names.length; i < l; i++) {
        this.parts[i*2+1] = values[names[i]] || '';
    };
    return this.parts.join('');
};