include('../view.js');
include('../../../uki-view/view/list.js');
include('touchScrollPane.js');

/**
 * Touch scrollable List View
 * Puts a list into a touch.view.ScrollPane
 * 
 * @author rsaccon
 * @name uki.touch.view.ScrollableList
 * @class
 * @extends uki.touch.view.ScrollPane
 */
uki.view.declare('uki.touch.view.ScrollableList', uki.touch.view.ScrollPane, function(Base) {

    this._createDom = function() {
        Base._createDom.call(this);
        this._list = uki({ view: 'List', rect: this.rect().clone().normalize(), anchors: 'left top right bottom' })[0];
        this.appendChild(this._list);
    };
    
    uki.each('data rowHeight render packSize visibleRectExt throttle focusable selectedIndex selectedIndexes selectedRow selectedRows multiselect draggable textSelectable'.split(' '), 
        function(i, name) {
            uki.delegateProp(this, name, '_list');
        }, this);
    
});