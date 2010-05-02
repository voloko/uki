/**
@example_title Background stress test
@example_order 3000
@example_html
    <style>body, html { margin: 0; padding: 0; };</style>
    <script src="/src/uki.cjs"></script>
    <script src="stress.js"></script>
*/


function button (i) {
    return uki.build({
        view: 'Button',
        rect: '5 ' + i * 30 + ' ' + (700 - i) +  ' 25',
        anchors: 'top left right',
        autosize: 'width',
        text: 'button #' + (i + 1)
    });
}

var c = uki({
    view: 'Box',
    rect: '0 0 800 1000',
    anchors: 'top bottom right left',
    autosize: 'width height'
});

for (var i=0; i < 100; i++) {
    c.append(button(i));
};

c.attachTo( window );
c[0].dom().style.overflow = 'visible';
