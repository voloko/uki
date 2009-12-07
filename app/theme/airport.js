(function() {
    function u(url) {
        return uki.theme.airport.imagePath + url;
    }
    
    uki.theme.airport = {
        imagePath: '/app/theme/airport/i/',
        
        background: function(name) {
            return this.backgrounds[name] && this.backgrounds[name]();
        },
    
        image: function(name) {
            return this.images[name] && this.images[name]();
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
            }
        },
    
        images: {
            checkbox: function() {
                return uki.image(u("checkbox/checkbox.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAABICAYAAAD726XGAAAFEUlEQVRYCe1Y/09bVRT/QB8t30fH2tJBsaNC6cbXUhSBqNNk/iDRH3R/gL8Z4xKN2U+L0URdspjGTDZiiAqyLTPOEU0MkR9mMJM5J2CIM6BDxpYlOGMGAzLa19J6z23v6yuvlNfG7Af1Npd737nnfN4559573jkAWTZnS0uZt/OJN4W4JCZfTt6OirmeceSzAfz1xy2UlpYtjH09PMiBzl26EZWDATzXUa0HA6c+PQ+jyQR3kw+//jyxTEIcSA4G8Xy3C6GNyLZA49//gO+mZlHX4IXBIOHo4IkvVEDrDCRm2eLiIux2e0rAud/ncWZ4FE53I3YUFyI3v0Thy6VZiJlFQBNT03j5lcOY/W2OPxNN9KW7qzjRPwR7tQvFJaV4uMmFyEY4GYhMCzOzpq/OoLKmHn39g1i+u8JpRKfuP34SOyy7YS63oM5hwe4KK0hONK4ROZre3NPzNPY1NKPUUomjx/wgLYj+0cAQglEjrHYHCkwSWps8nE5yoiUBScZ8PNrpg8VaAWOxGcfe9eObsW8xM7cAu8MJSTKgvbleMVcNxHctJMc0InTzznI81NqA8VAIS4Y8XLw0AYezDvmmfNRU2fg6aUmN5ESLbX+AgBJbX1XtQN2dJczn5SGH/QyShJIiE+o97iQ+mcmJFj9HCY3EQkNjI/PRCtbusY0IyfD5urlJYp1GtWkxH8VNE1stxlavFxG25nHXIlcyKr4R67LGNL5rCdPEW0l4/4Gn+KPadLGu0YgO5Md976Mkn/lCZyd+khMthybRaLTthUNHJgRR7zjQ+44vJydnkvg5EE0IjMZMmgDJROb+8SqmjU9ezShCkopdbQ2KPJ9cGJ/gII93eHWbMHZ5ivM+2eXjGPEDKeOxjlZEM/gRvyzLyouVK8J2TSHqnagPJAcKsgCVDRDJiaaYJgiZjBrTAiwcZKMRyYnGTQvJ2ZlGcqIpPopk7muofRQDCmSnUZDJicaBaBuz8ZF2+7P0UTCVj7LRSO2j+HdNxutvvAWTMU93J345mLgi/MIxbdpeOvRqxhGyr/e9/1SEzDSHpIP4bJstOUJSDkkLenNI4j1/+SYNONj5gCpCsrjyTHsVTxDoi6qnE7860YpfkUQOyV+j848cXFc4OZDIIRWqzon6kx3XKJZD6pRX2FKYps2PFO40E83tJ4JI59LIaZY0QOocUsOdhrBtDplGNmlJVw6ZJLHFg8Y0ygWz8pHeHHILRRSyWiMeIf/PIRXf/KOT+1Nlt1r1Vdlfjaapsh9pqWGmb2xr/uSPV/DL9TRVdjBe5/55exFWmz0l4M3r8xgZGUUNq7KLigphLEhRZQfCUUxPT+PtI4dx7doc6Fnd77D69uzpIVTGq2zXg1tU2RGWac3NzsDBquzPzwxibXUVRBP9dH8fyq2xKttms2CX1ZYU/ONJRAAyq1O7D/Sgdm8zdlor8WGvH8srq5w+fPYTgNW3VGUb8iTsce/ldPVdUxIt7iOpAJ6WdlZ6hnnhO3jSD2/nfty6sQCXpxm5BgOctR4If2qAKNLJkVgFWWguh9PTiI1wCBLTYvanK0qVbWbm0LrgTRkhg6FEKVpW4cCu5SVIqio7l/1PwLanHmq+lBEyvCmtraxrxL21FURJW1Zz1OzzYjOP2rSYsxkz2b252+vbsM4yV3O1GxFDvmY9dZUdTXGqmWmurniVnWJdrZHyyb546jgOvvhayhOdinjuA38SWckh/31V9t9oh2teM10PhAAAAABJRU5ErkJggg==", true);
            },
            'checkbox-focus': function() {
                return uki.image(u("checkbox/focus.png"), null, true);
            },
            'slider-handle': function() {
                return uki.image(u("slider/handle.gif"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAkCAYAAACwlKv7AAABt0lEQVQ4Ea1TsUoDQRCdk3QiaG0haCeY5uwiChqwsLGKgo2ljRA0KWwUbSwSJaCFWAkqaCk2CloIlqbQws5G/AQl3u3enbtzmdkJXgrBhdu9fXm8eTfz4oFZF3eviT27rcXiqOed3TwjaWk2n8k7v31BvEcrBaXiGKgoyXzsb5aT0yo0hJjVqtsNfK9tlRmznJzWCkLtLA4ODSNBYpaDRC0Ue/v6kSixlGjqh8YfrThSqaLAnEdRWmuNRCUx8ig/Jo7aRGGHPdrW0IpIUWDsUSpGWYrUR9kKUpQY97GjNCs6O9ml2aObVtoeOxlhfHpu/ncfcTKmR1enx1CtuNlSB+xZqzfw6pndX6nsPOGty3ZU3xy3RLv89Oi6N5H4p4QvTIxkyl0+viFugqtgasaHj0waQGEyDw/3TUq4YzV29/BS3lhnkCfz2WIMKOES4/SAmxZQwiXGI/xKI4iylHCJccKDwElSwjswTngcsUlOuMDYY0uUpjxKjD0q7RQ54QJzHsU/jhQDgXEfZRlSlBiX/g5F6XbCJcYJDxLXnoFCCTsgsbZiCO/Xh7C8usYtki8nB/t4/f+E/wAFeJBBTsTmngAAAABJRU5ErkJggg==");
            },
            'slider-focus': function() {
                return uki.image(u("slider/focus.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAZCAYAAAA8CX6UAAACcElEQVQ4Ee2VsW4TQRCGZ2ZvfT5hJ0GWAckpI1FEoqWFEnqoeQ4egOeghp6WtLRIFEgpkwKsKE7syHc+7wzz7wmBhCKfBCVXXHE3/7+zM7vfMP16mJ58DMfTuVzRYWiHSzm4uiNtuRaExKbSxf6Nxnqs+3SWvsynSidPk/8y/Ge86MW7cLQaFSHuDdJEh2WSSqUoQ7IikQaEBJKUAm9Ft00TdB0upE7t9eZ0tNrS+5ep8BiGyfZ+VQ05jWMq7zKnAzYeS0GVUBFh5Au3pLxm5uUwDRY0aS4bq5ZH32h9SqQFthNiHMCEtbznSx+yhZnnOzWyfSYeZhuympivmMKchM5JyziShtq4l9wjFahJM3owRCadCR9/fvv4TU7iltejV59em/hSqWzTZFMfl/MmFxY16bZDs10m8EYMG82ggRbNEXQHhTUqxko8vSWJPz4jNmtcC4/cYnRHxDwr72zPB7HQQItjks9J12KOTJIL28eri+UILc4a2k+Bg5iqkHA+fH2MvKNCagIt4nsLd5n/N9pVoX9d7GRJWUT9gurutbsIxEIDLb4IgAXWABNGWvc16mKthRYeAuoBWOqsMfM73PNBLDTQwkOATlCPabsUsnlPHz/JNs8a12YP8BfoNAsLYzoHa3aZZR55LDTQwgPALx7uxSpOHK8gpICQNAMmcMN/XmTUBNtBJliQlM5Mmu/tRVh8vW7XBSZBevZhA/4CnaAecbok55PzufLsMrO9S60ZrY3S0jQsKDSXK9Nl0d5s6OR5hr9hEgDi4C/Q6dRbqFhJW0yR9NsUIZ8i5lNk41Mk1DDJU8Rb3o2jrih/Ndd+AJ3fdQr5HjWnAAAAAElFTkSuQmCC", true);
            },
            x: function() {
                return uki.image(u("x.gif"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII="); 
            },
            'splitPane-horizontal': function() {
                return uki.image(u("splitPane/horizontal.gif"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAIElEQVQIHWNgYGDYDMQgsJkJQkNIijkM////9waZBaIBtioIA2DTJqsAAAAASUVORK5CYII=");
            },
            'splitPane-vertical': function() {
                return uki.image(u("splitPane/vertical.gif"));
            }
        }
    };

    uki.theme.airport.backgrounds['button-disabled'] = uki.theme.airport.backgrounds['button-normal'];
    uki.theme.airport.backgrounds['input-focus'] = uki.theme.airport.backgrounds['button-focus'];

    uki.theme.register(uki.theme.airport);
})();
