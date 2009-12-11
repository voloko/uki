var data = [];
for (var i=0; i < 4000; i++) {
    data[i] = 'item #' + (i+1);
};

var p = uki(
    { view: 'SplitPane', rect: '1000 600', anchors: 'top left right bottom', autosize: 'width height', handleWidth: 1,
        leftMin: 200, rightMin: 400, handlePosition: 200,
        leftChildViews: [
            { view: 'ScrollPane', rect: '200 600', autosize: 'width height', anchors: 'top left right bottom', 
                childViews: { view: 'Box', rect: '10 10 180 120010', autosize: 'width', anchors: 'top left right', background: '#CCC',
                    childViews: [
                        { view: 'List', rect: '10 10 160 120000', autosize: 'width', anchors: 'top left right', 
                            data: data, rowHeight: 30, name: 'list' }
                    ]
                }
            }
        ],
        rightChildViews: [
            { view: 'Button', rect: '10 10 100 24', anchors: 'left top', text: 'Add +', name: "add", focusable: false },
            { view: 'TextField', rect: '125 10 50 24', anchors: 'left top', placeholder: 'where', value: '7', name: 'add-n' },
            { view: 'TextField', rect: '180 10 200 24', anchors: 'left top', placeholder: 'what', value: 'some text', name: 'add-text' },
            { view: 'Button', rect: '10 40 100 24', anchors: 'left top', text: 'Remove -', name: "remove", focusable: false },
            { view: 'TextField', rect: '125 40 50 24', anchors: 'left top', placeholder: 'which', value: '7', name: 'remove-n' }
        ]
    }
).attachTo( document.getElementById('test'), '1000 600' )

uki('#add', p).click(function() { 
    p.find('#list')[0].addRow(p.find('#add-n').value() || 0, p.find('#add-text').value() || 'sample')
})