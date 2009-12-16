uki( 
    { view: 'Box', rect: '1000 600', anchors: 'left top right bottom', background: '#EEE', childViews: [
        { view: 'Toolbar', rect: '1000 50', anchors: 'left top right', background: 'theme(panel)', buttons: [
            { label: 'Edit', icon: 'url', name: 'edit' },
            { label: 'Push', icon: 'url', name: 'woww'}
        ]}
    ]}
).attachTo( document.getElementById('test'), '1000 600' )