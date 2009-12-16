uki(
    { view: 'SplitPane', rect: '1000 600', anchors: 'left top right bottom', handlePosition: 200, rightMin: 500, handleWidth: 1, id: 'top',
        leftPane: {  background: '#FFF' },
        rightChildViews: { view: 'SplitPane', rect: '799 600', autosize: 'width height', anchors: 'left top right bottom', 
            handlePosition: 300, autogrowRight: true, autogrowLeft: false, leftMin: 200, rightMin: 300, handleWidth: 1,
            leftPane: {  background: '#D0D7E2', childViews: [
                    { view: 'Button', rect: '10 566 280 24', anchors: 'bottom left right', text: 'left pane', autosize: 'width', focusable: false }
                ]},
            rightChildViews: [
                { view: 'SplitPane', rect: '498 600', autosize: 'width height', anchors: 'left top right bottom', vertical: true,
                    topChildViews: [
                        { view: 'Button', rect: '10 10 280 24', anchors: 'top left', text: 'top pane' },
                        { view: 'Button', rect: '209 160 280 24', anchors: 'bottom right', text: 'top pane' }
                    ],
                    bottomPane: { background: '#FFF', childViews: [
                        { view: 'Box', rect: '0 0 499 40', anchors: 'top right left', autosize: 'width', background: 'cssBox(background:#EDF3FE;border-bottom:1px solid #999)' },
                        { view: 'Slider', rect: '10 50 473 24', anchors: 'top right left', autosize: 'width' },
                        { view: 'Label', rect: '10 80 479 300', anchors: 'top left right bottom', autosize: 'width height', multiline: true, html: 'Text ', id: 'workpane' }
                    ]}
                }
            ]
        }
    }
).attachTo( window, '1000 600' );

var top = uki('#top')[0];
uki('SplitPane:eq(1)').bind('handleMove', function(e) { 
    if (e.handlePosition > e.dragValue) {
        top.handlePosition(top.handlePosition() - (e.handlePosition - e.dragValue) );
        top.layout();
    }
})


// uki('Button').click(function() { alert(this.text()) })

// uki('Button').click(function() { alert(this.text() )})
// uki('Label').html('<p>Lorem ipsum dolor sit <b>amet</b>, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>');
// uki('SplitPane:eq(1)').attr('handlePosition', 200)[0].layout();