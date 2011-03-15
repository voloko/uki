## Selector

Provides a CSS3-like selector engine on top of view tree. Note that selectors work
on views and NOT on DOM nodes.

### selector.find(selector, [context])

Search for views matching `selector` in the `context`. If `context` is not
provided, will search within all attached views.

   // all buttons
   find('Button')

   // all SplitPanes with truthy vertical property
   find('SplitPane[vertical]') // a vertical split pane

   // the second Text
   find('Text:eq(1)')

   // element by id
   // extremely fast, uses one hash lookup instead of tree traversal
   find('#content')

   // anything where text contains word message
   find('[text~=message]')
   
   // buttons within containers
   find('Container Button')
   
   // immediate child buttons
   find('Container > Button')
   
   // all labels preceded by button within container
   find('Container > Button + Label')
   
   // all paragraphs after buttons
   find('Button ~ P')

`typeName` property is used to search by type. See `view.newClass` for more
info on `typeName`.