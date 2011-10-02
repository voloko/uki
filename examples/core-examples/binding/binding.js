/**
@example_title Binding
@example_order 160
@example_html
    <link rel="stylesheet" href="binding.css" />
    <script src="/src/pkg/uki.js"></script>
    <script src="binding.js"></script>
*/

var Observable = uki.Observable;

var Person = uki.newClass(Observable, {
    name: Observable.newProp('name'),
    age: Observable.newProp('age')
});

var bob = new Person();
bob.name('Bob').age(27);

var options = uki.range(10, 99);

uki([
    { view: 'Header', text: 'Two forms bound to the same data' },
    { view: 'P', text: 'Input values should be synced on blur event, comboboxes on change' },
    { view: 'Flow', horizontal: true, spacing: 'large', childViews: [
        { view: 'Container', addClass: 'form', childViews: [
            { view: 'nativeControl.Text', addClass: 'input', 
              binding: { model: bob, modelProp: 'name', viewEvent: 'keyup blur click' } },
            { view: 'nativeControl.Select', options: options, 
              binding: { model: bob, modelProp: 'age' } }
        ]},
        { view: 'Container', addClass: 'form', childViews: [
            { view: 'nativeControl.Text', addClass: 'input', 
              binding: { model: bob, modelProp: 'name', viewEvent: 'keyup blur click' } },
            { view: 'nativeControl.Select', options: options, 
              binding: { model: bob, modelProp: 'age' } }
        ]},
        { view: 'Button', bindings: [
            { model: bob, modelProp: 'name', viewProp: 'label' }
        ] }
    ]},
    { view: 'Text', addClass: 'help', 
      text: 'Also try changin name and age props of the object "bob" in the browser JavaScript console' }
]).attach();
