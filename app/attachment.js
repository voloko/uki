var b = uki.build({
    view: 'Base',
    rect: '0 0 1000px 1000px',
    children: [{
        view: 'Button',
        rect: '400px 100px 200px 24px', anchors: "top",
        text: 'uki is awesome!'
        
    }]
}).attachTo( document.getElementById('test') );

uki.find('Base > Button[text^=uki]').bind('click', function() {
    alert('Hello world!');
});

