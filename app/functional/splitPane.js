uki(
    { view: 'SplitPane', rect: '1000 600', autosize: 'width height', anchors: 'left top right bottom', 
        handlePosition: 300, autogrowLeft: false, autogrowRight: true, autogrowLeft: true, leftMin: 300, rightMin: 300,
        leftChildViews: { view: 'Button', rect: '10 10 280 24', anchors: 'top left right', text: 'left pane', autosize: 'width' },
        rightChildViews: [
            { view: 'SplitPane', rect: '693 600', autosize: 'width height', anchors: 'left top right bottom', vertical: true,
                topChildViews: [
                    { view: 'Button', rect: '10 10 280 24', anchors: 'top left', text: 'top pane' },
                    { view: 'Button', rect: '340 160 280 24', anchors: 'bottom right', text: 'top pane' }
                ],
                bottomChildViews: { view: 'Slider', rect: '10 10 673 24', anchors: 'top right left', autosize: 'width' }
            }
        ]
    }
).attachTo( window, '1000 600' );