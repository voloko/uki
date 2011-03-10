## attaching.Attaching(options)

Views are designed to interact only with other views. To attach them
to raw DOM markup you should use an bridge object. Attaching is this
object. It extends `view.Container` thus providing default `Container`
api and is capable of wrapping DOM nodes in markup.

### attaching.Attaching.attach([dom], view)

Creates `Attaching` for `dom` unless already exists. Appends `view` to
created object.

### attaching.Attaching.instances()

Returns an Array of all attachings on the page.

