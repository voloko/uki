include('../tools.js');

(function() {
    
tools.imageCutter = {};

function supportsCanvas () {
    return document.createElement('canvas').getContext;
}

tools.imageCutter.getDataUrl = function(image, sx, sy, sw, sh) {
    var canvas = uki.createElement('canvas', 'width:' + sw + 'px;height:' + sh + 'px; background-color: transparent;'),
        i, url, ctx;
        
    canvas.setAttribute('width', sw);
    canvas.setAttribute('height', sh);
    ctx = canvas.getContext('2d');
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh);
    return canvas.toDataURL('image/png');
};

tools.imageCutter.getText = function(img, inset) {
    var parts = [],
        result = [],
        names = ['tl', 't', 'tr', 'l', 'm', 'r', 'bl', 'b', 'br'];
    parts[parts.length] = inset.left && inset.top && this.getDataUrl(img, 0, 0, inset.left, inset.top);
    parts[parts.length] = inset.top && this.getDataUrl(img, inset.left, 0, img.width - inset.right - inset.left, inset.top);
    parts[parts.length] = inset.top && inset.right && this.getDataUrl(img, img.width - inset.right, 0, inset.right, inset.top);
    parts[parts.length] = inset.left&& this.getDataUrl(img, 0, inset.top, inset.left, img.height - inset.bottom - inset.top);
    parts[parts.length] = this.getDataUrl(img, inset.left, inset.top, img.width - inset.left - inset.right, img.height - inset.top - inset.bottom);
    parts[parts.length] = inset.right && this.getDataUrl(img, img.width - inset.right, inset.top, inset.right, img.height - inset.bottom - inset.top);
    parts[parts.length] = inset.bottom && inset.left && this.getDataUrl(img, 0, img.height - inset.bottom, inset.left, inset.bottom);
    parts[parts.length] = inset.bottom && this.getDataUrl(img, inset.left, img.height - inset.bottom, img.width - inset.right - inset.left, inset.bottom);
    parts[parts.length] = inset.bottom && inset.right && this.getDataUrl(img, img.width - inset.right, img.height - inset.bottom, inset.right, inset.bottom);
    
    uki.each(parts, function(i, dataurl) {
        if (!dataurl) return true;
        var str = '';
        var url = img.src.replace(/.*\//, '');
        str += '    ' + names[i] + ': uki.image("' + url.replace(/(\.\w+)/, '-' + names[i] + '$1' ) + '", "'+ dataurl +'"),'
        result.push(str);
    });
    return '{<br/>' + result.join('<br />').replace(/,$/, '') + '<br />}';
    
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

tools.imageCutter.sendForm = function (text) {
    var f = uki.createElement('form', 'position: absolute; left: -999em'),
        v = uki.createElement('input');
    f.action = '/imageCutter';
    f.method = 'POST';
    v.type = 'hidden';
    v.value = text.replace(/uki\.image\(/g, '[').replace(/\)/g, ']').replace(/(\w+):\s/g, '"$1":').replace(/<br\s?\/>/g, '');
    v.name = 'json';
    f.appendChild(v);
    document.body.appendChild(f);
    f.submit();
};


tools.imageCutter.build = function() {
    var p = uki.build({
        view: 'Base',
        rect: '0 0 400 400',
        children: [
            {
                view: 'Panel',
                rect: '0 0 100% 80', anchors: 'top left right',
                autosize: 'width',
                children: [
                    {
                        view: 'Label',
                        rect: '10 10 50 22',
                        anchors: 'left top',
                        align: 'right',
                        text: 'URL:'
                    },
                    {
                        view: 'Input',
                        coords: '70 10 -20 32', 
                        anchors: 'top left right',
                        autosize: 'width',
                        value: uki.defaultTheme.imagePath + 'panel/panel.png',
                        name: 'url'
                    },
                    {
                        view: 'Base',
                        coords: '60 42 -10 64',
                        anchors: 'left',
                        children: [
                            {
                                view: 'Input',
                                rect: '10 0 50 22',
                                anchors: 'top left',
                                name: 'top',
                                placeholder: 'top',
                                value: '3'
                            },
                            {
                                view: 'Input',
                                rect: '70 0 50 22',
                                anchors: 'top left',
                                name: 'right',
                                placeholder: 'right',
                                value: '3'
                            },
                            {
                                view: 'Input',
                                rect: '130 0 50 22',
                                anchors: 'top left',
                                name: 'bottom',
                                placeholder: 'bottom',
                                value: '3'
                            },
                            {
                                view: 'Input',
                                rect: '190 0 50 22',
                                anchors: 'top left',
                                name: 'left',
                                placeholder: 'left',
                                value: '3'
                            }
                        ]
                    },
                    {
                        view: 'Button',
                        rect: '-120 42 100 22',
                        anchors: 'top right',
                        text: 'Cut',
                        name: 'cut'
                    }                
                ]
            },
            {
                view: 'Label',
                coords: '20 90 -20 -20',
                anchors: 'top left right bottom',
                autosize: 'width height',
                name: 'result'
            }
        ]
    })
    p.find('[name=cut]').bind('click', function() {
        tools.imageCutter._loadImage(p.find('[name=url]').attr('value'), function(image) {
            var coords = uki.map(['top', 'right', 'bottom', 'left'], function() {
                return p.find('[name=' + this + ']').attr('value');
            });
            var inset = uki.geometry.Inset.fromString(coords.join(' '));
            var text = tools.imageCutter.getText(image, inset);
            
            p.find('[name=result]').attr('html', '<div style="white-space:pre">' + text + '</div>');
            tools.imageCutter.sendForm(text);
        })
    });
    p[0].dom().style.backgroundColor = '#EFEFEF';
    p.find('Label:eq(0)').each(function() {
        this.dom().style.lineHeight = this.rect().size.height + 'px';
    })
    p.find('[name=result]').each(function() {
        this.dom().style.overflow = 'auto';
        this.dom().style.background = 'white';
        this.dom().style.border = '1px solid #CCC'
    })
    return p;
};


})();

