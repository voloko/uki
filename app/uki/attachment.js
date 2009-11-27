include('utils.js');
include('dom.js');
include('attr.js');
include('geometry.js');
include('layout.js');

(function() {
    var root = this;

    var self = uki.Attachment = uki.newClass({
        init: function( dom, view, minSize ) {
            this._dom = dom;
            this._view = view;
            if (minSize) {
                this._minSize = typeof minSize == 'string' ? uki.geometry.Size.fromString(minSize) : minSize;
            } else {
                this._minSize = new uki.geometry.Size(0, 0);
            }
            
            dom.appendChild(view.dom());
            var computedStyle = dom.runtimeStyle || dom.ownerDocument.defaultView.getComputedStyle(dom, null);
            if (!computedStyle.position || computedStyle.position == 'static') dom.style.position = 'relative';
            self.register(this);
            this.resize();
            uki.layout.perform();
        },
        
        resize: function() {
            this._view.rect(new uki.geometry.Rect(
                0, 0, 
                Math.max(this._minSize.width, this._dom.offsetWidth), 
                Math.max(this._minSize.height, this._dom.offsetHeight)
            ));
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
                uki.layout.perform();
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
