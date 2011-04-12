requireCss('./uki-view/uki.css');

var view = require('./uki-core/view.js'),
    utils = require('./uki-core/utils.js');

utils.extend(view,
    require('./uki-view/view/button.js'),
    require('./uki-view/view/flow.js'),
    require('./uki-view/view/nativeControl.js'),
    require('./uki-view/view/text.js'),
    require('./uki-view/view/splitPane.js'),
    require('./uki-view/view/htmlLayout.js'),
    require('./uki-view/view/dataList.js'),
    { dataList: utils.extend({},
        require('./uki-view/view/dataList/metrics.js'),
        require('./uki-view/view/dataList/controller.js'),
        require('./uki-view/view/dataList/selection.js'),
        require('./uki-view/view/dataList/renderer.js')
    ) }
);

module.exports = view;
