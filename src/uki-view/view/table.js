include('list.js');

uki.view.table = {};

uki.view.Table = uki.newClass(uki.view.Container, new function() {
    var proto = this,
        Base = uki.view.Container[PROTOTYPE],
        propertiesToDelegate = ['rowHeight', 'data', 'packSize', 'visibleRectExt'];
    
    proto.typeName = function() { return 'uki.view.Table'; };
    proto._rowHeight = 17;
    proto._headerHeight = 21;
    
    uki.each(propertiesToDelegate, function(i, name) { uki.delegateProp(proto, name, '_list'); });
    
    proto.columns = uki.newProp('_columns', function(c) {
        this._columns = uki.build(c);
        this._totalWidth = 0;
        for (var i=0; i < this._columns.length; i++) {
            this._columns[i].position(i);
            this._totalWidth += this._columns[i].width();
        };
        this._list.minSize(new Size(this._totalWidth, 0));
        this._header.columns(this._columns);
    });
    
    proto._createDom = function() {
        Base._createDom.call(this);
        var scrollPaneRect = new Rect(0, this._headerHeight, this.rect().width, this.rect().height - this._headerHeight),
            listRect = scrollPaneRect.clone().normalize(),
            headerRect = new Rect(0, 0, this.rect().width, this._headerHeight),
            listML = { view: 'List', rect: listRect, anchors: 'left top bottom right', render: new uki.view.table.Render(this), className: 'table-list' },
            paneML = { view: 'ScrollPane', rect: scrollPaneRect, anchors: 'left top right bottom', scrollableH: true, childViews: [listML], className: 'table-scroll-pane'},
            headerML = { view: 'table.Header', rect: headerRect, anchors: 'top left right' };
            
        uki.each(propertiesToDelegate, function(i, name) { 
            if (this['_' + name] !== undefined) listML[name] = this['_' + name];
        }, this);
        this._scrollPane = uki.build(paneML)[0];
        this._list = this._scrollPane.childViews()[0];
        this._header = uki.build(headerML)[0];
        this._scrollPane.resizeToContents();
        this.appendChild(this._header);
        this.appendChild(this._scrollPane);
    };
    
    
});

include('table/render.js');
include('table/column.js');
include('table/header.js');
