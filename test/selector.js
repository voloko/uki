var builder = require('../src/uki-core/builder'),
    selector = require('../src/uki-core/selector');
    
builder.namespaces.unshift({
    Base: require('../src/uki-core/view/base.js').Base,
    Container: require('../src/uki-core/view/Container.js').Container
});

module.exports = {
    build: builder.build,
    find: selector.find,
    namespaces: builder.namespaces,
    utils: require('../src/uki-core/utils'),
    view: require('../src/uki-core/view')
};
