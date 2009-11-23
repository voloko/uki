include('../background.js');
include('../image.js');

uki.background.Sliced9 = uki.newClass(new function() {
    var nativeCss = ['MozBorderImage', 'WebkitBorderImage', 'borderImage'];
    
    this.init = function(url, inset) {
        this._url = url;
        this._inset = typeof inset == 'string' ? uki.geometry.Inset.fromString(inset) : inset;
        this._attached = false;
        this._container = false;
        this._parts = {};
        this._size = null;
    };
    
    this.attachTo = function(comp) {
        this._comp = comp;
        
        var dom = comp.dom(),
            _this = this;
        // uki.each(nativeCss, function(i, prop) {
        //     if (typeof dom.style[prop] == 'string') {
        //         this._attached = prop;
        //         dom.style[prop] = 'url(' + this._url + ') ' + this._inset + ' stretch stretch';
        //         return false;
        //     }
        // }, this);
        if (!this._attached) {
            this._container = uki.createElement('div', 'position:absolute;left:0;top:0;width:100%;height:100%;overflow:hidden;z-index:-1');
            dom.appendChild(this._container);
            this._loadImage();
            this._comp.bind('layout:resize', function(e) {
                if (_this._size && _this._size.eq(e.newRect.size)) return;
                _this._resize(e.newRect.size);
            });
        }
    };
    
    this._loadImage = function () {
        var img = new Image(),
            _this = this,
            handler = function() {
                img.onload = img.onerror = img.onabort = null; // prevent mem leaks
                _this._renderParts(img);
            };
		img.onload  = handler;
		img.onerror = handler;
		img.onabort = handler;
		img.src = this._url;
    };
    
    this._resize = function(size) {
        var parts = this._parts,
            inset = this._inset,
            layout = uki.layout,
            width = Math.floor(size.width),
            height = Math.floor(size.height);
            
        this._size = size;
        if (parts.t) layout.schedule(parts.t.style, {width: width - inset.left - inset.right});
        if (parts.b) layout.schedule(parts.b.style, {top: height - inset.bottom, width: width - inset.left - inset.right});
        if (parts.tl) layout.schedule(parts.tl.style, {top: 0, left: 0});
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
        })
    };
    
    function initPart (part, l, t, cls) {
        part.style.left = l + 'px';
        part.style.top = t  + 'px';
        part.style.position = 'absolute';
        part.className = cls;
        part.style.zIndex = 1;
    }
    
    this._renderParts  = function (img) {
        var parts = this._parts,
            inset = this._inset,
            container = this._container;
            
        // top row
        if (inset.top && inset.left) {
            parts.tl = uki.image.cropped(img, 0, 0, inset.left, inset.top);
            initPart(parts.tl, 1, 0, 'tl');
        }
        if (inset.top) {
            parts.t = uki.image.cropped(img, inset.left, 0, img.width - inset.right - inset.left, inset.top);
            initPart(parts.t, inset.left, 0, 't');
        }
        if (inset.top && inset.right) {
            parts.tr = uki.image.cropped(img, img.width - inset.right, 0, inset.right, inset.top);
            initPart(parts.tr, img.width - inset.right, 0, 'tr');
        }
        
        // bottom row
        if (inset.bottom && inset.left) {
            parts.bl = uki.image.cropped(img, 0, img.height - inset.bottom, inset.left, inset.bottom);
            initPart(parts.bl, 0, img.height - inset.bottom, 'bl');
        }
        if (inset.bottom) {
            parts.b = uki.image.cropped(img, inset.left, img.height - inset.bottom, img.width - inset.right - inset.left, inset.bottom);
            initPart(parts.b, inset.left, img.height - inset.bottom, 'b');
        }
        if (inset.bottom && inset.right) {
            parts.br = uki.image.cropped(img, img.width - inset.right, img.height - inset.bottom, inset.right, inset.bottom);
            initPart(parts.br, img.width - inset.right, img.height - inset.bottom, 'br');
        }
        
        // middle row
        if (inset.left) {
            parts.l = uki.image.cropped(img, 0, inset.top, inset.left, img.height - inset.bottom - inset.top);
            initPart(parts.l, 0, inset.top, 'l');
        }
        if (inset.right) {
            parts.r = uki.image.cropped(img, img.width - inset.right, inset.top, inset.right, img.height - inset.bottom - inset.top);
            initPart(parts.r, img.width - inset.right, inset.top, 'r');
        }
        parts.m = uki.image.cropped(img, inset.left, inset.top, img.width - inset.left - inset.right - 1, img.height - inset.top - inset.bottom -1);
        initPart(parts.m, inset.left, inset.top, 'm');
        
        uki.each(parts, function() { container.appendChild(this) });
        
        if (this._comp.rect()) {
            this._resize(this._comp.rect().size);
            uki.layout.perform();
        }
    };
});