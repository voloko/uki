requireCss('./uki-view/uki.css');

var view = require('./uki-core/view.js'),
    utils = require('./uki-core/utils.js');
    
utils.forEach([
    require('./uki-view/view/button.js'),
    require('./uki-view/view/flow.js'),
    require('./uki-view/view/selectable.js'),
    require('./uki-view/view/nativeControl.js'),
    require('./uki-view/view/text.js'),
    require('./uki-view/view/splitPane.js'),
    require('./uki-view/view/dataList.js')
], function(mod) {
    utils.extend(view, mod);
});

module.exports = view;
