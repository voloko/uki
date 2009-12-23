function elements() {
    return [    
        { view: 'Button',   rect: '10px 10px 200px 24px',  anchors: 'left top', text: 'focusable button!' },
        { view: 'TextField',rect: '10 35 200 40', multiline: true, anchors: 'left top', value: 'textarea' },
        { view: 'Checkbox', rect: '250px 10px 24px 24px',  anchors: 'left top', name: 'probe' },
        { view: 'Label',    rect: '275px 10px 100px 24px', anchors: 'left top', html: 'Checkbox 1', selectable: false },
        { view: 'Checkbox', rect: '250px 35px 24px 24px',  anchors: 'left top', checked: true },
        { view: 'Label',    rect: '275px 35px 100px 24px', anchors: 'left top', text: 'Checkbox 2', selectable: false },
        { view: 'TextField',rect: '400 10 100 24',         anchors: 'left top', value: "Small input" },
        { view: 'Button',   rect: '510px 10px 200px 24px', anchors: 'left top', text: 'button without focus!', focusable: false },
        { view: 'TextField',rect: '820 10 100 34',         anchors: 'right top', value: "Big input" },
        { view: 'Slider',   rect: '400 45 310px 24px',     anchors: 'right top left', autosize: 'width' }
    ];
}

uki(
    { view: 'Box', rect: '0 0 1000px 300px', anchors: 'top left right', autosize: 'width', childViews: [
        { view: 'Box', background: 'theme(panel)', rect: '0 0 1000px 100px',     anchors: 'top left right', autosize: 'width', childViews: elements() },
        { view: 'Box',  rect: '0 150px 1000px 100px', anchors: 'top left right', autosize: 'width', childViews: elements() }
    ]}
).attachTo( document.getElementById('test'), '1000 300' );

uki('Button').bind('click', function() { 
    alert(uki('TextField').attr('value'));
});

uki('Slider').bind('change', function() {
   uki(this.parent()).find('> TextField:last').value(this.value())
});