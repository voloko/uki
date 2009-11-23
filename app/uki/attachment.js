include('utils.js');
include('dom.js');
include('attr.js');
include('geometry.js');
include('layout.js');

(function() {
    var root = this;

    var self = uki.Attachment = uki.newClass({
        init: function( dom, view ) {
            this._dom = dom;
            this._view = view;
            dom.appendChild(view.dom());
            self.register(this);
            this.resize();
            uki.layout.perform();
        },
        
        resize: function() {
            this._view.rect(new uki.geometry.Rect(0, 0, this._dom.offsetWidth, this._dom.offsetHeight))
        },
        
        view: function() {
            return this._view;
        }
    });
    
    self.instances = [];
    
    self.register = function(a) {
        if (self.instances.length == 0) {
            uki.bind(root, 'resize', function() {
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
