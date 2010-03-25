uki.more.view.splitTable = {};

uki.view.declare('uki.more.view.SplitTable', uki.view.Container, function(Base) {
    var Rect = uki.geometry.Rect,
        Size = uki.geometry.Size;
        
    var propertiesToDelegate = 'rowHeight data packSize visibleRectExt render selectedIndex focusable textSelectable multiselect'.split(' ');
    
    
    this._defaultHandlePosition = 200;
    this._headerHeight = 17;
    
    this._style = function(name, value) {
        this._leftHeader.style(name, value);
        this._rightHeader.style(name, value);
        return Base._style.call(this, name, value);
    };
    
    this.columns = uki.newProp('_columns', function(c) {
        this._columns = uki.build(c);
        this._totalWidth = 0;
        this._leftHeader.columns([this._columns[0]]);
        
        this._columns[0].bind('beforeResize', uki.proxy(this._syncHandlePosition, this, this._columns[0]));
        
        for (var i = 1; i < this._columns.length; i++) {
            this._columns[i].position(i - 1);
            this._columns[i].bind('beforeResize', uki.proxy(this._rightColumnResized, this, this._columns[i]));
        };
        this._updateTotalWidth();
        this._rightHeader.columns(Array.prototype.slice.call(this._columns, 1));
        this._splitPane.leftMin(this._columns[0].minWidth() - 1)
        // this._splitPane.handlePosition(this._columns[0].width());
        this._syncHandlePosition(this._splitPane);
    });
    
    uki.each(propertiesToDelegate, function(i, name) { 
        this[name] = function(v) {
            if (v === undefined) return this._leftList[name]();
            this._leftList[name](v);
            this._rightList[name](v);
            return this;
        };
    }, this);
    
    this.hasFocus = function() {
        return this._leftList.hasFocus() || this._rightList.hasFocus();
    };
    
    this.rightColumns = function() {
        return this._rightHeader.columns();
    };
    
    this._rightColumnResized = function(column) {
        this._updateTotalWidth();
        this._horizontalScroll.layout();
    };
    
    this.rowHeight = function(value) {
        if (value === undefined) return this._leftList.rowHeight();
        this._leftList.rowHeight(value);
        this._rightList.rowHeight(value);
        return this;
    };
    
    this.data = function(d) {
        if (d === undefined) return uki.map(this._leftList.data(), function(value, i) {
            return [value].concat(this._rightList.data()[i]);
        }, this);
        
        this._leftList.data(uki.map(d, function(value) {
            return [value[0]];
        }));
        
        this._rightList.data(uki.map(d, function(value) {
            return value.slice(1);
        }));
        
        this._splitPane.minSize(new Size(0, this._leftList.minSize().height));
        this._verticalScroll.layout();
    };
    
    this._createDom = function() {
        Base._createDom.call(this);
        var scrollWidth = uki.view.ScrollPane.initScrollWidth(),
            bodyHeight = this.rect().height - this._headerHeight - scrollWidth,
            contents = uki(
            [
                { 
                    view: 'table.Header', 
                    rect: new Rect(this._defaultHandlePosition, this._headerHeight), 
                    anchors: 'left top' 
                },
                { 
                    view: 'Box',
                    className: 'table-header-container',
                    style: { overflow: 'hidden' },
                    rect: new Rect(this._defaultHandlePosition, 0, this.rect().width - this._defaultHandlePosition - 1, this._headerHeight), 
                    anchors: 'left top right',
                    childViews: { 
                        view: 'table.Header', 
                        rect: new Rect(this.rect().width - this._defaultHandlePosition - 1, this._headerHeight), 
                        anchors: 'top left right', 
                        className: 'table-header' 
                    }
                },
                {
                    view: 'ScrollPane',
                    rect: new Rect(0, this._headerHeight, this.rect().width, bodyHeight),
                    anchors: 'left top right bottom',
                    className: 'table-v-scroll',
                    scrollV: true,
                    childViews: [
                        { 
                            view: 'HSplitPane', 
                            rect: new Rect(this.rect().width, bodyHeight), 
                            anchors: 'left top right bottom',
                            className: 'table-horizontal-split-pane',
                            handlePosition: this._defaultHandlePosition,
                            handleWidth: 1,
                            leftChildViews: [
                                { 
                                    view: 'List', 
                                    rect: new Rect(this._defaultHandlePosition, bodyHeight), 
                                    anchors: 'left top right bottom',
                                    className: 'table-list-left' 
                                }
                            ],
                            rightChildViews: [
                                { 
                                    view: 'Box', 
                                    rect: '0 0 100 100', 
                                    anchors: 'left top right bottom',
                                    style: { overflow: 'hidden' },
                                    rect: new Rect(this.rect().width - this._defaultHandlePosition - 1, bodyHeight), 
                                    childViews: { 
                                        view: 'ScrollPane', 
                                        rect: new Rect(this.rect().width - this._defaultHandlePosition - 1, bodyHeight + scrollWidth), 
                                        scrollableV: false,
                                        scrollableH: true,
                                        anchors: 'left top right bottom',
                                        className: 'table-h-scroll',
                                        childViews: [
                                            { 
                                                view: 'List', 
                                                rect: new Rect(this.rect().width - this._defaultHandlePosition - 1, bodyHeight + scrollWidth), 
                                                anchors: 'left top right bottom' 
                                            }
                                        ]
                                    }
                                    
                                }
                            ]
                        }
                    ]
                },
                { 
                    view: 'ScrollPane', 
                    rect: new Rect(this._defaultHandlePosition + 1, bodyHeight + this._headerHeight, this.rect().width - this._defaultHandlePosition - 1, scrollWidth), 
                    anchors: 'left bottom right',
                    scrollableH: true,
                    scrollableV: false,
                    scrollH: true,
                    className: 'table-h-scroll-bar',
                    childViews: { view: 'Box', rect: '1 1', anchors: 'left top' }
                 }
            ]).appendTo(this);
            
        this._verticalScroll = uki('ScrollPane[className=table-v-scroll]', this)[0];
        this._horizontalScroll = uki('ScrollPane[className=table-h-scroll]', this)[0];
        this._horizontalScrollBar = uki('ScrollPane[className=table-h-scroll-bar]', this)[0];
        this._leftList = uki('List:eq(0)', this)[0];
        this._rightList = uki('List:eq(1)', this)[0];
        this._splitPane = uki('HSplitPane', this)[0];
        this._leftHeader = uki('table.Header:eq(0)', this)[0];
        this._rightHeader = uki('table.Header:eq(1)', this)[0];
        this._rightHeaderContainer = uki('[className=table-header-container]', this)[0];
        this._dummyScrollContents = uki('Box', this._horizontalScrollBar);
        
        this._leftList._scrollableParent = this._verticalScroll;
        this._rightList._scrollableParent = this._verticalScroll;
        this._verticalScroll.bind('scroll', uki.proxy(this._leftList._scrollableParentScroll, this._leftList));
        this._verticalScroll.bind('scroll', uki.proxy(this._rightList._scrollableParentScroll, this._rightList));
        
        this._leftList.render(new uki.more.view.splitTable.Render(this._leftHeader));
        this._rightList.render(new uki.more.view.splitTable.Render(this._rightHeader));
        this._bindEvents();
    };
    
    this._bindEvents = function() {
        this._splitPane.bind('handleMove', uki.proxy(this._syncHandlePosition, this, this._splitPane));
        this._horizontalScroll.bind('scroll', uki.proxy(this._syncHScroll, this, this._horizontalScroll));
        this._horizontalScrollBar.bind('scroll', uki.proxy(this._syncHScroll, this, this._horizontalScrollBar));
        this._leftList.bind('selection', uki.proxy(this._syncSelection, this, this._leftList));
        this._rightList.bind('selection', uki.proxy(this._syncSelection, this, this._rightList));
    };
    
    var updatingHandlePosition = false;
    this._syncHandlePosition = function(source) {
        if (updatingHandlePosition) return;
        updatingHandlePosition = true;
        var w, rect;
        if (source == this._splitPane) {
            w = this._splitPane.handlePosition() + 1;
            this.columns()[0].width(w);
        } else {
            var w = this.columns()[0].width();
            this._splitPane.handlePosition(w - 1).layout();
        }
        
        this._leftHeader.rect(new Rect(w, this._headerHeight)).layout();
        
        rect = this._rightHeaderContainer.rect().clone();
        rect.x = w;
        rect.width = this._rect.width - w - uki.view.ScrollPane.initScrollWidth();
        this._rightHeaderContainer.rect(rect).layout();
        rect = this._horizontalScrollBar.rect().clone();
        rect.x = w;
        rect.width = this._rect.width - w - uki.view.ScrollPane.initScrollWidth();
        this._horizontalScrollBar.rect(rect).layout();
        updatingHandlePosition = false;
    };
    
    var updatingHScroll = false;
    this._syncHScroll = function(source) {
        if (updatingHScroll) return;
        updatingHScroll = true;
        var scroll, target = source == this._horizontalScroll ? this._horizontalScrollBar : this._horizontalScroll;
        scroll = source.scrollLeft();
        target.scrollLeft(scroll);
        this._rightHeader.dom().style.marginLeft = -scroll + 'px'; 
        updatingHScroll = false;
    };
    
    var updatingSelection = false;
    this._syncSelection = function(source) {
        if (updatingSelection) return;
        updatingSelection = true;
        var target = source == this._leftList ? this._rightList : this._leftList;
        target.selectedIndexes(source.selectedIndexes());
        updatingSelection = false;
    };
    
    this._updateTotalWidth = function() {
        this._totalWidth = 0;
        for (var i=1; i < this._columns.length; i++) {
            this._totalWidth += this._columns[i].width();
        };
        this._rightHeader.minSize(new Size(this._totalWidth, 0));
        this._rightList.minSize(new Size(this._totalWidth, this._rightList.minSize().height));
        this._dummyScrollContents.rect(new Rect(this._totalWidth, 1)).parent().layout();
        this._rightHeader.minSize(new Size(this._totalWidth, 0));
        this._horizontalScroll.layout();
    };
    
});

include('splitTable/render.js');