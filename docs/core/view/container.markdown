## Container view

Default API for containers.

Provides DOM-like container methods: `appendChild`, `removeChild`,
`insertBefore`.

### new Container(initArgs)

Extends from `Base`. Used as a base class for most containers in the system.

### Container.prototype.appendChild(childView)

### Container.prototype.removeChild(childView)

### Container.prototype.insertBefore(newChild, beforeChild)

### Container.prototype.lastChild()

### Container.prototype.firstChild()