/**
@example_title Vertical and Horizontal flows
@example_order 3062
@example_html
    <script src="/src/uki.cjs"></script>
    <script src="flow.js"></script>
*/


// vertical flow with a single label on the left of the page
uki({ view: 'VFlow', rect: '10 10 100 0', anchors: 'left top', background: '#CCC', className: 'flow', childViews: [
    { view: 'Label', rect: '0 0 100 100', anchors: 'left top', inset: '1 5', html: '<a href="#">Link 1</a>' }
]}).attachTo(window, '100 100');

// horizontal flow with 2 labels at the top of the page
uki({ view: 'HFlow', rect: '120 10 0 100', anchors: 'left top', background: '#CCC', className: 'flow', childViews: [
    { view: 'Label', rect: '0 0 100 20', anchors: 'left top', inset: '1 5', html: '<a href="#">Link 1</a>' },
    { view: 'Label', rect: '0 0 100 20', anchors: 'left top', inset: '1 5', html: '<a href="#">Link 2</a>' }
]}).attachTo(window, '100 100');

// append 10 labels with links to each flow
for (var i=1; i < 11; i++) {
    var l = uki({ view: 'Label', rect: '0 0 100 20', anchors: 'left top', inset: '1 5', html: '<a href="#">Link ' + (i+1) + '</a>' });
    uki('VFlow').append(l);
    l = uki({ view: 'Label', rect: '0 0 100 20', anchors: 'left top', inset: '1 5', html: '<a href="#">Link ' + (i+1) + '</a>' });
    uki('HFlow').append(l);
};

// resize to the number of labels appended and layout
uki('VFlow').resizeToContents('height').layout();
uki('HFlow').resizeToContents('width').layout();

// create button to remove items from vertical flow
uki({ view: 'Button', rect: '0 0 100 22', text: 'Remove' }).attachTo(window, '100 100').click(function() {
    uki('VFlow').removeChild(uki('VFlow').childViews()[1]).resizeToContents('height').layout();
});

// create button to remove items from horizontal flow
uki({ view: 'Button', rect: '0 30 100 22', text: 'Remove from list 2'}).attachTo(window, '100 100').resizeToContents('width').layout().click(function() {
    uki('HFlow').removeChild(uki('HFlow').childViews()[1]).resizeToContents('width').layout();
})