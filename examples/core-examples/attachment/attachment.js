/**
@example_title Hello world
@example_order 1
@example_html
    <div id='test' style='width: 50%; height: 100px; background: #EEE'>#test</div>
    <script src="/src/uki.cjs"></script>
    <script src="attachment.js"></script>
*/

uki({
    view: 'Button',
    rect: '200 40 200 24',
    text: 'uki is awesome!'
}).attachTo( document.getElementById('test'), '600 100' );

uki('Button[text^=uki]').bind('click', function() {
    alert('Hello world!');
});
