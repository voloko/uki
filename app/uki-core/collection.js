include('../uki.js');
include('attr.js');
include('attachment.js');


(function() {
    uki.Collection = function( elems ) {
        this.length = 0;
    	Array.prototype.push.apply( this, elems );
    };

    var self = uki.fn = uki.Collection.prototype = {};
    
    self.each = function( callback ) {
        uki.each( this, callback );
        return this;
    };
    
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
    
    uki.each(['html', 'text', 'background', 'value', 'rect', 'checked', 'selectedIndex'], function(i, name) {
        self[name] = function( value ) { return this.attr( name, value ) };
    })
    
    uki.each( ("blur,focus,load,resize,scroll,unload,click,dblclick," +
    	"mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave," +
    	"change,select,submit,keydown,keypress,keyup,error").split(","), function(i, name){
    	self[name] = function( handler ){
    		this.bind(name, handler);
    	};
    });
    	    
    
    self.find = function( selector ) {
        return uki.find( selector, this );
    };
    
    self.attachTo = function( node, minSize, options ) {
        this.each(function() {
            new uki.Attachment( node, this, minSize, options );
        });
        return this;
    };
    
    self.append = function( views ) {
        if (!this[0]) return this;
        views = views.length !== undefined ? views : [views];
        for (var i=0; i < views.length; i++) {
            this[0].appendChild(views[i]);
        };
        return this;
    };
    
    uki.each(['bind', 'unbind', 'trigger'], function(i, name) {
        self[name] = function() {
            for (var i=0; i < this.length; i++) {
                this[i][name].apply(this[i], arguments);
            };
            return this;
        };
    });
})();
