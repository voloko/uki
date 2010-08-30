include('uki.js');
include('attachment.js');
include('dom/event.js');

/**
 * Collection performs group operations on uki.view objects.
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
	Array.prototype.push.apply( this, elems );
};

uki.fn = uki.Collection.prototype = new function() {
    var proto = this;
    
    /**#@+ @memberOf uki.Collection# */
    /**
     * Iterates trough all items within itself
     *
     * @function
     *
     * @param {function(this:uki.view.Base, number, uki.view.Base)} callback Callback to call for every item
     * @returns {uki.view.Collection} self
     */
    this.each = function( callback ) {
        return uki.each( this, callback );        
    };

    /**
     * Creates a new uki.Collection populated with found items
     *
     * @function
     *
     * @param {function(uki.view.Base, number):boolean} callback Callback to call for every item
     * @returns {uki.view.Collection} created collection
     */
    this.grep = function( callback ) {
        return new uki.Collection( uki.grep(this, callback) );
    };

    /**
     * Sets an attribute on all views or gets the value of the attribute on the first view
     *
     * @example
     * c.attr('text', 'my text') // sets text to 'my text' on all collection views
     * c.attr('name') // gets name attribute on the first view
     *
     * @function
     *
     * @param {string} name Name of the attribute
     * @param {object=} value Value to set
     * @returns {uki.view.Collection|Object} Self or attribute value
     */
    this.attr = function( name, value ) {
        if (value !== undefined) {
            for (var i=this.length-1; i >= 0; i--) {
                uki.attr( this[i], name, value );
            };
            return this;
        } else {
            return this[0] ? uki.attr( this[0], name ) : "";
        }
    };

    /**
     * Finds views within collection context
     * @example
     * c.find('Button')
     *
     * @function
     *
     * @param {string} selector 
     * @returns {uki.view.Collection} Collection of found items
     */
    this.find = function( selector ) {
        return uki.find( selector, this );
    };

    /**
     * Attaches all child views to dom container
     *
     * @function
     *
     * @param {Element} dom Container dom element
     * @param {uki.geometry.Rect} rect Default size
     * @returns {uki.view.Collection} self
     */
    this.attachTo = function( dom, rect ) {
        this.each(function() {
            new uki.Attachment( dom, this, rect );
        });
        return this;
    };

    /**
     * Appends views to the first item in collection
     *
     * @function
     *
     * @param {Array.<uki.view.Base>} views Views to append
     * @returns {uki.view.Collection} self
     */
    this.append = function( views ) {
        var target = this[0];
        if (!target) return this;
		
        views = views.length !== undefined ? views : [views];
		
        for (var i = views.length-1; i >= 0; i--) {
            target.appendChild(views[i]);
        };
		
        return this;
    };
    
    this.appendTo = function( target ) {
        target = uki(target)[0];
        this.each(function() {
            target.appendChild(this);
        });
        return this;	
        
    };

    /**#@-*/

    /**
     * @function
     */
    uki.Collection.addAttrs = function(attrNames) {
        uki.each(attrNames, function(i, name) {
            proto[name] = function( value ) { return this.attr( name, value ); };
        });
    };

    /** @function
    @name uki.Collection#html */
    /** @function
    @name uki.Collection#text */
    /** @function
    @name uki.Collection#background */
    /** @function
    @name uki.Collection#value */
    /** @function
    @name uki.Collection#rect */
    /** @function
    @name uki.Collection#checked */
    /** @function
    @name uki.Collection#anchors */
    /** @function
    @name uki.Collection#childViews */
    /** @function
    @name uki.Collection#typeName */
    /** @function
    @name uki.Collection#id */
    /** @function
    @name uki.Collection#name */
    /** @function
    @name uki.Collection#visible */
    /** @function
    @name uki.Collection#disabled */
    /** @function
    @name uki.Collection#focusable */
    /** @function
    @name uki.Collection#style */
    uki.Collection.addAttrs('dom html text background value rect checked anchors childViews typeName id name visible disabled focusable style draggable textSelectable width height minX maxX minY maxY left top x y contentsSize'.split(' '));
    
    
    /** @function
    @name uki.Collection#parent */
    /** @function
    @name uki.Collection#next */
    /** @function
    @name uki.Collection#prev */
    uki.each([
        ['parent', 'parent'],
        ['next', 'nextView'],
        ['prev', 'prevView']
    ], function(i, desc) {
        proto[ desc[0] ] = function() {
            return new uki.Collection( uki.unique( uki.map(this, desc[1]) ) );
        };
    });
    

    /** @function
    @name uki.Collection#bind */
    /** @function
    @name uki.Collection#unload */
    /** @function
    @name uki.Collection#trigger */
    /** @function
    @name uki.Collection#layout */
    /** @function
    @name uki.Collection#appendChild */
    /** @function
    @name uki.Collection#removeChild */
    /** @function
    @name uki.Collection#insertBefore */
    /** @function
    @name uki.Collection#addRow */
    /** @function
    @name uki.Collection#removeRow */
    /** @function
    @name uki.Collection#resizeToContents */
    /** @function
    @name uki.Collection#toggle */
    uki.each('bind unbind trigger layout appendChild removeChild insertBefore addRow removeRow resizeToContents toggle'.split(' '), function(i, name) {
        proto[name] = function() { 
            for (var i=this.length-1; i >=0; i--) {
                this[i][name].apply(this[i], arguments);
            };
            return this;
        };
    });

     /** @function
    @name uki.Collection#blur */
    /** @function
    @name uki.Collection#focus */
    /** @function
    @name uki.Collection#load */
    /** @function
    @name uki.Collection#resize */
    /** @function
    @name uki.Collection#scroll */
    /** @function
    @name uki.Collection#unload */
    /** @function
    @name uki.Collection#click */
    /** @function
    @name uki.Collection#dblclick */
    /** @function
    @name uki.Collection#mousedown */
    /** @function
    @name uki.Collection#mouseup */
    /** @function
    @name uki.Collection#mousemove */
    /** @function
    @name uki.Collection#mouseover */
    /** @function
    @name uki.Collection#mouseout */
    /** @function
    @name uki.Collection#mouseenter */
    /** @function
    @name uki.Collection#mouseleave */
    /** @function
    @name uki.Collection#change */
    /** @function
    @name uki.Collection#select */
    /** @function
    @name uki.Collection#submit */
    /** @function
    @name uki.Collection#keydown */
    /** @function
    @name uki.Collection#keypress */
    /** @function
    @name uki.Collection#keyup */
    /** @function
    @name uki.Collection#error */
    uki.each( uki.dom.events, function(i, name){
    	proto[name] = function( handler ){
    	    if (handler) {
        		this.bind(name, handler);
    	    } else {
                for (var i=this.length-1; i >=0; i--) {
                    this[i][name] ? this[i][name]() : this[i].trigger(name);
                };
    	    }
    		return this;
    	};
    });
};

