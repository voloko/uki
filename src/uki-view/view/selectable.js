var env   = require('../../uki-core/env'),
    fun   = require('../../uki-core/function'),
    utils = require('../../uki-core/utils'),
    dom   = require('../../uki-core/dom');


/**
* @mixin fb.view.Selectable
* @author voloko
* @version alpha
*/
var Selectable = {};

Selectable.specialEvents = ['selection'];

Selectable._multiselect = false;

Selectable._initSelectable = function() {
    this._selectedIndexes = [];
    this._lastClickIndex = [];
    this._addSelectionEvents();
};

fun.addProp(Selectable, 'multiselect');

Selectable._setSelected = function(index, state) {
    // abstract
};

Selectable.scrollToPosition = function(pos) {
    // abstract
};

/**
* Read/write current selected index for selectable lists
* @function
* @param {Number} position
* @name view.List#selectedIndex
*/
Selectable.selectedIndex = function(position) {
    if (position === undefined) return this._selectedIndexes.length ? this._selectedIndexes[0] : -1;
    this.selectedIndexes([position]);
    return this;
};

/**
* Read/write all selected indexes for multiselectable lists
* @function
* @param {Array.<Number>} position
* @name view.List#selectedIndex
*/
Selectable.selectedIndexes = function(indexes) {
    if (indexes === undefined) return this._selectedIndexes;
    this.clearSelection(true);
    this._selectedIndexes = indexes;
    for (var i=0; i < this._selectedIndexes.length; i++) {
        this._setSelected(this._selectedIndexes[i], true);
    };
    return this;
};

Selectable.moveSelectedIndex = function(offset) {
    var newIndex = this.selectedIndex() + offset;
    newIndex = Math.min(newIndex, this.data().length - 1);
    newIndex = Math.max(0, newIndex);
    if (newIndex != this.selectedIndex()) {
        this.selectedIndex(newIndex);
        return true;
    }
    return false;
};

/**
* @function
* @name view.List#clearSelection
*/
Selectable.clearSelection = function(skipClickIndex) {
    for (var i=0; i < this._selectedIndexes.length; i++) {
        this._setSelected(this._selectedIndexes[i], false);
    };
    this._selectedIndexes = [];
    if (!skipClickIndex) this._lastClickIndex = -1;
};

/**
* @function
* @param {Number} index
* @name view.List#isSelected
*/
Selectable.isSelected = function(index) {
    var found = utils.binarySearch(index, this._selectedIndexes);
    return this._selectedIndexes[found] == index;
};

Selectable._toggleSelection = function(p) {
    var indexes = [].concat(this._selectedIndexes);
    var addTo = utils.binarySearch(p, indexes);
    if (indexes[addTo] == p) {
        indexes.splice(addTo, 1);
    } else {
        indexes.splice(addTo, 0, p);
    }
    this.selectedIndexes(indexes);
};

/** ---------- Selection Events -------------- **/

Selectable.keyPressEvent = function() {
    var useKeyPress = env.root.opera || (/mozilla/i.test(env.ua) && !(/(compatible|webkit)/i).test(env.ua));
    return useKeyPress ? 'keypress' : 'keydown';
};

Selectable._addSelectionEvents = function() {
    this.on('mousedown', this._selectionMousedown);
    this.on('mouseup', this._selectionMouseup);
    this.on(this.keyPressEvent(), this._selectionKeypress);
    this.on('focus', this._selectionFocus);
    this.on('blur', this._selectionBlur);
};

function removeRange (array, from, to) {
    var p = utils.binarySearch(from, array),
        initialP = p;
    while (array[p] <= to) p++;
    if (p > initialP) array.splice(initialP, p - initialP);
}

Selectable._itemUnderCursor = function(e) {
    var o = dom.clientRect(this.dom()),
        y = e.pageY - o.top;

    return y / this._rowHeight << 0;
};

