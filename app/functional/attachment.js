uki({
    view: 'Panel',
    rect: '0 0 1000px 100px',
    children: [{
        view: 'Button',
        rect: '400px 40px 200px 24px',
        text: 'uki is awesome!'
    }]
}).attachTo( document.getElementById('test') );

uki('Panel > Button[text^=uki]').bind('click', function() {
    alert('Hello world!');
});