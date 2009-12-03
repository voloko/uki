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
            return this.images[name] && this.images[name]()
        },
    
        backgrounds: {
            'button-normal': function() {
                var prefix = 'button/button-normal-';
                return new uki.background.Sliced9({
                    tl: [u(prefix + "tl.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAI0lEQVQIHWNkAILy8vL/IBrMWL9+/X8QYAIJ+PkHMPwDygEACuEOvgzZwtUAAAAASUVORK5CYII=", true],
                    t:  [u(prefix + "t.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAADCAYAAAC6XdCpAAAAJElEQVQ4EWMsLy//zzAKRmQIMP4HghHp81FPM7D8G436EZsMABS/CGTpScWfAAAAAElFTkSuQmCC"],
                    tr: [u(prefix + "tr.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJ0lEQVQIHWMoLy//D8IMQMD4Hwg2bNjAcOLECQamf0AxP/8AkAQDAG1+EBoUm0vIAAAAAElFTkSuQmCC", true],
                    l:  [u(prefix + "l.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAATCAYAAABV/rckAAAATUlEQVQIHVWPAQrAMAgD07E/+/atybqtLRgF0cNEERExrnvMPPEF9fwFE0QmsIJyIpmsdwOpyHp6SJtUkMnksnKneHC0XN1gsPv1Dza9+/wz/jEYkbkAAAAASUVORK5CYII="],
                    m:  [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAATCAYAAAC5i9IyAAAAgklEQVRoBe2YgRHDMAjEcO7337c11HXmkLyBEP4D1ud7TvmQFUjPDwkudFWm2zpAK5BWPlT9/fndg4Wng2fG2Kc2QfZWPlb+jLEPlr+p7HhuBz5wCygfLX+Mfar/e+Fz4OPKd8+nuvfChzV/wVPPIvOj2bNK+dQOiO6p6t/Y1z7W/h9T1y2qrqwbKgAAAABJRU5ErkJggg=="],
                    r:  [u(prefix + "r.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAATCAYAAABV/rckAAAATUlEQVQIHVWNQQ6AQAwCqemjvei/tcV118SUcmICtHbdY2DqPHZ48ln+kzPz9zPpwEpIqUUIkK0WtcmUpAOlRq21P22Dzeq0QUA8HEIvHfQvHQLmwd4AAAAASUVORK5CYII="],
                    bl: [u(prefix + "bl.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJUlEQVQIHWMsLy//r6isyqBvaMbA+P///zQgmMkABIwgAiQAogH/dgv4rcLipAAAAABJRU5ErkJggg==", true],
                    b:  [u(prefix + "b.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAADCAYAAAC6XdCpAAAAKklEQVQ4EWO8cfvBf4ZRMCJDgDE1NXU08kdk1DMwMP7//z9thPp9xHsbAK+MCSe0brvgAAAAAElFTkSuQmCC", true],
                    br: [u(prefix + "br.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJklEQVQIHWO8cfvB//t3bzEc2L+XgSE1NfU/CANBGgOIADMYGBgA5UkW64OIAYYAAAAASUVORK5CYII=", true]
                });
            },
            'button-hover': function() {
                var prefix = 'button/button-hover-';
                return new uki.background.Sliced9({
                    tl: [u(prefix + "tl.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAI0lEQVQIHWNkAILy8vL/IBrMWL9+/X8QYAIJ+PkHMPwDygEACuEOvgzZwtUAAAAASUVORK5CYII=", true],
                    t:  [u(prefix + "t.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAADCAYAAAC6XdCpAAAAJElEQVQ4EWMsLy//zzAKRmQIMP4HghHp81FPM7D8G436EZsMABS/CGTpScWfAAAAAElFTkSuQmCC"],
                    tr: [u(prefix + "tr.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJ0lEQVQIHWMoLy//D8IMQMD4Hwg2bNjAcOLECQamf0AxP/8AkAQDAG1+EBoUm0vIAAAAAElFTkSuQmCC", true],
                    l:  [u(prefix + "l.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAATCAYAAABV/rckAAAAT0lEQVQIHXWPUQ6AMAhDO/XOHH4rVYcJ8CEJLE2bx4CZaU7tvvAU3d8HW3gVi9Vp4jcmKWkkUzQ0WWOqsVWWNlr7zjhHohGwOAFh4Nj+N25BdzU4+x8dPwAAAABJRU5ErkJggg=="],
                    m:  [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAATCAYAAAC5i9IyAAAAfklEQVRoBe2YgRUAMQTF9O7vv3CPXvdIbBDBw9r7nDKQGUjPIMGFrsooH1sH+drOp9rPKJ/q3rGPNX/BHftg+zleelj96W4sPB3cUw9cAbfzffBR/aePYx8rfz6fPFj5bvtU9d75XPOXPOtd6ASQ4VMu+1j/KRsfK//BkgteP6LzLuGN4udFAAAAAElFTkSuQmCC"],
                    r:  [u(prefix + "r.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAATCAYAAABV/rckAAAAUklEQVQIHXWOQRLAIAgDQ8uje/DnGqlVR+DQnJJJZkFqNcNQKQ+UvX9+SnsMjbFJ4Xdmi7xoJDcYyGhyPrBnFmctHE209I7c4mg4DAovcJ3NMC9isjBRnyUFmgAAAABJRU5ErkJggg=="],
                    bl: [u(prefix + "bl.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJ0lEQVQIHWMsLy//r6Glx2Bl68jA+P///4a0tLR6BiBgBBEgARANAAc+DEvUgpQ6AAAAAElFTkSuQmCC", true],
                    b:  [u(prefix + "b.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAADCAYAAAC6XdCpAAAAKklEQVQ4EWN88uLdf4ZRMCJDgDE1NXU08kdk1DMwMP7//79hhPp9xHsbAMs2CWh0DbO9AAAAAElFTkSuQmCC", true],
                    br: [u(prefix + "br.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAK0lEQVQIHWN88uLd/xtXLzHs3rWdgTE1NfU/AxDMmjWrkeH///8NIAwSAACsmxPeKc8quQAAAABJRU5ErkJggg==", true]
                });
            },

            'button-down': function() {
                var prefix = 'button/button-down-';
                return new uki.background.Sliced9({
                    tl: [u(prefix + "tl.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAHElEQVQIHWNkAIKGhob/IJoRxPjw4SPDl6/fGQBl+QqyGaNjjQAAAABJRU5ErkJggg==", true],
                    t:  [u(prefix + "t.png"),  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAACCAYAAABxAQMMAAAAJUlEQVQoFWNsaGj4zzAKRmQIsLx+846BiYlpRHp+JHv6379/DACHrwhKT+bKvAAAAABJRU5ErkJggg=="],
                    tr: [u(prefix + "tr.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAHklEQVQIHWNoaGj4D8IMQMCYkprxn4ebk0FAgJ8BAIF+B384jBW0AAAAAElFTkSuQmCC", true],
                    l:  [u(prefix + "l.png"),  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAUCAYAAABI+4ecAAAAfUlEQVQYGVWN3QrDMAhGP/9206Zr2AvnjTd6PzKNUlhA8PidKI0x5vtz4TieUPjr5wtn7+CAbd/QWkswe0BEE1gZYpKgbFCxSsQTr7VARCBaWnwOtRJXPF0Qza2Zg2ndATGIKLVobgATotYCbxGV8KfF3JfknVIWfOfE9MEPwjwLJWHYWMEAAAAASUVORK5CYII="],
                    m:  [u(prefix + "m.png"),  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAUCAYAAACkjuKKAAAApUlEQVRoBe3awQ3DMAxDUdqiT80x6MbtoUPbVYFu8ZkNqKcItqHxen/OnFP5WBXYe8v3/dQYrOBJK50j+boejR99WkOc1re9aLmT918B16oUA1oBtz40emK7Kn8+tQ1cDj4WP2OfSt9XvYx9Mn7GPlbfy8aGpwf3GHnXpzZB4+dpF4uvGXwsfuip9H3Vy9gH4ysHPqy+c9bH2su90JFlDqD/b5njCzGjD7gVMqRzAAAAAElFTkSuQmCC"],
                    r:  [u(prefix + "r.png"),  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAUCAYAAABI+4ecAAAAgUlEQVQYGVWNwQoCMQxEp5nEy1pRFj9XwU92ryI1042ghTZ9yeu03e6PsW1PXM4n+LpeQXMAL1jvHctxSQCMdEQcCoIwtx2cAbeoCS3dmtAJkqWlohAty7iEH02NOQnPf77QWgNaaYLZUAAsJ9oClf0q+NPm49KUs2dlHQnvoRP4AJvlDAI3hV/6AAAAAElFTkSuQmCC"],
                    bl: [u(prefix + "bl.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJElEQVQIHWNsaGj4z8cnyKChpcfAyAAEIAEQDeb8//8/DcQBALXtCRI9QRqeAAAAAElFTkSuQmCC", true],
                    b:  [u(prefix + "b.png"),  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAADCAYAAAC6XdCpAAAAMklEQVQ4EWM8eOTUf0YGRoZRMLJC4D/DfwaW/Xu2jSxfj/oWHgKM////T4PzRhkjKgQAMqUK6ddH5FYAAAAASUVORK5CYII=", true],
                    br: [u(prefix + "br.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAKklEQVQIHWPctmP//xvXLjF8+vSegeXUiYMMINDQ0MDI8P///zQQBgkAAKPHEx/Del6kAAAAAElFTkSuQmCC", true]
                });
            },
            
            'button-focus': function() {
                var prefix = 'button/focus-';
                return new uki.background.Sliced9({
                    tl: [u(prefix + "tl.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAlElEQVQIHUWOsQ3CMBBF7/vs2JZiBEIGpKSkywC0LMFKzEHNEuzAGlQIGgS24RxF/PKe/n8H+ge0v/AQb+pOPb/dQ6Gyw5m3z1azmTVpmZ1Nymelrf5BCPisvXdIwSS7ANIcBUHLFBvTCEC2K2LqUbgrRFGL49VunDRGgOF62h1FV+XiGKeom0CF8pXIC+mQCVGOU77YyypzkC/vzwAAAABJRU5ErkJggg==", true],
                    t: [u(prefix + "t.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAHCAYAAAAhzJK/AAAAbElEQVRIDe3SyQ2AMAxEUW8RAQnRAHcOdEARVE1PgFBs0ofHHcx/5u285m+4hXCpCpR3dCuLrkKTKiseIAl/i+ZapZkY70JWwh34SfCLmhPFZ0FxMHElYeAnwe8zvbs/eeZiKQqgAAqgQC/wA/3PFxlxhz1+AAAAAElFTkSuQmCC", true],
                    tr: [u(prefix + "tr.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAvUlEQVQIHT2MQU7CYBSE5/1/a0soujANFxATN6w4AFyCHQlrj+CVPIErXeKe7prIQiKkIVBL0v607z0sGieZ2XwzQ/3ZS9evenKDT06yWPA2YQD6Y9DDfDEw0jhnpbQ7U3H9fUqjY4PnKXtW6Z6IipCvDrh1e6ed4m6LMgXEA2FEsBkM1pDAj4xD7V8zxq9M7Xer4fz9SUkTZXxU9vQVHDf5P/wtLB5VeSmqq7w0mXeZ/YWAYsDridGgDnNzBlX/UKzKgjLRAAAAAElFTkSuQmCC", true],
                    l: [u(prefix + "l.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAASCAYAAACXScT7AAAAdElEQVQoFWNU9zvCy8rPLMPEwqj9n+G/1eX5lkUMUMD0m/0701+Gf8wMDIysjAxMHDAJEM0EIpgZmZn+//vHBNQJ5oPEQACFAxFCkKOSNA6hv////mNkYvrHyMD4DxHswFhh/ckJjExglDL8//2f4d8PZEkAalgdJJgWN5MAAAAASUVORK5CYII=", true],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAASCAYAAABy1wGXAAAAP0lEQVRoBe3QMQEAAADCoPVPbQwfiEBhwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwMB/YCPKAAGbmhjEAAAAAElFTkSuQmCC", true],
                    r: [u(prefix + "r.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAASCAYAAACXScT7AAAAZUlEQVQoFe2Ruw2AQAxDnYQTMAxDsRBjwQRswAJUgI4kfKogeipcWXp2YxOCmnboCNTb7mOedeLAQOAKoKQwyeXCRYQOZ5izkNylRzMGL//Dj0Y4vzRiNnW11/AOWwHPAta01XYA0JAgblOBtAYAAAAASUVORK5CYII=", true],
                    bl: [u(prefix + "bl.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAtElEQVQIHTWNvwqCYBTF772fZpL/SkwoR6khaApaW3uIoOdo6016iqCpub2xsYZwKQzU9PtuCnmWM/x+h4Ph5tQbCHckGCeAsLgelnv4h/TcVqSqAqFKCThpQdPkwl0WQmXM4sUIj/n2smsFhNVZmzq6qfvSQ2UMgSBChrECDLC2MF4fO1VomhaSDdLoI0qPQbO1GvLN+lTxE7JSd6T0v7kh6aWIjWbZprkQsyChN0Si7Kb0Awk7OP3FkVGmAAAAAElFTkSuQmCC", true],
                    b: [u(prefix + "b.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAHCAYAAAAhzJK/AAAAbklEQVRIDe2TsRWAMAgFPyR56jAO5UKOpRO4gQtYqS8ETOMUQEV7dwDEhIEwEAbCgCMDNC/7SuDRYOyI2zUqgdSgT+7L1k0UaMR3cxFM2rvXrGJHQ0uJUny+k/oiognccr3aWYc7wjsJ/2OWd9IPG5gfUBjdRM8AAAAASUVORK5CYII=", true],
                    br: [u(prefix + "br.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAmklEQVQIHU2OMQ6CQBREZ/evnYbKWxgP4ik4h41XsyWxtdBYIoUGRcAsC+7/8k1MmPZl5o3BJKs020FwiEbOj/gq3ITBQu6C2FiWMOsWbP9wnWZbMbiKUBWIfYI8Gp36NUYARi423IaSqlM9eKcOnRKmChSerXDjhneP/SY6lasjUO+ppE7BZd5+Rp04faXyBEU81kvWhgL98gWTrGIp2CTIEwAAAABJRU5ErkJggg==", true]
                }, {zIndex: 1, inset: '-4 -4 -3 -4'});
            },
            
            'panel': function() {
                var prefix = 'panel/panel-';
                return new uki.background.Sliced9({
                    // t: [u(prefix + "t.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAIElEQVQIHWNcvnzFfwYiAOP379+JUsjy/v0HIsxjYAAACIoJrr/y//YAAAAASUVORK5CYII="],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAABnCAYAAAA5WNM5AAAAkklEQVRYCe2XSwqAMAxEq3j/G9ajtIKYXQhvMVLEcVNoh3xehoBb7+ds4NuB5pZg4TEnytxwRCzUp9ZHXNiMU5dm189aH3HhCHEzFpY24yMcY5SR4lEPnNdIlz2vkXa9skZ9144Ybs5O7h5zzPjFnTkGifT8Jx6+SOlq1nPkNXoBpNZ+LvFkMHALK94v/OR+AfgFT2rKGho++KkAAAAASUVORK5CYII="],
                    b: [u(prefix + "b.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAGElEQVQIHWPk5ua+wEAEYASqcSBCHfFKAIURATRo4K6PAAAAAElFTkSuQmCC", true]
                });
            },
            'input': function() {
                return new uki.background.CssBox(
                   'background:white;border: 1px solid #787878;border-top-color:#555;-moz-border-radius:2px;-webkit-border-radius:2px;border-radius:2px;-moz-box-shadow:0 1px 0 rgba(255, 255, 255, 0.4);-webkit-box-shadow:0 1px 0 rgba(255, 255, 255, 0.4);box-shadow:0 1px 0 rgba(255, 255, 255, 0.4)',
                   '0 0 1 0'
               );
            },
            'slider-bar': function() {
                return new uki.background.Sliced9({
                    l: [u("slider/slider-l.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAASCAYAAACeomSBAAAARUlEQVQIHWNgoBlgBJlcXl7+H0Qzghi8vPwMSspqDCwgEStrewYODg4GJhDn1s2rIIqB8f///2kVFRUzwRwQARIA0RQDANoaEYLb6jseAAAAAElFTkSuQmCC", true],
                    m: [u("slider/slider-m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAASCAYAAAB4gjqpAAAAoUlEQVR4Ae3QwQ2AIBBFQTEUghXoxZZsgZ48aYXYgwl7gNkC9ufNsjgCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQGFwg1Vrb4I3yCBAIEMj7cQbMmCBAYHSBXMo2eqM+AgQCBNaADRMECEwgkN/nniBTIgECvQVSa+3qPeI/AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAT4EPHoMI2ACr+GgAAAAASUVORK5CYII=", true],
                    r: [u("slider/slider-r.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAASCAYAAACeomSBAAAATElEQVQIHWNgoB0oLy//D8IgGxiXLV/z/97dWwyfP39kYFJQUGSwsrYHW80EIm/dvArmMIuICDZ8+PCeoaOjI53h////aSAMlqKUAADcsR0fYYxvcwAAAABJRU5ErkJggg==", true]
                }, {fixedSize: '0 18px'});
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
                return uki.image(u("slider/slider-handle.gif"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAkCAYAAACwlKv7AAABt0lEQVQ4Ea1TsUoDQRCdk3QiaG0haCeY5uwiChqwsLGKgo2ljRA0KWwUbSwSJaCFWAkqaCk2CloIlqbQws5G/AQl3u3enbtzmdkJXgrBhdu9fXm8eTfz4oFZF3eviT27rcXiqOed3TwjaWk2n8k7v31BvEcrBaXiGKgoyXzsb5aT0yo0hJjVqtsNfK9tlRmznJzWCkLtLA4ODSNBYpaDRC0Ue/v6kSixlGjqh8YfrThSqaLAnEdRWmuNRCUx8ig/Jo7aRGGHPdrW0IpIUWDsUSpGWYrUR9kKUpQY97GjNCs6O9ml2aObVtoeOxlhfHpu/ncfcTKmR1enx1CtuNlSB+xZqzfw6pndX6nsPOGty3ZU3xy3RLv89Oi6N5H4p4QvTIxkyl0+viFugqtgasaHj0waQGEyDw/3TUq4YzV29/BS3lhnkCfz2WIMKOES4/SAmxZQwiXGI/xKI4iylHCJccKDwElSwjswTngcsUlOuMDYY0uUpjxKjD0q7RQ54QJzHsU/jhQDgXEfZRlSlBiX/g5F6XbCJcYJDxLXnoFCCTsgsbZiCO/Xh7C8usYtki8nB/t4/f+E/wAFeJBBTsTmngAAAABJRU5ErkJggg==");
            },
            'slider-focus': function() {
                return uki.image(u("slider/focus.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAZCAYAAAA8CX6UAAACcElEQVQ4Ee2VsW4TQRCGZ2ZvfT5hJ0GWAckpI1FEoqWFEnqoeQ4egOeghp6WtLRIFEgpkwKsKE7syHc+7wzz7wmBhCKfBCVXXHE3/7+zM7vfMP16mJ58DMfTuVzRYWiHSzm4uiNtuRaExKbSxf6Nxnqs+3SWvsynSidPk/8y/Ge86MW7cLQaFSHuDdJEh2WSSqUoQ7IikQaEBJKUAm9Ft00TdB0upE7t9eZ0tNrS+5ep8BiGyfZ+VQ05jWMq7zKnAzYeS0GVUBFh5Au3pLxm5uUwDRY0aS4bq5ZH32h9SqQFthNiHMCEtbznSx+yhZnnOzWyfSYeZhuympivmMKchM5JyziShtq4l9wjFahJM3owRCadCR9/fvv4TU7iltejV59em/hSqWzTZFMfl/MmFxY16bZDs10m8EYMG82ggRbNEXQHhTUqxko8vSWJPz4jNmtcC4/cYnRHxDwr72zPB7HQQItjks9J12KOTJIL28eri+UILc4a2k+Bg5iqkHA+fH2MvKNCagIt4nsLd5n/N9pVoX9d7GRJWUT9gurutbsIxEIDLb4IgAXWABNGWvc16mKthRYeAuoBWOqsMfM73PNBLDTQwkOATlCPabsUsnlPHz/JNs8a12YP8BfoNAsLYzoHa3aZZR55LDTQwgPALx7uxSpOHK8gpICQNAMmcMN/XmTUBNtBJliQlM5Mmu/tRVh8vW7XBSZBevZhA/4CnaAecbok55PzufLsMrO9S60ZrY3S0jQsKDSXK9Nl0d5s6OR5hr9hEgDi4C/Q6dRbqFhJW0yR9NsUIZ8i5lNk41Mk1DDJU8Rb3o2jrih/Ndd+AJ3fdQr5HjWnAAAAAElFTkSuQmCC", true)
            },
            x: function() {
                return uki.image(u("x.gif"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII="); 
            },
            'splitPane-horizontal': function() {
                return uki.image(u("splitPane/horizontal.gif"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAIElEQVQIHWNgYGDYDMQgsJkJQkNIijkM////9waZBaIBtioIA2DTJqsAAAAASUVORK5CYII=");
            },
            'splitPane-vertical': function() {
                return uki.image(u("splitPane/vertical.gif"))
            }
        }
    };

    uki.theme.airport.backgrounds['button-disabled'] = uki.theme.airport.backgrounds['button-normal'];
    uki.theme.airport.backgrounds['input-focus'] = uki.theme.airport.backgrounds['button-focus'];

    uki.theme.register(uki.theme.airport);
})();
