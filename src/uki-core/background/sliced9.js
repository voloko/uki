include('../background.js');
include('../image.js');

/**
 * Adds a div with 9 sliced images in the corners, sides and center
 *
 * @class
 */
uki.background.Sliced9 = uki.newClass(new function() {
    var nativeCss = ['MozBorderImage', 'WebkitBorderImage', 'borderImage'],
        dom = uki.dom;
        
    var LEFT = 'left:',
        TOP  = 'top:',
        RIGHT = 'right:',
        BOTTOM = 'bottom:',
        WIDTH = 'width:',
        HEIGHT = 'height:',
        PX = 'px',
        P100 = '100%';
        
    var cache = {};
    
    /**#@+ @memberOf uki.background.Sliced9.prototype */
    
    this.init = function(partSettings, inset, options) {
        this._settings  = uki.extend({}, partSettings);
        this._inset     = Inset.create(inset);
        this._size      = null;
        this._inited    = false;
        
        options = options || {};
        this._fixedSize = Size.create(options.fixedSize) || new Size();
        this._bgInset   = Inset.create(options.inset)    || new Inset();
        this._zIndex    = options.zIndex || -1;

        this._container = this._getContainer();
        this._container.style.zIndex = this._zIndex;
    };
    
    /** @ignore */
    function makeDiv (name, style, setting, imgStyle, bgSettings) {
        var inner = setting[3] ? img(setting, imgStyle) : '';
        if (!setting[3]) style += bgStyle(setting, bgSettings);
        return '<div class="' +  name + '" style="position:absolute;overflow:hidden;' + style + '">' + inner + '</div>';
    }
    
    /** @ignore */
    function bgStyle (setting, bgSettings) {
        return ';background: url(' + uki.imageSrc(setting[0], setting[1], setting[2]) + ') ' + bgSettings;
    }

    /** @ignore */
    function img (setting, style) {
        return uki.imageHTML(setting[0], setting[1], setting[2], ' ondragstart="return false;" galleryimg="no" style="-webkit-user-drag:none;-webkit-user-select:none;-moz-user-select:none;position:absolute;' + style + '"');
    }
    
    /** @ignore */
    this._getContainer = function() {
        var key = this._getKey();
        if (!cache[key]) {
            return cache[key] = this._createContainer();
        }
        return cache[key].cloneNode(true);
    };
    
    /** @ignore */
    this._createContainer = function() {
        var inset = this._inset,
            bgInset = this._bgInset,
            settings = this._settings,
            width = inset.left + inset.right,
            height = inset.top + inset.bottom,
            css = [LEFT + bgInset.left + PX, RIGHT + bgInset.right + PX, TOP + bgInset.top + PX, BOTTOM + bgInset.bottom + PX].join(';'),
            html = [];
            
        if (inset.top && inset.left) {
            html[html.length] = makeDiv('tl',
                [LEFT + 0, TOP + 0, WIDTH + inset.left + PX, HEIGHT + inset.top + PX].join(';'),
                settings.c, [LEFT + 0, TOP + 0, WIDTH + width + PX, HEIGHT + height + PX].join(';'), 'top left'
            );
        }
        if (inset.top) {
            html[html.length] = makeDiv('t',
                [LEFT + inset.left + PX, TOP + 0, HEIGHT + inset.top + PX, RIGHT + inset.right + PX].join(';'),
                settings.h, [LEFT + 0, TOP + 0, WIDTH + P100, HEIGHT + height + PX].join(';'), 'repeat-x top'
            );
        }
        if (inset.top && inset.right) {
            html[html.length] = makeDiv('tr',
                [RIGHT + 0, TOP + 0, WIDTH + inset.right + PX, HEIGHT + inset.top + PX].join(';'),
                settings.c, [LEFT + '-' + inset.left + PX, TOP + 0, WIDTH + width + PX, HEIGHT + height + PX].join(';'), 'top right'
            );
        }
        
        if (inset.left) {
            html[html.length] = makeDiv('l',
                [LEFT + 0, TOP + inset.top + PX, WIDTH + inset.left + PX, BOTTOM + inset.bottom + PX].join(';'),
                settings.v, [LEFT + 0, TOP + 0, HEIGHT + P100, WIDTH + width + PX].join(';'), 'repeat-y left'
            );
        }
        if (settings.m) {
            html[html.length] = makeDiv('m',
                [LEFT + inset.left + PX, TOP + inset.top + PX, RIGHT + inset.right + PX, BOTTOM + inset.bottom + PX].join(';'),
                settings.m, [LEFT + 0, TOP + 0, HEIGHT + P100, WIDTH + P100].join(';'), ''
            );
        }
        if (inset.right) {
            html[html.length] = makeDiv('r',
                [RIGHT + 0, TOP + inset.top + PX, WIDTH + inset.right + PX, BOTTOM + inset.bottom + PX].join(';'),
                settings.v, [LEFT + '-' + inset.left + PX, TOP + 0, HEIGHT + P100, WIDTH + width + PX].join(';'), 'repeat-y right'
            );
        }
        
        if (inset.bottom && inset.left) {
            html[html.length] = makeDiv('bl',
                [LEFT + 0, BOTTOM + 0, WIDTH + inset.left + PX, HEIGHT + inset.bottom + PX].join(';'),
                settings.c, [LEFT + 0, TOP + '-' + inset.top + PX, WIDTH + width + PX, HEIGHT + height + PX].join(';'), 'left -' + inset.top + PX
            );
        }
        if (inset.bottom) {
            html[html.length] = makeDiv('b',
                [LEFT + inset.left + PX, BOTTOM + 0, HEIGHT + inset.bottom + PX, RIGHT + inset.right + PX].join(';'),
                settings.h, [LEFT + 0, TOP + '-' + inset.top + PX, WIDTH + P100, HEIGHT + height + PX].join(';'), 'repeat-x 0 -' + inset.top + PX
            );
        }
        if (inset.bottom && inset.right) {
            html[html.length] = makeDiv('br',
                [RIGHT + 0, BOTTOM + 0, WIDTH + inset.right + PX, HEIGHT + inset.bottom + PX].join(';'),
                settings.c, [LEFT + '-' + inset.left + PX, TOP + '-' + inset.top + PX, WIDTH + width + PX, HEIGHT + height + PX].join(';'), 'right -' + inset.top + PX
            );
        }
        var container = uki.createElement('div', 'position:absolute;overflow:hidden;' + css, html.join(''));
        container.className = 'uki-background-Sliced9';
        return container;
    };
    
    /** @ignore */
    this._getKey = function() {
        return uki.map(['v', 'h', 'm', 'c'], function(x) {
            return this._settings[x] && this._settings[x][0] || '';
        }, this).concat([this._inset, this._bgInset, this._fixedSize]).join(',');
    };
    
    this.attachTo = function(comp) {
        this._comp = comp;
        
        this._container.style.visibility = 'visible';
        this._comp.dom().insertBefore(this._container, this._comp.dom().firstChild);
        // this._comp.dom().appendChild(this._container);
        
        if (!uki.supportNativeLayout) {
            this._layoutHandler = this._layoutHandler || uki.proxy(function(e) {
                if (this._size && this._size.eq(e.rect)) return;
                this._size = e.rect;
                this.layout();
            }, this);
            this._comp.bind('layout', this._layoutHandler);
            this.layout();
        }
    };
    
    this.detach = function() {
        if (this._comp) {
            // this._comp.dom().removeChild(this._container);
            this._container.style.visibility = 'hidden';
            if (!uki.supportNativeLayout) this._comp.unbind('layout', this._layoutHandler);
            this._size = this._comp = null;
            this._attached = this._inited = false;
        }
    };
    
    this.layout = function(e) {
        var size = this._comp.rect(),
            parts = this._parts,
            inset = this._inset,
            bgInset = this._bgInset,
            fixedSize = this._fixedSize,
            width = FLOOR(fixedSize.width || size.width - bgInset.left - bgInset.right),
            height = FLOOR(fixedSize.height || size.height - bgInset.top - bgInset.bottom),
            insetWidth = inset.left + inset.right,
            insetHeight = inset.top + inset.bottom;
            
        if (!parts) {
            parts = {};
            uki.each(this._container.childNodes, function() {
                if (this.className) parts[this.className] = this;
            });
            this._parts = parts;
        }
        // parts.b.style.bottom = ''
        // parts.b.style.top = '100%';
        // parts.b.style.marginTop = - inset.bottom + 'px';
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
        });
    };
    
    /**#@-*/    
});