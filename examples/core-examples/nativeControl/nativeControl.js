/**
@example_title Native Controls
@example_order 30
@example_html
    <script src="nativeControl.js"></script>
*/

var uki = require('uki');

uki(
    { view: 'Flow', horizontal: true, spacing: 'large', pos: 'l:10px t:10px',
      childViews: [
        { view: 'Flow', childViews: [
            { view: 'Label', text: 'Radio group' },
            { view: 'nativeControl.Radio', name: 'group_1', text: 'Red' },
            { view: 'nativeControl.Radio', name: 'group_1', text: 'Blue',
                checked: true },
            { view: 'nativeControl.Radio', name: 'group_1', text: 'Green' }
        ]},
        { view: 'Flow', childViews: [
            { view: 'Label', text: 'Checkbox group' },
            { view: 'nativeControl.Checkbox', name: 'group_2', text: 'Red' },
            { view: 'nativeControl.Checkbox', name: 'group_2', text: 'Blue',
                checked: true },
            { view: 'nativeControl.Checkbox', name: 'group_2', text: 'Green',
                checked: true }
        ]},
        { view: 'Flow', childViews: [
            { view: 'Label', text: 'Other' },
            { view: 'nativeControl.Button', value: 'Button' },
            { view: 'nativeControl.Text', value: '', placeholder: 'Name?' },
            { view: 'nativeControl.Select', options: [
                { text: 'Default', options: [
                    'Red',
                    'Blue',
                    'Green'
                ]},
                { text: 'User', options: [
                    { text: 'Favorite', value: 1234522 },
                    { text: 'Less favorite', value: 1264522 }
                ]},
                { text: 'Custom', value: '' }
            ], value: '1264522' }
        ]}

    ]}
).attach();

