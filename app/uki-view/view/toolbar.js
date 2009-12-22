include('button.js');
include('flow.js');

uki.view.Toolbar = uki.newClass(uki.view.Container, new function() {
    var Base = uki.view.Container[PROTOTYPE],
        proto = this;
        
    proto.init = function() {
        Base.init.call(this);
        this._containers = [];
        this._widths = [];
    };
    
    proto.buttons = function(buttons) {
        this.childViews([]);
        for (var i=0; i < buttons.length; i++) {
            this.appendButton(buttons[i]);
        };
    };
    
    
    
    // proto.appendButton = function(button) {
    //     var view = this._createButton(button);
    //     Base.appendChild.call(this, view);
    //     this._containers[view._viewIndex] = this._createContainer(view);
    //     this._widths[view._viewIndex] = view.rect().width;
    //     if (this._dom) this._dom.appendChild(this._containers[view._viewIndex]);
    // };
    // 
    // proto.domForChild = function(child) {
    //     return this._containers[child._viewIndex];
    // };
    
    // proto._createButton = function(descr) {
    //     var size = Size.create(descr.size || '16 16'),
    //         url  = descr.url,
    //         label = descr.label,
    //         inset = new Inset(0, 4, 0, 8 + size.width);
    //         html = ['<img src="', url, '" width="', size.width, '" height="', size.height, 
    //             '" style="position: absolute; top: ', (this.rect().height - size.height)/2, 'px;',
    //             ' left: -', (size.width + 4), 'px;" />'].join(''),
    //         button = uki({ view: 'Button', rect: '100 ' + this.rect().height, anchors: 'left top', backgroundPrefix: 'toolbar-', inset: inset, autosizeToContents: 'width', html: html });
    //     return button[0];
    // };
    
    proto.typeName = function() {
        return 'uki.view.Toolbar';
    };
});