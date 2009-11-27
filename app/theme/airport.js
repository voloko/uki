uki.theme.airport = {
    imagePath: '/app/theme/airport/i/',
    
    backgrounds: {
        'button-normal': function() {
            var prefix = 'button/button-normal-';
            return new uki.background.Sliced9({
                tl: [prefix + "tl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAI0lEQVQIHWNkAILy8vL/IBrMWL9+/X8QYAIJ+PkHMPwDygEACuEOvgzZwtUAAAAASUVORK5CYII="],
                t: [prefix + "t.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAADCAYAAAC6XdCpAAAAJElEQVQ4EWMsLy//zzAKRmQIMP4HghHp81FPM7D8G436EZsMABS/CGTpScWfAAAAAElFTkSuQmCC"],
                tr: [prefix + "tr.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJ0lEQVQIHWMoLy//D8IMQMD4Hwg2bNjAcOLECQamf0AxP/8AkAQDAG1+EBoUm0vIAAAAAElFTkSuQmCC"],
                l: [prefix + "l.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAATCAYAAABV/rckAAAATUlEQVQIHVWPAQrAMAgD07E/+/atybqtLRgF0cNEERExrnvMPPEF9fwFE0QmsIJyIpmsdwOpyHp6SJtUkMnksnKneHC0XN1gsPv1Dza9+/wz/jEYkbkAAAAASUVORK5CYII="],
                m: [prefix + "m.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAATCAYAAAC5i9IyAAAAgklEQVRoBe2YgRHDMAjEcO7337c11HXmkLyBEP4D1ud7TvmQFUjPDwkudFWm2zpAK5BWPlT9/fndg4Wng2fG2Kc2QfZWPlb+jLEPlr+p7HhuBz5wCygfLX+Mfar/e+Fz4OPKd8+nuvfChzV/wVPPIvOj2bNK+dQOiO6p6t/Y1z7W/h9T1y2qrqwbKgAAAABJRU5ErkJggg=="],
                r: [prefix + "r.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAATCAYAAABV/rckAAAATUlEQVQIHVWNQQ6AQAwCqemjvei/tcV118SUcmICtHbdY2DqPHZ48ln+kzPz9zPpwEpIqUUIkK0WtcmUpAOlRq21P22Dzeq0QUA8HEIvHfQvHQLmwd4AAAAASUVORK5CYII="],
                bl: [prefix + "bl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJUlEQVQIHWMsLy//r6isyqBvaMbA+P///zQgmMkABIwgAiQAogH/dgv4rcLipAAAAABJRU5ErkJggg=="],
                b: [prefix + "b.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAADCAYAAAC6XdCpAAAAKklEQVQ4EWO8cfvBf4ZRMCJDgDE1NXU08kdk1DMwMP7//z9thPp9xHsbAK+MCSe0brvgAAAAAElFTkSuQmCC"],
                br: [prefix + "br.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJklEQVQIHWO8cfvB//t3bzEc2L+XgSE1NfU/CANBGgOIADMYGBgA5UkW64OIAYYAAAAASUVORK5CYII="]
            });
        },
        'button-hover': function() {
            var prefix = 'button/button-hover-';
            return new uki.background.Sliced9({
                tl: [prefix + "tl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAI0lEQVQIHWNkAILy8vL/IBrMWL9+/X8QYAIJ+PkHMPwDygEACuEOvgzZwtUAAAAASUVORK5CYII="],
                t: [prefix + "t.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAADCAYAAAC6XdCpAAAAJElEQVQ4EWMsLy//zzAKRmQIMP4HghHp81FPM7D8G436EZsMABS/CGTpScWfAAAAAElFTkSuQmCC"],
                tr: [prefix + "tr.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJ0lEQVQIHWMoLy//D8IMQMD4Hwg2bNjAcOLECQamf0AxP/8AkAQDAG1+EBoUm0vIAAAAAElFTkSuQmCC"],
                l: [prefix + "l.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAATCAYAAABV/rckAAAAT0lEQVQIHXWPUQ6AMAhDO/XOHH4rVYcJ8CEJLE2bx4CZaU7tvvAU3d8HW3gVi9Vp4jcmKWkkUzQ0WWOqsVWWNlr7zjhHohGwOAFh4Nj+N25BdzU4+x8dPwAAAABJRU5ErkJggg=="],
                m: [prefix + "m.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAATCAYAAAC5i9IyAAAAfklEQVRoBe2YgRUAMQTF9O7vv3CPXvdIbBDBw9r7nDKQGUjPIMGFrsooH1sH+drOp9rPKJ/q3rGPNX/BHftg+zleelj96W4sPB3cUw9cAbfzffBR/aePYx8rfz6fPFj5bvtU9d75XPOXPOtd6ASQ4VMu+1j/KRsfK//BkgteP6LzLuGN4udFAAAAAElFTkSuQmCC"],
                r: [prefix + "r.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAATCAYAAABV/rckAAAAUklEQVQIHXWOQRLAIAgDQ8uje/DnGqlVR+DQnJJJZkFqNcNQKQ+UvX9+SnsMjbFJ4Xdmi7xoJDcYyGhyPrBnFmctHE209I7c4mg4DAovcJ3NMC9isjBRnyUFmgAAAABJRU5ErkJggg=="],
                bl: [prefix + "bl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJ0lEQVQIHWMsLy//r6Glx2Bl68jA+P///4a0tLR6BiBgBBEgARANAAc+DEvUgpQ6AAAAAElFTkSuQmCC"],
                b: [prefix + "b.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAADCAYAAAC6XdCpAAAAKklEQVQ4EWN88uLdf4ZRMCJDgDE1NXU08kdk1DMwMP7//79hhPp9xHsbAMs2CWh0DbO9AAAAAElFTkSuQmCC"],
                br: [prefix + "br.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAK0lEQVQIHWN88uLd/xtXLzHs3rWdgTE1NfU/AxDMmjWrkeH///8NIAwSAACsmxPeKc8quQAAAABJRU5ErkJggg=="]
            });
        },
        'button-down': function() {
            var prefix = 'button/button-down-';
            return new uki.background.Sliced9({
                tl: [prefix + "tl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAHElEQVQIHWNkAIKGhob/IJoRxPjw4SPDl6/fGQBl+QqyGaNjjQAAAABJRU5ErkJggg==", true],
                t:  [prefix + "t.png",  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAACCAYAAABxAQMMAAAAJUlEQVQoFWNsaGj4zzAKRmQIsLx+846BiYlpRHp+JHv6379/DACHrwhKT+bKvAAAAABJRU5ErkJggg=="],
                tr: [prefix + "tr.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAHklEQVQIHWNoaGj4D8IMQMCYkprxn4ebk0FAgJ8BAIF+B384jBW0AAAAAElFTkSuQmCC", true],
                l:  [prefix + "l.png",  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAUCAYAAABI+4ecAAAAfUlEQVQYGVWN3QrDMAhGP/9206Zr2AvnjTd6PzKNUlhA8PidKI0x5vtz4TieUPjr5wtn7+CAbd/QWkswe0BEE1gZYpKgbFCxSsQTr7VARCBaWnwOtRJXPF0Qza2Zg2ndATGIKLVobgATotYCbxGV8KfF3JfknVIWfOfE9MEPwjwLJWHYWMEAAAAASUVORK5CYII="],
                m:  [prefix + "m.png",  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAUCAYAAACkjuKKAAAApUlEQVRoBe3awQ3DMAxDUdqiT80x6MbtoUPbVYFu8ZkNqKcItqHxen/OnFP5WBXYe8v3/dQYrOBJK50j+boejR99WkOc1re9aLmT918B16oUA1oBtz40emK7Kn8+tQ1cDj4WP2OfSt9XvYx9Mn7GPlbfy8aGpwf3GHnXpzZB4+dpF4uvGXwsfuip9H3Vy9gH4ysHPqy+c9bH2su90JFlDqD/b5njCzGjD7gVMqRzAAAAAElFTkSuQmCC"],
                r:  [prefix + "r.png",  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAUCAYAAABI+4ecAAAAgUlEQVQYGVWNwQoCMQxEp5nEy1pRFj9XwU92ryI1042ghTZ9yeu03e6PsW1PXM4n+LpeQXMAL1jvHctxSQCMdEQcCoIwtx2cAbeoCS3dmtAJkqWlohAty7iEH02NOQnPf77QWgNaaYLZUAAsJ9oClf0q+NPm49KUs2dlHQnvoRP4AJvlDAI3hV/6AAAAAElFTkSuQmCC"],
                bl: [prefix + "bl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJElEQVQIHWNsaGj4z8cnyKChpcfAyAAEIAEQDeb8//8/DcQBALXtCRI9QRqeAAAAAElFTkSuQmCC", true],
                b:  [prefix + "b.png",  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAADCAYAAAC6XdCpAAAAMklEQVQ4EWM8eOTUf0YGRoZRMLJC4D/DfwaW/Xu2jSxfj/oWHgKM////T4PzRhkjKgQAMqUK6ddH5FYAAAAASUVORK5CYII=", true],
                br: [prefix + "br.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAKklEQVQIHWPctmP//xvXLjF8+vSegeXUiYMMINDQ0MDI8P///zQQBgkAAKPHEx/Del6kAAAAAElFTkSuQmCC", true]
            });
        },
        'panel': function() {
            var prefix = 'panel/panel-';
            return new uki.background.Sliced9({
                t: [prefix + "t.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAIElEQVQIHWNcvnzFfwYiAOP379+JUsjy/v0HIsxjYAAACIoJrr/y//YAAAAASUVORK5CYII="],
                m: [prefix + "m.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAABnCAYAAAA5WNM5AAAAkklEQVRYCe2XSwqAMAxEq3j/G9ajtIKYXQhvMVLEcVNoh3xehoBb7+ds4NuB5pZg4TEnytxwRCzUp9ZHXNiMU5dm189aH3HhCHEzFpY24yMcY5SR4lEPnNdIlz2vkXa9skZ9144Ybs5O7h5zzPjFnTkGifT8Jx6+SOlq1nPkNXoBpNZ+LvFkMHALK94v/OR+AfgFT2rKGho++KkAAAAASUVORK5CYII="],
                b: [prefix + "b.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAGElEQVQIHWPk5ua+wEAEYASqcSBCHfFKAIURATRo4K6PAAAAAElFTkSuQmCC", true]
            });
        },
        'input': function() {
            return new uki.background.CssBox(
               // '0 2 3 0',
               '0 0 1 0',
               'background:white;border: 1px solid #787878;border-top-color:#555;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;-moz-box-shadow:0 1px 0 rgba(255, 255, 255, 0.4);-webkit-box-shadow:0 1px 0 rgba(255, 255, 255, 0.4);box-shadow:0 1px 0 rgba(255, 255, 255, 0.4)'
           );
        },
        'slider-bar': function() {
            return new uki.background.Sliced9({
                l: ["slider/slider-l.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAASCAYAAACeomSBAAAARUlEQVQIHWNgoBlgBJlcXl7+H0Qzghi8vPwMSspqDCwgEStrewYODg4GJhDn1s2rIIqB8f///2kVFRUzwRwQARIA0RQDANoaEYLb6jseAAAAAElFTkSuQmCC", true],
                m: ["slider/slider-m.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAASCAYAAAB4gjqpAAAAoUlEQVR4Ae3QwQ2AIBBFQTEUghXoxZZsgZ48aYXYgwl7gNkC9ufNsjgCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQGFwg1Vrb4I3yCBAIEMj7cQbMmCBAYHSBXMo2eqM+AgQCBNaADRMECEwgkN/nniBTIgECvQVSa+3qPeI/AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAT4EPHoMI2ACr+GgAAAAASUVORK5CYII=", true],
                r: ["slider/slider-r.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAASCAYAAACeomSBAAAATElEQVQIHWNgoB0oLy//D8IgGxiXLV/z/97dWwyfP39kYFJQUGSwsrYHW80EIm/dvArmMIuICDZ8+PCeoaOjI53h////aSAMlqKUAADcsR0fYYxvcwAAAABJRU5ErkJggg==", true]
            }, new uki.geometry.Size(0, 18));
        }
    },
    
    images: {
        checkbox: function() {
            return uki.image("checkbox/checkbox.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAABICAYAAAD726XGAAAFEUlEQVRYCe1Y/09bVRT/QB8t30fH2tJBsaNC6cbXUhSBqNNk/iDRH3R/gL8Z4xKN2U+L0URdspjGTDZiiAqyLTPOEU0MkR9mMJM5J2CIM6BDxpYlOGMGAzLa19J6z23v6yuvlNfG7Af1Npd737nnfN4559573jkAWTZnS0uZt/OJN4W4JCZfTt6OirmeceSzAfz1xy2UlpYtjH09PMiBzl26EZWDATzXUa0HA6c+PQ+jyQR3kw+//jyxTEIcSA4G8Xy3C6GNyLZA49//gO+mZlHX4IXBIOHo4IkvVEDrDCRm2eLiIux2e0rAud/ncWZ4FE53I3YUFyI3v0Thy6VZiJlFQBNT03j5lcOY/W2OPxNN9KW7qzjRPwR7tQvFJaV4uMmFyEY4GYhMCzOzpq/OoLKmHn39g1i+u8JpRKfuP34SOyy7YS63oM5hwe4KK0hONK4ROZre3NPzNPY1NKPUUomjx/wgLYj+0cAQglEjrHYHCkwSWps8nE5yoiUBScZ8PNrpg8VaAWOxGcfe9eObsW8xM7cAu8MJSTKgvbleMVcNxHctJMc0InTzznI81NqA8VAIS4Y8XLw0AYezDvmmfNRU2fg6aUmN5ESLbX+AgBJbX1XtQN2dJczn5SGH/QyShJIiE+o97iQ+mcmJFj9HCY3EQkNjI/PRCtbusY0IyfD5urlJYp1GtWkxH8VNE1stxlavFxG25nHXIlcyKr4R67LGNL5rCdPEW0l4/4Gn+KPadLGu0YgO5Md976Mkn/lCZyd+khMthybRaLTthUNHJgRR7zjQ+44vJydnkvg5EE0IjMZMmgDJROb+8SqmjU9ezShCkopdbQ2KPJ9cGJ/gII93eHWbMHZ5ivM+2eXjGPEDKeOxjlZEM/gRvyzLyouVK8J2TSHqnagPJAcKsgCVDRDJiaaYJgiZjBrTAiwcZKMRyYnGTQvJ2ZlGcqIpPopk7muofRQDCmSnUZDJicaBaBuz8ZF2+7P0UTCVj7LRSO2j+HdNxutvvAWTMU93J345mLgi/MIxbdpeOvRqxhGyr/e9/1SEzDSHpIP4bJstOUJSDkkLenNI4j1/+SYNONj5gCpCsrjyTHsVTxDoi6qnE7860YpfkUQOyV+j848cXFc4OZDIIRWqzon6kx3XKJZD6pRX2FKYps2PFO40E83tJ4JI59LIaZY0QOocUsOdhrBtDplGNmlJVw6ZJLHFg8Y0ygWz8pHeHHILRRSyWiMeIf/PIRXf/KOT+1Nlt1r1Vdlfjaapsh9pqWGmb2xr/uSPV/DL9TRVdjBe5/55exFWmz0l4M3r8xgZGUUNq7KLigphLEhRZQfCUUxPT+PtI4dx7doc6Fnd77D69uzpIVTGq2zXg1tU2RGWac3NzsDBquzPzwxibXUVRBP9dH8fyq2xKttms2CX1ZYU/ONJRAAyq1O7D/Sgdm8zdlor8WGvH8srq5w+fPYTgNW3VGUb8iTsce/ldPVdUxIt7iOpAJ6WdlZ6hnnhO3jSD2/nfty6sQCXpxm5BgOctR4If2qAKNLJkVgFWWguh9PTiI1wCBLTYvanK0qVbWbm0LrgTRkhg6FEKVpW4cCu5SVIqio7l/1PwLanHmq+lBEyvCmtraxrxL21FURJW1Zz1OzzYjOP2rSYsxkz2b252+vbsM4yV3O1GxFDvmY9dZUdTXGqmWmurniVnWJdrZHyyb546jgOvvhayhOdinjuA38SWckh/31V9t9oh2teM10PhAAAAABJRU5ErkJggg==", true);
        },
        'slider-handle': function() {
            return uki.image("slider/slider-handle.gif", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAkCAYAAACwlKv7AAABt0lEQVQ4Ea1TsUoDQRCdk3QiaG0haCeY5uwiChqwsLGKgo2ljRA0KWwUbSwSJaCFWAkqaCk2CloIlqbQws5G/AQl3u3enbtzmdkJXgrBhdu9fXm8eTfz4oFZF3eviT27rcXiqOed3TwjaWk2n8k7v31BvEcrBaXiGKgoyXzsb5aT0yo0hJjVqtsNfK9tlRmznJzWCkLtLA4ODSNBYpaDRC0Ue/v6kSixlGjqh8YfrThSqaLAnEdRWmuNRCUx8ig/Jo7aRGGHPdrW0IpIUWDsUSpGWYrUR9kKUpQY97GjNCs6O9ml2aObVtoeOxlhfHpu/ncfcTKmR1enx1CtuNlSB+xZqzfw6pndX6nsPOGty3ZU3xy3RLv89Oi6N5H4p4QvTIxkyl0+viFugqtgasaHj0waQGEyDw/3TUq4YzV29/BS3lhnkCfz2WIMKOES4/SAmxZQwiXGI/xKI4iylHCJccKDwElSwjswTngcsUlOuMDYY0uUpjxKjD0q7RQ54QJzHsU/jhQDgXEfZRlSlBiX/g5F6XbCJcYJDxLXnoFCCTsgsbZiCO/Xh7C8usYtki8nB/t4/f+E/wAFeJBBTsTmngAAAABJRU5ErkJggg==");
        },
        x: function() {
            return uki.image("x-m.gif", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII="); 
        },
        'split-view-horizontal': function() {
            return uki.image("split-view/horizontal.gif", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAIElEQVQIHWNgYGDYDMQgsJkJQkNIijkM////9waZBaIBtioIA2DTJqsAAAAASUVORK5CYII=");
        }
    }
};

uki.theme.airport.backgrounds['button-disabled'] = uki.theme.airport.backgrounds['button-normal'];

uki.theme.register(uki.theme.airport);