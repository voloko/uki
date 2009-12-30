include('uki.js');
include('attachment.js');


(function() {
    
    /**
     * Collection performs group operations on uki.view objects
     * Behaves much like result jQuery(dom nodes).
     * Most methods are chainable like .attr('text', 'somevalue').bind('click', function() { ... })
     *
     * Its easier to call uki([view1, view2]) or uki('selector') instead of creating collection directly
     *
     * @author voloko
     * @constructor
     * @class uki.Collection
     */
    uki.Collection = function( elems ) {
        this.length = 0;
    	Array[PROTOTYPE].push.apply( this, elems );
    };

    var self = uki.fn = uki.Collection[PROTOTYPE] = {};
    
    /**
     * Iterates trough all items within itself
     * @param {Function} callback Callback to call for every item
     * @returns self
     * @type uki.view.Collection
     */
    self.each = function( callback ) {
        uki.each( this, callback );
        return this;
    };
    
    /**
     * Creates a new uki.Collection populated with found items
     * @param {Function} callback Callback to call for every item
     * @returns created collection
     * @type uki.view.Collection
     */
    self.grep = function( callback ) {
        return new uki.Collection( uki.grep(this, callback) );
    };
    
    /**
     * Sets an attribute on all views or gets the value of the attribute on the first view
     * Example
     *   c.attr('text', 'my text') // sets text to 'my text' on all collection views
     *   c.attr('name') // gets name attribute on the first view
     *
     * @param {String} name Name of the attribute
     * @param {Object} value [optional] Value to set
     * @returns Self or attribute value
     * @type uki.view.Collection|Object
     */
    self.attr = function( name, value ) {
        if (value !== undefined) {
            this.each(function() {
                uki.attr( this, name, value );
            });
            return this;
        } else {
            return this[0] ? uki.attr( this[0], name ) : '';
        }
    };
    
    /**
     * Finds views within collection context
     * Example
     *   c.find('Button')
     *
     * @param {String} selector 
     * @returns Collection of found items
     * @type uki.view.Collection
     */
    self.find = function( selector ) {
        return uki.find( selector, this );
    };
    
    /**
     * Attaches all child views to dom container
     *
     * @param {Element} dom Container dom element
     * @param {uki.geometry.Rect} rect Default size
     * @returns self
     * @type uki.view.Collection
     */
    self.attachTo = function( dom, rect ) {
        this.each(function() {
            new uki.Attachment( dom, this, rect );
        });
        return this;
    };
    
    /**
     * Appends views to the first item in collection
     *
     * @param {Array of uki.view.Base} views Views to append
     * @returns self
     * @type uki.view.Collection
     */
    self.append = function( views ) {
        if (!this[0]) return this;
        views = views.length !== undefined ? views : [views];
        for (var i=0; i < views.length; i++) {
            this[0].appendChild(views[i]);
        };
        return this;
    };
    
    uki.each(['parent'], function(i, name) {
        self[name] = function() {
            return new uki.Collection( uki.map(this, name) );
        };
    });
    
    uki.each(['scrollableParent'], function(i, name) {
       self[name] = function() {
            return new uki.Collection( uki.map(this, function(c) { return uki.view[name](c); }) );
        };
    });
    
    uki.each(('bind,unload,trigger,layout,appendChild,removeChild,addRow,removeRow,' +
        'resizeToContents,toggle').split(','), function(i, name) {
        self[name] = function() { 
            for (var i=0; i < this.length; i++) {
                this[i][name].apply(this[i], arguments);
            };
            return this;
        };
    });
    
    uki.each(('html,text,background,value,rect,checked,selectedIndex,' +
        'childViews,typeName,id,name,visible').split(','), function(i, name) {
        self[name] = function( value ) { return this.attr( name, value ); };
    });
    
    uki.each( ("blur,focus,load,resize,scroll,unload,click,dblclick," +
    	"mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave," +
    	"change,select,submit,keydown,keypress,keyup,error").split(","), function(i, name){
    	self[name] = function( handler ){
    	    if (handler) {
        		this.bind(name, handler);
    	    } else {
                for (var i=0; i < this.length; i++) {
                    this[i][name]();
                };
    	    }
    		return this;
    	};
    });
})();
