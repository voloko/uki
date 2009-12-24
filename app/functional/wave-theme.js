(function() {
    var defaultCss = 'position:absolute;z-index:100;-moz-user-focus:none;font-family:Arial,Helvetica,sans-serif;';
    
    function u(url) {
        return uki.theme.wave.imagePath + url;
    }

    uki.theme.wave = uki.extend({}, uki.theme.Base, {
        imagePath: '/app/functional/wave/i/',
        
        background: function(name, params) {
            return this.backgrounds[name] && this.backgrounds[name](params);
        },
    
        image: function(name, params) {
            return this.images[name] && this.images[name](params);
        },
        
        backgrounds: {
            'link': function() {
                return new uki.background.Css({color:'#003EA8', textDecoration: 'underline', cursor: 'pointer'});
            },
            
            'button-normal': function() {
                var prefix = "button/normal-";
                return new uki.background.Sliced9({
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAYCAYAAAAoG9cuAAAA+0lEQVQokd1SPWuEQBAdP/C2MSciCPaCjVwj/oD7IanzE5Iq3B+4+qrAtdr4K6xsrW0sTyTYCLs6md2w4QhcFy5wDx477L73ZhbGAEJZlu+GYbyu68roBESEOI4hSZITY+zNJsHRcZznLMtYFEVAQhjHEZqmkf6XNE0RiqIQwzAgPeKyLCiEUOz7HquqkvezLeWe5wEJVBuNIAiAcw7UfqNEpmmqi1uwdXGdclMkB75j0kO108b/+t2fJH0S/N+iaZp+apM271zXNc7zrLaTVle6oOs6CMPwO4lmObiuu2/bdqedlmWB7/s8z3NOxkoPvSUeieKKF+IH8ekL3Lu8/RORc0sAAAAASUVORK5CYII=", u(prefix + "v.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAYCAYAAABKtPtEAAAAT0lEQVRYw+3YQRUAAAQEUQcRtdRFI1aQHRH+m73I7lYYX1ZVWAPsrjfA3QFgDSCJAiiAAgBgAhQAABOgAACYAAVQAAUAwAS8AGbGG8D9K/wEDUNdqz8tggAAAABJRU5ErkJggg=="]
                }, "0 5 0 4");            
            },
            'button-down': function() {
                var prefix = "button/down-";
                return new uki.background.Sliced9({
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAYCAYAAAAoG9cuAAAAw0lEQVQokWNkAIJVq1btB1L2QMzIgADngTggLCzsEdPKlSvPAjkOaApAwJCNjW3b////BZgYGRmNGHCAX79+aQGpehYQh5mZGauiv3//gkxPIKQIRAngVQQDVFbEwsJCT+uGpCJgKhhsgckEVPD/58+fYIXI+OvXrwhFfHx852/dugUWBHkCBD5//sxw9+5dBjExsZdg61hZWQO4ubk3X7lyRR+mE2S6kJDQKysrK04gdwFYEJgj+IG4/z8qeA/E80FyAL0dUKVpt05fAAAAAElFTkSuQmCC", u(prefix + "v.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAYCAYAAABKtPtEAAAASUlEQVRYw+3WQQ0AUQhDwZ+ARFQiBFu7QjpPwqSH9u5+L7h+4QGoKgAAAADIBehuCwAAAAAAAAAAOEIWAAAAgDiAu8sGmJlogB+4uQdde/0uUgAAAABJRU5ErkJggg=="]
                }, "0 5 0 4");
            },
            'a-button-normal': function() {
                var prefix = "button/a-normal-";
                return new uki.background.Sliced9({
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAABWUlEQVQ4T6XVwYqCQBjAcZ9g26f0NfYNOu7e9raXktBLdDR6ALdLh0SRNJFSlEg0M7+db8Ddyc9gbQZ+INP0r2RyFIWN6XT6pmlaMZlMgF0Pgu+xLAuKovgAgFeMjQ3DiPf7PQwdt9sN4jiGxWLBo3VdvyvsE+okSaBpGr6ATQ4WBAHouo6NkgcxdL1eoaqqp5RlyX8+Dh7EC5yUQYLspkohwTzPpZDg+XyWQoKn00kKCWZZJoUE0zTlVFV9qF3ThwRxc7e6IXS5XDhxnYgEj8fjHTHW7rXuGhEJHg4HQox1X+siwSiKeuGm7c71wafOXTAMQykkiI8vGSTo+74UEtztdlJI0PM8KWIwwb+O67pPW6/Xf0E8U+bzebPZbMC2bXAc59+22y0/S/Dxv1wuf7/haLVafYsn2RCz2QxM06zYfs3Z+fKFp6jCwiNmzPD7OWDgehQzn8zLD1tEur3q1ZjQAAAAAElFTkSuQmCC", u(prefix + "v.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAYCAYAAABKtPtEAAAAT0lEQVRYw+3YQRUAAAQEUQcRtdRFI1aQHRH+m73I7lYYX1ZVWAPsrjfA3QFgDSCJAiiAAgBgAhQAABOgAACYAAVQAAUAwAS8AGbGG8D9K/wEDUNdqz8tggAAAABJRU5ErkJggg=="]
                }, "0 16 0 4");
            },
            'a-button-down': function() {
                var prefix = "button/a-down-";
                return new uki.background.Sliced9({
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAABJUlEQVQ4y2NkAIJVq1btB1L2QMzIQB44D8QBYWFhj5hWrlx5FshxoMAwEDBkY2Pb9v//fwEmRkZGIwYqgF+/fmkBqXoWEIeZmZliA//+/QvyYQI1DQRRAlQzEAaGiIEsLCyD14VMMAOx4WXLljEwMTHhlEfGBA1cvHgxWMGSJUuIMhSvgQsWLEDxxsKFCwkaitPAuXPnYg2befPmEWUgRqRkZmYyyMvL4wz0hw8fkh7LT548wamBUIpgAZY2IyxhU99AoGH/f/78ycjFxUW2IZ8+fUKkQz4+vvO3bt1i+Pr1KwMsgojFIPD582eGu3fvMoiJib0Eu5CVlTWAm5t785UrV/TJcR3Ih0JCQq+srKw4gVxIFgPWVvxA3P+ffPAeiOeDzAEABYmSmnljhn4AAAAASUVORK5CYII=", u(prefix + "v.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAYCAYAAABKtPtEAAAASUlEQVRYw+3WQQ0AUQhDwZ+ARFQiBFu7QjpPwqSH9u5+L7h+4QGoKgAAAADIBehuCwAAAAAAAAAAOEIWAAAAgDiAu8sGmJlogB+4uQdde/0uUgAAAABJRU5ErkJggg=="]
                }, "0 16 0 4");
            },
            'plus-button-normal': function() {
                var prefix = "button/plus-normal-";
                return new uki.background.Sliced9({
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAACcElEQVQ4T5WVWa4SURCG2YE7UFfgAozr4VFX4l2BvhtIgIR5uMxhbkBmDV6mMM8gc8Ox/krAa0OjnuRLh646f9WpqtNoNIpVKpVexWIxo9fr7RiNxpNOpxNqwA6/ZDL5CfuUWlcrEon4TCbTyeFwiGKxKKbTqdjv9+LWwvvxeMx+8Me+aDQaUhVHJm63W/R6PXE6nZjj8ShkWRaHw0EV2EGn0+FAlOT4SjwQCEgul0usVisWRna73e6/mc1mwmq1ikQiMbqIp1Kpd3Q8MZlMOOPtdis2m80VsOfzeX7esp/p9/voDcr35ZI91Y4zhwNOcYtcLie0Wi0HUfM54/P5RCaTkalVrzV0pPXT0xOXZblcqpLNZjkATQuL3PNF46mnmI6PGr1ez7Vbr9diPp//ARqeTqcZi8XCAdArBMM72JV7QLvdFtCl9cgB0CAYMJbPkSSJRdWgMnByyn2DweAcQOYAOBaah7l+DjJBpoVCQTidThbFE78BxIFyX7PZ/B2Ajr5utVocYDgcXjEajdhG08YBIIzT4h2AXbkHJbTZbBsO4PF4JLocnAlGTI14PH6ZImR5z5c0RSgU6lMACZ+HtwaDgRvW7XZVqdVquECXk6r5VatVvgfUhwwF+Hz+TBTsdruo1+tcdzXwOUCGeN6yNxoNnja/318m8RHx5nKj6XL8xDXHDKNJ6Mu/An/sgzixoa/BNxJ/0CgXTcwAnw2z2SyCwSDXG5cQmSnBacvlsgiHw+yPqaHMv5PwVyJNvLgKgLVYLB4qlcqOAsio5b3/A0DTMqf7UKF9P0j0cDNz5UJ04gNhIMbE8S94iffES6XWL+1RTS9sJ2DGAAAAAElFTkSuQmCC", u(prefix + "m.gif")]
                }, "0 0 0 0");
            },
            'plus-button-down': function() {
                var prefix = "button/plus-down-";
                return new uki.background.Sliced9({
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAACM0lEQVQ4T52U2Y4SQRSGeQPfQH0CH8D4PFzqkzj3JJpwwQX7vu9rWBuQEBx2AsSgmUkgMTNRxzn+f2UcTTf0TKaSLw3Vp/7/1KlTbbHohs/ne+FyuQJut/sLuAViwu1d3Aeu02sZBgILjxA9aQaTipk4MxGv1/skPB6PMgqHw5cGcQRoDAgEAhIMBp8M11MnkUhc/J/5G07CWaLR6Em42G63q6dZHHWot91uncrA7/drdE+lUqY4HA6xWq2COks2mzWNhabkcrkbEXnJ8lzF43FOmOJ0OpVBvV6XRqNhGhuLxSQSifyEwXuWSPL5vJRKJQOZTOa+S2w2mzLgblkGzvH9sXU04XuMnDKoVCpSq9UMcKsUPQUz5Y7066h3Z3CjDDjZbDYNMBAdIa1WS2VNUT75n+AgZTAYGNZVq9V/BuiKq3K5LN1u9yj9fl9Go5Gk02ll0Ol0ZDabqTnC9/o1hUJBQqHQtTLAAWvJZFJlYgZ3QgNN02Q8HpvGsnTopq8w0Cz48Zo3kc5/szpGr9dTme12O5nP5yfjqMNWRvl6MPio7gJMhtiScp9MJieZTqeyWq3U89h7GvCM0EWfIX4BXt3faNT4O01Y08ViIcvl8tEwnsnxJqP/rzHGED+z6Ac64Btbk1mwg4bDocp4s9kYWK/X6izYgRTm56FYLE4g/Al0wTODAcfhcDhDNj941Wn20GcaTXJot9vn+/1+DtFfRzPXD7qDd8APLsHvB8iDt+C5XusPyQ/RDOInM8kAAAAASUVORK5CYII=", u(prefix + "m.gif")]
                }, "0 0 0 0");
            },
            'plus-big-button-normal': function() {
                var prefix = "button/plus-big-normal-";
                return new uki.background.Sliced9({
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAYCAYAAAB0kZQKAAAC60lEQVRIx7VWW05aURS9M2hHUIfgv51AJ9D0z/TLz/rXYfSrP41tByABEcRH0KAxwSfFBxoBCY8IUhBfIAgX7ulaO16CjXI5CZxkRQ3uvRf7rL3ONoxXzunp6djOzs7M+vp6cmVlpe5yuZQOGMPYvb29n4buYfFwOBzyer3W8vKyikQi6vLyUj0+PirLstQgp16vq2w2q7a2tpTP51PMxZz7+/vvHAmg4KeFhQVzY2NDVSoVNYxD4qVSSQWDQXandXR09LkvATI+Pz/vBnc6naGBnTw+PpbOJBKJry9ewdzcnIWfQoBB7XZ7JDg8PFSLi4vszodnJCCgxObmphDgP7ZarZGBellbW1MQfQvl3ggBqPc9uqCur6+7bRs18vm8TBB+dwkJqNa9uroqGmg0GsJ0UExNTQl0YmwEAgFqg+P21oBq87FYTK6hVqtpwSZhmqZ27O7uroIE2iAxbfj9frNcLkub7u/vtWCT4F3rxnIKUbsDEh6Dd8P2kN3d3Z0WeknoxhYKBdEFTsqYnZ2Vdt7e3qqbm5u+sIs6wSkPwe4/kegICV4Fp4Mu2Q+Dkmg2m465+BR0ScDBzKurK/mA7JzQO2p20ZfG0ClPPB6ne5pCAn5eoFOyRfR4HfSS0I3d3t5WsIaKaAJu6ebjUq1WVbFY1IJNgv6iG0ufODg4OJPpgFlNuN1uuQ4qVge9ZqUTl0wmRQ+YkhRIfBHXRFvSfPvJ8OLiQgsPDw8CnRjuKaiZBQFqYsy27gk+49QGl5FcLjcyYLFRHo/HgiVEQeD3s5cUQvnOFkWjUSEybGQyGdq0EMDfP0Cg0u3Cf3vFzPz8vGxBXEDS6fRQwFwUIgnAH3woXgbGX92wINCP2LJMdgXerkKhkLSQV0W/T6VSfUHRnZycyAPFvYFfisWR5wyj/OepA+OOuyaXDYzsDFpocflYWloydbdt7KoNFC6CfBzFM8j5F/jWXWQGPQwAJoFfQISLlyYiT7GT/Yr/AxJ37qJFwFyvAAAAAElFTkSuQmCC", u(prefix + "m.gif")]
                }, "0 0 0 0");
            },
            'plus-big-button-down': function() {
                var prefix = "button/plus-big-down-";
                return new uki.background.Sliced9({
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAYCAYAAAB0kZQKAAAClUlEQVRIx72WyY5SQRSGeQN9AvsR3Lcv4AsYdx1XLHXnY7hyY1DXhHmewjyTMAToThqZBIIBZAoLJNB9y/9UKNIs6Et1oCv5EnK5p85/T52hNJoDy2w2X+j1ep3BYKiDJWCSLLe23zWyi5zDMAKUJzg+hLLd85WqALz0HmxO6HwPo9G4djgcH9QEKCaTiSEaZwEiOOFw+POhI1DoRZvNdlbIB31oo9F4uycCD3/Rn06n81kgEV6vd80YeyGi8IZC5HK5mMfjeRZICOXIYrEwchEWi8UMmN/vl0ar1XKeYkvRyGazCqLxUmO1WvsUhVAoJI0QMRgMpG1RJcztdt9BxCc6jk0wGGTRaFQaIWI4HErbbqNxDxEWKk0Wi8VYIpGQRogYjUbStpFIhOcFVpOLSKVSLJ1OqyKcqnHMXslkUoi45yLoYS6XU+VYEePxWHUv8rkTgcrYkKp8Pn8Uk8lkh3D68JlAbR86EvLNRaBm/6CNslKpJI0QMZ1OpW2pGFAdE54TgUDATM2jUqlII0TMZjNpW7vdTrl4y6sDpXJJjaNYLLKbmxsphIj5fC5lVygU+CBDBJsQ8ZF3TZ/P10ZEWK1WkwatlyNjQ60bH9+BAMqJCy4CHewSSaJkMhlWr9dpwp0NtGqapAqiUIKAn3uTFBXylUJEpdNut09Oq9Vi8XicKkLB728QMNlF4eGqVqs6zBKG4+Fn1+12TwLtRUdAAjqdjgPO/4LXB29YqPF3OJYNRYWqhtSXy2XWbDZZr9dj/X7/UegdCjuVIc0IGlT4MAVt+na1WhW3ETgsQCy6bCDZdEgiBU1ljXreiKvZsWAy/0P/GVxfX9eWy+Vv7DkEX3YXmWMXGYAr8AMUwJ0kha3t1WPO/wPYEPVpc+IT1gAAAABJRU5ErkJggg==", u(prefix + "m.gif")]
                }, "0 0 0 0");
            },
            
            'popup-normal': function() {
                var prefix = "popup/normal-";
                return new uki.background.Sliced9({
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAABz0lEQVQ4y6WVz0sCQRTHv6Ora0uWRxGtMBQ7lEn9CVHQqUvQn9Ch+gOCrv0FHTp1q2tdQzt2LoqSgkJsqW4RmRnu7nRoht5Oswrug8fCMHzed9+vMQDg8Ox2/Kk1dFx/bs9+fbsMPWw6Zz2Mdu+XttaWn8QRJ+7KewYAPL4nqs9vncLGYhbz+ZFA6EXjA0fnr5MYKp4CKAuYR75+8HWzVdhemUB5PNlLLCoTSXgex17VzgOI6YA+MIC+UGlz+RG0Oy4DEBdAl6QiLgJ5BgY3U0AdAEzJNwsLllCuehhwXFEqc83CKo4RqAsgCiAiPFSOjQAo83XFABZVoIx6GDDTAf/1ccgAFPqn2EpE+VWzxWbGhvtSbuxPiWD9CoBS2rrcr9mV9YUsShkLcSOivXz30sZ+zcZUOmaTHUEdvj7uduqrmVTxdPekMdlLhWVGeC4VtasHO5tydIlT+K/ind8VWBa9aQJIiK8pzmjlJcghu+JfAFo8rkyQI4ASpoJdAF0SwKfa0IwkXSxyD8jmhya4CveoYqrWUSruBoCD4FwFe6QP1R3AlD/QwWm+tWBHecMi6lQFPEmBqQCBc6VgdKq4Jn28X1dIOCOKe4GhW/IA8AM1G+ei4X4vMgAAAABJRU5ErkJggg==", u(prefix + "c.gif")],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAABkCAYAAACCXsDxAAAAVklEQVRoge3MoQFAUABAwRcVSVRFTTHJn8tsFmIF+t0AV9W47uePcd1PdVZHtVdbtVZLNVdTYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWLxt/gFweGiHhjkmgQAAAAASUVORK5CYII=", u(prefix + "v.gif")],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAAAXCAYAAAASloEFAAAAX0lEQVRo3u3YoQ2FAABDwUoMColF4jBMAmvxV4OB+Gs05JrcBM81x3W/dMlrdRNFFBNFFBNFFBNFFBPFRBHFRPlslPP3eGbbXuIkO3WyUScrdbJQJzN1MlEnI3Uy0OUPS/P5ZrQwdlIAAAAASUVORK5CYII=", u(prefix + "h.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABkCAYAAACfIP5qAAAAmklEQVR42u3RAQ0AAAgDIPf+nbXG56ACWepkqCNFClKkIEUKUqQgBSlSkCIFKVKQghQpSJGCFClIQYoUpEhBihSkIEUKUqQgRQpSkCIFKVKQIgUpSJGCFClIkYIUpEhBihSkSEEKUqQgRQpSpCAFKVKQIgUpUpCCFClIkYIUKUhBihSkSEGKFKQgRQpSpCBFClKkIAUpUpDy1QGga5NE1OzMgwAAAABJRU5ErkJggg=="]
                }, "12 11 11 11");
            },
            
            'toolbar-normal': function() {
                var prefix = "toolbar/normal-";
                return new uki.background.Sliced9({
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAYCAYAAABKtPtEAAAAT0lEQVRYw+3YUREAQAhCQb2xfxC7GEm5IDwi7DB8kN2tME5KsgZ4YR4AADBPmW9g1N0BYA2wuzQAAADYABoAAAAAMII0AAAA7MIhMjPWAB+KnTlLvIreawAAAABJRU5ErkJggg=="]
                }, "0 0 0 0");
            },           
            
            'search-input': function() {
                var prefix = "searchField/normal-";
                return new uki.background.Sliced9({
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAACpUlEQVRIx7VWiU4iQRDlq4X4QRAIp8h9GEQlcieAEO7TcHrgosxAqO1XzpAoCLsCL6kEpo/XVf2qqjWaHbi8vNTa7faExWIZGQwG+m56vZ4N45jn9XrPNL+B2+0+Fxv+ERtRMBikeDxODw8PVKlUqFarra1arVKxWKRUKkVXV1fkcDjIarVKPp9P989kgiRlNBopFotRuVymer1OrVaLOp0O9Xo9tsfHxw3D93a7TdlslpxOJ/n9/t5eMrPZ3PF4POwNPAARNhuNRvT09ESvr680nU5/NIxjHsjhsfBU3ukZTgayRqNB3W6XibDJbDaj+XxOsiyzLRaLDVPHMA/zh8Mh3d7eUjQalbeKQ8Se8vk8k8ErnBQLJUmi5XJJq9WKbRfUOZiPdZPJBKHF3X8Nr8lkeru7u1uTPT8/0/v7O598H8kucqzHtYTDYXw6ZzJI2WazsUAQRngGMtWrQ4D1CPHNzQ32lpjw4uIiiBPgJLgzhPEQz7aRwhmkj8CZRtxdM5PJcCghEMT+WGQqxuMxpdNp/AxqUDGQ0FAVvEMojw2E9fr6Gj9bTNhsNvnuMHBs7wA4oRCSBlUFSf7y8nKScALYd00o6l+rUChwpUDingKIXi6X+yQU1SWIHAQh1HkKqMVeoInOoHW5XBzSU3iI+0smk6xUVikgwiohV05xh4PBgNubgs9+GQgEdKh5yMNjEn58fDCZ4t3bl3oqqnoPvQxl7Vi5B6Gg+yjQbnQN0U5kdG9MPjQNUMrggILUj31RlCAZYej3+/+tWggEFUt9kijo7O38orJ37+/vKZFIcNlDX9smKPxX+x5kj/kgQxPY69l3IOZioVQqlfiRhEoh7nltoVAITwiKRCJcmKFyRRwsEGG6X73gIGVh0PVoT0RHyrydT8W/5PlZWCStrIUAAAAASUVORK5CYII=", u(prefix + "v.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATYAAAAYCAYAAABwbdFbAAAAdklEQVQYGe3BMY3FUAADsAxZnlQ8ncq3RMrr3+GIbPd9318AhvS+7wAs6TknAEt6XVcAlvScE4Al/ReAJQ3AmAZgTAMwpgEY0wCMaQDGNABjGoAxDcCYBmBMAzCmARjTAIxpAMY0AGMagDH9vi8AS/o8TwCW/AEmCwddLATtyQAAAABJRU5ErkJggg=="]
                }, "0 14 0 14", {inset: '0 -24 0 -8'});
            },
            'search-input-focus': function() {
                var prefix = "searchField/focus-";
                return new uki.background.Sliced9({
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAAD5klEQVRIx61Vi0+TdxTtH7UZBXQLZOFhMpgmGzHb1LklZi6Zc7Ch9GGdpQjIY0VYS4tACwUpopRXnM4NJiogaheYFFkHbLUP2lrGV/rk7Lu/ytYiFoSe5Cb9ve7pua9PIEiAJqOwpLrtE7NUk8edrNmFl+1NfFnzBs6qc7kq/bEZui/YDuihUJkZ/Ip3WlibhqL6dAhVmRCrciBp2P+f0Zr26bxAkQK6L1ZlR16LmBTRw9O8k9KWfKi6C9E3rMHE5BAs8zN49swKm83GbGHhT5im72Lgjgbq6wUo1ebjjDIdpxS7oLx60rUpWWnT+56vv98DefMHaO2X4f7jHzHPOyXnDocDi4uLcLlccLvdL5lz0YHH00PovFWG8rZDKKxLQaX+aCShMiIr132M67frMWt5woicTidz6PV6sby8DJ/Pl9CcbituT7RC0fUpvv0hFc39xZENc0ZFQMoofHO8KrvdztQsLS0xR4FAAKFQCOFwmNlGWDvzB1bw8yMdqg0foki1B2NTA/HhFSkzQ5R4bZ+UKSMyUkWK/H4/I4pEIlhdXcVWQPeWOBeMd6vwnTYL8rY82o4WkuaaSEZFckF7iM/ZjTgyUvU6ROsxax1Hfe8xCBv3wjR7KxpaRcfnDwpr90LTU4S/rX+xMMaS7QTBsB/dd0og1WXwaitpSyaQt+S7T9dn4OY9PSsQyhmFcadka3gw04uS9myoB06wpYCmBTUv9ROFkgqEcrbdMK6H1TWNC1fehagplZZuRihSZcNsMbHST6Y6gpdzoLzzPQibU9g6StiQhd+mR1jugsFg0tRFFZpRdiX3f0LKYbEyAz+NtYLjOBbOZGLcbIRMnwXN4BdRQqrSb+r2QTcoxnOv65VNvR2EwgFc/VWGc60Z6B+tieawsVd8vkCxG5UdH2HKMpJUwjm7ifWhuCUNU/ND0SolSNQ5EZH6HVwbrsA/Pk9SyJZXPBgcr4W8fT8uGg6ubcsY4eUeiaygbjeq+Nk3ZGpFIOjbWcOHVnDv9y7UGY/GqgvFzdMG4ynXGXUalMbjuP+kG5z/+TaVuTEy1QFV/3Gc1b7N5/B8vLpYKLo+iwgv78OlniMYGFNgwTnJt8jWejIUDsJie4i+0Wr+/WFItG/xlXli7dj8yu+i/qYkUtyYihJ9DguJYfgcJp72we75g4UqFv4gB5v7KUanu2EYkrL7NMZEzWmxyjybfvkfzd5wVXQeYA+ppOXtOfy0yEOF4QAudh1kRr/JyjpzGYlUl87uU4G8yFliZetBMZ+c+yVCfXTJeIR3lhpnNDnWrJZPASmKIQptmLOtEtM/5Y3bJI3ci3sJif4Fqpeom/ECPK8AAAAASUVORK5CYII=", u(prefix + "v.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATYAAAAYCAYAAABwbdFbAAAAo0lEQVR42u3XIQ7CABBE0T0VSeEGVHIRfEuQKAQa0zoM96qqrGqyWBwK0c17yb/CJBPnxy4lqVJxfbYpSZWKaZpSkioV8zynJFUqlmVJSapUrOuakrSlfokEKMawAYYNwLABGDYAwwZg2ADDBmDYAAwbgGEDMGyAYQMwbACGDeBvw3Z/n1KSttztdfyqzbiMh5SkLdeP++yGJruhyX5oXFGgng9Zp0b7vJwDoAAAAABJRU5ErkJggg=="]
                }, "0 14 0 14", {inset: '0 -24 0 -8'});
            },
                     
            'panel-white': function() {
                var prefix = "panel/white-";
                return new uki.background.Sliced9({
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAjCAYAAACZ6FpfAAABhUlEQVRIx+2VsU7DMBCGEzewVeqeF+iCYO8jdACegIiZoSsSD8LGBELqQFlhYOuQhYEpL5ClXSplKE6T4yzZ4Xx1MYm6wUm/3NjnL/+dHVUELAAgQb3Dd8xQZ4EnBIPc4aB0QqZPUU96zQ/CxAsckh9yEymlWg+JtkBq0ms/iqIJgzS/BZn0gsIwPCZ7LCB19NvoaQmXozagyAHq5OjAAevkyIAMrHEU8vvkiUMNM45EVxAvzQJ1abbV8C6gHnfT9dQEh/Cb3Qa0l5u99eUELU8rYB+q1VsR7Cn+QX8eBEplWX74kpfL5RsOFVGtBcYRLBaLWx8oTdMZA9Rmf+MojuP7oiged0HyPH8ej8evDje1VZqa6Pf7V1mWTVar1YsBIDybz+c3+KJrfCy1NgQG1JEhV8Ph8GEwGFzin+GREsLPR6PRFNeklgFteI8skE5QG9ZEn1qSuDIlWo6AQEzi2gGTjtLsUyOOKgaibqTLDXcErDxejiS9sdzQmw07XPFT4gAw+78AjpbRiFGrmkMAAAAASUVORK5CYII=", u(prefix + "c.gif")],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA+CAYAAAAmoEsaAAAAPklEQVRYhe3MoRGAMAAAsUhMHbKysvuvB4YBeof9DBC4MJ5D2FiYuDG+o6ioqKioqKioqKioqKioqKjob/QC+8jQBMwfUwoAAAAASUVORK5CYII=", u(prefix + "v.gif")],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAAjCAYAAADCIMduAAAAdElEQVRo3u3TgQmAIBQE0H66SPtPWBRlZKCu4Du4BR53+S5ZpEtGAAUKFChQoECBAgUKFChQBAoUKFCgQIECBQoUKFCgQJERJSK2ipNK19o3MfNSjtKrQYmZQX6UfVhJWMq3lNQsBErpWe8TrtOjtOuYHuUBiL0LtcaK8nkAAAAASUVORK5CYII=", u(prefix + "h.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAA+CAYAAAB9aNYrAAAAYUlEQVR42u3QMQEAAAwCIPuX1gALsAcikHJEgRQpUqRIkSJFihQpUqRIQYoUKVKkSJEiRYoUKVKkSEGKFClSpEiRIkWKFClSpCBFihQpUqRIkSJFihQpUqQgRYoUKVKk/BpMKpkHG71QjgAAAABJRU5ErkJggg=="]
                }, "23 12 12 6", {inset: '0 -6 -6 -2'});
            },
            'panel-blue': function() {
                var prefix = "panel/blue-";
                return new uki.background.Sliced9({
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAjCAYAAACZ6FpfAAACNElEQVRIx92WPW8TQRCGn72POA4FCQURTf4BEg2FayrELyBpLJCQqKBBAil/gTYdUpoAZVJTQIcEEt9FoAQFKUJxEsuYs+9uh8K7ZLw5myNQMdJqb9c3z747sztnQ2DtjW6b2N4yEl0AENhCyvX15YVNppjRg+uPDjbONO3yXAKNWAAYlIZeDgdZ9PDB1fmV34JuPO7cPHdK1tIY9vqG/ezopUYCc6kwyIo7ayuL95W/+IfIA8825W4aw+dD6PwQRI5algudPgxJVt3iRgkxAIl/aKQs7fZGTpNsWHLaLS6BKpN4cmygl5Xjr1Rb7JytAkqi5RWlpYYlDoLqSXTQRaQOKAVKNbbHFCG2LshUxcj47Ek90Izz8XGKtKIRyNZWJG57pfO1wdakbrBLl73I+4+Bam4tVpAxEH8IikLI2MkeJbI2yIRX5STnqPLiJ3qm5tZMhaJxUM0DOTGVinNyUMQ/sv8YZIBZIBWRbi0HY84DmWoDIE/UxF9ZAjSAdKcr7BxOT//+3renqnyUrh5ZQKJfVc4OP82m01fdfvtqMwD4lcV/WuTL9utr8w1TRKYa0tn9unW7feVJhRrrsyaAtFqtdx9ePru02By8b6ZSeEC///3jmxfPVy9fXLoH5K4VCiaAGBen2PWpazPAgmPpmOSqDR2w8KVWlMRS3ehMgfxv3jFXcPHFX1QxR41DkFXORZi1RDnr3GuQVbEIoRIqQjn5fhAotBN6geN/UfScVquBYQOQn78pGo/9qNZzAAAAAElFTkSuQmCC", u(prefix + "c.gif")],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA/CAYAAADt/Ji/AAAAPUlEQVRYhe3MoQGAIAAAwYsWmpFIZP/1tDgA0fA3wMGF8RzCxsLEjfEdRUVFRUVFRUVFRUVFRUVFRUW/iV5Lw/iG3LBuegAAAABJRU5ErkJggg==", u(prefix + "v.gif")],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAjCAYAAAApF3xtAAAAv0lEQVRo3u3WvQ3CMBRF4ePEAzACDYMxHbuwBWICqAj5MQWJhIhTIAiNz5PSpPx07/ML+8M14cwm7jatCjmY0yXQdELMYG6tTcrCpDSokINBmIXEDMIsVMkdY5Vcvu6YNavkjrFKwvyiSu4Y7xir5IHnHfP3qSQQRhhhVpyQPGRMzEfP9fHcq2BihPkepgoiZF8lYAtEoH75N33FpioCd6DPwFA6TDOiVMLME1O/YQgDdGOVlmBCyTBTfZIwz3kANglB8L0CtWIAAAAASUVORK5CYII=", u(prefix + "h.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAA/CAYAAABdA76NAAAAY0lEQVR42u3QMQEAAAwCIPuX1gILsAMikHKKAjFixIgRI0aMGDFixCBGjBgxYsSIESNGjBjEiBEjRowYMWLEiBGDGDFixIgRI0aMGDFiECNGjBgxYsSIESNGjBjEiBEjRswTA4O7pxWjdTIcAAAAAElFTkSuQmCC"]
                }, "23 12 12 6", {inset: '0 -6 -6 -2'});
            },
            'box-lblue': function() {
                return new uki.background.CssBox('background:#C9E2FC;border-left:1px solid #E4F1FE');
            },
            'box-lblue-bottom': function() {
                return new uki.background.CssBox('background:#C9E2FC;border-left:1px solid #E4F1FE;border-top:1px solid #B8C6D9');
            },
            'box-lblue-top': function() {
                return new uki.background.CssBox('background:#C9E2FC;border-left:1px solid #E4F1FE;border-bottom:1px solid #B8C6D9');
            }
        },
        images: {
            'icons-sprite': function() {
                var prefix = "icons/sprite-";
                return [u(prefix + "m.png"), "data:image/png;base64,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", u(prefix + "m.gif")];
            },
            x: function() {
                return [u("x.gif"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII="]; 
            },
            body: function() {
                return [u("body/normal-m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABMCAYAAACs0907AAAARklEQVQYV2P4DwRMDEAAIYA8IAHmglhQMRDBAOKis8Da/kOVYGfBDMVgYdFBhBJiDYV7AcrC6QUUz2A1FN0okoxHVYfiGQDA5GssMx8/9wAAAABJRU5ErkJggg=="];                
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
                        defaultCss + 'width:100%;height:' + (params.handleWidth) + 'px;' + commonVerticalStyle +
                        'background: url(' + uki.theme.imageSrc('x') + ')');
                
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
                        defaultCss + 'height:100%;width:' + (params.handleWidth) + 'px;' + commonHorizontalStyle + 
                        'background: url(' + uki.theme.imageSrc('x') + ');');
            }
        }
        
    });
    uki.theme.wave.backgrounds['button-hover'] = uki.theme.wave.backgrounds['button-normal'];
    uki.theme.wave.backgrounds['a-button-hover'] = uki.theme.wave.backgrounds['a-button-normal'];
    uki.theme.wave.backgrounds['plus-button-hover'] = uki.theme.wave.backgrounds['plus-button-normal'];
    
    uki.theme.register(uki.theme.wave);
})();