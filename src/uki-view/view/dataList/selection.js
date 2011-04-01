var fun = require('../../../uki-core/function'),
    utils = require('../../../uki-core/utils'),


    Observable = require('../../../uki-core/observable').Observable;


var Selection = fun.newClass(Observable, {

    /**
    * @constructor
    */
    init: function(indexes) {
        this._indexes = indexes || [];
    },

    indexes: fun.newProp('indexes', function(indexes) {
        this.clear();
        this._indexes = indexes || [];
        if (this._indexes.length) {
            this._triggerUpdate(false, indexes[0], indexes[indexes.length - 1]);
        }
    }),

    index: function(value) {
        if (value === undefined) {
            return this.indexes().length ? this.indexes()[0] : -1;
        }
        return this.indexes(value < 0 ? [] : [value]);
    },
    
    empty: function() {
        return this.indexes().length === 0;
    },

    addRange: function(from, to) {
        spliceRange(this.indexes(), from, to, utils.range(from, to));
        this._triggerUpdate(false, from, to);
        return this;
    },

    removeRange: function(from, to) {
        spliceRange(this.indexes(), from, to, []);
        this._triggerUpdate(true, from, to);
        return this;
    },

    selectedInRange: function(from, to) {
        var fromPos = utils.binarySearch(this.indexes(), from),
            toPos   = utils.binarySearch(this.indexes(), to, fromPos);
            
        return this.indexes().slice(fromPos, toPos);
    },

    isSelected: function(index) {
        var pos = utils.binarySearch(this.indexes(), index);
        return this.indexes()[pos] === index;
    },
    
    toggle: function(index) {
        if (this.isSelected(index)) {
            this.removeRange(index, index);
        } else {
            this.addRange(index, index);
        }
        return this;
    },

    clear: function() {
        var indexes = this.indexes();
        if (indexes.length > 0) {
            this._triggerUpdate(true, indexes[0], indexes[indexes.length - 1]);
        }
        this._indexes = [];
        return this;
    },
    
    _triggerUpdate: function(isRemove, from, to) {
        this.trigger({
            type: 'update',
            action: isRemove ? 'remove' : 'add',
            from: from,
            to: to
        });
    }
});

function spliceRange(indexes, from, to, range) {
    var fromPos = utils.binarySearch(indexes, from),
        toPos   = utils.binarySearch(indexes, to, fromPos);

    // binarySearch returns insert position, so if we have to in indexes move
    // to the next position so we replace it also
    if (indexes[toPos] === to) { toPos++; }

    if (range) {
        indexes.splice.apply(indexes, [fromPos, toPos - fromPos].concat(range));
    } else {
        if (toPos > fromPos) {
            indexes.splice(fromPos, toPos - fromPos);
        }
    }
}


exports.Selection = Selection;
