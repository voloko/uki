include('../tools.js');

(function() {
    
tools.imageCutter = {};

var partNames = ['c', 'v', 'h', 'm'];


function xhr () {
	return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
}

function supportsCanvas () {
    return document.createElement('canvas').getContext;
}

function createCanvas (w, h) {
    var canvas = uki.createElement('canvas', 'background-color: transparent;');
    canvas.setAttribute('width', w);
    canvas.setAttribute('height', h);
    return canvas;
}

tools.imageCutter.getDataUrl = function(image, sx, sy, sw, sh) {
    var canvas = createCanvas(sw, sh)
        i, url, ctx;
        
    ctx = canvas.getContext('2d');
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh);
    return canvas.toDataURL('image/png');
};

tools.imageCutter.getMiddle = function(image, inset) {
    var width = image.width - inset.left - inset.right,
        height = image.height - inset.top - inset.bottom,
        canvas = createCanvas(width, height),
        ctx = canvas.getContext('2d');
        
    ctx.drawImage(image, 
        inset.left, inset.top, width, height, // -->
        0, 0, width, height
    );
    
    return canvas;
};

tools.imageCutter.getHorizontal = function(image, inset) {
    if (!inset.top && !inset.bottom) return false;
    
    var width = image.width - inset.left - inset.right,
        canvas = createCanvas(width, inset.top + inset.bottom),
        ctx = canvas.getContext('2d');
        
    if (inset.top) ctx.drawImage(image, 
        inset.left, 0, width, inset.top, // -->
        0, 0, width, inset.top
    );
    
    if (inset.bottom) ctx.drawImage(image,
        inset.left, image.height - inset.bottom, width, inset.bottom, // -->
        0, inset.top, width, inset.bottom
    );
    
    return canvas;
};

tools.imageCutter.getVertical = function(image, inset) {
    if (!inset.left && !inset.right) return false;
    
    var height = image.height - inset.top - inset.bottom,
        canvas = createCanvas(inset.left + inset.right, height),
        ctx = canvas.getContext('2d');
        
    if (inset.left) ctx.drawImage(image,
        0, inset.top, inset.left, height, // -->
        0, 0, inset.left, height
    );
    
    if (inset.right) ctx.drawImage(image,
        image.width - inset.right, inset.top, inset.right, height, // -->
        inset.left, 0, inset.right, height
    );
    
    return canvas;
};

tools.imageCutter.getCorners = function(image, inset) {
    if ((!inset.left && !inset.right) || (!inset.top && !inset.bottom)) return false;
    
    var canvas = createCanvas(inset.left + inset.right, inset.top + inset.bottom),
        ctx = canvas.getContext('2d');
        
    if (inset.left && inset.top) ctx.drawImage(image, 
        0, 0, inset.left, inset.top, // -->
        0, 0, inset.left, inset.top
    );
    
    if (inset.right && inset.top) ctx.drawImage(image, 
        image.width - inset.right, 0, inset.right, inset.top, // -->
        inset.left, 0, inset.right, inset.top
    );
    
    if (inset.left && inset.bottom) ctx.drawImage(image, 
        0, image.height - inset.bottom, inset.left, inset.bottom, // -->
        0, inset.top, inset.left, inset.bottom
    );
    
    if (inset.right && inset.bottom) ctx.drawImage(image,
        image.width - inset.right, image.height - inset.bottom, inset.right, inset.bottom, // -->
        inset.left, inset.top, inset.right, inset.bottom
    );
    
    return canvas;
};

tools.imageCutter.getParts = function(image, inset) {
    return {
        c: this.getCorners(image, inset),
        v: this.getVertical(image, inset),
        h: this.getHorizontal(image, inset),
        m: this.getMiddle(image, inset)
    };
};

tools.imageCutter.isTransparent = function(canvas) {
    var data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
    for (var i=0; i < data.length; i+=4) {
        if (data[i+3] < 255) return true;
    };
    return false;
};

tools.imageCutter.makeFullyTransparent = function(canvas) {
    var clone = createCanvas(canvas.width, canvas.height),
        imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height),
        data = imageData.data;
        
    for (var i=0; i < data.length; i+=4) {
        if (data[i+3] < 255) data[i+3] = 0;
    };
    clone.getContext('2d').putImageData(imageData, 0, 0, canvas.width, canvas.height);
    return clone;
};

tools.imageCutter.sendRequest = function(data, callback) {
    $.ajax( { url: '/imageCutter', type: 'POST', data: { json: data }, complete: callback } );
};

