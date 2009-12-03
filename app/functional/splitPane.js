uki(
    { view: 'SplitPane', rect: '1000 600', autosize: 'width height', anchors: 'left top right bottom', 
        handlePosition: 300, autogrowLeft: false, autogrowRight: true, autogrowLeft: true,
        leftPane: { view: 'Button', rect: '10 10 280 24', anchors: 'top left', text: 'left pane' },
        rightPane: [
            { view: 'SplitPane', rect: '693 600', autosize: 'width height', anchors: 'left top right bottom', vertical: true,
                topPane: { view: 'Button', rect: '10 10 280 24', anchors: 'top left', text: 'left pane' },
                bottomPane: { view: 'Slider', rect: '10 10 200 24', anchors: 'top left', autosize: 'width' }
            }
        ]
    }
).attachTo( window, '1000 600' );