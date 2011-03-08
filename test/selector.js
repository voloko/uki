var builder = require('../src/uki-core/builder'),
    selector = require('../src/uki-core/selector');
    
builder.viewNamespaces.unshift({
    Base: require('../src/uki-core/view/base.js').Base,
    Container: require('../src/uki-core/view/Container.js').Container
});

module.exports = {
    build: builder.build,
    find: selector.find,
    viewNamespaces: builder.viewNamespaces,
    utils: require('../src/uki-core/utils')
};