tools.imageCutter.getRequest = function(url, image, inset) {
    var parts = tools.imageCutter.getParts(image, inset),
        request = [],
        baseName = url.replace(/.*\//, ''),
        prefix = baseName.replace(/\.[^\.]+$/, ''),
        parts = tools.imageCutter.getParts(image, inset);
        
    function appendIfAvailable (r, part, name) {
        if (!part) return;
        r.push({ name: prefix + '-' + name + '.png', data: part.toDataURL('image/png').replace(/[^,]*,/, '') });
        if (tools.imageCutter.isTransparent(part) ) {
            // we send transparent png which will be converted to gif
            var clone = tools.imageCutter.makeFullyTransparent(part);
            r.push({ name: prefix + '-' + name + '.gif', data: clone.toDataURL('image/png').replace(/[^,]*,/, '') });
        }
    }
    
    appendIfAvailable(request, parts.c, 'c');
    appendIfAvailable(request, parts.v, 'v');
    appendIfAvailable(request, parts.h, 'h');
    appendIfAvailable(request, parts.m, 'm');
    return JSON.stringify(request);
};

tools.imageCutter.makeCode = function(url, inset, response) {
    var optimized = response.optimized,
        parts = {},
        prefix = url.match(/([^\/]+\/)?[^\/]+$/)[0].replace(/\.[^\.]+$/, ''),
        codeLines = [];
        
    for (var i=0; i < optimized.length; i++) {
        var match = optimized[i].name.match(/-(\w)\.(gif|png)/),
            suffix = match[1],
            type = match[2];
        parts[suffix] = parts[suffix] || { suffix: suffix + '.png' };
        if (type == 'png') {
            parts[suffix].dataUrl = 'data:image/png;base64,' + optimized[i].data;
        } else {
            parts[suffix].alphaFix = true;
        }
    };
    
    for (var i=0; i < partNames.length; i++) {
        var part = parts[partNames[i]];
        if (!part) continue;
        codeLines.push('    ' + partNames[i] + ': [u(prefix + "' + part.suffix + '"), "' + part.dataUrl + '"' + (part.alphaFix ? ', u(prefix + "' + partNames[i] + '.gif")' : '') + ']');
    };
    return 'var prefix = "' + prefix + '-";\n' +
            'return new uki.background.Sliced9({\n' + 
                codeLines.join(',\n') + "\n" +
            '}, "' + inset + '");'
};

tools.imageCutter._loadImage = function (url, callback) {
    var img = new Image(),
        _this = this,
        handler = function() {
            img.onload = img.onerror = img.onabort = null; // prevent mem leaks
            callback(img);
        };
	img.onload  = handler;
	img.onerror = handler;
	img.onabort = handler;
	img.src = url;
};

tools.imageCutter.build = function() {
    var p = uki(
        { view: 'Box', rect: '0 0 400 400', anchors: 'top left right bottom', background: '#EFEFEF',
            childViews: [
                { view: 'Box', rect: '0 0 400 80', anchors: 'top left right', background: 'theme(panel)',
                    childViews: [
                        { view: 'Label', rect: '10 10 50 22', anchors: 'left top', align: 'right', text: 'URL:' },
                        { view: 'TextField', rect: '70 10 310 22',  anchors: 'top left right', 
                            value: '/src/uki-theme/airport/i/button/normal.png', name: 'url' },
                        { view: 'Box', rect: '60 32 330 46', anchors: 'left rigth top',
                            childViews: [
                                { view: 'TextField', rect: '10 10 50 22', anchors: 'top left', name: 'top', placeholder: 'top', value: '3' },
                                { view: 'TextField', rect: '70 10 50 22', anchors: 'top left', name: 'right', placeholder: 'right', value: '3' },
                                { view: 'TextField', rect: '130 10 50 22', anchors: 'top left', name: 'bottom', placeholder: 'bottom', value: '3' },
                                { view: 'TextField', rect: '190 10 50 22', anchors: 'top left', name: 'left', placeholder: 'left', value: '3' },
                                { view: 'Checkbox', rect: '260 10 22 22', anchors: 'top left', name: 'download' },
                                { view: 'Label', rect: '285 10 100 22', anchors: 'top left', text: 'download', name: 'download-label' }
                            ]
                        },
                        { view: 'Button', rect: '280 42 100 22', anchors: 'top right', text: 'Cut', name: 'cut' }                
                    ]
                },
                { view: 'Label', rect: '20 90 360 290', anchors: 'top left right bottom', 
                    name: 'result', scrollable: true, textSelectable: true, multiline: true, 
                    background: 'cssBox(background:white;border:1px solid #CCC)', inset: '1 1 0 1' }
            ]
        }
    );
    
    p.find('[name=download-label]').bind('click', function() {
        var c = p.find('[name=download]');
        c.attr('checked', !c.attr('checked'));
    });
    
    p.find('[name=cut]').bind('click', function() {
        p.find('[name=cut]').text('Cutting...');
        var url = p.find('[name=url]').attr('value');
        tools.imageCutter._loadImage(url, function(image) {
            
            var coords = uki.map(['top', 'right', 'bottom', 'left'], function() {
                    return p.find('[name=' + this + ']').attr('value');
                }),
                inset = uki.geometry.Inset.fromString(coords.join(' ')),
                json = tools.imageCutter.getRequest(url, image, inset);
                
            tools.imageCutter.sendRequest(json, function(xhr) {
                var response = eval('(' + xhr.responseText + ')');
                var code = tools.imageCutter.makeCode(url, inset, response);
                p.find('[name=result]').html('<div style="white-space:pre; padding: 5px;">' + code + '</div>');
                p.find('[name=cut]').text('Cut');
                
                if (p.find('[name=download]').checked()) location.href = response.url;
            });
        })
    });
    return p;
};


})();

