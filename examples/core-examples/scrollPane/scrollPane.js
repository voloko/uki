/**
@example_title Scroll pane
@example_order 61
@example_html
    <style>body, html { overflow: hidden; margin: 0; padding: 0; }</style>
    <script src="/src/uki.cjs"></script>
    <script src="scrollPane.js"></script>
*/

uki([
    { view: 'HSplitPane', rect: '0 0 1000 600', anchors: 'left top right bottom', 
        handlePosition: 300, autogrowLeft: false, autogrowRight: true, autogrowLeft: false, handleWidth: 1, rightMin: 400, leftMin: 150,
        leftChildViews:
            { view: 'ScrollPane', rect: '0 0 300 600', anchors: 'top left right bottom', background: '#0F0', name: 'pane_1',
                childViews: { view: 'Base', rect: '10 10 280 300', anchors: 'top left right', background: '#F00' }
            },
        rightPane: {
            background: '#D0D7E2',
            childViews: { view: 'ScrollPane', rect: '0 0 699 600', anchors: 'top left right bottom',
                scrollableH: true, scrollableV: true, name: 'pane_2',
                childViews: { view: 'Box', rect: '10 10 480 300', anchors: 'top left', background: '#F00', childViews: [
                    { view: 'Label', rect: '5 5 100 100', anchors: 'left top', multiline: true, 
                        text: 'try resizing page or drag split pane to see scroll bars' }
                ] }
            }
        }
    }
]).attachTo( window, '1000 600' );
