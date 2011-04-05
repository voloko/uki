var fun = require('../../../uki-core/function'),
    utils = require('../../../uki-core/utils'),
    
    Observable = require('../../../uki-core/observable').Observable;


var Metrics = fun.newClass(Observable, {
	
	initWithView: function(view) {
		this._view = view;
	},
    
    _rowHeight: 0,
    
    update: function() {
        this._rowHeight = this._view.deduceRowHeight();
        this.triggerChanges('totalHeight');
    },
    
    rowsForRange: function(range) {
        return { 
            from: range.from / this._rowHeight << 0,
            to:   range.to   / this._rowHeight + 0.5 << 0
        };
    },
    
    rowForPosition: function(px) {
        return px / this._rowHeight << 0;
    },
    
    rowDimensions: function(index) {
        return {
            top: this._rowHeight*index,
            height: this._rowHeight
        };
    },
    
    totalHeight: function() {
        return this._rowHeight * this._view.data().length;
    }
    
});


exports.Metrics = Metrics;