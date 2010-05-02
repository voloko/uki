/**
@example_title Toolbar
@example_order 51
@example_html
    <style>body, html { margin: 0; padding: 0; };</style>
    <script src="/src/uki.cjs"></script>
    <script src="toolbar.js"></script>
*/

var html = '<img src="icon.png" width="24" height="24" style="position: absolute; top: 3px; left: -26px;" /> Icon';

uki( 
    { view: 'HSplitPane', rect: '1000 600', anchors: 'left top right bottom',
        handlePosition: 400,
        leftChildViews: { view: 'Box', rect: '400 600', anchors: 'left top right bottom', background: '#EEE', childViews: [
            { view: 'Toolbar', rect: '0 40 400 24', anchors: 'left top right', background: 'theme(panel)', buttons: [
                { text: 'Edit' },
                { text: 'Push the button'},
                { text: 'Shorter 1'  },
                { text: 'Shorter 2'  },
                { text: 'Shorter 3'  },
                { text: 'Shorter 4'  },
                { text: 'Shorter x5' },
                { text: 'Shorter 1'  },
                { text: 'Shorter 21' },
                { text: 'Shorter 3'  },
                { text: 'Shorter 4'  },
                { text: 'Shorter 5'  },
                { text: 'Shorter 1'  },
                { text: 'Shorter 2'  },
                { text: 'Shorter 3'  },
                { text: 'Shorter 4'  },
                { text: 'Shorter 5'  }
            ]}
        ]},
        rightChildViews: { view: 'Button', rect: '0 0 100 100', anchors: 'left top', text: 'hello world', id: 'button', focusable: false }
    }
).attachTo( window, '1000 600' );

uki({ view: 'Popup', rect: '0 0 100 100', anchors: 'left top', relativeTo: uki('#button')[0], id: 'test' }).show();

uki('#button').click(function() {
    uki('#test').toggle();
});