Selectable._selectionMouseup = function(e) {
    var p = this._itemUnderCursor(e);

    if (!this._multiselect || !this._selectionInProcess) {
        if (this._lastClickIndex == p && !this._multiselect) {
            if (this._hadFocusOnSelectionStart) {
                this._selectionEdit(e);
            }
        }
        return;
    };

    if (this._lastClickIndex == p && this.isSelected(p)) {
        if (this.selectedIndexes().length === 1) {
            if (this._hadFocusOnSelectionStart) {
                this._selectionEdit(e);
            }
        } else {
            this.selectedIndexes([p]);
            this._triggerSelection();
        }
    }
    this._selectionInProcess = false;
};

Selectable._selectionEdit = function() {};

Selectable._removeFromSelection = function(from, to) {
    indexes = [].concat(this.selectedIndexes());
    removeRange(indexes, from, to);
    this.selectedIndexes(indexes);
};

Selectable._selectionMousedown = function(e) {
    var p = this._itemUnderCursor(e),
        indexes = this._selectedIndexes;

    this._hadFocusOnSelectionStart = this.hasFocus() &&
        this.isSelected(p);

    if (this._multiselect) {
        this._selectionInProcess = false;
        if (e.shiftKey && indexes.length > 0) {
            if (this.isSelected(p)) {
                this._removeFromSelection(
                    Math.min(p+1, this._lastClickIndex),
                    Math.max(p-1, this._lastClickIndex)
                );
            } else {
                this.selectedIndexes(utils.range(
                    Math.min(p, indexes[0]),
                    Math.max(p, indexes[indexes.length - 1])
                ));
            }
            this._triggerSelection();
        } else if (e.metaKey) {
            this._toggleSelection(p);
            this._triggerSelection();
        } else {
            if (this.isSelected(p)) {
                this._selectionInProcess = true;
                this._hadFocusOnSelectionStart = this.hasFocus();
            } else {
                this.selectedIndexes([p]);
                this._triggerSelection();
            }
        }
    } else {
        this.selectedIndexes([p]);
        this._triggerSelection();
    }
    this._lastClickIndex = p;
};

Selectable._selectionKeypress = function(e) {
    if (!this.hasFocus()) return;

    var indexes = this._selectedIndexes,
        nextIndex = -1;
    if (e.which == 38 || e.keyCode == 38) { // UP
        nextIndex = Math.max(0, this._lastClickIndex - 1);
        e.preventDefault();
    } else if (e.which == 40 || e.keyCode == 40) { // DOWN
        nextIndex = Math.min(this.data().length-1, this._lastClickIndex + 1);
        e.preventDefault();
    } else if (this._multiselect && (e.which == 97 || e.which == 65) && e.metaKey) {
        e.preventDefault();
        this.selectedIndexes(utils.range(0, this.data().length -1));
        this._triggerSelection();
    }
    if (nextIndex > -1 && nextIndex != this._lastClickIndex) {
        if (e.shiftKey && this._multiselect) {
            if (this.isSelected(nextIndex)) {
                this._toggleSelection(this._lastClickIndex);
            } else {
                this._toggleSelection(nextIndex);
            }
        } else {
            this.selectedIndex(nextIndex);
        }
        this._triggerSelection();
        this.scrollToPosition(nextIndex);
        this._lastClickIndex = nextIndex;
    }
};

Selectable._selectionFocus = function(e) {
    if (this._selectedIndexes.length == 0 && this.data().length > 0) {
        this.selectedIndexes([0]).lastClickIndex(0).scrollToPosition(0)._triggerSelection();
    } else {
        // this.selectedIndexes(this.selectedIndexes());
        if (this._deferedTriggerSelection) {
            this._triggerSelection();
        }
    }
};

Selectable._selectionBlur = function(e) {
    // this.selectedIndexes(this.selectedIndexes());
};

// never fire selection when unfocused
// wait till focus to fire
Selectable._triggerSelection = function(force) {
    if (this.hasFocus() || force) {
        this.trigger({type: 'selection', target: this});
        this._deferedTriggerSelection = false;
    } else {
        this._deferedTriggerSelection = true;
    }
};


exports.Selectable = Selectable;
