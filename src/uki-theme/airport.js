(function() {
    var defaultCss = 'position:absolute;z-index:100;-moz-user-focus:none;font-family:Arial,Helvetica,sans-serif;';
    
    uki.theme.airport = uki.extend({}, uki.theme.Base, {
        imagePath: '/src/uki-theme/airport/i/',
        
        backgrounds: {
            // basic button
            'button-normal': function() {
                var prefix = "button/normal-";
                return new uki.background.Sliced9({
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAS0lEQVQIW2NgAILy8vL/yJgBJrh+/fr/MABigyVBxN9//1EwXGLGrDn/j5++9P/G7Qf/t+/YBZEA6k5LTU39j4xBYmB7QAxkDBIDALKrX9FN99pwAAAAAElFTkSuQmCC", u(prefix + "c.gif")],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAATCAYAAACz13xgAAAAT0lEQVQYlZXPMQ6AQAhE0b9m78zZFca1sdEwxZLQ8MIQiIh1XuvTEbEmQOnmXxNAVT2UB5komY1MA5KNys3jHlyUtv+wNzhGDwMDzfyFRh7wcj5EWWRJUgAAAABJRU5ErkJggg==", false, true],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAGCAYAAADqkEEaAAAAMklEQVRIie3DUQ0AIAxDwZodFmaVhB+MjIeQ9pJTd5OeRdjSPEjP2ueSnlVVpGcBKz1/kUWrDOOOWIQAAAAASUVORK5CYII=", u(prefix + "h.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAATCAYAAAC5i9IyAAAAXklEQVQYGe3BgRHDMAACsXeP/fdtDUkHAUnf3/syleQ8TCfFZjrJNtNJdphOSsx00r1mOikJ00nJZTrJDtNJdphOci7TSXGYTkrMdJIdppP4HKaTDofpJA5TSnCYTn/FLC2twbqbSQAAAABJRU5ErkJggg==", null, true]
                }, '3 3 3 3', { inset: '0 0 -1 0'});
            },
            
            'button-hover': function() {
                var prefix = "button/hover-";
                return new uki.background.Sliced9({
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAS0lEQVQIW2NgAILy8vL/yJgBJrh+/fr/MABigyVBxN9//1EwXGL+wqX/b9579v/Ji3f/9+w9AJEA6m5ITU39j4xBYmB7QAxkDBIDAN/zYPRpDtd1AAAAAElFTkSuQmCC", u(prefix + "c.gif")],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAATCAYAAACz13xgAAAAT0lEQVQY062PMQ7AIAwDj8Kf83gw7tKlhQxItZTp5EtCRLh3vyYi3AA0J980gJmBoayh31S290DS4Q4pUzlTjdOr0j9KLXvAanrAWuAiyQ2Hqz+Eaxa7lwAAAABJRU5ErkJggg==", false, true],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAGCAYAAADqkEEaAAAAM0lEQVRIS+3DsREAIAwDMS+bGdIyLAUVG4RnEFt3UneTnkXY0jxIz9rnkp5VVaRnASs9f4uJy0upJnsYAAAAAElFTkSuQmCC", u(prefix + "h.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAATCAYAAAC5i9IyAAAAXElEQVQYGe3BgRHAMAABQLnaf+EEHYR/3ptgKlE2phNtYzrxyZhOtIzpRNuYTnwyphOTYDpREqYTbWM6UQqmExVhOtHPmE5MgunEJ2M68XwH04kIphRxMKWIqfUDGFEu5jKnhiUAAAAASUVORK5CYII=", null, true]
                }, "3 3 3 3", { inset: '0 0 -1 0'});
            },

            'button-down': function() {
                var prefix = "button/down-";
                return new uki.background.Sliced9({
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAR0lEQVQIW2NgAIKGhob/yJgBJlhQUPg/JTUDjEFssCSIyC8o+l9b1wjGIDZcoq9v4v9tO/aDMYiNYhyGHSDw////NGQMEgMAouBOxXrB3FIAAAAASUVORK5CYII=", u(prefix + "c.gif")],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAATCAYAAACz13xgAAAAkUlEQVQYV42Nuw4CMQwEHT9ojvvnNPTQ8LfIeH3BmKuwNMomI294zulz3vz+eCbIeGOK2a4b7fueIGNSmF1IRBPkEqxMYpIgl1A2UllE/m5IbCyQS4hEjS4iN6FHXYDcBCokkV7FrYp7lcXFVA+6oME0xkiQS3weS9YGj19q48QfVbQ+zY+b4BMlXu7kcfrKmDdNVhnN3VjMVQAAAABJRU5ErkJggg==", false, true],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAGCAYAAADqkEEaAAAARklEQVQYGe3BsQ2AQAwDQNvD0oCYIQ0UbIVExVDxDxLfsaqMGIn7cVoSYpbuBq/7sSTELN0Nvt9vgohZDINVZcRItL0hRloovBiO+VNuegAAAABJRU5ErkJggg==", u(prefix + "h.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAATCAYAAAC5i9IyAAAAa0lEQVQYGe3BsREDQQwDseWJF/n7n3lH7lQuhAT8fn8rUWF2wc/zQRKVZXexfalMnjtUJnsulckzQ2XyeKhM9lwqk2eGyuTxUJl8bSqTpUNlsiQqkzmiMllUKkuiMhkdKpMPlcoLSKKy7C5/du0Mt289U6QAAAAASUVORK5CYII=", null, true]
                }, "3 3 3 3", { inset: '0 0 -1 0'});
            },
            
            'button-focus': function() {
                if (uki.image.needAlphaFix) return new uki.background.CssBox('filter:progid:DXImageTransform.Microsoft.Blur(pixelradius=3);background:#7594D2;', { inset: '-5 -5 -4 -5', zIndex: -2 } );
                
                var prefix = "button/focusRing-";
                return new uki.background.Sliced9({
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAtUlEQVQokWNgQABGBof9LNqhq9hkQo9xgjCIDRIDy6GA0FXMKp7b2NX9jvCqJB4S1Y47IgfCIDZYDCgHUgM3GSSgkLBfQCfxoKxO3Ak93fijdiAMYoPEQHJgTWCbgFaCTAFJ6MafMNZNPOGvl3AiC4RBbJAYSA6kBuw8kDtBVoNNBis+WQWzGsQGiYHkwE4F+QnsOaB7QU4AmcqABsA2AeVAakBqSddAspNI9jTpwUpGxJGUNADqMZr1BXNgDAAAAABJRU5ErkJggg=="],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAAf0lEQVQoU2MQj93JrZlwQlUn/qS3TsLJegY0ABIDyYHUgNQyqPsd4dWJPa6pl3giRDfxeB+6BpAYSA6kBqSWQSl0N79m7FEdvcSTkUA8DV0DSAwkB1IDUgvWoBN3Qk83/ni0buKJGegaQGIgOZCaUQ2jGgZeA0nJm+QMRGoWBQCeEP1BW4HCpgAAAABJRU5ErkJggg=="],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAMCAYAAAD79EROAAAAOUlEQVRIx2NQCt3NP1Qwg3rkCb2hghl0o45HDxXMoJNwYsZQwQyjYBQMNTCkMtiQKrqGVKUwlKpbALcNHad+5qhBAAAAAElFTkSuQmCC"]
                }, "6 6 6 6", { inset: '-4 -4 -4 -4', zIndex: 2 });
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
                var src = uki.theme.imageSrc('checkbox-focus');
                return new uki.background.CssBox('', 
                    { innerHTML: '<div style="position:absolute;left:50%;top:50%;width:24px;height:24px;overflow:hidden;' +
                    'margin:-12px 0 0 -12px; background: url(' + src + ') 0 0"></div>', zIndex: -2  }
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
                return new uki.background.Css({ background: '#4086FF', color: '#FFF', textAlign: 'left' });
            },
            
            
            // panel
            'popup-normal': function() {
                return new uki.background.Multi(
                    new uki.background.CssBox('opacity:0.95;background:#ECEDEE;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;border:1px solid #CCC'),
                    uki.theme.background('shadow-medium')
                );
            },
            
            'panel': function() {
                var prefix = "panel/dark-";
                return new uki.background.Sliced9({
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAGCAYAAADpJ08yAAAAIElEQVQIW2NcvnzFfwYgYLx37z4aY8aMmWgMIJ4JYgAAGzEQWXMYYT0AAAAASUVORK5CYII=", u(prefix + "h.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAABlCAYAAABnRzLGAAAAPUlEQVQoz2O5e/fefwYgYGGAAgTj////DERLkaSY6lLkKaaQATfw379/BNVgSsF1Ud1hw5VBYYBTaCntGQBCJspdTUaYMwAAAABJRU5ErkJggg==", false, true]
                }, "3 0 3 0");
            },
            
            // text field
            'input': function() {
                return new uki.background.CssBox(
                   'background:white;border: 1px solid #999;border-top-color:#555;-moz-border-radius:2px;-webkit-border-radius:2px;border-radius:2px;-moz-box-shadow:0 1px 0 rgba(255, 255, 255, 0.4);-webkit-box-shadow:0 1px 0 rgba(255, 255, 255, 0.4);box-shadow:0 1px 0 rgba(255, 255, 255, 0.4)',
                   { inset: '0 0 0 0' }
               );
            },
            
            // slider
            'slider-bar': function() {
                var prefix = "slider/bar-"; 
                return new uki.background.Sliced9({ 
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAASCAYAAAB4i6/FAAAASUlEQVQY02NgGHqgvLz8PzKGC7a0tP1ftnwNGIPYYEkQsW//0f/Hjp8FYxAbLjFjxiy4BIgNlvj//38auh0gMbA9IAYyHvDQAACE3VpNVzKSLwAAAABJRU5ErkJggg==", u(prefix + "v.gif")], 
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAASCAYAAAB4gjqpAAAAUUlEQVQYGe3BwRFAMBAAwItJIVTAR0taSE9eVHiKOA9jdjcCAAAAAAAAgJ9rY4wMgKK+bnsAVPV5XgKgagqAF/T7OgOgqmXmEQAAAAAAAHzTAx6DCNiUJps4AAAAAElFTkSuQmCC", u(prefix + "m.gif"), true] 
                }, "0 3 0 3", {fixedSize: '0 18'});            
            },
            
            // list
            list: function(rowHeight) {
                return new uki.background.Rows(rowHeight, '#EDF3FE');
            },

            'shadow-big': function() {
                return new uki.background.Sliced9(shadowData(), "23 23 23 23", {zIndex: -2, inset: '-4 -10 -12 -10'});
            },
            'shadow-medium': function() {
                return new uki.background.Sliced9(shadowData(), "23 23 23 23", {zIndex: -2, inset: '-1 -6 -6 -6'});
            }
        },
        
        images: {
            'slider-handle': function() {
                return uki.image(u("slider/handle.gif"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAkCAYAAACwlKv7AAABcUlEQVQ4T7WSy0sCYRRH758b0aKFCwmjB1kwlGEIJQiVvRe6iajIVpGbJArKjWK0GCgq7DE2muJt7kf3cmeaBlz0wVl8Z34Dw3AAvLNbqmIUtIHNo2sk/jr8HNb2K/jV60dCG8gVy9jq9IThsXmDdrQxw2arKySzRYN2mcIpQma7hE/vHYHuYQ5SG8doN9sC3cMcWKsHeP/sCnQPc5BcKWDtoSXwN/qct4GZzA5WbUcgSWhHG5hczP+SwZdpAwkrhxeNN2EivWXQjjYQn13Gcu1VSKTWDdrRBmJTS/6h9zahHW1gdHwBT25fIqENjMTnkND/TcPPTWpDsWmMAgY+AxXedZxQfIXffWIkUriWXLh2UvjlIwpcj3ZSuE/+FB50pvAzGwUuPOhM4aVGX+DCg84UfljvCvyNPseFF6oocOHaSeF7N22BC9dOCs9fuQIXrp0Unq24AheunRSeLjsCF66dFG6df0TiK7xid0L5v8K/AYNKQJdGv2S4AAAAAElFTkSuQmCC");
            },
            'slider-focus': function() {
                if (uki.image.needAlphaFix) {
                    var i = new uki.createElement('div', 'width:12px;height:18px;filter:progid:DXImageTransform.Microsoft.Blur(pixelradius=4);background:#7594D2;');
                    i.width = 20;
                    i.height = 28;
                    return i;
                }
                return uki.image(u("slider/focus.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAZCAYAAAA8CX6UAAABUUlEQVQ4y+2VsUoDQRCGVxRFRLQRGxUJETmyd4292IoQm1wRwuVuWx/BxjewDHmGPIAgFkFJvL23cr45MVhli20EFxaW2f//b+afvV1jVmPD3My3evls+yT/3D0uXvcu+4v9Tv52wGRNjD0wYJXza+Szze7tyw7grvs46o0XZ0nlL2xRJ0mxtExdS4w9MIoVDtyfTAicV/ND695P7dhnabm8tmVzlzk/yFwzbKcfENM9wYCFo2KamaSIOhtp6a9S5++zyj/YqnlKXf0sIhMma2LsgQELB66WSb2kqpmoSPNo1gwwYOGoFXim5kndpMzXTODQzIQDFw1DJ9RYqZ/UQ4XAwoGLhlF/pCOYiQ+hQq1/0gDhqk+cEdr73Z1JcGltE4Zw0VChtuX1SAychmfkp3Dg/gv9aaEo5yjayY72r0X7+6PdR9FuyHh3dsRXJMq79gUgPopCCBOTpwAAAABJRU5ErkJggg==");
            },
            checkbox: function() {
                var prefix = "checkbox/normal";
                return uki.image(u(prefix + ".png"), "data:image/png;base64,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", u(prefix + ".gif"));
            },
            'checkbox-focus': function() {
                if (uki.image.needAlphaFix) {
                    var i = new uki.createElement('div', 'width:18px;height:18px;filter:progid:DXImageTransform.Microsoft.Blur(pixelradius=3);background:#7594D2;');
                    i.width = 26;
                    i.height = 26;
                    return i;
                }
                return uki.image(u("checkbox/focus.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABdklEQVRIie2Wv0rDUBSHUxRFRHQRFxWRioTeZHEXVxHqYgaRNrmrj+Ai+AAdi6trH0AQh6K05uYpfBQ934m0EnHQcIuDB+5y7/l9J+dPchMEU2sER8P5VjJY2ExeljY6D8v77dHKbvK4+t3iHD/80aFXzhdLBnPN4/tFBE37vN7qjrbDzO2ZTh6GnbExXRdXl+5zLn74o1O9cOB9xjfY3MmGa8Y+bSGO0vGhSYuT2Lqz2BbnUZpfVBf7nOOn/gQWPRwNMslE0iIyh1HqDiLrTuPMXZqsuI5s3hNQX/Zuq6vcz3v44Y8OPRx4H+UKAmpHevrkCi+ubu5e33660KGHo2WmJ5g2SGpImjzJb+DTIJKJcODB1QBMgTZUakm6dQKghwMPrgbQ+ss00DBqWidA2TNpvPC0DxjzzMiVU1H0a5VI9HDgwZ0EKEdTxk+mo14GMmHCgfcf4I8F8DpF3t8D72+y92+R96+p9/vA/402gzt5Bn8VHu0d2HhIetPffvAAAAAASUVORK5CYII=");
            },
            radio: function() {
                var prefix = "radio/normal";
                return uki.image(u(prefix + ".png"), "data:image/png;base64,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", u(prefix + ".gif"));
            },
            'radio-focus': function() {
                if (uki.image.needAlphaFix) return uki.theme.airport.image('checkbox-focus');
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
                    '<div style="position:relative;border:1px solid #CCC;border-top:none;border-left:none;'+
                    '${style}" class="${className}">${data}</div>');
            },
            
            'table-cell': function() {
                return new uki.theme.Template(
                    '<div style="position:relative;border-right:1px solid #CCC;height:100%;'+
                    '${style}" class="${className}">${data}</div>');
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
                return 'font-size:12px;'
            },
            'button': function() {
                return 'color:#333;text-align:center;font-weight:bold;'
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
    
    function shadowData() {
        var prefix = "shadow/large-";
        return {
            c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAACzklEQVRo3t2a63KiUBCEPYCX1U2Ixvd/Qm/kYjRBWd2aTjW950CS3fyYtaprULl8p2kGAcMg/QqR6SDTsXk/8moi041Mx+bt3WAKVDVIDOQj0ArcROCbFHzoAGbYTICzLwygC/jc8T62bGccFDKLKLUXeH2625sIpCo2mBa8bkiBWbkpo5oaQMrxFPCJ6ikxkNYAQg90Tiqk5h0DiDmeAoZqqTqIFrxuSB0uSENTQVUHkHJdnVbgN6qYrmkQ6n7U6VygRwY6Eg1pHiyDdcQcx0YZGLCvInxWyx44q+Nwi6Hh8Ng0kTqieTQ2QcCbSDzeCPB40UHqUfYAlvu9Lu0aDD0i0B+iiQnup1wfdLgNdw+mFxEG8CrwZziuB6JCT00zqQyfcn3Q4TZD7y96lrqPwL9HJkiLKygecPcK+tN0Y3VG348lMlnC8bNE5EjuXmGfLnq0+mSf4fujuh6kM8DtCUHfmG6pMry63uc4u83QDwaO+kjwB3U9SD45InD61lSS4PzU4GNxUXCNyYvFAU5XpAcTnOfI/AFeiNuIxhX0TgT3pxKXoge8lpjsyeWdqKLosOs1wIcEzgck3L6Czk0Le1/ad7O/BH826MpgNxdtTTtynQ/UFngh4DNym6HvbfqO4oKcfwYc+UZMdga7FviKss7gdbB45NJNAA637wl8QXFBzsfSz7vAccLZ00EJt9dU4TofpOgup0AbLKSbICYAZiEu3NM/6zh6NmKyFm0oLtxdWo5z/8ZJpiTwpYDPxfGvgsPxrUCvCLyik9J7P1dw7igAB+zStDDw8h+BVwa+MeAVDQDg3FmS4NxR5gTN9TvA1wS9opxrZ+kFL6mbLEnfDb6iqGzJ8f8f3F1UXB6cLtuhyxOQy1O+2x9Zbn/Wur2QcHvp5vZi2e3tCbc3hNzegnN709P1bWaXN/bdPkpx/fDK9eNCtw9oXT8Sd/MnhF+iLpLibpmRrgAAAABJRU5ErkJggg==", u(prefix + "c.gif")],
            v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAECAYAAADxjg1nAAAAWklEQVQYGdXBWwpAQAAAwLEeSUqy9z/hSkpSnh9OsTMFGlSo0aJDjwEjJkREREwYMaBHhxY1KpQIKPxePLhx4cSBHRtWLJiRkJAwY8GKDTsOnLiCTAWZCjL1AeihFg5/1kytAAAAAElFTkSuQmCC", u(prefix + "v.gif")],
            h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAuCAYAAAAPxrguAAAAe0lEQVQoz5XSWwtAQBCG4XEMOST+/y8kOYScKRe8WzZbc7FPX7PNtLaIuPI49l0vUBIewT/LuO/7BRETMRMpExkh/w9KD+WVhBASAu20jnZjFsEkGAQh7ISNsBIWwkwYCT2hI9SEilASiv+g9KgEH6ZhomVi0E47fW7sAEmnGr/QVlzBAAAAAElFTkSuQmCC", u(prefix + "h.gif")],
            m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAEUlEQVQIHWNgYGD4i4ZJFQAAAkoP0RsgosoAAAAASUVORK5CYII=", u(prefix + "m.gif"), true]
        };
    };
    
    uki.theme.airport.backgrounds['input-focus'] = uki.theme.airport.backgrounds['button-focus'];
    uki.theme.airport.backgrounds['toolbar-popup'] = uki.theme.airport.backgrounds['popup-normal'];
    uki.theme.airport.backgrounds['toolbar-popup-button-disabled'] = uki.theme.airport.backgrounds['toolbar-popup-button-normal'];

    uki.theme.register(uki.theme.airport);
})();
