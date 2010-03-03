uki.view.VerticalFlow = uki.newClass(uki.view.Container, new function() {
    var Base = uki.view.Container.prototype,
        proto = this;

    
    proto._setup = function() {
        Base._setup.call(this);
        uki.extend(this, {
            _horizontal: false,
            _dimension: 'height',
            _containers: [],
            _containerSizes: [],
            defaultCss: this.defaultCss + 'overflow:hidden;'
        });
    };
    
    proto.typeName = function() {
        return 'uki.view.VerticalFlow';
    };
    
    proto.horizontal = uki.newProp('_horizontal', function(h) {
        this._dimension = h ? 'width' : 'height';
    });
    
    proto.appendChild = function(view) {
        var container = this._createContainer(view),
            viewIndex = this._childViews.length;
            
        this._containers[viewIndex] = container;
        this._containerSizes[viewIndex] = view.rect()[this._dimension];
        this._dom.appendChild(container);

        Base.appendChild.call(this, view);
    };
    
    proto.insertBefore = function(view, beforeView) {
        var container = this._createContainer(view),
            viewIndex = beforeView._viewIndex;
            
        this._dom.insertBefore(container, this._containers[viewIndex]);
        this._containers.splice(viewIndex, 0, container);
        this._containerSizes.splice(viewIndex, 0, view.rect()[this._dimension]);
        Base.insertBefore.call(this, view, beforeView);
    };
    
    proto.removeChild = function(view) {
        var container = this._containers[view._viewIndex];
        Base.removeChild.call(this, view);
        
        this._dom.removeChild(container);
        this._containers = uki.grep(this._containers, function(c) { return c != container; });
    };
    
    proto.domForChild = function(child) {
        return this._containers[child._viewIndex];
    };
    
    proto.rectForChild = function(child) {
        return new Rect(this.rect().width, this._containerSizes[child._viewIndex]);
    };
    
    proto.contentsSize = function() {
        var d = this._dimension,
            value = uki.reduce(0, this._childViews, function(sum, e) { return sum + e.rect()[d]; } );
        if (this._horizontal) {
            return new Size( value, this.contentsHeight() );
        } else {
            return new Size( this.contentsWidth(), value );
        }
    };
    
    proto._updateSize = function(dv) {
        var rect = this.rect(),
            width, height;
            
        if (this._horizontal) {
            width = rect.width + dv;
            height = rect.height;
        } else {
            width = rect.width;
            height = rect.height + dv;
        }
        this.rect( new Rect(rect.x, rect.y, width, height) );
    };
    
    proto._createDom = function() {
        Base._createDom.call(this);
        for (var i=0; i < this._containers.length; i++) {
            // this._initContainer(this._containers[i]);
            this._dom.appendChild(this._containers[i]);
        };
    };
    
    // proto._initContainer = function(c) {
    //     if (this._horizontal) {
    //         c.style.cssText += ';float:left';
    //         c.style.height = this.rect().height + 'px';
    //     }
    // };
    
    proto._layoutDom = function(rect) {
        Base._layoutDom.call(this, rect);
        var i, l, c, v;
        for (i=0, l = this._containers.length; i < l; i++) {
            c = this._containers[i];
            v = this._childViews[i].rect()[this._dimension];
            if (v != this._containerSizes[i]) {
                c.style[this._dimension] = v + 'px';
                this._containerSizes[i] = v;
            }
        };
    };
    
    proto._createContainer = function(view) {
        var container = uki.createElement('div', 'position:relative;top:0;left:0;width:100%;padding:0;');
        container.style[this._dimension] = view.rect()[this._dimension] + PX;
        // this._initContainer(container);
        return container;
    };
});

uki.view.HorizontalFlow = uki.newClass(uki.view.VerticalFlow, {
    _setup: function() {
        uki.view.VerticalFlow.prototype._setup.call(this);
        this._horizontal = true;
        this._dimension = 'width';
    },
    typeName: function() { return 'uki.view.HorizontalFlow'; },
    
    _createContainer: function(view) {
        var container = uki.createElement('div', 'position:relative;top:0;left:0;float:left;padding:0;height:100%;');
        container.style[this._dimension] = view.rect()[this._dimension] + PX;
        // this._initContainer(container);
        return container;
    },
    rectForChild: function(child) {
        return new Rect(this._containerSizes[child._viewIndex], this.rect().height);
    }
});
