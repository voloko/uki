var html = '<img src="/app/functional/i/icon.png" width="24" height="24" style="position: absolute; top: 3px; left: -26px;" /> Icon'
uki( 
    { view: 'Box', rect: '1000 600', anchors: 'left top right bottom', background: '#EEE', childViews: [
        { view: 'Toolbar', rect: '1000 50', anchors: 'left top right', background: 'theme(panel)', buttons: [
            { label: 'Edit', icon: '/app/functional/i/icon.png', size: '24 24', name: 'edit' },
            { label: 'Push', icon: '/app/functional/i/icon.png', size: '24 24', name: 'woww'}
        ]},
        { view: 'Button', rect: '10 100 100 30', anchors: 'left top', backgroundPrefix: 'toolbar-', inset: '0 4 0 30', autosizeToContents: 'width', className: 'button', html: html }
    ]}
).attachTo( window, '1000 600' )

uki('Button').resizeToContents().layout();