include('../label.js');

uki.view.table.Header = uki.newClass(uki.view.Label, new function() {
    var Base = uki.view.Label[PROTOTYPE],
        proto = this;
        
    proto._setup = function() {
        Base._setup.call(this);
        this._multiline = true;
    };
    
    proto.columns = uki.newProp('_columns', function(v) {
        this._columns = v;
        this.html(this._createColumns());
    });
    
    proto._template = ['<div style="width:',0,'px;height:',0,'px;float:left;overflow:hidden;">',0,'</div>'];
    proto._createColumns = function() {
        var html = [],
            template = this._template;
        for(var i = 0, offset = 0, columns = this._columns, l = columns.length; i < l; i++) {
            html[html.length] = columns[i].renderHeader(this.rect().height);
        }
        return html.join('')
    };
});