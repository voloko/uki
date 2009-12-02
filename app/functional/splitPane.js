uki(
    { view: 'SplitPane', rect: '0 0 1000 500', autosize: 'width height', anchors: 'left top right bottom', 
        handlePosition: '300', proportional: false, autogrowLeft: false, autogrowRight: true,
        leftChildViews: [
            { view: 'Button', rect: '10 10 280 24', anchors: 'top left', text: 'left pane' }
        ],
        rightChildViews: [
            { view: 'Slider', rect: '10 10 280 24', anchors: 'top left', autosize: 'width' }
        ]
    }
).attachTo( window, '1000 500' )