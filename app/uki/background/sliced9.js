include('../background.js');
include('../image.js');

uki.background.Sliced9 = uki.newClass(new function() {
    var nativeCss = ['MozBorderImage', 'WebkitBorderImage', 'borderImage'],
        layout = uki.layout;
    
    this.init = function(images) {
        this._parts = uki.extend({}, images);
        this._inset = null;
        this._container = uki.createElement('div', 'position:absolute;left:0;top:0;width:100%;height:100%;overflow:hidden;z-index:-1');
        this._size = null;
        
        this._loadImages();
    };
    
    this.attachTo = function(comp) {
        this._comp = comp;
        
        var dom = comp.dom(),
            _this = this;

        dom.appendChild(this._container);
        this._resizeHandler = function(e) {
            if (_this._size && _this._size.eq(e.newRect.size)) return;
            _this._resize(e.newRect.size);
        };
        this._comp.bind('resize', this._resizeHandler);
        this._resize(comp.rect().size);
        layout.perform();
    };
    
    this.detach = function() {
        if (this._comp) {
            this._comp.dom().removeChild(this._container);
            this._comp.unbind('resize', this._resizeHandler);
            this._size = this._comp = null;
        }
    };
    
    this._loadImages = function() {
        this._imagesToLoad = 0;
        uki.each(this._parts, function(i, part) {
            this._loadImage(part);
        },this);
        if (!this._imagesToLoad) this._loadComplete();
    };
    
    this._loadComplete = function() {
        var parts = this._parts,
            container = this._container,
            inset = this._inset = new uki.geometry.Inset(
            parts.t ? parts.t.height : 0, 
            parts.r ? parts.r.width : 0, 
            parts.b ? parts.b.height : 0,
            parts.l ? parts.l.width : 0
        );
        
        if (parts.tl) layout.schedule(parts.tl.style, {top: 0, left: 0});
        if (parts.t) layout.schedule(parts.t.style, {left: inset.left, top: 0});
        if (parts.tr) layout.schedule(parts.tr.style, {top: 0});
        if (parts.l) layout.schedule(parts.l.style, {left:0, top: inset.top});
        if (parts.b) layout.schedule(parts.b.style, {left:inset.left});
        if (parts.bl) layout.schedule(parts.bl.style, {left:0});
        if (parts.r) layout.schedule(parts.r.style, {top:inset.top});
        layout.schedule(parts.m.style, {top: inset.top, left: inset.left});
        
        uki.each(parts, function(name) { 
            this.style.position = 'absolute';
            this.className = name;
            layout.schedule(this.style, {width: this.width, height: this.height});
            container.appendChild(this); 
        });
        
        if (this._comp && this._comp.rect()) {
            this._resize(this._comp.rect().size);
            layout.perform();
        }
    };
    
    this._imageLoaded = function() {
        if (!--this._imagesToLoad) this._loadComplete();
    };
    
    this._loadImage = function (img) {
        if (!img || img.width) return;
        
        var _this = this,
            handler = function() {
                img.onload = img.onerror = img.onabort = null; // prevent mem leaks
                _this._imageLoaded(img);
            };
        this._imagesToLoad++;
		img.onload  = handler;
		img.onerror = handler;
		img.onabort = handler;
    };
    
    this._resize = function(size) {
        if (!this._inset) return;
        
        var parts = this._parts,
            inset = this._inset,
            width = Math.floor(size.width),
            height = Math.floor(size.height);
            
        this._size = size;
        if (parts.t) layout.schedule(parts.t.style, {width: width - inset.left - inset.right});
        if (parts.b) layout.schedule(parts.b.style, {top: height - inset.bottom, width: width - inset.left - inset.right});
        if (parts.tr) layout.schedule(parts.tr.style, {left: width - inset.right});
        if (parts.br) layout.schedule(parts.br.style, {top: height - inset.bottom, left: width - inset.right});
        if (parts.bl) layout.schedule(parts.bl.style, {top: height - inset.bottom});
        if (parts.l) layout.schedule(parts.l.style, {height: height - inset.top - inset.bottom});
        if (parts.r) layout.schedule(parts.r.style, {
            height: height - inset.top - inset.bottom,
            left:  width - inset.right
        });
        layout.schedule(parts.m.style, {
            height: height - inset.top - inset.bottom,
            width: width - inset.left - inset.right
        });
    };
    
    function initPart (part, l, t, cls) {
        part.style.left = l + 'px';
        part.style.top = t  + 'px';
        part.style.position = 'absolute';
        part.className = cls;
        part.style.zIndex = 1;
    }
});