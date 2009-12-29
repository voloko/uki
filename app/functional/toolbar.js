var html = '<img src="/app/functional/i/icon.png" width="24" height="24" style="position: absolute; top: 3px; left: -26px;" /> Icon'
uki( 
    { view: 'HorizontalSplitPane', rect: '1000 600', anchors: 'left top right bottom',
        handlePosition: 400,
        leftChildViews: { view: 'Box', rect: '400 600', anchors: 'left top right bottom', background: '#EEE', childViews: [
            { view: 'Toolbar', rect: '0 40 400 30', anchors: 'left top right', background: 'theme(panel)', buttons: [
                { text: 'Edit', size: '24 24', name: 'edit' },
                { text: 'Push the button', size: '24 24', name: 'push'},
                { text: 'Shorter 1', size: '24 24', name: 'shorter 1'},
                { text: 'Shorter 2', size: '24 24', name: 'shorter 2'},
                { text: 'Shorter 3', size: '24 24', name: 'shorter 3'},
                { text: 'Shorter 4', size: '24 24', name: 'shorter 4'},
                { text: 'Shorter 5', size: '24 24', name: 'shorter 5'},
                { text: 'Shorter 1', size: '24 24', name: 'shorter 1'},
                { text: 'Shorter 2', size: '24 24', name: 'shorter 2'},
                { text: 'Shorter 3', size: '24 24', name: 'shorter 3'},
                { text: 'Shorter 4', size: '24 24', name: 'shorter 4'},
                { text: 'Shorter 5', size: '24 24', name: 'shorter 5'},
                { text: 'Shorter 1', size: '24 24', name: 'shorter 1'},
                { text: 'Shorter 2', size: '24 24', name: 'shorter 2'},
                { text: 'Shorter 3', size: '24 24', name: 'shorter 3'},
                { text: 'Shorter 4', size: '24 24', name: 'shorter 4'},
                { text: 'Shorter 5', size: '24 24', name: 'shorter 5'}
            ]}
        ]},
        rightChildViews: { view: 'Button', rect: '0 0 100 100', anchors: 'left top', text: 'hello world', id: 'button' }
    }
).attachTo( window, '1000 600' )

uki({ view: 'Popup', rect: '0 0 100 100', anchors: 'left top', relativeTo: uki('#button')[0], id: 'test' }).show();

uki('#button').click(function() {
    uki('#test').toggle();
})

// uki('Button').resizeToContents().layout();