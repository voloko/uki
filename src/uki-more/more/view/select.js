include('../view.js');

uki.view.declare('uki.more.view.Select', uki.view.Checkbox, function(Base) {
    this._backgroundPrefix = 'select-';
    this._popupBackground = 'theme(select-popup)';
    this._listBackground = 'theme(select-list)';
    this._popupOffset = 0;
    
    this._setup = function() {
        Base._setup.call(this);
        this._inset = new uki.geometry.Inset(0, 20, 0, 4);
        this._selectFirst = true;
        this._focusable = true;
        this._options = [];
        this._maxPopupHeight = 200;
        this._lastScroll = 0;
    };
    
    this.Render = uki.newClass(uki.view.list.Render, function(Base) {
        this.render = function(data, rect, i) {
            return '<span style="line-height: 22px; text-align: left; white-space: nowrap; margin: 0 4px; cursor: default">' + data + '</span>';
        }
        
        this.setSelected = function(container, data, state, focus) {
            container.style.backgroundColor = state ? '#3875D7' : '';
            container.style.color = state ? '#FFF' : '#000';
        }
    });
    
    this.selectFirst = uki.newProp('_selectFirst');
    
    this.opened = function() {
        return this._popup.visible() && this._popup.parent();
    };
    
    this.popupAnchors = function(v) {
        if (v === undefined) return this._popup.anchors();
        this._popup.anchors(v);
        return this;
    };
    
    this._createDom = function() {
        Base._createDom.call(this);
        this.style({ fontWeight: 'normal', textAlign: 'left' });
        
        this._label.style.overflow = 'hidden';
        this._popup = uki(
            { view: 'Popup', anchors: 'left top', rect: '100 100',  style: {zIndex: 1000}, offset: this._popupOffset,
                background: this._popupBackground, relativeTo: this, visible: false, 
                childViews: [
                    { view: 'ScrollPane', rect: '100 100', anchors: 'left top right bottom', childViews: [
                        { view: 'List', rect: '100 100', anchors: 'left top right bottom', rowHeight: 22, 
                            textSelectable: false, focusable: true, background: this._listBackground,
                            render: new this.Render(), style: { fontSize: '12px' } }
                    ] }
                ] }
        )[0];
        
        this._popup.hide();
        
        this._list = uki('List', this._popup)[0];
        this._scroll = uki('ScrollPane', this._popup)[0];
        
        this._popup.bind('toggle', uki.proxy(function(e) {
            this._down = this._popup.visible();
            if (this._popup.visible()) {
                this._updateWidth();
                this._scroll.scrollTop(this._lastScroll);
            }
            this._checked = this._popup.visible();
            this._updateBg();
        }, this));
        
        this.bind(this._list.keyPressEvent(), function(e) {
            if (this.preventTransfer) {
                this.preventTransfer = false;
                return;
            }
            if (this._popup.visible()) {
                this._list.trigger(e.type, e);
            }
        });
        
        this.bind('blur', function() { 
            setTimeout(uki.proxy(function() {
                if (!this._hasFocus && this.opened()) {
                    this._lastScroll = this._scroll.scrollTop();
                    this._popup.hide();
                }
            }, this), 50)
        });
        
        // refocus on list click
        this._list.bind('focus', uki.proxy(function() {
            this._hasFocus = false;
            this.focus();
            // setTimeout(uki.proxy(this.focus, this), 5);
        }, this));
        
        this._list.bind('click', uki.proxy(this.selectCurrent, this));
    };
    
    this.contentsSize = function(autosize) {
        var html = this.html(), size;
        this.html(this._longestText);
        size = Base.contentsSize.call(this, autosize);
        this.html(html);
        return size;
    };

    this._keydown = function(e) {
        if ((e.which == 32 || e.which == 13) && this._popup.visible()) {
            this.selectCurrent(e);
        } else if ((e.which == 40 || e.which == 38) && !this._popup.visible()) {
            this._popup.toggle();
            e.preventDefault();
            this.preventTransfer = true;
        } else {
            Base._keydown.call(this, e);
        }
    };
    
    this.selectCurrent = function(e) {
        if (this.selectedIndex() == -1) {
            this.text(this._selectFirst && this._options[0] ? this._options[0].text : '');
        } else {
            this.text(this._options[this.selectedIndex()].text);
        }
        this._lastScroll = this._scroll.scrollTop();
        this._popup.hide();
        if (e) this.trigger('change', { source: this });
    };
    
    this.value = function(v) {
        if (v === undefined) {
            return this._options[this.selectedIndex()] ? this._options[this.selectedIndex()].value : undefined;
        } else {
            var index = -1,
                option,
                l = this._options.length,
                i;
            for (i=0; i < l; i++) {
                option = this._options[i];
                if (option.value == v) {
                    index = i;
                    break;
                }
            };
            this.selectedIndex(index);
            this.selectCurrent();
        }
    };
    
    this.maxPopupHeight = uki.newProp('_maxPopupHeight');
    
    this._updateWidth = function() {
        if (this._widthCached || !this._options.length) return;
        var source = this._list.dom().firstChild.firstChild.firstChild, /// omg!
            html = source.innerHTML;
            
        source.innerHTML = this._longestText;
        this._widthCached = source.offsetWidth + 8;
        source.innerHTML = html;
        this._popup.rect(new uki.geometry.Rect(
            this._popup.rect().x,
            this._popup.rect().y,
            Math.max(this._widthCached, this.rect().width),
            Math.min(this._maxPopupHeight, this._options.length * 22)
        )).layout();
    };
    
    this.options = uki.newProp('_options', function(o) {
        this._options = o;
        this._list
            .data(uki.map(o, 'text'))
            .selectedIndex(0);
        
        if (this._selectFirst && (o.length > 0)) this.text(o[0].text);
        this._longestText = '';
        uki.each(o, function(i, row) {
            if (row.text.length > this._longestText.length) this._longestText = row.text;
        }, this);
        this._widthCached = false;
        this._lastScroll = 0;
    });
    
    uki.delegateProp(this, 'selectedIndex', '_list');
    
    this._updateBg = function() {
        return Base._updateBg.call(this);
    };
    
    this._mousedown = function(e) {
        Base._mousedown.call(this, e);
        if (this.disabled()) return;
        this._popup.toggle();
        this.trigger('toggle', { opened: this.opened() });
        // if (this._popup.visible()) this._list.focus();
    };
    
    this._mouseup = function(e) {
        if (!this._down) return;
        this._down = false;
    };
    
});

uki.Collection.addAttrs(['options']);