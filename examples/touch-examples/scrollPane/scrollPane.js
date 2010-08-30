/**
@example_title Touch Scroll pane
@example_order 10001
@example_html
    <style>body, html { overflow: hidden; margin: 0; padding: 0; }</style>
    <script src="/src/uki.cjs"></script>
    <script src="/src/uki-touch/touch/view/scrollPane.cjs"></script>
    <script src="scrollPane.js"></script>
*/

uki.touch.view.ScrollPane.prototype._touch = true; // force touch


uki({ 
    view: 'ScrollPane', 
    rect: '10 10 980 980', 
    anchors: 'top left right bottom',
    scrollableH: true, scrollableV: true, 
    childViews: 
        {
            view: 'Box',
            rect: '4000 4000',
            anchors: 'top left',
            background: '#CCF', 
            id: 'contents'
        }
    }
).attachTo( window, '1000 1000' );

function rand () {
    return 127 + (Math.random()*127 | 0);
}

for (var i=0; i < 20; i++) {
    for (var j=0; j < 20; j++) {
        uki('#contents').append(uki({ 
            view: 'Box', 
            rect: new uki.geometry.Rect(i*200, j*200, 200, 200), 
            background: new uki.background.Css('rgb(' + [rand(), rand(), rand()].join(',') + ')'),
            anchors: 'left top' 
        }));
    }
};
uki('#contents').append(uki({ view: 'Label', rect: '10 10 100 20', anchors: 'left top', html: '4000&times;4000 pane' })).layout();
