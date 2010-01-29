(function() {
    var defaultCss = 'position:absolute;z-index:100;-moz-user-focus:none;font-family:Arial,Helvetica,sans-serif;';
    
    function u(url) {
        return uki.theme.aristo.imagePath + url;
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
    
    uki.theme.aristo = uki.extend({}, uki.theme.Base, {
        imagePath: '/src/uki-theme/aristo/i/',
        
        backgrounds: {
            'button-normal': function() {
                return new uki.background.Multi(
                    new uki.background.Css({color:'#4F4F4F', textShadow: '0 1px 1px #FFF'}),
                    new uki.background.Sliced9({ 
                        c: [u("button/normal-c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAaklEQVQIHR3IsQnAIBSE4Vc5t0VACKRRcQcdQS3EwhGcIBAQFJzAeBY/fHfknGMhhCvG+CIYH22IWuuac55gfOS9b733NcY4wfjIGNNyzquUcoLxkVJKWGtXSukEa61v4pwzKeWzx4dgfD8jSmlbMWsU7wAAAABJRU5ErkJggg==", u("button/normal-c.gif")], 
                        v: [u("button/normal-v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAASCAYAAAB4i6/FAAAAMUlEQVQYlWPauXPn/9evX6NgkBjT////GbBhpn///jFgw9SW+Pv3LwoeHEYNqB3YMABC6UUSNdq8VQAAAABJRU5ErkJggg=="], 
                        h: [u("button/normal-h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAGCAYAAACW9l3DAAAAL0lEQVQ4jd3DsQ0AAAgCMP6fecfN8A2zI/5Bk2Jm0hx3l+awneaQlObY3TQHyTR/qltsRWlgKkcAAAAASUVORK5CYII="], 
                        m: [u("button/normal-m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAASCAYAAAAOsR1OAAAAO0lEQVRIx+3TQQ0AMAgDwD3wbxQNwGSQkKuDS9vIzHmHEzOnfS+6GxAQcBFYVRoENFENAgL6ICAg4EY+lUo2nQwj3VIAAAAASUVORK5CYII=", false, true] 
                    }, "3 3 3 3")
                );
                    
            },
            
            'button-down': function() {
                return new uki.background.Multi(
                    new uki.background.Css({color:'#4F4F4F', textShadow: '0 1px 1px #FFF'}),
                    new uki.background.Sliced9({ 
                        c: [u("button/down-c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAaElEQVQIWy3IsQnAIBRF0V85t4UgBFLpEOIEoiIWruAGgYBauIHxSYoDl0ucc6aUEtvzE3i0QxpjVkrpQOOR1rrlnFcp5UDjkXOu9d7XGONA41EIQdZa15zzQO93kbWWee/vGOMLaLwPaeVo7EtpfccAAAAASUVORK5CYII=", u("button/down-c.gif")], 
                        v: [u("button/down-v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAASCAYAAAB4i6/FAAAALklEQVQYlWOaPn36/2PHjqFgkBgTIyMjAzbMBAQMODBVJZiZmVHwILeDHs7FhgE+ABVnNkJwegAAAABJRU5ErkJggg=="], 
                        h: [u("button/down-h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAGCAYAAACW9l3DAAAAL0lEQVQ4jd3DsQ0AAAgCMP5fecdNvmF3xT9oUpBMc+xumkNSmsN2muPu0hwzk+YPxjZnBePCUX8AAAAASUVORK5CYII="], 
                        m: [u("button/down-m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAASCAYAAAAOsR1OAAAAO0lEQVRIx+3TAQ0AQAhCURH7x6LWXQw392nwBijJq8MZSZd9Nd0NECDARaBtGgQIkA/SIEAmChAgwI185scEA6HpneEAAAAASUVORK5CYII=", false, true] 
                    }, "3 3 3 3")
                );
            },

            'button-focus': function() {
                if (uki.image.needAlphaFix) return new uki.background.CssBox('filter:progid:DXImageTransform.Microsoft.Blur(pixelradius=3);background:#7594D2;', { inset: '-5 -5 -4 -5', zIndex: -2 } );
                
                var prefix = "button/focusRing-";
                return new uki.background.Sliced9({
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAtUlEQVQokWNgQABGBof9LNqhq9hkQo9xgjCIDRIDy6GA0FXMKp7b2NX9jvCqJB4S1Y47IgfCIDZYDCgHUgM3GSSgkLBfQCfxoKxO3Ak93fijdiAMYoPEQHJgTWCbgFaCTAFJ6MafMNZNPOGvl3AiC4RBbJAYSA6kBuw8kDtBVoNNBis+WQWzGsQGiYHkwE4F+QnsOaB7QU4AmcqABsA2AeVAakBqSddAspNI9jTpwUpGxJGUNADqMZr1BXNgDAAAAABJRU5ErkJggg=="],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAAf0lEQVQoU2MQj93JrZlwQlUn/qS3TsLJegY0ABIDyYHUgNQyqPsd4dWJPa6pl3giRDfxeB+6BpAYSA6kBqSWQSl0N79m7FEdvcSTkUA8DV0DSAwkB1IDUgvWoBN3Qk83/ni0buKJGegaQGIgOZCaUQ2jGgZeA0nJm+QMRGoWBQCeEP1BW4HCpgAAAABJRU5ErkJggg=="],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAMCAYAAAD79EROAAAAOUlEQVRIx2NQCt3NP1Qwg3rkCb2hghl0Y45HDxXMoJNwYsZQwQyjYBQMNTCkMtiQKrqGVKUwlKpbAHD4HlOhFuXbAAAAAElFTkSuQmCC"]
                }, "6 6 6 6", { inset: '-4 -4 -3 -4', zIndex: 2 });
            },
            
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
            
            'toolbar-popup-button-hover': function() {
                return new uki.background.Css({ background: '#4086FF', color: '#FFF' });
            },
            
            'panel': function() {
                return new uki.background.Sliced9({ 
                    h: [u("panel/normal-h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAECAYAAACtBE5DAAAAKUlEQVQImWPg4OD4jw0z7Ny58z82zFBTU/O/trb2P4yGsRnY2dn/Y8MAQGMuukQjPaUAAAAASUVORK5CYII="], 
                    m: [u("panel/normal-m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAuCAYAAAALM2gTAAAAnUlEQVQ4jZ1TAQoEIQgU//+i+llRHrOgtKKynTAZaGNOxr138WitCY8xyGPOSSwiFIEpMd5701qL1APPCSww9TAEwxoPVVoc3Niot0CUjSQ+C3+rcfLDK+pbwdSbJClVJKBReZjsYR/3kpyZ554996vBCOHT1p1HJ+oGdZZO1CJe3com0QfuqdJh+HOu7rUqH+rzV7MpCaki2VMq4Ad4BnPhvzp+XwAAAABJRU5ErkJggg==", false, true] 
                }, "2 0 2 0");
            },
            'input': function() {
                return new uki.background.CssBox(
                   'background:white;border: 1px solid #787878;border-top-color:#555;-moz-border-radius:2px;-webkit-border-radius:2px;border-radius:2px;',
                   { inset: '0 0 0 0' }
               );
            },
            'slider-bar': function() {
                var prefix = "slider/bar-"; 
                return new uki.background.Sliced9({ 
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAASCAYAAAB4i6/FAAAASUlEQVQY02NgGHqgvLz8PzKGC7a0tP1ftnwNGIPYYEkQsW//0f/Hjp8FYxAbLjFjxiy4BIgNlvj//38auh0gMbA9IAYyHvDQAACE3VpNVzKSLwAAAABJRU5ErkJggg==", u(prefix + "v.gif")], 
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAASCAYAAAB4gjqpAAAAUUlEQVQYGe3BwRFAMBAAwItJIVTAR0taSE9eVHiKOA9jdjcCAAAAAAAAgJ9rY4wMgKK+bnsAVPV5XgKgagqAF/T7OgOgqmXmEQAAAAAAAHzTAx6DCNiUJps4AAAAAElFTkSuQmCC", u(prefix + "m.gif"), true] 
                }, "0 3 0 3", {fixedSize: '0 18'});            
            },
            list: function(rowHeight) {
                return new uki.background.Rows(rowHeight, '#EDF3FE');
            },
            'popup-normal': function() {
                return new uki.background.CssBox('opacity:0.95;background:#ECEDEE;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;border:1px solid #CCC');
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
                return uki.image(u("slider/handle.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAmCAYAAAAm56DSAAACvklEQVRIx2NgwASMQMwExKxAzAHE3EDMA6U5oOJMUHV4AcwQnsKJS6LqFm5d1Lxi74WOtUd+gWgQHyQONRxmKE6DOLzistXqF2/fufTwlf+Hbz79f/35x/+vv/4B0yA+SBwkD1IHdSkTNoM4gzKrLRqX7X2948K9/3ff//p/9sX3/wcff/u//f4XMA3ig8RB8iB1brEZOugGgvzOxs0tKlE1f+vVnRfv/z/6+Mv/zbc+4sQg+a1n7/wvm71+D1CvMNTL4DBkBmK+pIaJRQv3X/i/9da7/+uvvyWIQeoW7D//P6FxYj5QPy/MdWxALF4waemRpSfv/F91+SUczzpw5b9zdOZ/aX1LMA3iI8uvOnP3P0gfSD/UHAZOIFYonrH2w8JTj/4vPfcMjh2iMv+ruYb91/ZPAtM24Wko8gtPPvxfNGPtW5B+qDngaFYrmrHu/wKgYchYxzv2v0l82X+LtHowreUZhSI/H2hY4bS1v4H6VaHmgP2rkT1h8cfph27+n33sLhx75beADbLKbAbT7rlNKPLTD974n9W/6D1QvzrUHIjLYusnne7cfOr/tIM34RjED6ieDDYIRGOTB+lDdhk4zFzj8zrL5m39P2nvNaJx6dwt/52is1qQwwwcmywsLJbRdZMeVC3Z/b935yWCuGLhjv+hpe2ngHrNkGMTnM5AXlU2sEiIapjyoQRoY+e2czgxSB6kTkJFKwyoTwU5nTFCTRUFYj0RGaUo39z6s1mTVvyvXLLnf9O64/9bN50G0yA+SBwkLyKrHAFUr4OeA+B5E+pcXSB2MfEO6/fOrbsUWt3/ObJhyn8QDeKDxEHyUIPE8GV2DqhNIKebQjX5AXEglHaBiqtA1XEQKoZYoWEgBo0lUFGjAaUVoOK8hMozbCUtJzT98EJpTlJK2tFie7TYHi22R4vt0WJ7UBfbAGWiV6nRlq1tAAAAAElFTkSuQmCC", u("slider/handle.gif"));
            },
            'slider-focus': function() {
                if (uki.image.needAlphaFix) {
                    var i = new uki.createElement('div', 'width:12px;height:18px;filter:progid:DXImageTransform.Microsoft.Blur(pixelradius=4);background:#7594D2;');
                    i.width = 20;
                    i.height = 28;
                    return i;
                }
                var i = uki.createElement(
                        'div', 
                        'width:24px;height:24px;padding-left:1px',
                        uki.imageHTML(u("radio/focus.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABcElEQVRIx92VP0oEMRTGt9ADeAERq21E8ACLNp7AUrRbWdzdDDa6IBhnM5YqaCPCiiewyPzBA1gK1oIsHsNCNL9owBl1HYWM6MBjSPK+7+W99yWp1X7jm5dyrLUVTwTyYqotdb0dJjOdUM86Y8w86/jhX5q82TwZF1JPrkd6rtNPF40tiTBb7qps1Rlj5lnHD39wpchbMp4WKmmIKF0x/+0gSg8DlZ0KlZ05Y8w8669+DXAjgzjy7m68IPrJmoiS/Y29S907vr7fGdw+hOfDJ2eMmWcdP/zBfRqEGpKm3TnkKj3aPLi6kYO7x7fERWMdP/xfcAZveN71hEbZWpKu2RGgUcRFs0HIxODhgS8XADXQMGpK2l/t/KNMbLkMHh74cgGQHKqgcdT2O+TOwIGHB758AKNrpIc6ig0ta+Cs2gwPfLkAHB6rbyPBn5A7Aw8PfP8sgPceeFeR93Pg/SR7v4u836aVvAeVvGiVvMl/7nsGaBHOn+3vxvEAAAAASUVORK5CYII=")
                    );
                i.width = 24;
                i.height = 24;
                return i;
                // var i = uki.image(u("radio/focus.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABcElEQVRIx92VP0oEMRTGt9ADeAERq21E8ACLNp7AUrRbWdzdDDa6IBhnM5YqaCPCiiewyPzBA1gK1oIsHsNCNL9owBl1HYWM6MBjSPK+7+W99yWp1X7jm5dyrLUVTwTyYqotdb0dJjOdUM86Y8w86/jhX5q82TwZF1JPrkd6rtNPF40tiTBb7qps1Rlj5lnHD39wpchbMp4WKmmIKF0x/+0gSg8DlZ0KlZ05Y8w8669+DXAjgzjy7m68IPrJmoiS/Y29S907vr7fGdw+hOfDJ2eMmWcdP/zBfRqEGpKm3TnkKj3aPLi6kYO7x7fERWMdP/xfcAZveN71hEbZWpKu2RGgUcRFs0HIxODhgS8XADXQMGpK2l/t/KNMbLkMHh74cgGQHKqgcdT2O+TOwIGHB758AKNrpIc6ig0ta+Cs2gwPfLkAHB6rbyPBn5A7Aw8PfP8sgPceeFeR93Pg/SR7v4u836aVvAeVvGiVvMl/7nsGaBHOn+3vxvEAAAAASUVORK5CYII=");
            },
            checkbox: function() {
                return uki.image(u("checkbox/normal.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAABsCAYAAABn5uLmAAAFnklEQVRYw+1X3W9TZRj/nX6cfqwdbbezre3ouo4xyLKBIIZI4MaARhPligsuDGZ/hDMYcFwpJpIQo4kyg5qgzsQLEyMJCEj4yPxIQJgInQznSrt1Y233RU9Pz/F5T9eup93WreFikZ7kaXue87y/8zzP+76/91egjMvpCfic/s1fo7HRkvUZ2Mc7fX28yeA+wkF3iOPgXQ4knZbQ99lHYiwW583TCXN4ZGR/DojXuXtaGxu625o8sJj4ZbM5efIkkjDy67wB1K6zCeE/ri1kJMvprrr6eoTnAGkmuSTIr1cu4cfL11Ht9qPZ58WWzq2tP506rj7TZdJNC/GkgqQoIS2lF7XQgyF88+XnsAke2Ox2vPbqfkpAFjQ9kqhuZktdophE74cfwFBdA4O5Cq+8uA+26mrNmExGkoTUvH3y/jEk4vHcPbOvTn2MREqBye7A9i0d8AcCqp+N0wBJlHoqlcZYOIKB27dx6sR7SCZTqu/KubP48+49WJ0C6oRaPL9rt+pnxsYVAGXePDE+BntDE6LxKXz3xaf4534QZ3/4HrZaN0xmC/bt3QtZUXKZSnkZZXok0dvJPP4AXnjpZVy5ehV37gURHByExVVPfbFiz+5dsNpsalz2kvJ+G3IZpTLom9o7MDv3GDdu3gQUStloxMaWZqz3+XMxC0BFGWnr7dy6DbOzc7j/7wiqrWZs37FT83wBKK0FYss+JWnftm3Hc5ibnUHHlq1qX2RJWnS7FJYWTSYfC3qDQRO4c/ceZNdZEUim2VHtrKVSvZHQCB5Tb7JlLmcsjsUT0GlNRiKiR6ORND8WeXiQdn9DKRqhSiMc5DMS9+ht/P8vjn30EUM6nc4jHMcdolvvCsaFFEU5PTk5eezAgQNirtkE0uPxeLq9Xi94ni+JIoqiNxQKHaaferK38tdRV11d3fxWSZUug6aWxQ8PD3dpgChNgVhy1X1h4wq2SBrlAOWPefJAkiStISAGUk5pRcS29kp7krNGDJkUDAUMWao/bJz2pE2ne8PhMB2KyVx2yxmLY/F09msZcnR09CgF8JFIhBiSWwFDKhH6OjM+Pv5/Y8iKhqxoyIqGrGjIioasaMiKhqxoyIqGfKo1JFfOoNfffNdnNBmOJ6ZCb3x74sRcrkeMIeub246AUw5x4LylpvxS/+9iXJR5o6nFTK4FDSn4NvTUuBzdgssJI531y10XLlxAijPwDjsPp6DT8hEV2GUnOTfLpF9yaYYcGgzilwcRrKuqgsdhRZPH26pZR0wLipJMR7MMRVYWtcmJCVz87RbsFguqTEZs6+wksVLAkASEtLz0FpFIzpy7fBW8xaqW/symVpgIkI0rXNk5O3/+PKmQOY3v2vVrmJV1MPFGtLlrUEsSsHB/ZkuDTGUl4gncHY3j3MWfVUnMfMG/7uDv8SlYLWbUVJkQaNmg+lUrzChb2sz0FBx2GyZJwfb392M8Oobrd4Zgt1pgMujRsbmN9UWNZZYPpKERZ00Nnt3ox60HIdx/NI3hRzdgoV4wVmgPrFcPz/xyimhEzWje6fa4IaZEBMMTGQ2p18HnssHlchVx1hIZKTlnY6OPjmUJD+PTqDLq0exv1jxfNiNZkTVBTf4mJIOD8DV6oD4peL54RrIclVKiwOn0msANLYGiN+c4SW24XMCQstwbZ/8/SECo2ZUwFsfi04UMOSjOHG2OgZ+MxVfBkNyZIWnmqdGQAwMDTO+tWkPS97H29vYFDUlXj8Ph6CYtCb1ev5IT1ktC9HAsFstpyCyNdFXTf1S2XkholjQWNx/fpZl+KknIX6Ur7guNK94iZQAVbZG1B0RTiTJ1djEf5TvLFlosxXKk36KllZPRoqWV0+yi0gg5SqUJOp1uVWWxcRqGJIfKkKxPK2FIFsfil9SQiUTiIN02rCChCL18jWvI/wDVil9tndgPIAAAAABJRU5ErkJggg==", u("checkbox/normal.gif"));
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
                return uki.image(u("radio/normal.png"), "data:image/png;base64,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", u("radio/normal.gif"));
            },
            'radio-focus': function() {
                if (uki.image.needAlphaFix) return uki.theme.aristo.image('checkbox-focus');
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
        
        doms: {
            'resizer': function(params) {
                var template = new uki.theme.Template('position:absolute;width:5px;top:0;height:${height}px;cursor:col-resize;cursor:ew-resize;z-index:101;background:url(' + uki.theme.imageSrc('x') + ')'),
                    node = uki.createElement('div', template.render(params));
                    
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
        }
    });

    uki.theme.aristo.backgrounds['button-hover'] = uki.theme.aristo.backgrounds['button-normal'];
    uki.theme.aristo.backgrounds['input-focus'] = uki.theme.aristo.backgrounds['button-focus'];
    uki.theme.aristo.backgrounds['popup-shadow'] = uki.theme.aristo.backgrounds['shadow-medium'];
    uki.theme.aristo.backgrounds['toolbar-popup'] = uki.theme.aristo.backgrounds['popup-normal'];
    uki.theme.aristo.backgrounds['toolbar-popup-shadow'] = uki.theme.aristo.backgrounds['shadow-medium'];

    uki.theme.register(uki.theme.aristo);
})();
