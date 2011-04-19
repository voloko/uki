requireCss('uki-view/uki.css');

var view = require('./uki-core/view'),
    utils = require('./uki-core/utils');

utils.extend(view,
    require('./uki-view/view/button'),
    require('./uki-view/view/flow'),
    require('./uki-view/view/nativeControl'),
    require('./uki-view/view/text'),
    require('./uki-view/view/splitPane'),
    require('./uki-view/view/htmlLayout'),
    require('./uki-view/view/dataList'),
    { dataList: utils.extend({},
        require('./uki-view/view/dataList/metrics'),
        require('./uki-view/view/dataList/selectionController'),
        require('./uki-view/view/dataList/selection'),
        require('./uki-view/view/dataList/pack')
    ) },
    require('./uki-view/view/dataTable'),
    { dataTable: utils.extend({},
        require('./uki-view/view/dataTable/pack')
    ) }
);

module.exports = view;
