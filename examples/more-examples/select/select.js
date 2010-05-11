/**
@example_title uki.more Select
@example_order 4200
@example_html
    <style>body, html { overflow: hidden; margin: 0; padding: 0; }</style>
    <script src="/src/uki.cjs"></script>
    <script src="/src/uki-more.cjs"></script>
    <script src="select.js"></script>
*/

var options = uki.map(uki.range(0, 100), function(i) {
    return { value: i, text: 'option ' + i }
});

uki([
    { 
        view: 'Select', 
        rect: '40 50 300 22', 
        anchors: 'left top', 
        rowHeight: 22,
        options: options
    },
    
    { view: 'TextField', rect: '40 10 100 22', anchors: 'left top', value: '0' },
    
    { view: 'Button',    rect: '150 10 100 22', anchors: 'left top', text: 'Set value' }
]).attachTo(window, '1000 1000');

uki('Select').change(function() {
    uki('TextField').value(this.value());
});

uki('Button').click(function() {
    uki('Select').value(uki('TextField').value());
});
