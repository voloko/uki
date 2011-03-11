## attaching.Attaching(options)

Views are designed to interact only with other views. To attach them
to raw DOM nodes you should use a bridge object. Attaching is this
object. It extends `view.Container` thus providing default `Container`
api and is capable of wrapping DOM nodes.

### attaching.Attaching.attach([dom], view)

Creates `Attaching` for `dom` unless already exists. Appends `view` to
created object.

### attaching.Attaching.instances()

Returns an `Array` of all `Attaching`s on the page.

