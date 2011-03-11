var builder = require('../src/uki-core/builder'),
    selector = require('../src/uki-core/selector');
    
var b = new builder.Builder([{
    Base: require('../src/uki-core/view/base.js').Base,
    Container: require('../src/uki-core/view/Container.js').Container
}]);
    
module.exports = {
    builder: b,
    find: selector.find,
    Collection: require('../src/uki-core/collection').Collection
};
