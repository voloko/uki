include('button.js');
include('flow.js');

uki.view.toolbar = {};

/**
* Toolbar
*
* @author voloko
* @name uki.view.Toolbar
* @class
* @extends uki.view.Container
*/
uki.view.declare('uki.view.Toolbar', uki.view.Container, function(Base) {

    this.typeName = function() { return 'uki.view.Toolbar'; };
    
    this._moreWidth = 30;
    
    this._setup = function() {
        Base._setup.call(this);
        this._buttons = [];
        this._widths = [];
    };
    
    /**
    * @function
    * @name uki.view.Toolbar#buttons
    */
    this.buttons = uki.newProp('_buttons', function(b) {
        this._buttons = b;
        var buttons = uki.build(uki.map(this._buttons, this._createButton, this)).resizeToContents('width');
        this._flow.childViews(buttons);
        this._totalWidth = uki.reduce(0, this._flow.childViews(), function(s, v) { return s + v.rect().width; });
    });
    
    /**
    * @function
    * @name uki.view.Toolbar#moreWidth
    */
    uki.moreWidth = uki.newProp('_moreWidth', function(v) {
        this._moreWidth = v;
        this._updateMoreVisible();
    });
    
    this._createDom = function() {
        Base._createDom.call(this);
        
        var rect = this.rect(),
            flowRect = rect.clone().normalize(),
            moreRect = new Rect(rect.width - this._moreWidth, 0, this._moreWidth, rect.height),
            flowML = { view: 'HFlow', rect: flowRect, anchors: 'left top right', className: 'toolbar-flow', hidePartlyVisible: true },
            moreML = { view: 'Button', rect: moreRect, anchors: 'right top', className: 'toolbar-button',  visible: false, backgroundPrefix: 'toolbar-more-', text: '>>', focusable: false },
            popupML = { view: 'Popup', rect: '0 0', anchors: 'right top', className: 'toolbar-popup', background: 'theme(toolbar-popup)', 
                childViews: { view: 'VFlow', rect: '0 5 0 0', anchors: 'right top left bottom' }
            };
            
        this._flow = uki.build(flowML)[0];
        this._more = uki.build(moreML)[0];
        this.appendChild(this._flow);
        this.appendChild(this._more);
        popupML.relativeTo = this._more;
        this._popup = uki.build(popupML)[0];
        
        this._more.bind('click', uki.proxy(this._showMissingButtons, this));
    };
    
    this._showMissingButtons = function() {
        var maxWith = this._flow.rect().width,
            currentWidth = 0,
            missing = [];
        for (var i=0, childViews = this._flow.childViews(), l = childViews.length; i < l; i++) {
            currentWidth += childViews[i].rect().width;
            if (currentWidth > maxWith) missing.push(i);
        };
        var newButtons = uki.map(missing, function(i) {
            var descr = { html: childViews[i].html(), backgroundPrefix: 'toolbar-popup-button-' };
            uki.each(['fontSize', 'fontWeight', 'color', 'textAlign', 'inset'], function(j, name) {
                descr[name] = uki.attr(childViews[i], name);
            });
            return this._createButton(descr);
        }, this);
        uki('VFlow', this._popup).childViews(newButtons).resizeToContents('width height');
        this._popup.resizeToContents('width height').height(this._popup.height() + 5).toggle();
    };
    
    this._updateMoreVisible = function() {
        var rect = this._rect;
        if (this._more.visible() != rect.width < this._totalWidth) {
            this._more.visible(rect.width < this._totalWidth);
            var flowRect = this._flow.rect();
            flowRect.width += (rect.width < this._totalWidth ? -1 : 1)*this._moreWidth;
            this._flow.rect(flowRect);
        }
    };
    
    this.rect = function(rect) {
        var result = Base.rect.call(this, rect);
        if (rect) this._updateMoreVisible();
        return result;
    };
    
    this._createButton = function(descr) {
        var rect = this.rect().clone().normalize();
        rect.width = 100;
        return uki.extend({ 
                view: 'Button', rect: rect, focusable: false, align: 'left',
                anchors: 'left top', backgroundPrefix: 'toolbar-button-', autosizeToContents: 'width', focusable: false
            }, descr);
    };    
});