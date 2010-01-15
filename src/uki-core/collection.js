include('uki.js');
include('attachment.js');


(function() {
    
    /**
     * <p>Collection performs group operations on uki.view objects.</p>
     * <p>Behaves much like result jQuery(dom nodes).
     * Most methods are chainable like .attr('text', 'somevalue').bind('click', function() { ... })</p>
     *
     * <p>Its easier to call uki([view1, view2]) or uki('selector') instead of creating collection directly</p>
     *
     * @author voloko
     * @constructor
     * @class
     */
    uki.Collection = function( elems ) {
        this.length = 0;
    	Array[PROTOTYPE].push.apply( this, elems );
    };

    /** @type uki.Collection.prototype */
    var self = uki.fn = uki.Collection[PROTOTYPE] = {};
    
    /**
     * Iterates trough all items within itself
     *
     * @name uki.Collection#each
     * @function
     *
     * @param {function(this:uki.view.Base, number, uki.view.Base)} callback Callback to call for every item
     * @returns {uki.view.Collection} self
     */
    self.each = function( callback ) {
        uki.each( this, callback );
        return this;
    };
    
    /**
     * Creates a new uki.Collection populated with found items
     *
     * @name uki.Collection#grep
     * @function
     *
     * @param {function(uki.view.Base, number):boolean} callback Callback to call for every item
     * @returns {uki.view.Collection} created collection
     */
    self.grep = function( callback ) {
        return new uki.Collection( uki.grep(this, callback) );
    };
    
    /**
     * Sets an attribute on all views or gets the value of the attribute on the first view
     *
     * @example
     * c.attr('text', 'my text') // sets text to 'my text' on all collection views
     * c.attr('name') // gets name attribute on the first view
     *
     * @name uki.Collection#attr
     * @function
     *
     * @param {string} name Name of the attribute
     * @param {object=} value Value to set
     * @returns {uki.view.Collection|Object} Self or attribute value
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
     * @example
     * c.find('Button')
     *
     * @name uki.Collection#find
     * @function
     *
     * @param {string} selector 
     * @returns {uki.view.Collection} Collection of found items
     */
    self.find = function( selector ) {
        return uki.find( selector, this );
    };
    
    /**
     * Attaches all child views to dom container
     *
     * @name uki.Collection#attachTo
     * @function
     *
     * @param {Element} dom Container dom element
     * @param {uki.geometry.Rect} rect Default size
     * @returns {uki.view.Collection} self
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
     * @name uki.Collection#append
     * @function
     *
     * @param {Array.<uki.view.Base>} views Views to append
     * @returns {uki.view.Collection} self
     */
    self.append = function( views ) {
        if (!this[0]) return this;
        views = views.length !== undefined ? views : [views];
        for (var i=0; i < views.length; i++) {
            this[0].appendChild(views[i]);
        };
        return this;
    };
    
    uki.Collection.addAttrs = function(attrNames) {
        uki.each(attrNames.split(','), function(i, name) {
            self[name] = function( value ) { return this.attr( name, value ); };
        });
    };
    
    uki.Collection.addAttrs('html,text,background,value,rect,checked,anchors,' +
        'childViews,typeName,id,name,visible,disabled,focusable,style');
    
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
    
    uki.each(('bind,unload,trigger,layout,appendChild,removeChild,insertBefore,addRow,removeRow,' +
        'resizeToContents,toggle').split(','), function(i, name) {
        self[name] = function() { 
            for (var i=0; i < this.length; i++) {
                this[i][name].apply(this[i], arguments);
            };
            return this;
        };
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
