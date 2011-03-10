/**
@example_title Binding
@example_order 160
@example_html
    <script src="binding.js"></script>
*/

requireCss('./binding.css');

var uki = require('uki'),
    Observable = uki.Observable;

var Person = uki.newClass(Observable, {
    name: Observable.newProp('name'),
    age: Observable.newProp('age')
});

global.bob = new Person();
bob.name('Bob').age(27);

var options = uki.range(10, 99);

uki([
    { view: 'Header', text: 'Two forms bound to the same data' },
    { view: 'P', text: 'Input values should be synced on blur event, comboboxes on change' },
    { view: 'Flow', horizontal: true, spacing: 'large', childViews: [
        { view: 'Container', addClass: 'form', childViews: [
            { view: 'nativeControl.Text', addClass: 'input', binding: { model: bob, modelProp: 'name' } },
            { view: 'nativeControl.Select', options: options, binding: { model: bob, modelProp: 'age' } }
        ]},
        { view: 'Container', addClass: 'form', childViews: [
            { view: 'nativeControl.Text', addClass: 'input', binding: { model: bob, modelProp: 'name' } },
            { view: 'nativeControl.Select', options: options, binding: { model: bob, modelProp: 'age' } }
        ]},
        { view: 'Button', bindings: [
            { model: bob, modelProp: 'name', viewProp: 'label' }
        ] }
    ]},
    { view: 'Text', addClass: 'help', text: 'Also try changin name and age props of the object "bob" in the browser JavaScript console' }
]).attach();
