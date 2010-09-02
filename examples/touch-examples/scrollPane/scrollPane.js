/**
@example_title Touch Scroll pane
@example_order 10001
@example_html
    <style>body, html { overflow: hidden; margin: 0; padding: 0; }</style>
    <script src="/src/uki.cjs"></script>
    <script src="/src/uki-touch.cjs"></script>
    <script src="scrollPane.js"></script>
*/

uki.touch.view.ScrollPane.prototype._touch = uki.touch.view.ScrollPane.prototype._touch || /webkit/i.test(navigator.userAgent); // force touch
uki.touch.setup({});

uki([
    {
        view: 'Label',
        rect: '0 0 1000 49',
        background: 'theme(panel)',
        html: 'Panel' + (uki.touch.view.ScrollPane.prototype._touch ? '' : ' <strong style="color: #C00">Works only on webkit browsers</strong>'),
        anchors: 'top left right',
        inset: '10 10'
    },
    { 
        view: 'ScrollPane', 
        rect: '0 50 1000 950', 
        anchors: 'top left right bottom',
        scrollableH: true, scrollableV: true, 
        childViews: 
            {
                view: 'Box',
                rect: '2000 2000',
                anchors: 'top left',
                background: '#CCF', 
                id: 'contents'
            }
    }
]).attachTo( window, '1000 1000' );

function rand () {
    return 127 + (Math.random()*127 | 0);
}

for (var i=0; i < 10; i++) {
    for (var j=0; j < 10; j++) {
        uki('#contents').append(uki({ 
            view: 'Box', 
            rect: new uki.geometry.Rect(i*200, j*200, 200, 200), 
            background: new uki.background.Css('rgb(' + [rand(), rand(), rand()].join(',') + ')'),
            anchors: 'left top' 
        }));
    }
};
uki('#contents').append(uki({ view: 'Label', rect: '10 10 100 20', anchors: 'left top', html: '4000&times;4000 pane' })).layout();
