var builder = require('../src/uki-core/builder');

builder.namespaces.unshift({
    Base: require('../src/uki-core/view/base.js').Base,
    Container: require('../src/uki-core/view/Container.js').Container
});

module.exports = builder;
