(function() {
    function u(url) {
        return uki.theme.airport.imagePath + url;
    }
    
    uki.theme.airport = {
        imagePath: '/app/theme/airport/i/',
        
        background: function(name, params) {
            return this.backgrounds[name] && this.backgrounds[name](params);
        },
    
        image: function(name, params) {
            return this.images[name] && this.images[name](params);
        },
        
        backgrounds: {
            'button-normal': function() {
                var prefix = "button/normal-";
                return new uki.background.Sliced9({
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAS0lEQVQIW2NgAILy8vL/yJgBJrh+/fr/MABigyVBxN9//1EwXGLGrDn/j5++9P/G7Qf/t+/YBZEA6k5LTU39j4xBYmB7QAxkDBIDALKrX9FN99pwAAAAAElFTkSuQmCC", u(prefix + "c.gif")],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAATCAYAAACz13xgAAAAT0lEQVQYlZXPMQ6AQAhE0b9m78zZFca1sdEwxZLQ8MIQiIh1XuvTEbEmQOnmXxNAVT2UB5komY1MA5KNys3jHlyUtv+wNzhGDwMDzfyFRh7wcj5EWWRJUgAAAABJRU5ErkJggg=="],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAGCAYAAADqkEEaAAAAMklEQVRIie3DUQ0AIAxDwZodFmaVhB+MjIeQ9pJTd5OeRdjSPEjP2ueSnlVVpGcBKz1/kUWrDOOOWIQAAAAASUVORK5CYII=", u(prefix + "h.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAATCAYAAAC5i9IyAAAAXklEQVQYGe3BgRHDMAACsXeP/fdtDUkHAUnf3/syleQ8TCfFZjrJNtNJdphOSsx00r1mOikJ00nJZTrJDtNJdphOci7TSXGYTkrMdJIdppP4HKaTDofpJA5TSnCYTn/FLC2twbqbSQAAAABJRU5ErkJggg=="]
                }, '3 3 3 3');
            },
            'button-hover': function() {
                var prefix = "button/hover-";
                return new uki.background.Sliced9({
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAS0lEQVQIW2NgAILy8vL/yJgBJrh+/fr/MABigyVBxN9//1EwXGL+wqX/b9579v/Ji3f/9+w9AJEA6m5ITU39j4xBYmB7QAxkDBIDAN/zYPRpDtd1AAAAAElFTkSuQmCC", u(prefix + "c.gif")],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAATCAYAAACz13xgAAAAT0lEQVQY062PMQ7AIAwDj8Kf83gw7tKlhQxItZTp5EtCRLh3vyYi3AA0J980gJmBoayh31S290DS4Q4pUzlTjdOr0j9KLXvAanrAWuAiyQ2Hqz+Eaxa7lwAAAABJRU5ErkJggg=="],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAGCAYAAADqkEEaAAAAM0lEQVRIS+3DsREAIAwDMS+bGdIyLAUVG4RnEFt3UneTnkXY0jxIz9rnkp5VVaRnASs9f4uJy0upJnsYAAAAAElFTkSuQmCC", u(prefix + "h.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAATCAYAAAC5i9IyAAAAXElEQVQYGe3BgRHAMAABQLnaf+EEHYR/3ptgKlE2phNtYzrxyZhOtIzpRNuYTnwyphOTYDpREqYTbWM6UQqmExVhOtHPmE5MgunEJ2M68XwH04kIphRxMKWIqfUDGFEu5jKnhiUAAAAASUVORK5CYII="]
                }, "3 3 3 3");
            },

            'button-down': function() {
                var prefix = "button/down-";
                return new uki.background.Sliced9({
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAR0lEQVQIW2NgAIKGhob/yJgBJlhQUPg/JTUDjEFssCSIyC8o+l9b1wjGIDZcoq9v4v9tO/aDMYiNYhyGHSDw////NGQMEgMAouBOxXrB3FIAAAAASUVORK5CYII=", u(prefix + "c.gif")],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAATCAYAAACz13xgAAAAkUlEQVQYV42Nuw4CMQwEHT9ojvvnNPTQ8LfIeH3BmKuwNMomI294zulz3vz+eCbIeGOK2a4b7fueIGNSmF1IRBPkEqxMYpIgl1A2UllE/m5IbCyQS4hEjS4iN6FHXYDcBCokkV7FrYp7lcXFVA+6oME0xkiQS3weS9YGj19q48QfVbQ+zY+b4BMlXu7kcfrKmDdNVhnN3VjMVQAAAABJRU5ErkJggg=="],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAGCAYAAADqkEEaAAAARklEQVQYGe3BsQ2AQAwDQNvD0oCYIQ0UbIVExVDxDxLfsaqMGIn7cVoSYpbuBq/7sSTELN0Nvt9vgohZDINVZcRItL0hRloovBiO+VNuegAAAABJRU5ErkJggg==", u(prefix + "h.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAATCAYAAAC5i9IyAAAAa0lEQVQYGe3BsREDQQwDseWJF/n7n3lH7lQuhAT8fn8rUWF2wc/zQRKVZXexfalMnjtUJnsulckzQ2XyeKhM9lwqk2eGyuTxUJl8bSqTpUNlsiQqkzmiMllUKkuiMhkdKpMPlcoLSKKy7C5/du0Mt289U6QAAAAASUVORK5CYII="]
                }, "3 3 3 3");
            },
            
            'button-focus': function() {
                // FIXME: bg in IE6 is ugly
                if (uki.image.needAlphaFix) return new uki.background.CssBox('border:2px solid #7594D2;', { inset: '0 0 2 0', zIndex: 2 } );
                
                var prefix = "button/focusRing-";
                return new uki.background.Sliced9({
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAhklEQVQYlWNgQABGBof9LNqhq9hAGMQGi6GA0FXMKp7b2NX9jvCqJB4SBWEwGygGkoObBBJQSNgvoJN4UFYn7oQeGAPZIDGwYrDJQCtAukESuvEnjHUTT/iDMZANEgPJgZ0Bcg/IKpApIAV6CSerQBjEBomB5MBuJloh0VYT7xkSgoeoAAcAxGdrJQ8c5mIAAAAASUVORK5CYII="],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAYAAAD5Jg1dAAAAm0lEQVQoU2OQCT3GqR13RE43/qidXsKJLAYoALFBYiA5kBoG8did3JoJJ1R14k966yScrIcpBLFBYiA5kBoGdb8jvDqxxzX1Ek+E6CYe74MpBLFBYiA5kBoGpdDd/JqxR3X0Ek9GAvE0mEIQGyQGkgOpASvUiTuhpxt/PFo38cQMhIknZoDEQHKjCkcV4lZIVDIjOuESnRWIzVwAIp4VOOXTSVIAAAAASUVORK5CYII="],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIMAAAAKCAYAAACXIu12AAAAtElEQVRYR+2YMQoCMRBF04qIpY1YCCLBSY7gBQQrtxDJJmm9hDfYUryK2O6a5FbuaCPkCPM/vCrl+zCZUcvmPVm453R77Gfr5jUHsmDv7J97oHZtv9Ihb8glrd1A1GYLZPD1zd5H/9wDZfywJ18ONuaTjeVsfLoAGbBv9s7+uQfKhnylUG4mpm58vJuYH0AGP9+pY//cA4UgCFIHY0Iu1ZjAB1Iu1QcSq6VcqtUSRyfZ/B+dPnYNgLXrgMj6AAAAAElFTkSuQmCC"]
                }, "5 5 5 5", { inset: '-4 -4 -3 -4', zIndex: 2 });
            },
            
            'panel': function() {
                var prefix = "panel/dark-";
                return new uki.background.Sliced9({
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAABtCAYAAACC/xDRAAAAZklEQVRIx+3UwQ3AIAgF0E/jjaW6rY7TTeyNG3QBOJi0sRr+9SV80USqtRmckIi4UHq/4YKIuHAgSAjFzKaNmlq+/ah/li8G8YKq+nnH+B7RqbZ/qISE/ABWu8SEF4CY+XIBwImRPBYi1Esk9DsnAAAAAElFTkSuQmCC", u(prefix + "v.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAABtCAYAAACGCsDsAAAAYElEQVQ4y2NcvnzFfwYkwPj9+3cUAZb37z8woAgAVaAIMDGgAQwBlv///1NdC00MHbRa6GPoAAlgOuzfv38Um0HYHei2DNoAGhX4P5pwB9xzw1qAkZub+wKKABA7MOADAEid1EugsXRPAAAAAElFTkSuQmCC", u(prefix + "m.gif")]
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
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAASCAYAAAB4gjqpAAAAUUlEQVQYGe3BwRFAMBAAwItJIVTAR0taSE9eVHiKOA9jdjcCAAAAAAAAgJ9rY4wMgKK+bnsAVPV5XgKgagqAF/T7OgOgqmXmEQAAAAAAAHzTAx6DCNiUJps4AAAAAElFTkSuQmCC", u(prefix + "m.gif")] 
                }, "0 3 0 3", {fixedSize: '0 18'});            
            },
            list: function(rowHeight) {
                return new uki.background.Rows(rowHeight, '#EDF3FE');
            }
        },
    
        images: {
            checkbox: function() {
                return uki.image(u("checkbox/checkbox.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAABICAYAAAD726XGAAAD4klEQVRYw+2X7U9TZxjG+RP2J+xPMNu3fTImy/Zty/ziF5XpnCFUgSCKhSFIGxB505XW8BLBYoctWS0qUDoEWahueMZLIMVadVrBoNUqttDSlmvnPuwUHs4pnIcPS4xr8kvOuZ/nunLOc9I795WVtcPfp7t2ffLZF3vKFQsuYQE8HD1Vjb0Hddj99XfZaROH9ymI1VVoosPWjWNlDdDXtWNvtu7btNHVIT/iiZQmbo94ceSEAefbe1FvHQDzWpf7JxGJJSUePgmmrzczMePH4fwzqLR0o7l7GK03Bdao2fUHwtEEhr0CvvpmH+5PzUr3GwkuhPFDXilK66+goXMAk/4gSMcYmewjeLUYx4XmThwqKMchXTGezL+WajL5egMKDWbUdfTh1p1xqUY6xojedT4cw6P5MOranMiv+BlH8vTwB0NSvfpCC3JO1+Bc2w2YuzxSjVCcUXVrD56GliXGfEEYLQ7klpzH4eOn0el04+CxEpw128Wn6ZXW5b2kY4wqxU2BhaU0nns+lF+0Ia+sEUeLjCit60BNWw+cgwKzj3SM0U/iAfrmIwy2Xi8M4pMZxS9U3XIdli63Yg/pGKNTVc2YCr5X0PRLv3guLhgvOTAWCCnWSccYFVRchPD3ogLvg5eoslzDr0MTquukY4xy9TW49+gtN6RjjH4sPAtiZi6iGVnDGAH4PFunBy+kU7QRKvKS9WH8RoVp8KIwGRy9DyKVWtWMrGGM+oa8SKZS3JCObfz9t5FIJrkhHWNkd/VhJZHghnSMUafDtSMj0jFGrdZriK+scEM6xsjSdgWxeJwb0jFGjeYWLMXi3JCOMTpXb0J0OcYN6dieXVWLyNIyN6RjjEorjHgfXeKGdIxRkb4Mi5EoN6RjjPIKi0HwfHpZo2hqObp88PKxdUjeGZJQmPDOkISsYYx4ZsiNkC7jDMkD6VRnSF4yzpC8ZJwhedlyhuRh2xlSK5pmSC1oniG3Q/MMuR3/z5AfWof8b1J2IABNNDZtkbIfh5OacAxsk7J9r5ISd6aD6evNuP/04/t/U7bZkSFlj79IoOs3AV+KKbvHOyvdb2Q0EEb28fWU7R7PkLKFuRUYTGsp+0BuMX73v5FqMjknjemUbfOMSzXVDnn3WRzD/reoallL2RSIB32vpXpJ7XrKbrR5pBqh2iGHH8clro89FxvWWsreL/4NGkShnLLpgGld3qvaIQcCy2msQ7OqKbu1V2D2qXbIG74og8l5l0nZteJrbN6j2iGdMxEFNVa3lLIrRUP7XyHFumqH7JqMKLCOhVDeZIfp1pTqumqHtE684yZjh/Q8jGrmI+qQ/wDkGIxnXnqcLwAAAABJRU5ErkJggg==", true);
            },
            'checkbox-focus': function() {
                return uki.image(u("checkbox/focus.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAABaUlEQVRIie2Vv0rEQBCHI4oiItqIjYrIiYTbpLEXWxHOxhQiuWRbH8FG8AGuPGxt7wEEsTiUO7P7FD6KzjcBDwMWGhYbA9PMzu/bnT/ZjaLZNxcdjxe62WhxK3td3swfVw56k9W97GntO2OdOOLRoVfOly8bzXdOHpYI7tiXjW5/shOXbt/kVRznU2P6Lm2a+lmXOOLRqV448D5PjGO3HK8b+7yNMCmmR6bwp6l156n1F0lRXTYNP+vEaTybih6ObqAZSCrsyEJSuMPEurO0dFem9DeJrQYCGYrvrmm1vxoQRzw69HDgaYmoFSnpiRXsr2/v395/aujQw9HS0gNthtSM1DjBb8CzDSQD4cCDG9FtbZ7UjhTbwNHDgQc30npL12kONWwDr3skTRae1p15Zazq7vthq7KIHg48uAqvx09GTKag3cllkoQD7x/+h/Bg0xJ0zoP+oUHvlqC3YtD7POxLFPgNDfb6fwDIy0h6mZaKfgAAAABJRU5ErkJggg==", true);
            },
            'slider-handle': function() {
                return uki.image(u("slider/handle.gif"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAkCAYAAACwlKv7AAABcUlEQVQ4T7WSy0sCYRRH758b0aKFCwmjB1kwlGEIJQiVvRe6iajIVpGbJArKjWK0GCgq7DE2muJt7kf3cmeaBlz0wVl8Z34Dw3AAvLNbqmIUtIHNo2sk/jr8HNb2K/jV60dCG8gVy9jq9IThsXmDdrQxw2arKySzRYN2mcIpQma7hE/vHYHuYQ5SG8doN9sC3cMcWKsHeP/sCnQPc5BcKWDtoSXwN/qct4GZzA5WbUcgSWhHG5hczP+SwZdpAwkrhxeNN2EivWXQjjYQn13Gcu1VSKTWDdrRBmJTS/6h9zahHW1gdHwBT25fIqENjMTnkND/TcPPTWpDsWmMAgY+AxXedZxQfIXffWIkUriWXLh2UvjlIwpcj3ZSuE/+FB50pvAzGwUuPOhM4aVGX+DCg84UfljvCvyNPseFF6oocOHaSeF7N22BC9dOCs9fuQIXrp0Unq24AheunRSeLjsCF66dFG6df0TiK7xid0L5v8K/AYNKQJdGv2S4AAAAAElFTkSuQmCC");
            },
            'slider-focus': function() {
                return uki.image(u("slider/focus.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAZCAYAAAA8CX6UAAABUUlEQVQ4y+2VsUoDQRCGVxRFRLQRGxUJETmyd4292IoQm1wRwuVuWx/BxjewDHmGPIAgFkFJvL23cr45MVhli20EFxaW2f//b+afvV1jVmPD3My3evls+yT/3D0uXvcu+4v9Tv52wGRNjD0wYJXza+Szze7tyw7grvs46o0XZ0nlL2xRJ0mxtExdS4w9MIoVDtyfTAicV/ND695P7dhnabm8tmVzlzk/yFwzbKcfENM9wYCFo2KamaSIOhtp6a9S5++zyj/YqnlKXf0sIhMma2LsgQELB66WSb2kqpmoSPNo1gwwYOGoFXim5kndpMzXTODQzIQDFw1DJ9RYqZ/UQ4XAwoGLhlF/pCOYiQ+hQq1/0gDhqk+cEdr73Z1JcGltE4Zw0VChtuX1SAychmfkp3Dg/gv9aaEo5yjayY72r0X7+6PdR9FuyHh3dsRXJMq79gUgPopCCBOTpwAAAABJRU5ErkJggg==", true);
            },
            x: function() {
                return uki.image(u("x.gif"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII="); 
            },
            'splitPane-horizontal': function() {
                return uki.image(u("splitPane/horizontal.gif"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAFUlEQVQIW2MoLy//zwAEYJq6HGQAAJuVIXm0sEPnAAAAAElFTkSuQmCC");
            },
            'splitPane-vertical': function() {
                return uki.image(u("splitPane/vertical.gif"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAADCAYAAABfwxXFAAAAE0lEQVQIHWMsLy//z0AOYMSnEwAIngTLoazFLgAAAABJRU5ErkJggg==");
            }
        }
    };

    uki.theme.airport.backgrounds['button-disabled'] = uki.theme.airport.backgrounds['button-normal'];
    uki.theme.airport.backgrounds['input-focus'] = uki.theme.airport.backgrounds['button-focus'];

    uki.theme.register(uki.theme.airport);
})();
