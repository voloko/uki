uki(
    { view: 'SplitPane', rect: '1000 600', autosize: 'width height', anchors: 'left top right bottom', 
        handlePosition: 300, autogrowLeft: false, autogrowRight: true, autogrowLeft: true, leftMin: 300, rightMin: 300,
        leftPane: { view: 'Button', rect: '10 10 280 24', anchors: 'top left right', text: 'left pane', autosize: 'width' },
        rightPane: [
            { view: 'SplitPane', rect: '693 600', autosize: 'width height', anchors: 'left top right bottom', vertical: true,
                topPane: { view: 'Button', rect: '10 10 280 24', anchors: 'top left', text: 'top pane' },
                bottomPane: { view: 'Slider', rect: '10 10 673 24', anchors: 'top right left', autosize: 'width' }
            }
        ]
    }
).attachTo( window, '1000 600' );