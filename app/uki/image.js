include('../uki.js');
include('dom.js');

(function() {
    var doc = document,
        _container,
        cropCache = {},
        svgns = 'http://www.w3.org/2000/svg',
        xlinkns = 'http://www.w3.org/1999/xlink';
        
    uki.image = {};
    
    function container () {
        if (!_container) {
            _container = uki.createElement('div', 'position:absolute;left:-999em;top:-999em;');
            if (doc.body) doc.body.appendChild(_container);
        }
        return _container;
    }
    
    function supportsCanvas () {
        return document.createElement('canvas').getContext;
    }
    
    function supportSVG () {
        return false;
    }
    
    function cachedCropped (f) {
        return function(image, sx, sy, sw, sh) {
            var id = [image.src, sx, sy, sw, sh].join('|');
            if (!cropCache[id]) {
                cropCache[id] = f.apply(this, arguments);
                return cropCache[id];
            }
            return cropCache[id].cloneNode(true);
        };
    }
    
    if (supportSVG()) {
        uki.image.cropped = function(image, sx, sy, sw, sh) {
            var svg = document.createElementNS(svgns, 'svg');
            svg.setAttribute('width', sw + 'px');
            svg.setAttribute('height', sh + 'px');
			var img = document.createElementNS(svgns, "image");
            img.setAttribute("x", -sx);
            img.setAttribute("y", -sy);
            // img.style.cssText = 'left:' + -sx + 'px;top:' + -sh + 'px';
			img.setAttribute("width",  '100%');
			img.setAttribute("height", '100%');
			img.setAttributeNS(xlinkns, "href", image.src);
            img.setAttribute('preserveAspectRatio', 'xMinYMin slice')
			svg.appendChild(img);
			return svg;
        };
    } else if (supportsCanvas()) {
        uki.image.cropped = function(image, sx, sy, sw, sh) {
            var canvas = uki.createElement('canvas', 'width:' + sw + 'px;height:' + sh + 'px; background-color: transparent;'),
                i, url, ctx;
                
            canvas.setAttribute('width', sw);
            canvas.setAttribute('height', sh);
            ctx = canvas.getContext('2d');
            ctx.drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh);
            try {
                url = canvas.toDataURL('image/png');
                i = uki.createElement('img', 'width:' + sw + 'px;height:' + sh + 'px');
                i.src = url;
                return i;
            } catch (e) {
            }
            return canvas;
        };
    } else if (/MSIE/.test(navigator.userAgent) && !window.opera) {
        uki.image.cropped = function (image, sx, sy, sw, sh) {
            // get the original size
            var w = image.width,
                h = image.height,
                vmlStr = [],
                cont = container(),
                i;

            vmlStr.push(
                '<v:image src="', image.src, '"',
                ' style="behavior:url(#default#VML);overflow:hidden;width:', sw, 'px;',
                ' height:', sh, 'px;"',
                ' cropleft="', sx / w, '"',
                ' croptop="', sy / h, '"',
                ' cropright="', (w - sx - sw) / w, '"',
                ' cropbottom="', (h - sy - sh) / h, '"',
                ' />'
            );

            cont.innerHTML = vmlStr.join('');
            i = cont.firstChild;
            i.parentNode.removeChild(i);

            return i;
        };
    }
    
    
})();
