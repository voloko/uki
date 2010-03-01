

uki.view.declare('uki.more.view.SplitTable', uki.view.Table, function(base) {
    var Rect = uki.geometry.Rect;
    
    
    this._defaultHandlePosition = 200;
    
    this._createDom = function() {
        Base._createDom.call(this);
        var scrollWidth = uki.view.ScrollPane.initScrollWidth(),
            bodyHeight = this.rect().height - this._headerHeight - scrollWidth,
            contents = uki(
            [
                { 
                    view: 'table.Header', 
                    rect: new Rect(0, 0, this.rect().width, this._headerHeight), 
                    anchors: 'top left right', 
                    className: 'table-header' 
                },
                {
                    view: 'ScrollPane',
                    rect: new Rect(0, this._headerHeight, this.rect().width, bodyHeight),
                    anchors: 'left top right bottom',
                    className: 'table-v-scroll',
                    childViews: [
                        { 
                            view: 'SplitPane', 
                            rect: new Rect(this.rect().width, bodyHeight), 
                            anchors: 'left top',
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
                                            anchors: 'left top rect bottom' 
                                        }
                                    ]
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
                    className: 'table-h-scroll-bar'
                 }
            ]).appendTo(this);
            
        this._verticalScroll = uki('ScrollPane[className=table-v-scroll]', this)[0];
        this._horizontalScroll = uki('ScrollPane[className=table-h-scroll]', this)[0];
        this._horizontalScrollBar = uki('ScrollPane[className=table-h-scroll-bar]', this)[0];
        this._leftList = uki('List:eq(0)', this)[0];
        this._rightList = uki('List:eq(1)', this)[0];
        this._splitPane = uki('SplitPane', this)[0];
    };
});