var data = [];
for (var i=0; i < 4000; i++) {
    data[i] = 'item #' + (i+1);
};

uki(
    { view: 'SplitPane', rect: '1000 600', anchors: 'top left right bottom', autosize: 'width height', handleWidth: 1,
        leftMin: 200, rightMin: 400, handlePosition: 200,
        leftChildViews: [
            { view: 'ScrollPane', rect: '200 600', autosize: 'width height', anchors: 'top left right bottom', 
                childViews: { view: 'Box', rect: '10 10 180 120010', autosize: 'width', anchors: 'top left right', background: '#CCC',
                    childViews: { view: 'List', rect: '10 10 170 120000', autosize: 'width', anchors: 'top left right', data: data }
                }
            }
        ],
        rightChildViews: [
            // { view: 'ScrollPane', rect: '799 600', autosize: 'width height', anchors: 'top left right bottom', background: 'blue' }
        ]
    }
).attachTo( document.getElementById('test'), '1000 600' )