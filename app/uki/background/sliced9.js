include('../background.js');
include('../image.js');

uki.background.Sliced9 = uki.newClass(new function() {
    var nativeCss = ['MozBorderImage', 'WebkitBorderImage', 'borderImage'],
        dom = uki.dom,
        geometry = uki.geometry;
    
    this.init = function(partSettings, options) {
        this._settings  = uki.extend({}, partSettings);
        this._inset     = null;
        this._container = null;
        this._size      = null;
        this._inited    = false;
        this._attached  = false;
        
        options = options || {};
        this._fixedSize = geometry.Size.create(options.fixedSize) || new geometry.Size();
        this._bgInset   = geometry.Inset.create(options.inset)    || new geometry.Inset();
        this._zIndex    = options.zIndex || -1;
        
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
        getContainer( 
            this._settings,
            this._bgInset.negative(),
            this._zIndex,
            function( result ) {
                _this._container = result.container;
                _this._parts = result.parts;
                _this._inset = result.inset;
                _this.layout();
            }
        );
    };
    
    this.layout = function() {
        if (!this._inset || !this._comp) return;

        var size = this._comp.rect(),
            parts = this._parts,
            inset = this._inset,
            bgInset = this._bgInset,
            fixedSize = this._fixedSize,
            width = Math.floor(fixedSize.width || size.width),
            height = Math.floor(fixedSize.height || size.height),
            insetWidth = inset.left + inset.right + bgInset.left + bgInset.right,
            insetHeight = inset.top + inset.bottom + bgInset.top + bgInset.bottom;
            
        if (!this._inited) { 
            this._inited = true;
            initParts(parts, inset, bgInset);
        }
        if (!this._attached) {
            this._attached = true;
            this._comp.dom().appendChild(this._container);
        }
        
        if (parts.t) dom.layout(parts.t.style, { width: width - insetWidth });
        if (parts.b) dom.layout(parts.b.style, { width: width - insetWidth });
        if (parts.l) dom.layout(parts.l.style, { height: height - insetHeight });
        if (parts.r) dom.layout(parts.r.style, { height: height - insetHeight });
        if (parts.m) dom.layout(parts.m.style, {
            height: height - insetHeight,
            width: width - insetWidth
        });
        dom.layout(this._container.style, {
            width: width,
            height: height
        })
    };
    
    var cache = {};
    
    function getContainer ( settings, negativeInset, zIndex, callback ) {
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
                    result = cache[key] = buildContainer(parts, negativeInset, zIndex);
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
    
    function buildContainer (parts, negativeInset, zIndex) {
        var container = uki.createElement(
                'div', 
                'position:absolute;left:0;top:0;width:100%;height:100%;zoom:1;' +
                'z-index:' + zIndex + ';' + (negativeInset ? '' : 'overflow:hidden')
            ),
            inset = buildInset(parts);
        
        uki.each(parts, function(name) { 
            this.style.position = 'absolute';
            this.style.WebkitUserDrag = 'none';
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
    
    function initParts (parts, inset, bgInset) {
        if (parts.tl) dom.layout(parts.tl.style, { top: bgInset.top,              left:  bgInset.left,               width: inset.left,   height: inset.top    });
        if (parts.t)  dom.layout(parts.t.style,  { top: bgInset.top,              left:  bgInset.left + inset.left,                       height: inset.top    });
        if (parts.tr) dom.layout(parts.tr.style, { top: bgInset.top,              right: bgInset.right,              width: inset.right,  height: inset.top    });
        if (parts.l)  dom.layout(parts.l.style,  { top: bgInset.top + inset.top,  left:  bgInset.left,               width: inset.left                         });
        if (parts.r)  dom.layout(parts.r.style,  { top: bgInset.top + inset.top,  right: bgInset.right,              width: inset.right                        });
        if (parts.bl) dom.layout(parts.bl.style, { bottom: bgInset.bottom,        left:  bgInset.left,               width: inset.left,   height: inset.bottom });
        if (parts.b)  dom.layout(parts.b.style,  { bottom: bgInset.bottom,        left:  bgInset.left + inset.left,                       height: inset.bottom });
        if (parts.br) dom.layout(parts.br.style, { bottom: bgInset.bottom,        right: bgInset.right,              width: inset.right,  height: inset.bottom });
        if (parts.m)  dom.layout(parts.m.style,  { top: bgInset.top + inset.top,  left:  bgInset.left + inset.left});
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