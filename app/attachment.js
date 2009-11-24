var b = uki({
    view: 'Panel',
    rect: '0 0 1000px 1000px',
    children: [{
        view: 'Button',
        rect: '400px 40px 200px 24px', anchors: "top",
        text: 'uki is awesome!'
        
    }]
}).attachTo( document.getElementById('test') );

uki('Base > Button[text^=uki]').bind('click', function() {
    alert('Hello world!');
});

