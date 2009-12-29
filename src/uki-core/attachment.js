include('const.js');
include('utils.js');
include('dom.js');
include('geometry.js');
include('view/observable.js');

(function() {
    var self = uki.Attachment = uki.newClass(uki.view.Observable, {
        init: function( dom, view, rect, options ) {
            uki.initNativeLayout();
            
            options = options || {};
            this._dom     = dom = dom || root;
            this._view    = view;
            this._rect = Rect.create(rect) || new Rect(1000, 1000);
            
            uki.dom.offset.initialize();
            
            view.parent(this);
            
            if (dom != root && dom.tagName != 'BODY') {
                var computedStyle = dom.runtimeStyle || dom.ownerDocument.defaultView.getComputedStyle(dom, null);
                if (!computedStyle.position || computedStyle.position == 'static') dom.style.position = 'relative';
            }
            self.register(this);

            this.layout();
            this.layout(); // ff needs 2 of them o_O
        },
        
        childResized: function() {
        },
        
        domForChild: function() {
            return this._dom === root ? doc.body : this._dom;
        },
        
        rect: function() {
            return this._rect;
        },
        
        rectForChild: function(child) {
            return this._rect;
        },
        
        scroll: function() {
            // TODO: support window scrolling
        },  
        
        // TODO: support window scrolling
        scrollTop: function() {
            return this._dom.scrollTop || 0;
        },
        
        // TODO: support window scrolling
        scrollLeft: function() {
            return this._dom.scrollLeft || 0;
        },
        
        parent: function() {
            return null;
        },
        
        layout: function() {
            var width = this._dom === root ? getRootElement().clientWidth : this._dom.offsetWidth,
                height = this._dom === root ? getRootElement().clientHeight : this._dom.offsetHeight,
                oldRect = this._rect;
                
            // if (rect.eq(this._rect)) return;

            this._rect = new Rect(width, height);

            this._view.parentResized(oldRect, this._rect);
            if (this._view._needsLayout) this._view.layout();
            this.trigger('layout', {source: this, rect: this._rect});
        },
        
        dom: function() {
            return this._dom;
        },
        
        view: function() {
            return this._view;
        }
    });
    
    function getRootElement() {
        return doc.compatMode == "CSS1Compat" && doc.documentElement || doc.body;
    }
    
    self.instances = [];
    
    self.register = function(a) {
        if (self.instances.length == 0) {
            uki.dom.bind(root, 'resize', function() {
                uki.each(self.instances, function() { this.layout(); });
            });
        }
        self.instances.push(a);
    };
    
    self.childViews = function() {
        return uki.map(self.instances, 'view');
    };
    
    uki.top = function() {
        return [self];
    };
})();
