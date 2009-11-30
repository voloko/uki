include('utils.js');
include('dom.js');
include('attr.js');
include('geometry.js');

(function() {
    var root = this;

    var self = uki.Attachment = uki.newClass({
        init: function( dom, view, size, options ) {
            options = options || {};
            this._dom     = dom;
            this._view    = view;
            this._size    = uki.geometry.Size.create(size) || new uki.geometry.Size(1000, 1000);
            this._maxSize = uki.geometry.Size.create(options.maxSize) || new uki.geometry.Size(50000, 50000);
            this._minSize = uki.geometry.Size.create(options.minSize) || new uki.geometry.Size(0, 0);
            
            view.parent(this);
            
            var computedStyle = dom.runtimeStyle || dom.ownerDocument.defaultView.getComputedStyle(dom, null);
            if (!computedStyle.position || computedStyle.position == 'static') dom.style.position = 'relative';
            self.register(this);
            
            this.resize();
        },
        
        domForChild: function() {
            return this._dom;
        },
        
        resize: function() {
            var size = new uki.geometry.Size(
                Math.min(this._maxSize.width, Math.max(this._minSize.width,  this._dom.offsetWidth)), 
                Math.min(this._maxSize.height, Math.max(this._minSize.height, this._dom.offsetHeight))
            );
            if (size.eq(this._size)) return;
            
            this._view.resizeWithOldSize(this._size, size);
            this._size = size;
            
            this._view.layout();
        },
        
        dom: function() {
            return this._dom;
        },
        
        view: function() {
            return this._view;
        }
    });
    
    self.instances = [];
    
    self.register = function(a) {
        if (self.instances.length == 0) {
            uki.dom.bind(root, 'resize', function() {
                uki.each(self.instances, function() { this.resize() });
            })
        }
        self.instances.push(a);
    }
    
    self.children = function() {
        return uki.map(self.instances, 'view');
    };
    
    uki.top = function() {
        return [self];
    };
})();
