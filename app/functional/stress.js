function button (i) {
    return uki.build({
        view: 'Button',
        rect: '5 ' + i * 30 + ' ' + (700 - i) +  ' 25px',
        anchors: 'top left right',
        autosize: 'width',
        text: 'button #' + (i + 1)
    });
}

var c = uki({
    view: 'Box',
    rect: '0 0 800px 1000px',
    anchors: 'top bottom right left',
    autosize: 'width height'
});

for (var i=0; i < 100; i++) {
    c.append(button(i));
};

c.attachTo( document.getElementById('test') );
c[0].dom().style.overflow = 'visible';
