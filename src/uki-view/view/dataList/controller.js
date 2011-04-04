var fun = require('../../../uki-core/function'),
	evt = require('../../../uki-core/event'),
	env = require('../../../uki-core/env'),

	Observable = require('../../../uki-core/observable').Observable;


var Controller = fun.newClass(Observable, {
	
	initWithView: function(view) {
		this._view = view;
        this._view.on({
            'mousedown': fun.bind(this._onmousedown, this),
            'mouseup': fun.bind(this._onmouseup, this),
            'focus': fun.bind(this._onfocus, this),
            'blur': fun.bind(this._onblur, this)
        });
        // prevent dragging of selection
        this._view.on('selectstart dragstart', evt.preventDefaultHandler);
        this._view.on(this.keyPressEvent(), fun.bind(this._onkeypress, this));
	},
	
    keyPressEvent: function() {
        var useKeyPress = env.root.opera ||
            (/mozilla/i.test(env.ua) && !(/(compatible|webkit)/i).test(env.ua));

        return useKeyPress ? 'keypress' : 'keydown';
    },

    _onmousedown: function(e) {
        var index = this._eventToIndex(e),
            selection = this._view.selection();

        this._hadFocusOnSelectionStart =
            this._view.hasFocus() && selection.isSelected(index);

        if (this._view.multiselect()) {
            this._selectionInProcess = false;
            if (e.shiftKey && !selection.empty()) {
                if (selection.isSelected(index)) {
                    selection.removeRange(
                        Math.min(index + 1, this._view.lastClickIndex()),
                        Math.max(index - 1, this._view.lastClickIndex())
                    );
                } else {
                    var indexes = selection.indexes();
                    selection.clear().addRange(
                        Math.min(index, indexes[0]),
                        Math.max(index, indexes[indexes.length - 1])
                    );
                }
                this._triggerSelection();
            } else if (e.metaKey) {
                selection.toggle(index);
                this._triggerSelection();
            } else {
                if (selection.isSelected(index)) {
                    this._selectionInProcess = true;
                    this._hadFocusOnSelectionStart = this._view.hasFocus();
                } else {
                    selection.indexes([index]);
                    this._triggerSelection();
                }
            }
        } else {
            selection.index(index);
            this._triggerSelection();
        }
        this._view.lastClickIndex(index);
    },

    _onmouseup: function(e) {
        var index = this._eventToIndex(e),
            selection = this._view.selection();

        if (!this._view.multiselect() || !this._selectionInProcess) {
            if (this._view.lastClickIndex() === index && !this._view.multiselect()) {
                if (this._hadFocusOnSelectionStart) {
                    this._view.editSelection();
                }
            }
            return;
        };

        if (this._view.lastClickIndex() === index && selection.isSelected(index)) {
            if (selection.indexes().length === 1) {
                if (this._hadFocusOnSelectionStart) {
                    this._view.editSelection();
                }
            } else {
                selection.indexes([index]);
                this._triggerSelection();
            }
        }
        this._selectionInProcess = false;
    },

    _onkeypress: function(e) {
        if (!this._view.hasFocus()) return;

        var selection = this._view.selection(),
            indexes = selection.indexes(),
            nextIndex = -1;

        if (e.which == 38 || e.keyCode == 38) { // UP
            nextIndex = Math.max(0, this._view.lastClickIndex() - 1);
            e.preventDefault();
        } else if (e.which == 40 || e.keyCode == 40) { // DOWN
            nextIndex =
                Math.min(this._view.data().length - 1, this._view.lastClickIndex() + 1);
            e.preventDefault();
        } else if (this._view.multiselect() && // Ctrl + A
            (e.which == 97 || e.which == 65) && e.metaKey) {

            e.preventDefault();
            selection.clear().addRange(0, this._view.data().length);
            this._triggerSelection();
        }
        if (nextIndex > -1 && nextIndex != this._view.lastClickIndex()) {
            if (e.shiftKey && this._view.multiselect()) {
                if (selection.isSelected(nextIndex)) {
                    selection.toggle(this._view.lastClickIndex());
                } else {
                    selection.toggle(nextIndex);
                }
            } else {
                selection.index(nextIndex);
            }
            this._triggerSelection();
            this._view.scrollToIndex(nextIndex);
            this._view.lastClickIndex(nextIndex);
        }
    },

    _onfocus: function(e) {
        var selection = this._view.selection();

        this._view.removeClass('uki-dataList_blured');
        if (selection.empty() && this._view.data().length > 0) {
            selection.index(0);
            this._view.lastClickIndex(0).scrollToIndex(0);
            this._triggerSelection();
        } else {
            if (this._deferedTriggerSelection) {
                this._triggerSelection();
            }
        }
    },

    _onblur: function(e) {
        this._view.addClass('uki-dataList_blured');
    },

    _triggerSelection: function() {
        if (this._view.hasFocus()) {
			this._view.triggerSelection();
            this._deferedTriggerSelection = false;
        } else {
            this._deferedTriggerSelection = true;
        }
    },

    _eventToIndex: function(e) {
        var o = this._view.clientRect(),
            y = e.pageY - o.top;

        return this._view.metrics().rowForPosition(y);
    }

});


exports.Controller = Controller;