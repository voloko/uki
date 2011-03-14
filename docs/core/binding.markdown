## binding.Binding(options)

Binds a given `view` to a `model`. By default will bind the `value` property on
`view` to the `value` property on `model` using `view`'s `blur` event. You
can override this by providing `options`:

    var b = new Binding({
        view: view,
        model: model,
        viewProp: 'value',
        viewEvent: 'change keyup',
        modelProp: 'name',
        modelEvent: 'change.name change.lastname'
    });
    
Note that `view` should be a subclass of `view.Base` and model should
extend `Observable`.

### binding.Binding.prototype.destruct()

Will remove listeners from both `view` and `model`.