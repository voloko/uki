/**
@example_title Controls
@example_order 20
@example_html
    <style>body, html { overflow: hidden; margin: 0; padding: 0; }</style>
    <div id="test" style="width: 90%; height: 300px;"></div>
    <script src="/src/uki.cjs"></script>
    <script src="controls.js"></script>
*/


// controlls description
function views() {
    return [    
        { view: 'Button',   rect: '10 10 200 24',  anchors: 'left top', text: 'focusable button!' },
        { view: 'MultilineTextField', rect: '10 35 200 40', anchors: 'left top', value: 'textarea' },
        
        { view: 'Checkbox', rect: '250 10 24 24',  anchors: 'left top', name: 'probe' },
        { view: 'Label',    rect: '275 10 100 24', anchors: 'left top', html: 'Checkbox 1' },
        { view: 'Checkbox', rect: '250 35 24 24',  anchors: 'left top', checked: true },
        { view: 'Label',    rect: '275 35 100 24', anchors: 'left top', text: 'Checkbox 2' },
        
        { view: 'Radio',    rect: '720 10 24 24',  anchors: 'left top', name: 'probe', group: 'radio_1' },
        { view: 'Label',    rect: '745 10 100 24', anchors: 'left top', html: 'Radio 1' },
        { view: 'Radio',    rect: '720 35 24 24',  anchors: 'left top', checked: true, group: 'radio_1' },
        { view: 'Label',    rect: '745 35 100 24', anchors: 'left top', text: 'Radio 2' },
        
        { view: 'TextField',rect: '400 10 100 24', anchors: 'left top', value: "Small input", placeholder: 'text' },
        { view: 'PasswordTextField',rect: '400 36 100 24', anchors: 'left top', value: "Small input", placeholder: 'text' },
        { view: 'Button',   rect: '510 10 200 24', anchors: 'left top', text: 'button without focus!', focusable: false },
        { view: 'TextField',rect: '820 10 100 34', anchors: 'right top', value: "Big input" },
        { view: 'Slider',   rect: '400 65 150 24', anchors: 'right top left width' }
    ];
}

// page layout
uki(
    { view: 'Box', rect: '0 0 1000 300', minSize: '980 0', anchors: 'top left right width', childViews: [
        { view: 'Box', background: 'theme(panel)', rect: '0 0 1000 100', // controlls on panel background
            anchors: 'top left right width', childViews: views() },
        { view: 'Box',  rect: '0 150 1000 100', anchors: 'top left right width', // controlls on page background
            childViews: views() }
    ]}
).attachTo( document.getElementById('test'), '1000 300' );

// Bind alert to all buttons
uki('Button').bind('click', function() { 
    alert(uki('TextField').attr('value'));
});

// On slider move update last TextField
uki('Slider').bind('change', function() {
   uki(this.parent()).find('> TextField:last').value(this.value())
});

// Make label work as labels in browser
uki('Label').click(function() {
   if (this.prevView().checked) this.prevView().checked(!this.prevView().checked()).focus();
});