var html = '<img src="/app/functional/i/icon.png" width="24" height="24" style="position: absolute; top: 3px; left: -26px;" /> Icon'
uki( 
    { view: 'Box', rect: '1000 600', anchors: 'left top right bottom', background: '#EEE', childViews: [
        { view: 'Toolbar', rect: '0 40 1000 30', anchors: 'left top right', background: 'theme(panel)', buttons: [
            { text: 'Edit', icon: '/app/functional/i/icon.png', size: '24 24', name: 'edit' },
            { text: 'Push the button', icon: '/app/functional/i/icon.png', size: '24 24', name: 'push'},
            { text: 'Shorter 1', icon: '/app/functional/i/icon.png', size: '24 24', name: 'shorter 1'},
            { text: 'Shorter 2', icon: '/app/functional/i/icon.png', size: '24 24', name: 'shorter 2'},
            { text: 'Shorter 3', icon: '/app/functional/i/icon.png', size: '24 24', name: 'shorter 3'},
            { text: 'Shorter 4', icon: '/app/functional/i/icon.png', size: '24 24', name: 'shorter 4'},
            { text: 'Shorter 5', icon: '/app/functional/i/icon.png', size: '24 24', name: 'shorter 5'},
            { text: 'Shorter 1', icon: '/app/functional/i/icon.png', size: '24 24', name: 'shorter 1'},
            { text: 'Shorter 2', icon: '/app/functional/i/icon.png', size: '24 24', name: 'shorter 2'},
            { text: 'Shorter 3', icon: '/app/functional/i/icon.png', size: '24 24', name: 'shorter 3'},
            { text: 'Shorter 4', icon: '/app/functional/i/icon.png', size: '24 24', name: 'shorter 4'},
            { text: 'Shorter 5', icon: '/app/functional/i/icon.png', size: '24 24', name: 'shorter 5'}
        ]}
    ]}
).attachTo( window, '1000 600' )

// uki('Button').resizeToContents().layout();