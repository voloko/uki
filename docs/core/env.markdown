## Env

Provides access to common browser objects. Prevents the code from failing in non-browser environment, ex: node.js

### env.root

equals to window

### env.doc

window.document or empty object

### env.docElem

window.document.documentElement or empty object

### env.nav

window.navigator or empty object

### env.ua

window.navigator.userAgent or empty string

### env.guid

counter to generate unique ids:

    div.id = 'prefix' + env.guid++;
    
### env.expando

unique attribute to add into dom nodes, so uki can track them

