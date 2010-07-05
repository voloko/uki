include('const.js');
include('utils.js');
include('after.js');
include('dom.js');
include('geometry.js');
include('view/observable.js');

(function() {
    var self = uki.Attachment = uki.newClass(uki.view.Observable, /** @lends uki.Attachment.prototype */ {
        /**
         * Attachment serves as a connection between a uki view and a dom container.
         * It notifies its view with parentResized on window resize. 
         * Attachment supports part of uki.view.Base API like #domForChild or #rectForChild
         *
         * @param {Element} dom Container element
         * @param {uki.view.Base} view Attached view
         * @param {uki.geometry.Rect} rect Initial size
         *
         * @see uki.view.Base#parentResized
         * @name uki.Attachment
         * @augments uki.view.Observable
         * @constructor
         */
        init: function( dom, view, rect ) {
            uki.initNativeLayout();
            
            this._dom     = dom = dom || root;
            this._view    = view;
            this._rect = Rect.create(rect) || this.rect();
            
            uki.dom.offset.initialize();
            
            view.parent(this);
            this.domForChild().appendChild(view.dom());
            
            if (dom != root && dom.tagName != 'BODY') {
                var computedStyle = dom.runtimeStyle || dom.ownerDocument.defaultView.getComputedStyle(dom, null);
                if (!computedStyle.position || computedStyle.position == 'static') dom.style.position = 'relative';
            }
            self.register(this);

            this.layout();
        },
        
        /**
         * Returns document.body if attached to window. Otherwise returns dom
         * uki.view.Base api
         *
         * @type Element
         */
        domForChild: function() {
            return this._dom === root ? doc.body : this._dom;
        },
        
        /**
         * uki.view.Base api
         *
         * @type uki.geometry.Rect
         */
        rectForChild: function(child) {
            return this.rect();
        },
        
        /**
         * uki.view.Base api
         */
        scroll: function() {
            // TODO: support window scrolling
        },  
        
        /**
         * uki.view.Base api
         */
        scrollTop: function() {
            // TODO: support window scrolling
            return this._dom.scrollTop || 0;
        },
        
        /**
         * uki.view.Base api
         */
        scrollLeft: function() {
            // TODO: support window scrolling
            return this._dom.scrollLeft || 0;
        },
        
        /**
         * uki.view.Base api
         */
        parent: uki.F,
        
        /**
         * uki.view.Base api
         */
        childResized: uki.F,
        
        /**
         * On window resize resizes and layout its child view
         * @fires event:layout
         */
        layout: function() {
            var oldRect = this._rect;
                
            // if (rect.eq(this._rect)) return;
            var newRect = this._rect = this.rect();
            this._view.parentResized(oldRect, newRect);
            if (this._view._needsLayout) this._view.layout();
            this.trigger('layout', {source: this, rect: newRect});
        },
        
        /**
         * @return {Element} Container dom
         */
        dom: function() {
            return this._dom;
        },
        
        /**
         * @return {Element} Child view
         */
        view: function() {
            return this._view;
        },
        
        /**
         * @private
         * @return {uki.geometry.Rect} Size of the container
         */
        rect: function() {
            var width = this._dom === root || this._dom === doc.body ? 
                    MAX(getRootElement().clientWidth, this._dom.offsetWidth || 0) : 
                    this._dom.offsetWidth,
                height = this._dom === root || this._dom === doc.body ? 
                    MAX(getRootElement().clientHeight, this._dom.offsetHeight || 0) : 
                    this._dom.offsetHeight;
            
            return new Rect(width, height);
        }
    });
    
    function getRootElement() {
        return doc.compatMode == "CSS1Compat" && doc.documentElement || doc.body;
    }
    
    self.instances = [];
    
    /**
     * @memberOf uki.Attachment
     */
    self.register = function(a) {
        if (self.instances.length == 0) {
            var timeout = false;
            uki.dom.bind(root, 'resize', function() {
                if (!timeout) {
                    timeout = true;
                    setTimeout(function(i,len) {
                        uki.after.start();
                        
                        timeout = false;
						for (i=0,len=self.instances.length;i<len;i++)
							self.instances[i].layout();
							
                        uki.after.stop();
                    }, 1);
                }
            });
        }
        self.instances.push(a);
    };
    
    /**
     * @memberOf uki.Attachment
     */
    self.childViews = function() {
        return uki.map(self.instances, 'view');
    };
    
    /**
     * @memberOf uki.Attachment
     */
    uki.top = function() {
        return [self];
    };
})();
