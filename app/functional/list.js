var data = [];
for (var i=0; i < 30000; i++) {
    data[i] = 'item #' + (i+1);
};
var p = uki(
    { view: 'SplitPane', rect: '1000 600', anchors: 'top left right bottom', autosize: 'width height', handleWidth: 1,
        leftMin: 200, rightMin: 400, handlePosition: 200,
        leftChildViews: [
            { view: 'ScrollPane', rect: '200 600', autosize: 'width height', anchors: 'top left right bottom', 
                childViews: { view: 'Box', rect: '10 10 180 900002', autosize: 'width', anchors: 'top left right', background: '#CCC',
                    childViews: [
                        { view: 'List', rect: '1 1 178 900000', autosize: 'width', anchors: 'top left right', 
                            data: data, rowHeight: 30, id: 'list' }
                    ]
                }
            }
        ],
        rightChildViews: [
            { view: 'Button', rect: '10 10 100 24', anchors: 'left top', text: 'Add +', id: "add", focusable: false },
            { view: 'TextField', rect: '125 10 50 24', anchors: 'left top', placeholder: 'where', value: '7', id: 'add-n' },
            { view: 'TextField', rect: '180 10 200 24', anchors: 'left top', placeholder: 'what', value: 'some text', id: 'add-text' },
            
            { view: 'Button', rect: '10 40 100 24', anchors: 'left top', text: 'Remove -', id: "remove", focusable: false },
            { view: 'TextField', rect: '125 40 50 24', anchors: 'left top', placeholder: 'which', value: '7', id: 'remove-n' },
            
            { view: 'Button', rect: '10 70 100 24', anchors: 'left top', text: 'Selected Index', id: 'selectedIndex', focusable: false },
            { view: 'TextField', rect: '125 70 50 24', anchors: 'left top', placeholder: 'index', value: '7', id: 'selectedIndex-value' }
        ]
    }
).attachTo( document.getElementById('test'), '1000 600' )

uki('#add', p).click(function() { 
    uki('#list')[0].addRow(uki('#add-n').value() || 0, uki('#add-text').value() || 'sample')
})

uki('#remove', p).click(function() {
    uki('#list')[0].removeRow(uki('#remove-n').value());
});

uki('#selectedIndex').click(function() {
    uki('#list').selectedIndex(uki('#selectedIndex-value').value())
})