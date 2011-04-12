/**
@example_title HTMLLayout
@example_order 90
@example_html
    <script src="htmlLayout.js"></script>
*/

var uki = require('uki');

uki({
    view: 'HTMLLayout',
    template: requireText('template.html'),
    data: {
        header: { view: 'Header',
            text: 'This views are rendered inside HTML template' },
        label_text: 'Text Field:',
        input: { view: 'nativeControl.Text', placeholder: 'woo hoo! html!' },
        label_select: 'Select:',
        select: { view: 'nativeControl.Select', options: ['select some'] }
    }
}).attach();
