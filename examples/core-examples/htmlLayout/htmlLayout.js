/**
@example_title HTMLLayout
@example_order 90
@example_html
    <script src="/src/pkg/uki.js"></script>
    <script src="htmlLayout.js"></script>
*/

var template = '{{{header}}}' +
'<dl>' +
  '<dt>{{label_text}}</dt><dd>{{{input}}}</dd>' +
  '<dt>{{label_select}}</dt><dd>{{{select}}}</dd>' +
'</dl>';

uki({
    view: 'HTMLLayout',
    template: template,
    data: {
        header: { view: 'Header',
            text: 'This views are rendered inside HTML template' },
        label_text: 'Text Field:',
        input: { view: 'nativeControl.Text', placeholder: 'woo hoo! html!' },
        label_select: 'Select:',
        select: { view: 'nativeControl.Select', options: ['select some'] }
    }
}).attach();
