uki(
{   // create a split pane...
    view: 'SplitPane', rect: '1000 600', anchors: 'left top right bottom',
    handlePosition: 300, leftMin: 200, rightMin: 300,
    // ...with button on the left
    leftChildViews: { view: 'Button', rect: '10 10 280 24', anchors: 'top left right', text: 'Clear text field' },
    // ...and a vertical split pane on the right...
    rightChildViews: [
       { view: 'VerticalSplitPane', rect: '693 600', anchors: 'left top right bottom', vertical: true,
           // ...with text field in the top part
           topChildViews: { view: 'TextField', rect: '10 10 280 24', anchors: 'top left', value: '0', id: 'field' },
           // ...and a slider in the bottom
           bottomChildViews: { view: 'Slider', rect: '10 10 673 24', anchors: 'top right left' }
       }
   ]
}).attachTo( window, '1000 600' );

// on slider change update text field
uki('SplitPane Slider').bind('change', function() {
    uki('TextField').value(this.value())
});

// on button click clear the text field
uki('Button[text~="Clear"]').bind('click', function() {
    uki('#field').value('') // find by id
});