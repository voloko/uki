/**
@example_title SplitPane
@example_order 50
@example_html
    <script src="splitPane.js"></script>
*/

var uki = require('uki');

uki({ view: 'SplitPane', pos: 'l:0 t:0 r:0 b:0', init: { vertical: true },
    leftChildViews: [{ view: 'Button', text: 'left' }],
    rightChildViews: [
        { view: 'SplitPane', pos: 'l:0 t:0 r:0 b:0', handlePosition: 300,
            init: { handleWidth: 5 },
            leftChildViews: [ { view: 'Button', text: 'top' } ], 
            rightChildViews: [ { view: 'Button', text: 'bottom' } ] 
        }
    ]
}).attach();

