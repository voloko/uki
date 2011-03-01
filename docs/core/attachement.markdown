## attachment.Attachment(options)

Views are designed to interact only with other views. To attach them
to raw DOM markup you should use an bridge object. Attachment is this
object. It extends `view.Container` thus providing default `Container`
api and is capable of wrapping DOM nodes in markup.

### attachment.Attachment.attach([dom], view)

Creates `Attachment` for `dom` unless already exists. Appends `view` to
created object.

### attachment.Attachment.instances()

Returns an Array of all attachments on the page.

