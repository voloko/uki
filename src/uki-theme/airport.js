(function() {
    var defaultCss = 'position:absolute;z-index:100;-moz-user-focus:none;font-family:Arial,Helvetica,sans-serif;';
    
    function u(url) {
        return uki.theme.airport.imagePath + url;
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
    
    uki.theme.airport = uki.extend({}, uki.theme.Base, {
        imagePath: '/src/uki-theme/airport/i/',
        
        backgrounds: {
            'button-normal': function() {
                var prefix = "button/normal-";
                return new uki.background.Sliced9({
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAS0lEQVQIW2NgAILy8vL/yJgBJrh+/fr/MABigyVBxN9//1EwXGLGrDn/j5++9P/G7Qf/t+/YBZEA6k5LTU39j4xBYmB7QAxkDBIDALKrX9FN99pwAAAAAElFTkSuQmCC", u(prefix + "c.gif")],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAATCAYAAACz13xgAAAAT0lEQVQYlZXPMQ6AQAhE0b9m78zZFca1sdEwxZLQ8MIQiIh1XuvTEbEmQOnmXxNAVT2UB5komY1MA5KNys3jHlyUtv+wNzhGDwMDzfyFRh7wcj5EWWRJUgAAAABJRU5ErkJggg==", false, true],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAGCAYAAADqkEEaAAAAMklEQVRIie3DUQ0AIAxDwZodFmaVhB+MjIeQ9pJTd5OeRdjSPEjP2ueSnlVVpGcBKz1/kUWrDOOOWIQAAAAASUVORK5CYII=", u(prefix + "h.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAATCAYAAAC5i9IyAAAAXklEQVQYGe3BgRHDMAACsXeP/fdtDUkHAUnf3/syleQ8TCfFZjrJNtNJdphOSsx00r1mOikJ00nJZTrJDtNJdphOci7TSXGYTkrMdJIdppP4HKaTDofpJA5TSnCYTn/FLC2twbqbSQAAAABJRU5ErkJggg==", null, true]
                }, '3 3 3 3');
            },
            
            'button-hover': function() {
                var prefix = "button/hover-";
                return new uki.background.Sliced9({
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAS0lEQVQIW2NgAILy8vL/yJgBJrh+/fr/MABigyVBxN9//1EwXGL+wqX/b9579v/Ji3f/9+w9AJEA6m5ITU39j4xBYmB7QAxkDBIDAN/zYPRpDtd1AAAAAElFTkSuQmCC", u(prefix + "c.gif")],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAATCAYAAACz13xgAAAAT0lEQVQY062PMQ7AIAwDj8Kf83gw7tKlhQxItZTp5EtCRLh3vyYi3AA0J980gJmBoayh31S290DS4Q4pUzlTjdOr0j9KLXvAanrAWuAiyQ2Hqz+Eaxa7lwAAAABJRU5ErkJggg==", false, true],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAGCAYAAADqkEEaAAAAM0lEQVRIS+3DsREAIAwDMS+bGdIyLAUVG4RnEFt3UneTnkXY0jxIz9rnkp5VVaRnASs9f4uJy0upJnsYAAAAAElFTkSuQmCC", u(prefix + "h.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAATCAYAAAC5i9IyAAAAXElEQVQYGe3BgRHAMAABQLnaf+EEHYR/3ptgKlE2phNtYzrxyZhOtIzpRNuYTnwyphOTYDpREqYTbWM6UQqmExVhOtHPmE5MgunEJ2M68XwH04kIphRxMKWIqfUDGFEu5jKnhiUAAAAASUVORK5CYII=", null, true]
                }, "3 3 3 3");
            },

            'button-down': function() {
                var prefix = "button/down-";
                return new uki.background.Sliced9({
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAR0lEQVQIW2NgAIKGhob/yJgBJlhQUPg/JTUDjEFssCSIyC8o+l9b1wjGIDZcoq9v4v9tO/aDMYiNYhyGHSDw////NGQMEgMAouBOxXrB3FIAAAAASUVORK5CYII=", u(prefix + "c.gif")],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAATCAYAAACz13xgAAAAkUlEQVQYV42Nuw4CMQwEHT9ojvvnNPTQ8LfIeH3BmKuwNMomI294zulz3vz+eCbIeGOK2a4b7fueIGNSmF1IRBPkEqxMYpIgl1A2UllE/m5IbCyQS4hEjS4iN6FHXYDcBCokkV7FrYp7lcXFVA+6oME0xkiQS3weS9YGj19q48QfVbQ+zY+b4BMlXu7kcfrKmDdNVhnN3VjMVQAAAABJRU5ErkJggg==", false, true],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAGCAYAAADqkEEaAAAARklEQVQYGe3BsQ2AQAwDQNvD0oCYIQ0UbIVExVDxDxLfsaqMGIn7cVoSYpbuBq/7sSTELN0Nvt9vgohZDINVZcRItL0hRloovBiO+VNuegAAAABJRU5ErkJggg==", u(prefix + "h.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAATCAYAAAC5i9IyAAAAa0lEQVQYGe3BsREDQQwDseWJF/n7n3lH7lQuhAT8fn8rUWF2wc/zQRKVZXexfalMnjtUJnsulckzQ2XyeKhM9lwqk2eGyuTxUJl8bSqTpUNlsiQqkzmiMllUKkuiMhkdKpMPlcoLSKKy7C5/du0Mt289U6QAAAAASUVORK5CYII=", null, true]
                }, "3 3 3 3");
            },
            
            'button-focus': function() {
                if (uki.image.needAlphaFix) return new uki.background.CssBox('filter:progid:DXImageTransform.Microsoft.Blur(pixelradius=3);background:#7594D2;', { inset: '-5 -5 -4 -5', zIndex: -2 } );
                
                var prefix = "button/focusRing-";
                return new uki.background.Sliced9({
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAtUlEQVQokWNgQABGBof9LNqhq9hkQo9xgjCIDRIDy6GA0FXMKp7b2NX9jvCqJB4S1Y47IgfCIDZYDCgHUgM3GSSgkLBfQCfxoKxO3Ak93fijdiAMYoPEQHJgTWCbgFaCTAFJ6MafMNZNPOGvl3AiC4RBbJAYSA6kBuw8kDtBVoNNBis+WQWzGsQGiYHkwE4F+QnsOaB7QU4AmcqABsA2AeVAakBqSddAspNI9jTpwUpGxJGUNADqMZr1BXNgDAAAAABJRU5ErkJggg=="],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAAf0lEQVQoU2MQj93JrZlwQlUn/qS3TsLJegY0ABIDyYHUgNQyqPsd4dWJPa6pl3giRDfxeB+6BpAYSA6kBqSWQSl0N79m7FEdvcSTkUA8DV0DSAwkB1IDUgvWoBN3Qk83/ni0buKJGegaQGIgOZCaUQ2jGgZeA0nJm+QMRGoWBQCeEP1BW4HCpgAAAABJRU5ErkJggg=="],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAAAMCAYAAABFjt5WAAAAlElEQVRYw+2YMQoCMRBFpxextBcWCUxykQUrLUTibk7iDbYUryK2SpJbubN7jLwHr0n7msmXfXxvjqfv9nD57LAtrbv1FzeWTmN2Lv5U7yVgGy69rfvcX3SofUjlHFK9+iHfsA2tt3W3/qJjffiUp/nx6VN5YRuuvfNk/QUAAADA4DDkMOSLyBexZyxiLOqE2ZjZ+A+dZWjNi3C4GwAAAABJRU5ErkJggg=="]
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
            
            'panel': function() {
                var prefix = "panel/dark-";
                return new uki.background.Sliced9({
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAABtCAYAAACC/xDRAAAAZklEQVRIx+3UwQ3AIAgF0E/jjaW6rY7TTeyNG3QBOJi0sRr+9SV80USqtRmckIi4UHq/4YKIuHAgSAjFzKaNmlq+/ah/li8G8YKq+nnH+B7RqbZ/qISE/ABWu8SEF4CY+XIBwImRPBYi1Esk9DsnAAAAAElFTkSuQmCC", u(prefix + "v.gif"), true],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAABtCAYAAACGCsDsAAAAYElEQVQ4y2NcvnzFfwYkwPj9+3cUAZb37z8woAgAVaAIMDGgAQwBlv///1NdC00MHbRa6GPoAAlgOuzfv38Um0HYHei2DNoAGhX4P5pwB9xzw1qAkZub+wKKABA7MOADAEid1EugsXRPAAAAAElFTkSuQmCC", u(prefix + "m.gif"), true]
                }, "0 3 0 3");
            },
            'input': function() {
                return new uki.background.CssBox(
                   'background:white;border: 1px solid #787878;border-top-color:#555;-moz-border-radius:2px;-webkit-border-radius:2px;border-radius:2px;-moz-box-shadow:0 1px 0 rgba(255, 255, 255, 0.4);-webkit-box-shadow:0 1px 0 rgba(255, 255, 255, 0.4);box-shadow:0 1px 0 rgba(255, 255, 255, 0.4)',
                   { inset: '0 0 1 0' }
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
                return uki.image(u("checkbox/normal.png"), "data:image/png;base64,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", u("checkbox/normal.gif"));
            },
            'checkbox-focus': function() {
                if (uki.image.needAlphaFix) return new uki.createElement('div', 'width:19px;height:19px;filter:progid:DXImageTransform.Microsoft.Blur(pixelradius=4);background:#7594D2;');
                return uki.image(u("checkbox/focus.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABdElEQVRIie2Wv0rEQBCHI4oiItqIjYrIiYTbpLEXWxHOxhQiuWRbH8FG8AGuPGxt7wEEsTiUO7N5Ch9F55vIiRELDXtYuLDN7vy+2fmz2QTBlMdMcDicayeD+Y3keXE9vV/a64yWd5KHle8m+9hhjw69cr6MZDDbOrpbQNCyT2vt7mgrzN2uSYswTMfGdF1cn7rOvthhj071woH36eQsbufDVWMfNxFH2fjAZOVxbN1pbMuzKCvO65N19rFTexyLHo46mUQiYeGZzShz+5F1J3HuLkxeXkW26AmoL2s39VmtFz3ssEeHHg6893QFAbkjPD25wsvL69uX159OdOjhaJqpCUMLJDkkTE7yG/iHE4lEOPDgqgO6QAsquSTcJg7Qw4EHVx1o/qUbKBg5beKgqpkUXnhaBwb9TMtVXVH2G6VI9HDgwZ04qFpT2k+6o1kE0mHCgffv4I858NpF3u+B95vs/Vvk/Wvq/T3w/6JN4U329lfxBj8XSHroPnPiAAAAAElFTkSuQmCC");
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
            'splitPane-vertical': function(params) {
                var commonVerticalStyle = 'cursor:row-resize;cursor:ns-resize;z-index:200;overflow:hidden;';
                
                return params.handleWidth == 1 ?
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
                
            },
            
            'splitPane-horizontal': function(params) {
                var commonHorizontalStyle = 'cursor:col-resize;cursor:ew-resize;z-index:200;overflow:hidden;';
                
                return params.handleWidth == 1 ?
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
                
            }
        }
    });

    uki.theme.airport.backgrounds['button-disabled'] = uki.theme.airport.backgrounds['button-normal'];
    uki.theme.airport.backgrounds['input-focus'] = uki.theme.airport.backgrounds['button-focus'];
    uki.theme.airport.backgrounds['popup-shadow'] = uki.theme.airport.backgrounds['shadow-medium'];
    uki.theme.airport.backgrounds['toolbar-popup'] = uki.theme.airport.backgrounds['popup-normal'];
    uki.theme.airport.backgrounds['toolbar-popup-shadow'] = uki.theme.airport.backgrounds['shadow-medium'];

    uki.theme.register(uki.theme.airport);
})();
