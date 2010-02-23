include('button.js');
include('flow.js');

uki.view.toolbar = {};

uki.view.Toolbar = uki.newClass(uki.view.Container, new function() {
    var Base = uki.view.Container.prototype,
        proto = this;
        
    proto.typeName = function() { return 'uki.view.Toolbar'; };
    
    proto._moreWidth = 30;
    
    proto._setup = function() {
        Base._setup.call(this);
        this._buttons = [];
        this._widths = [];
    };
    
    this.buttons = uki.newProp('_buttons', function(b) {
        this._buttons = b;
        var buttons = uki.build(uki.map(this._buttons, this._createButton, this)).resizeToContents('width');
        this._flow.childViews(buttons);
        this._totalWidth = uki.reduce(0, this._flow.childViews(), function(s, v) { return s + v.rect().width; });
    });
    
    uki.moreWidth = uki.newProp('_moreWidth', function(v) {
        this._moreWidth = v;
        this._updateMoreVisible();
    });
    
    proto._createDom = function() {
        Base._createDom.call(this);
        
        var rect = this.rect(),
            flowRect = rect.clone().normalize(),
            moreRect = new Rect(rect.width - this._moreWidth, 0, this._moreWidth, rect.height),
            flowML = { view: 'HorizontalFlow', rect: flowRect, anchors: 'left top right', className: 'toolbar-flow', horizontal: true },
            moreML = { view: 'Button', rect: moreRect, anchors: 'right top', className: 'toolbar-button',  visible: false, backgroundPrefix: 'toolbar-more-', text: '>>', focusable: false },
            popupML = { view: 'Popup', rect: '0 0', anchors: 'right top', className: 'toolbar-popup', background: 'theme(toolbar-popup)', 
                childViews: { view: 'VerticalFlow', rect: '0 0', anchors: 'right top left bottom' }
            };
            
        this._flow = uki.build(flowML)[0];
        this._more = uki.build(moreML)[0];
        this.appendChild(this._flow);
        this.appendChild(this._more);
        popupML.relativeTo = this._more;
        this._popup = uki.build(popupML)[0];
        
        this._more.bind('click', uki.proxy(this._showMissingButtons, this));
    };
    
    proto._showMissingButtons = function() {
        var maxWith = this._flow.rect().width,
            currentWidth = 0,
            missing = [];
        for (var i=0, childViews = this._flow.childViews(), l = childViews.length; i < l; i++) {
            currentWidth += childViews[i].rect().width;
            if (currentWidth > maxWith) missing.push(i);
        };
        var newButtons = uki.map(missing, function(i) {
            var descr = { html: childViews[i].html(), backgroundPrefix: 'toolbar-popup-' };
            uki.each(['fontSize', 'fontWeight', 'color', 'textAlign', 'inset'], function(j, name) {
                descr[name] = uki.attr(childViews[i], name);
            });
            return this._createButton(descr);
        }, this);
        uki('VerticalFlow', this._popup).childViews(newButtons).resizeToContents('width height');
        this._popup.resizeToContents('width height').toggle();
    };
    
    proto._updateMoreVisible = function() {
        var rect = this._rect;
        if (this._more.visible() != rect.width < this._totalWidth) {
            this._more.visible(rect.width < this._totalWidth);
            var flowRect = this._flow.rect();
            flowRect.width += (rect.width < this._totalWidth ? -1 : 1)*this._moreWidth;
            this._flow.rect(flowRect);
        }
    };
    
    proto.rect = function(rect) {
        var result = Base.rect.call(this, rect);
        if (rect) this._updateMoreVisible();
        return result;
    };
    
    proto._createButton = function(descr) {
        return uki.extend({ 
                view: 'Button', rect: new Rect(100, this.rect().height), focusable: false, align: 'left',
                anchors: 'left top', backgroundPrefix: 'toolbar-', autosizeToContents: 'width', focusable: false
            }, descr);
    };    
});