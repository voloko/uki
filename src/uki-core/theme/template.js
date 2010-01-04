include('../theme.js');

uki.theme.Template = function(code) {
    var parts = code.split('${'), i, l, tmp;
    this.parts = [parts[0]];
    this.names = [];
    for (i=1, l = parts.length; i < l; i++) {
        tmp = parts[i].split('}');
        this.names.push(tmp[0]);
        this.parts.push('');
        this.parts.push(tmp[1]);
    };
};

uki.theme.Template.prototype.render = function(values) {
    for (var i=0, names = this.names, l = names.length; i < l; i++) {
        this.parts[i*2+1] = values[names[i]] || '';
    };
    return this.parts.join('');
};