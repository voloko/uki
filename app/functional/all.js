function elements() {
    return [    
        { view: 'Button',   rect: '10px 10px 200px 24px',  anchors: 'left top', text: 'uki is awesome!' },
        { view: 'Checkbox', rect: '250px 10px 24px 24px',  anchors: 'left top' },
        { view: 'Label',    rect: '275px 10px 100px 24px', anchors: 'left top', html: 'Checkbox 1', selectable: false },
        { view: 'Checkbox', rect: '250px 35px 24px 24px',  anchors: 'left top', checked: true },
        { view: 'Label',    rect: '275px 35px 100px 24px', anchors: 'left top', text: 'Checkbox 2', selectable: false },
        { view: 'Input',    rect: '400 10 100 24',         anchors: 'left top', value: "Small input" },
        { view: 'Button',   rect: '510px 10px 200px 24px', anchors: 'left top', text: 'button!' },
        { view: 'Input',    rect: '720 10 100 34',         anchors: 'left top', value: "Big input" },
        { view: 'Slider',   rect: '400 45 310px 24px',     anchors: 'left top', autosize: 'width' }
    ];
}

uki(
    { view: 'Base', rect: '0 0 1000px 800px', anchors: 'top left right', autosize: 'width', childViews: [
        { view: 'Panel', rect: '0 0 1000px 100px',     anchors: 'top left right', autosize: 'width', childViews: elements() },
        { view: 'Base',  rect: '0 150px 1000px 100px', anchors: 'top left right', autosize: 'width', childViews: elements() }
    ]}
).attachTo( document.getElementById('test'), '1000 800' );

uki('Button').bind('click', function() { 
    alert(uki('Input').attr('value'));
});