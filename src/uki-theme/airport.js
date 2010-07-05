(function() {
    var defaultCss = 'position:absolute;z-index:100;-moz-user-focus:none;font-family:Arial,Helvetica,sans-serif;',
        reflex     = '<div style="position:absolute;z-index:1;left:1px;bottom:0px;right:1px;height:1px;overflow:hidden;background:rgba(255,255,255,0.4)"></div>';

    uki.theme.airport = uki.extend({}, uki.theme.Base, {
        imagePath: '/src/uki-theme/airport/i/',
        
        backgrounds: {
            // basic button
            'button-normal': function() {
                return new uki.background.LinearGradient({
                    startColor: '#FDFEFF',
                    stops: [ 
                        { pos: 0.15, color: '#F5F7FD' },
                        { pos: 0.8, color: '#C9CACF' }
                    ],
                    endColor: '#C7CBD2',
                    innerHTML: reflex,
                    css: 'border:1px solid #666;border-radius:3px;box-shadow:0 1px 0 rgba(255,255,255,0.5);'
                });
            },
            
            'button-hover': function() {
                return new uki.background.LinearGradient({
                    startColor: '#FFFFFF',
                    stops: [ 
                        { pos: 0.7, color: '#D7DAE4' }
                    ],
                    endColor: '#D9DEE6',
                    innerHTML: reflex,
                    css: 'border:1px solid #666;border-radius:3px;box-shadow:0 1px 0 rgba(255,255,255,0.5);'
                });
            },

            'button-down': function() {
                return new uki.background.LinearGradient({
                    startColor: '#9C9DA1',
                    stops: [ 
                        { pos: 0.6, color: '#C5C7CD' }
                    ],
                    endColor: '#CCCFD6',
                    css: 'border:1px solid #666;border-radius:3px;box-shadow:inset 0 1px 3px rgba(0,0,0,0.5);'
                });
            },
            
            'button-focus': function() {
                if (uki.browser.cssBoxShadow() == 'unsupported') {
                    return new uki.background.CssBox( 
                        'background:#7594D2;' + (uki.browser.cssFilter() && uki.image.needAlphaFix ? 'filter:Alpha(opacity=70);' : 'opacity:0.7;'), 
                        { inset: '-2 -2', zIndex: -2 } 
                    );
                }
                return new uki.background.Css({ 
                    // WebkitTransition: '-webkit-box-shadow 0.2s linear',
                    boxShadow: '0 0 6px #0244D4',
                    borderRadius: '3px'
                });
            },
            
            'button-disabled': function() {
                return new uki.background.Multi(
                    uki.theme.background('button-normal'),
                    new uki.background.Css({ color: '#999' })
                );
            },
            
            
            // checkbox
            'checkbox-normal': function() {
                return checkboxBg(18);
            },
            
            'checkbox-hover': function() {
                return checkboxBg(54);
            },
            
            'checkbox-disabled': function() {
                return checkboxBg(90);
            },
            
            'checkbox-checked-normal': function() {
                return checkboxBg(0);
            },
            
            'checkbox-checked-hover': function() {
                return checkboxBg(36);
            },
            
            'checkbox-checked-disabled': function() {
                return checkboxBg(72);
            },
            
            'checkbox-focus': function() {
                if (uki.image.needAlphaFix) {
                    return new uki.background.CssBox('', 
                        { innerHTML: '<div style="position:absolute;left:50%;top:50%;width:19px;height:19px;overflow:hidden;' +
                        'margin:-10px 0 0 -10px;background:#7594D2;filter:Alpha(opacity=70);"></div>', zIndex: -2  }
                    );
                }
                return new uki.background.CssBox('', 
                    { innerHTML: '<div style="position:absolute;left:50%;top:50%;width:24px;height:24px;overflow:hidden;' +
                    'margin:-12px 0 0 -12px; background: url(' + uki.theme.imageSrc('checkbox-focus') + ') 0 0"></div>', zIndex: -2  }
                );
            },
            

            // radio button
            'radio-normal': function() {
                return radioBg(18);
            },
            
            'radio-hover': function() {
                return radioBg(54);
            },
            
            'radio-disabled': function() {
                return radioBg(90);
            },
            
            'radio-checked-normal': function() {
                return radioBg(0);
            },
            
            'radio-checked-hover': function() {
                return radioBg(36);
            },
            
            'radio-checked-disabled': function() {
                return radioBg(72);
            },    
            
            'radio-focus': function() {
                if (uki.image.needAlphaFix) return uki.theme.airport.background('checkbox-focus');
                var src = uki.theme.imageSrc('radio-focus');
                return new uki.background.CssBox('', 
                    { innerHTML: '<div style="position:absolute;left:50%;top:50%;width:24px;height:24px;overflow:hidden;' +
                    'margin:-12px 0 0 -12px; background: url(' + src + ') 0 0"></div>', zIndex: -2  }
                );
            },
            
            
                    
            // toolbar button
            'toolbar-button-normal': function() {
                return new uki.background.Css('#CCC');
            },
            
            'toolbar-button-hover': function() {
                return new uki.background.Css('#E0E0E0');
            },
            
            'toolbar-button-down': function() {
                return new uki.background.Css('#AAA');
            },
            
            'toolbar-button-focus': function() {
                return new uki.background.Css('#CCC');
            },
            
            'toolbar-popup-button-normal': function() {
                return new uki.background.Css({ textAlign: 'left' });
            },
            
            'toolbar-popup-button-down': function() {
                return new uki.background.Css({ background: '#AAA', textAlign: 'left' });
            },
            
            'toolbar-popup-button-hover': function() {
                return new uki.background.Css({ background: '#4086FF', color: '#FFF', textAlign: 'left', textShadow: 'none' });
            },
            
            
            // panel
            'popup-normal': function() {
                return new uki.background.CssBox('background:#ECEDEE;border-radius:5px;border:1px solid #CCC;box-shadow:0 3px 8px rgba(0,0,0,0.6)');
            },
            
            'panel': function() {
                return new uki.background.LinearGradient({
                    startColor: '#DEDEDF',
                    stops: [ 
                        { pos: 0.2, color: '#D4D4D5' },
                        { pos: 0.9, color: '#989899' }
                    ],
                    endColor: '#989899',
                    css: 'box-shadow:0 1px 0 rgba(0,0,0,0.5);'
                });
            },
            
            // text field
            'input': function() {
                return new uki.background.CssBox(
                   'background:white;border: 1px solid #999;border-top-color:#777;box-shadow:0 1px 0 rgba(255, 255, 255, 0.4), inset 0 1px 2px rgba(0,0,0,0.2);'
               );
            },
            
            'input-focus': function() {
                if (uki.browser.cssBoxShadow() == 'unsupported') {
                    return new uki.background.CssBox( 
                        'background:#7594D2;' + (uki.browser.cssFilter() && uki.image.needAlphaFix ? 'filter:Alpha(opacity=70);' : 'opacity:0.7;'), 
                        { inset: '-2 -2', zIndex: -2 } 
                    );
                }
                return new uki.background.Css({ 
                    // WebkitTransition: '-webkit-box-shadow 0.2s linear',
                    boxShadow: '0 0 6px #0244D4'
                });
            },
            
            
            
            // slider
            'slider-handle-normal': function() {
                return new uki.background.LinearGradient({
                    startColor: '#FFFFFF',
                    endColor: '#B1CEEA',
                    innerHTML: sliderPin(),
                    css: 'border:1px solid #8393A6;border-bottom-color:#687482;box-shadow:0 0 2px rgba(0,0,0,0.5);'
                });
            },
            
            'slider-handle-hover': function() {
                return new uki.background.LinearGradient({
                    startColor: '#DFF6FF',
                    endColor: '#8AC5F3',
                    innerHTML: sliderPin(),
                    css: 'border:1px solid #8393A6;border-bottom-color:#687482;box-shadow:0 0 2px rgba(0,0,0,0.5);'
                });
            },

            'slider-handle-focus': function() {
                if (uki.browser.cssBoxShadow() == 'unsupported') {
                    return new uki.background.CssBox( 
                        'background:#7594D2;' + (uki.browser.cssFilter() && uki.image.needAlphaFix ? 'filter:Alpha(opacity=70);' : 'opacity:0.7;'), 
                        { inset: '-2 -2', zIndex: -2 } 
                    );
                }
                return new uki.background.CssBox(
                    'box-shadow: 0 0 6px #0244D4;',
                    { zIndex: 2, inset: '1' }
                );
            },
            
            'slider-bar': function() {
                uki.dom.offset.initializeBoxModel();
                return new uki.background.CssBox(
                    'overflow:visible;',
                    { 
                        inset: uki.dom.offset.boxModel ? '0 2 0 0' : '0 0',
                        innerHTML: '<div style="' + uki.browser.css('position:absolute;left:0;overflow:hidden;width:100%;top:50%;height:3px;margin-top:-2px;background:#C6C7CD;border:1px solid #777;border-radius:3px;box-shadow:0 1px 0 rgba(255,255,255,0.5),inset 0 1px 1px rgba(0,0,0,0.2)') + '"></div>' 
                    }
                );
            },
            
            // list
            list: function(rowHeight) {
                return new uki.background.Rows(rowHeight, '#EDF3FE');
            },
            
            // table
            'table-header': function() {
                return new uki.background.LinearGradient({
                    startColor: '#FFFFFF',
                    stops: [
                        { pos: 0.8, color: '#e0e0e0' }
                    ],
                    endColor: '#EEEEEE',
                    css: 'border-bottom:1px solid #CCC;'
                });
            }
        },
        
        images: {
            checkbox: function() {
                var prefix = "checkbox/normal";
                return uki.image(u(prefix + ".png"), "data:image/png;base64,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", u(prefix + ".gif"));
            },
            'checkbox-focus': function() {
                return uki.image(u("checkbox/focus.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABdklEQVRIie2Wv0rDUBSHUxRFRHQRFxWRioTeZHEXVxHqYgaRNrmrj+Ai+AAdi6trH0AQh6K05uYpfBQ934m0EnHQcIuDB+5y7/l9J+dPchMEU2sER8P5VjJY2ExeljY6D8v77dHKbvK4+t3iHD/80aFXzhdLBnPN4/tFBE37vN7qjrbDzO2ZTh6GnbExXRdXl+5zLn74o1O9cOB9xjfY3MmGa8Y+bSGO0vGhSYuT2Lqz2BbnUZpfVBf7nOOn/gQWPRwNMslE0iIyh1HqDiLrTuPMXZqsuI5s3hNQX/Zuq6vcz3v44Y8OPRx4H+UKAmpHevrkCi+ubu5e33660KGHo2WmJ5g2SGpImjzJb+DTIJKJcODB1QBMgTZUakm6dQKghwMPrgbQ+ss00DBqWidA2TNpvPC0DxjzzMiVU1H0a5VI9HDgwZ0EKEdTxk+mo14GMmHCgfcf4I8F8DpF3t8D72+y92+R96+p9/vA/402gzt5Bn8VHu0d2HhIetPffvAAAAAASUVORK5CYII=");
            },
            radio: function() {
                var prefix = "radio/normal";
                return uki.image(u(prefix + ".png"), "data:image/png;base64,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", u(prefix + ".gif"));
            },
            'radio-focus': function() {
                return uki.image(u("radio/focus.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABcElEQVRIx92VP0oEMRTGt9ADeAERq21E8ACLNp7AUrRbWdzdDDa6IBhnM5YqaCPCiiewyPzBA1gK1oIsHsNCNL9owBl1HYWM6MBjSPK+7+W99yWp1X7jm5dyrLUVTwTyYqotdb0dJjOdUM86Y8w86/jhX5q82TwZF1JPrkd6rtNPF40tiTBb7qps1Rlj5lnHD39wpchbMp4WKmmIKF0x/+0gSg8DlZ0KlZ05Y8w8669+DXAjgzjy7m68IPrJmoiS/Y29S907vr7fGdw+hOfDJ2eMmWcdP/zBfRqEGpKm3TnkKj3aPLi6kYO7x7fERWMdP/xfcAZveN71hEbZWpKu2RGgUcRFs0HIxODhgS8XADXQMGpK2l/t/KNMbLkMHh74cgGQHKqgcdT2O+TOwIGHB758AKNrpIc6ig0ta+Cs2gwPfLkAHB6rbyPBn5A7Aw8PfP8sgPceeFeR93Pg/SR7v4u836aVvAeVvGiVvMl/7nsGaBHOn+3vxvEAAAAASUVORK5CYII=");
            }
        },
    
        imageSrcs: {
            x: function() {
                return [u("x.gif"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII="]; 
            },
            'splitPane-horizontal': function() {
                return [u("splitPane/horizontal.gif"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAFUlEQVQIW2MoLy//zwAEYJq6HGQAAJuVIXm0sEPnAAAAAElFTkSuQmCC"];
            },
            'splitPane-vertical': function() {
                return [u("splitPane/vertical.gif"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAADCAYAAABfwxXFAAAAE0lEQVQIHWMsLy//z0AOYMSnEwAIngTLoazFLgAAAABJRU5ErkJggg=="];
            }
        },
        
        templates: {
            'table-header-cell': function() {
                return new uki.theme.Template(
                    '<div style="position:relative;border-right:1px solid #CCC;'+
                    '${style}" class="${className}">${data}</div>');
            },
            
            'table-cell': function() {
                return new uki.theme.Template(
                    '<div style="position:relative;border-right:1px solid #CCC;height:100%;'+
                    '${style}" class="${className}">${data}</div>');
            },
            
            'table-header-cell-asc': function() {
                return new uki.theme.Template(
                    '<div style="position:relative;border-right:1px solid #CCC;background: rgba(0,0,128,0.1);'+
                    '${style}" class="${className}"><div style="padding-right:7px">${data}</div><span style="position:absolute;right:0;top:50%;margin-top:-7px;">&darr;</span></div>');
            },
            
            'table-header-cell-desc': function() {
                return new uki.theme.Template(
                    '<div style="position:relative;border-right:1px solid #CCC;background: rgba(0,0,128,0.1);'+
                    '${style}" class="${className}"><div style="padding-right:7px">${data}</div><span style="position:absolute;right:0;top:50%;margin-top:-7px;">&uarr;</span></div>');
            }
        },
        
        doms: {
            'resizer': function(height) {
                var template = new uki.theme.Template('position:absolute;width:5px;top:0;right:-3px;height:${height}px;cursor:col-resize;cursor:ew-resize;z-index:101;background:url(' + uki.theme.imageSrc('x') + ')'),
                    node = uki.createElement('div', template.render({height:height}));
                    
                if (!node.style.cursor || window.opera) node.style.cursor = 'e-resize';
                return node;
            },
            'splitPane-vertical': function(params) {
                var commonVerticalStyle = 'cursor:row-resize;cursor:ns-resize;z-index:200;overflow:hidden;',
                    handle = params.handleWidth == 1 ?
                    uki.createElement('div', 
                        defaultCss + 'width:100%;height:5px;margin-top:-2px;' + 
                        commonVerticalStyle + 'background: url(' + uki.theme.imageSrc('x') + ')',
                        '<div style="' + 
                        defaultCss + 'background:#999;width:100%;height:1px;left:0px;top:2px;overflow:hidden;' + 
                        '"></div>') :
                    uki.createElement('div', 
                        defaultCss + 'width:100%;height:' + (params.handleWidth - 2) + 'px;' +
                        'border: 1px solid #CCC;border-width: 1px 0;' + commonVerticalStyle +
                        'background: url(' + uki.theme.imageSrc('splitPane-vertical') + ') 50% 50% no-repeat;');
                if (!handle.style.cursor || window.opera) handle.style.cursor = 'n-resize';
                return handle;
            },
            
            'splitPane-horizontal': function(params) {
                var commonHorizontalStyle = 'cursor:col-resize;cursor:ew-resize;z-index:200;overflow:hidden;',
                    handle = params.handleWidth == 1 ?
                    uki.createElement('div', 
                        defaultCss + 'height:100%;width:5px;margin-left:-2px;' + 
                        commonHorizontalStyle + 'background: url(' + uki.theme.imageSrc('x') + ')',
                        '<div style="' + 
                        defaultCss + 'background:#999;height:100%;width:1px;top:0px;left:2px;overflow:hidden;' + 
                        '"></div>') :
                    uki.createElement('div', 
                        defaultCss + 'height:100%;width:' + (params.handleWidth - 2) + 'px;' +
                        'border: 1px solid #CCC;border-width: 0 1px;' + commonHorizontalStyle + 
                        'background: url(' + uki.theme.imageSrc('splitPane-horizontal') + ') 50% 50% no-repeat;');
                if (!handle.style.cursor || window.opera) handle.style.cursor = 'e-resize';
                return handle;
                
            }
        },
        styles: {
            base: function() {
                return 'font-family:Arial,Helvetica,sans-serif;';
            },
            'label': function() {
                return 'font-size:12px;';
            },
            'button': function() {
                return 'color:#333;text-align:center;font-weight:bold;text-shadow:0 1px 0 rgba(255,255,255,0.6);';
            },
            'input': function() {
                return 'font-size:12px;';
            }
        }
    });

    function u(url) {
        return uki.theme.airport.imagePath + url;
    }
    
    function checkboxBg (offset) {
        var src = uki.theme.imageSrc('checkbox');
        return new uki.background.CssBox('', 
            { innerHTML: '<div style="position:absolute;left:50%;top:50%;width:18px;height:18px;overflow:hidden;' +
            'margin:-9px 0 0 -9px; background: url(' + src + ') 0 -' + offset + 'px"></div>' }
        );
    }
    
    function radioBg (offset) {
        var src = uki.theme.imageSrc('radio');
        return new uki.background.CssBox('', 
            { innerHTML: '<div style="position:absolute;left:50%;top:50%;width:18px;height:18px;overflow:hidden;' +
            'margin:-9px 0 0 -9px; background: url(' + src + ') 0 -' + offset + 'px"></div>' }
        );
    }
    
    function sliderPin () {
        return '<div style="' + uki.browser.css('position:absolute;overflow:hidden;z-index:10;left:50%;top:50%;width:2px;height:11px;margin:-6px 0 0 -1px;background:#8599AE;border-top:1px solid #6A7A8C;') + '"></div>';
    }
    
    uki.theme.airport.backgrounds['slider-handle-down'] = uki.theme.airport.backgrounds['slider-handle-hover'];
    uki.theme.airport.backgrounds['toolbar-popup'] = uki.theme.airport.backgrounds['popup-normal'];
    uki.theme.airport.backgrounds['toolbar-popup-button-disabled'] = uki.theme.airport.backgrounds['toolbar-popup-button-normal'];

    uki.theme.register(uki.theme.airport);
})();
