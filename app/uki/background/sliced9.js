include('../background.js');
include('../image.js');

uki.background.Sliced9 = uki.newClass(new function() {
    var nativeCss = ['MozBorderImage', 'WebkitBorderImage', 'borderImage'],
        dom = uki.dom;
    
    this.init = function(settings, fixedSize) {
        this._settings = uki.extend({}, settings);
        this._fixedSize = uki.geometry.Size.create(fixedSize) || new uki.geometry.Size(0, 0);
        this._inset = null;
        this._container = null;
        this._size = null;
        this._inited = false;
        this._attached = false;
        
        this._loadImages();
    };
    
    this.attachTo = function(comp) {
        this._comp = comp;
        
        var _this = this;

        this._layoutHandler = function(e) {
            if (_this._size && _this._size.eq(e.rect)) return;
            _this._size = e.rect;
            _this.layout();
        };
        this._comp.bind('layout', this._layoutHandler);
        this.layout();
    };
    
    this.detach = function() {
        if (this._comp) {
            if ( this._attached ) this._comp.dom().removeChild(this._container);
            this._comp.unbind('layout', this._layoutHandler);
            this._size = this._comp = null;
            this._attached = this._inited = false;
        }
    };
    
    this._loadImages = function() {
        var _this = this;
        getContainer( this._settings, function( result ) {
            _this._container = result.container;
            _this._parts = result.parts;
            _this._inset = result.inset;
            _this.layout();
        });
    };
    
    this.layout = function() {
        if (!this._inset || !this._comp) return;

        var size = this._comp.rect(),
            parts = this._parts,
            inset = this._inset,
            fixedSize = this._fixedSize,
            width = Math.floor(fixedSize.width || size.width),
            height = Math.floor(fixedSize.height || size.height);
            
        if (!this._inited) { 
            this._inited = true;
            initParts(parts, inset);
        }
        if (!this._attached) {
            this._attached = true;
            this._comp.dom().appendChild(this._container);
        }
        
        if (parts.t) dom.layout(parts.t.style, { width: width - inset.left - inset.right });
        if (parts.b) dom.layout(parts.b.style, { width: width - inset.left - inset.right });
        if (parts.l) dom.layout(parts.l.style, { height: height - inset.top - inset.bottom });
        if (parts.r) dom.layout(parts.r.style, { height: height - inset.top - inset.bottom });
        if (parts.m) dom.layout(parts.m.style, {
            height: height - inset.top - inset.bottom,
            width: width - inset.left - inset.right
        });
    };
    
    var cache = {};
    
    function getContainer ( settings, callback ) {
        var key = getKey(settings);
        
        if (!cache[key]) {
            cache[key] = {
                listeners: [callback],
                container: null,
                inset: null
            };
            var images = [],
                parts = {};
            uki.each( settings, function( name, args ) { 
                parts[name] = uki.image.apply(uki.image, args);
                images.push( parts[name] );
            });
            uki.image.load(images, function() { 
                var listeners = cache[key].listeners, i,
                    result = cache[key] = buildContainer(parts);
                listeners[0]( result );
                for (i=1; i < listeners.length; i++) {
                    listeners[i]( cloneContainer(cache[key]) );
                };
            });
        } else if (cache[key].listeners) {
            cache[key].listeners.push(callback);
        } else {
            callback( cloneContainer(cache[key]) );
        }
    }
    
    function buildContainer (parts) {
        var container = uki.createElement('div', 'position:absolute;left:0;top:0;width:100%;height:100%;overflow:hidden;z-index:-1'),
            inset = buildInset(parts);
        
        
        uki.each(parts, function(name) { 
            this.style.position = 'absolute';
            this.className = name;
            dom.layout(this.style, {width: this.width, height: this.height});
            container.appendChild(this); 
        });
        return {
            container: container,
            inset: inset,
            parts: parts
        };
    }
    
    function initParts (parts, inset) {
        if (parts.tl) dom.layout(parts.tl.style, { top: 0,         left: 0,             width: inset.left,  height: inset.top    });
        if (parts.t)  dom.layout(parts.t.style,  { top: 0,         left: inset.left,                        height: inset.top    });
        if (parts.tr) dom.layout(parts.tr.style, { top: 0,         right: 0,            width: inset.right, height: inset.top    });
        if (parts.l)  dom.layout(parts.l.style,  { top: inset.top, left: 0,             width: inset.left                        });
        if (parts.r)  dom.layout(parts.r.style,  { top: inset.top, right: 0,            width: inset.right                       });
        if (parts.bl) dom.layout(parts.bl.style, { bottom: 0,      left: 0,             width: inset.left,  height: inset.bottom });
        if (parts.b)  dom.layout(parts.b.style,  { bottom: 0,      left: inset.left,                        height: inset.bottom });
        if (parts.br) dom.layout(parts.br.style, { bottom: 0,      right: 0,            width: inset.right, height: inset.bottom });
        if (parts.m)  dom.layout(parts.m.style,  { top: inset.top, left: inset.left});
    }
    
    function cloneContainer ( row ) {
        var clone = row.container.cloneNode(true),
            parts = {};
        uki.each(clone.childNodes, function() {
            if (this.className) parts[this.className] = this;
        });
        return {
            container: clone,
            parts: parts,
            inset: row.inset.clone()
        };
    }
    
    function buildInset ( parts ) {
         return new uki.geometry.Inset(
            parts.t ? parts.t.height : 0, 
            parts.r ? parts.r.width : 0, 
            parts.b ? parts.b.height : 0,
            parts.l ? parts.l.width : 0
        );
    }
    
    function getKey (settings) {
        return uki.map(['tl', 't', 'tr', 'l', 'm', 'r', 'bl', 'b', 'br'], function(x) {
            return settings[x] && settings[x][0] || '';
        }).join(',');
    }
    
    function initPart (part, l, t, cls) {
        part.style.left = l + 'px';
        part.style.top = t  + 'px';
        part.style.position = 'absolute';
        part.className = cls;
        part.style.zIndex = 1;
    }
});