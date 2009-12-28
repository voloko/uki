include('button.js');
include('flow.js');

uki.view.toolbar = {};

uki.view.Toolbar = uki.newClass(uki.view.Container, new function() {
    var Base = uki.view.Container[PROTOTYPE],
        proto = this;
        
    proto.typeName = function() { return 'uki.view.Toolbar'; };
    
    proto._moreWidth = 30;
    
    proto._setup = function() {
        Base._setup.call(this);
        this._buttons = [];
        this._widths = [];
    };
    
    uki.addProps(proto, ['buttons', 'moreWidth']);
    
    proto._createDom = function() {
        Base._createDom.call(this);
        
        var rect = this.rect(),
            flowRect = rect.clone().normalize(),
            moreRect = new Rect(rect.width - this._moreWidth, 0, this._moreWidth, rect.height),
            buttonsML = uki.map(this._buttons, this._createButton, this),
            flowML = { view: 'Flow', rect: flowRect, anchors: 'left top right', className: 'toolbar-flow', horizontal: true, childViews: buttonsML },
            moreML = { view: 'Button', rect: moreRect, anchors: 'right top', className: 'toolbar-button',  backgroundPrefix: 'toolbar-more-', visible: false, text: '>>', focusable: false };
            
        this._flow = uki.build(flowML)[0];
        this._more = uki.build(moreML)[0];
        this.appendChild(this._flow);
        this.appendChild(this._more);

        uki(this._flow.childViews()).resizeToContents();
        this._totalWidth = uki.reduce(0, this._flow.childViews(), function(s, v) { return s + v.rect().width; });
        this._more.visible(rect.width < this._totalWidth);
        if (rect.width < this._totalWidth) flowRect.width -= this._moreWidth;
        this._flow.rect(flowRect);
    };
    
    proto.rect = function(rect) {
        var result = Base.rect.call(this, rect);
        if (this._more && rect !== undefined) {
            if (this._more.visible() != rect.width < this._totalWidth) {
                this._more.visible(rect.width < this._totalWidth);
                var flowRect = this._flow.rect();
                flowRect.width += (rect.width < this._totalWidth ? -1 : 1)*this._moreWidth;
            }
        }
        return result;
    };
    
    proto._createButton = function(descr) {
        return uki.extend({ 
                view: 'Button', rect: new Rect(100, this.rect().height), focusable: false, align: 'left',
                anchors: 'left top', backgroundPrefix: 'toolbar-', autosizeToContents: 'width', focusable: false
            }, descr);
    };    
});