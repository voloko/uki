/**
@example_title List
@example_order 42
@example_html
    <div id='test' style='width: 80%; height: 400px;'></div>
    <script src="/src/uki.cjs"></script>
    <script src="list.js"></script>
*/

// pregenerate list data (30000k items)
var data = ['this is', '30000k long', 'list'];
for (var i=3; i < 30000; i++) {
    data[i] = 'item #' + (i+1);
};

var p = uki(
    { view: 'HSplitPane', rect: '1000 600', anchors: 'top left right bottom', handleWidth: 1,
        leftMin: 200, rightMin: 400, handlePosition: 200,
        leftChildViews: [ // scrollable list on the left
            { view: 'ScrollPane', rect: '200 600', anchors: 'top left right bottom',
                // with a wrapping box (test background and border)
                childViews: { view: 'Box', rect: '10 10 180 900002', anchors: 'top left right', background: '#CCC',
                    // with indierect child list
                    childViews: { view: 'List', rect: '1 1 178 900000', anchors: 'top left right', 
                            data: data, rowHeight: 30, id: 'list', throttle: 0, multiselect: true, textSelectable: false }
                }
            }
        ],
        rightChildViews: [ // other controlls on the right
        
            // main list controlls
            { view: 'Box', rect: '0 0 400 100', anchors: 'left top', childViews: [
                { view: 'Button', rect: '10 10 100 24', anchors: 'left top', text: 'Add +', id: "add", focusable: false },
                { view: 'TextField', rect: '125 10 50 24', anchors: 'left top', placeholder: 'where', value: '7', id: 'add-n' },
                { view: 'TextField', rect: '180 10 100 24', anchors: 'left top', placeholder: 'what', value: 'some text', id: 'add-text' },
            
                { view: 'Button', rect: '10 40 100 24', anchors: 'left top', text: 'Remove -', id: "remove", focusable: false },
                { view: 'TextField', rect: '125 40 50 24', anchors: 'left top', placeholder: 'which', value: '7', id: 'remove-n' },
            
                { view: 'Button', rect: '10 70 100 24', anchors: 'left top', text: 'Selected Index', id: 'selectedIndex', focusable: false },
                { view: 'TextField', rect: '125 70 50 24', anchors: 'left top', placeholder: 'index', value: '7', id: 'selectedIndex-value' }
            ]},
            
            // additional list to check list + scrollPane integration
            { view: 'Box', rect: '350 0 300 400', anchors: 'left top', childViews: [
                { view: 'Button', rect: '0 0 100 24', anchors: 'left top', id: 'add-s', text: 'add to list 2' },
                { view: 'Button', rect: '200 0 100 24', anchors: 'right top', id: 'remove-s', text: 'remove from list 2' },
                { view: 'ScrollPane', rect: '0 30 300 270', anchors: 'left top', childViews: [
                    { view: 'List', rect: '0 0 300 270', anchors: 'left top rigth', minSize: '0 270', data: ['sample #1', 'sample #2', 'sample #3', 'sample #4'], id: 'list2' }
                ]}
            ] }
            
            
        ]
    }
).attachTo( document.getElementById('test'), '1000 600' )

// first list controlls
uki('#add', p).click(function() { 
    uki('#list')[0].addRow(uki('#add-n').value() || 0, uki('#add-text').value() || 'sample')
});

uki('#remove', p).click(function() {
    uki('#list')[0].removeRow(uki('#remove-n').value());
});

uki('#selectedIndex').click(function() {
    uki('#list').selectedIndex(uki('#selectedIndex-value').value())
});

// second list controlls
uki('#add-s').click(function() {
    uki('#list2').addRow(0, 'text');
});

uki('#remove-s').resizeToContents('width').layout().click(function() {
    uki('#list2').removeRow(0);
});