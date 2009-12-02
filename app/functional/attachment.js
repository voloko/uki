// uki({
//     view: 'Panel',
//     rect: '0 0 1000px 100px',
//     childViews: [{
//         view: 'Button',
//         rect: '400px 40px 200px 24px',
//         text: 'uki is awesome!'
//     }]
// }).attachTo( document.getElementById('test'), '1000px 100px' );
// 
// uki('Panel > Button[text^=uki]').bind('click', function() {
//     alert('Hello world!');
// });


uki({
    view: 'Button',
    rect: '200px 40px 200px 24px',
    text: 'uki is awesome!',
    anchors: 'right'
}).attachTo( document.getElementById('test'), '600px 100px' );

uki('Button[text^=uki]').bind('click', function() {
    alert('Hello world!');
});