/**
@example_title Complex split pane
@example_order 1032
@example_html
    <style>body, html { overflow: hidden; margin: 0; padding: 0; }</style>
    <script src="/src/uki.cjs"></script>
    <script src="splitPaneExtended.js"></script>
*/

uki(
    { view: 'HSplitPane', rect: '1000 600', anchors: 'left top right bottom', handlePosition: 200, rightMin: 500, handleWidth: 1, id: 'top',
        leftPane: {  background: '#FFF' },
        rightChildViews: { view: 'HSplitPane', rect: '799 600', anchors: 'left top right bottom', id: 'second',
            handlePosition: 300, autogrowRight: true, autogrowLeft: false, leftMin: 200, rightMin: 300, handleWidth: 1,
            leftPane: {  background: '#D0D7E2', childViews: [
                    { view: 'Button', rect: '10 566 280 24', anchors: 'bottom left right', text: 'middle pane', focusable: false }
                ]},
            rightChildViews: [
                { view: 'VSplitPane', rect: '498 600', anchors: 'left top right bottom',
                    topChildViews: [
                        { view: 'Button', rect: '10 10 280 24', anchors: 'top left', text: 'top pane' },
                        { view: 'Button', rect: '209 160 280 24', anchors: 'bottom right', text: 'top pane' }
                    ],
                    bottomPane: { background: '#FFF', childViews: [
                        { view: 'Box', rect: '0 0 499 40', anchors: 'top right left', background: 'cssBox(background:#EDF3FE;border-bottom:1px solid #999)' },
                        { view: 'Slider', rect: '10 50 473 24', anchors: 'top right left' },
                        { view: 'Label', rect: '10 80 479 300', anchors: 'top left right bottom', multiline: true, html: 'Sample content ', id: 'workpane' }
                    ]}
                }
            ]
        }
    }
).attachTo( window, '1000 600', {minSize: '600 0'} );

// when we resize second split pane and hit border, try resizing first pane
var top = uki('#top')[0];
uki('HSplitPane:eq(1)').bind('handleMove', function(e) { 
    if (e.handlePosition > e.dragValue) top.handlePosition(top.handlePosition() - (e.handlePosition - e.dragValue) ).layout();
});