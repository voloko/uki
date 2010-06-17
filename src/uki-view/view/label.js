include('../../uki-core/const.js');

/**
 * Label View
 * Contains any html
 * 
 * @author voloko
 * @name uki.view.Label
 * @class
 * @extends uki.view.Base
 */
uki.view.declare('uki.view.Label', uki.view.Base, function(Base) {

    this._setup = function() {
        Base._setup.call(this);
        uki.extend(this, {
            _scrollable: false,
            _textSelectable: false,
            _inset: new Inset()
        });
        this.defaultCss += uki.theme.style('label');
    };
    
    this._style = function(name, value) {
        if (value !== undefined && uki.inArray(name, uki.browser.textStyles) != -1) {
            this._label.style[name] = value;
        }
        return Base._style.call(this, name, value);
    };
    
    this.textSelectable = function(state) {
        if (state !== undefined && !this._textSelectProp) {
            this._label.unselectable = state ? '' : 'on';
        }
        return Base.textSelectable.call(this, state);
    };  
    
    /**
     * Warning! this operation is expensive
     */
    this.contentsSize = function(autosize) {
        var clone = this._createLabelClone(autosize), inset = this.inset(), size;
        
        uki.dom.probe(clone, function() {
            size = new Size(clone.offsetWidth + inset.width(), clone.offsetHeight + inset.height());
        });
        
        return size;
    };
    
    /**
     * Read/write escaped html contents 
     * @function
     * @name uki.view.Label#text
     */
    this.text = function(text) {
        return text === undefined ? this.html() : this.html(uki.escapeHTML(text));
    };
    
    /**
     * Read/write html contents
     * @function
     * @name uki.view.Label#html
     */
    this.html = function(html) {
        if (html === undefined) return this._label.innerHTML;
        this._label.innerHTML = html;
        return this;
    };
    
    /**
     * Insets between text and view borders
     * @function
     * @name uki.view.Label#inset
     */
    this.inset = uki.newProp('_inset', function(inset) {
        this._inset = Inset.create(inset);
    });

    /**
     * Whether label have inline scrollbars on not
     * @function
     * @name uki.view.Label#scrollable
     */
    this.scrollable = uki.newProp('_scrollable', function(state) {
        this._scrollable = state;
        this._label.style.overflow = state ? 'auto' : 'hidden';
    });
    
    /**
     * Whether can have multiline lines or not
     * @function
     * @name uki.view.Label#multiline
     */
    this.multiline = uki.newProp('_multiline', function(state) {
        this._multiline = state;
        this._label.style.whiteSpace = state ? '' : 'nowrap';
    });
    
    this._createLabelClone = function(autosize) {
        var clone = this._label.cloneNode(true),
            inset = this.inset(), rect = this.rect();
            
        if (autosize & ANCHOR_WIDTH) {
            clone.style.width = clone.style.right = '';
        } else if (uki.supportNativeLayout) {
            clone.style.right = '';
            clone.style.width = rect.width - inset.width() + 'px';
        }
        if (autosize & ANCHOR_HEIGHT) {
            clone.style.height = clone.style.bottom = '';
        } else if (uki.supportNativeLayout) {
            clone.style.bottom = '';
            clone.style.height = rect.height - inset.height() + 'px';
        }
        clone.style.paddingTop = 0;
        clone.style.visibility = 'hidden';
        return clone;
    };
    
    this._createDom = function() {
        Base._createDom.call(this);
        this._label = uki.createElement('div', this.defaultCss + 'white-space:nowrap;'); // text-shadow:0 1px 0px rgba(255,255,255,0.8);
        this._dom.appendChild(this._label);
        this.textSelectable(this.textSelectable());
    };
    
    this._layoutDom = function() {
        Base._layoutDom.apply(this, arguments);
        
        var inset = this._inset;
        if (!this.multiline()) {
            var fz = parseInt(this.style('fontSize'), 10) || 12;
            this._label.style.lineHeight = (this._rect.height - inset.top - inset.bottom) + 'px';
            // this._label.style.paddingTop = MAX(0, this._rect.height/2 - fz/2) + 'px';
        }
        var l;
        
        if (uki.supportNativeLayout) {
            l = {
                left: inset.left, 
                top: inset.top, 
                right: inset.right,
                bottom: inset.bottom
            };
        } else {
            l = {
                left: inset.left, 
                top: inset.top, 
                width: this._rect.width - inset.width(),
                height: this._rect.height - inset.height()
            };
        }
        this._lastLabelLayout = uki.dom.layout(this._label.style, l, this._lastLabelLayout);
    };
    
});
