(function() {
    var defaultCss = 'position:absolute;z-index:100;-moz-user-focus:none;font-family:Arial,Helvetica,sans-serif;',
        T = '';
    
    function u(url) {
        return uki.theme.wave.imagePath + url;
    }

    uki.theme.wave = uki.extend({}, uki.theme.Base, {
        imagePath: 'i/',
        
        backgrounds: {
            link: function() {
                return new uki.background.Css({color:'#003EA8', textDecoration: 'underline', cursor: 'pointer'});
            },
            thumb: function() {
                return new uki.background.Css({border: '1px solid #CCC'});
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
            'search-button-normal': function() {
                var prefix = "button/search-button-normal-";
                return new uki.background.Sliced9({
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAq0lEQVQoz5WQsQ7DIAxE+VpWWDPzR2Qk34HCysyERCYkV4cKoiZK25NOSQwvtk/UWqk750ze++a5zi3oLWstSSmHtdatdicxA8dx0HVdVEoZNefcCuFCB7gAouMChRAaBJgrpdTOcOdvKMa47qSUon3fb8fD2WMQeOLvcK9t27ZMMSJHEFh6jhwA3o0xH6Dgrc/zHDsgfgAdxPctxIUOHPwKcRBT/AR1sI/9AgMGWB/c+g4/AAAAAElFTkSuQmCC"]
                }, "0 0 0 0");
            },
            'toolbar-button-normal': function() {
                var prefix = "button/toolbar-button-normal-";
                return new uki.background.Sliced9({
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAWCAYAAADq8U2pAAAAS0lEQVQIW22LMQrAQAgEVzkIXGd1b/d7qZJPuClEC0k3zOzC3TfJvczsAMCKiAQACaqaQHIkERmmN51IXmXeGj8Fw5BsM9Lv/QaADwb7HmCzqwV5AAAAAElFTkSuQmCC", u(prefix + "v.gif")]
                }, "0 2 0 0", { inset: '0 -2 0 0' });
            },
            'toolbar-button-normal': function(params) {
                if (params.view._viewIndex == 0) return new uki.background.Null();
                var prefix = "button/toolbar-button-normal-";
                return new uki.background.Sliced9({
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAWCAYAAADq8U2pAAAAS0lEQVQIW22LMQrAQAgEVzkIXGd1b/d7qZJPuClEC0k3zOzC3TfJvczsAMCKiAQACaqaQHIkERmmN51IXmXeGj8Fw5BsM9Lv/QaADwb7HmCzqwV5AAAAAElFTkSuQmCC", u(prefix + "v.gif")]
                }, "0 0 0 1", { inset: '0 0 0 0' });
            },
            'toolbar-button-hover': function() {
                return new uki.background.CssBox('border:1px solid #666');
            },
            'toolbar-button-down': function() {
                return new uki.background.CssBox('border:1px solid #666;background:url(' + uki.theme.imageSrc('toolbar-button-down') + ')');
            },
            'link-button-normal': function() {
                return new uki.background.Css({color:'#003EA8', textShadow: 'none', textDecoration: 'underline', cursor: 'pointer', textIndent: '2px'});
            },
            'toolbar-popup-button-normal': function() {
                return new uki.background.Css({ textAlign: 'left', fontWeight: 'normal', fontSize: '11px' });
            },
            'toolbar-popup-button-hover': function() {
                return new uki.background.Css({ textAlign: 'left', fontWeight: 'normal', fontSize: '11px', background: '#4086FF', color: '#FFF' });
            },
            
            
            'popup-normal': function() {
                var prefix = "popup/normal-";
                return new uki.background.Sliced9({
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAABz0lEQVQ4y6WVz0sCQRTHv6Ora0uWRxGtMBQ7lEn9CVHQqUvQn9Ch+gOCrv0FHTp1q2tdQzt2LoqSgkJsqW4RmRnu7nRoht5Oswrug8fCMHzed9+vMQDg8Ox2/Kk1dFx/bs9+fbsMPWw6Zz2Mdu+XttaWn8QRJ+7KewYAPL4nqs9vncLGYhbz+ZFA6EXjA0fnr5MYKp4CKAuYR75+8HWzVdhemUB5PNlLLCoTSXgex17VzgOI6YA+MIC+UGlz+RG0Oy4DEBdAl6QiLgJ5BgY3U0AdAEzJNwsLllCuehhwXFEqc83CKo4RqAsgCiAiPFSOjQAo83XFABZVoIx6GDDTAf/1ccgAFPqn2EpE+VWzxWbGhvtSbuxPiWD9CoBS2rrcr9mV9YUsShkLcSOivXz30sZ+zcZUOmaTHUEdvj7uduqrmVTxdPekMdlLhWVGeC4VtasHO5tydIlT+K/ind8VWBa9aQJIiK8pzmjlJcghu+JfAFo8rkyQI4ASpoJdAF0SwKfa0IwkXSxyD8jmhya4CveoYqrWUSruBoCD4FwFe6QP1R3AlD/QwWm+tWBHecMi6lQFPEmBqQCBc6VgdKq4Jn28X1dIOCOKe4GhW/IA8AM1G+ei4X4vMgAAAABJRU5ErkJggg==", u(prefix + "c.gif")],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAABkCAYAAACCXsDxAAAAVklEQVRoge3MoQFAUABAwRcVSVRFTTHJn8tsFmIF+t0AV9W47uePcd1PdVZHtVdbtVZLNVdTYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWLxt/gFweGiHhjkmgQAAAAASUVORK5CYII=", u(prefix + "v.gif")],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAAAXCAYAAAASloEFAAAAX0lEQVRo3u3YoQ2FAABDwUoMColF4jBMAmvxV4OB+Gs05JrcBM81x3W/dMlrdRNFFBNFFBNFFBNFFBPFRBHFRPlslPP3eGbbXuIkO3WyUScrdbJQJzN1MlEnI3Uy0OUPS/P5ZrQwdlIAAAAASUVORK5CYII=", u(prefix + "h.gif")],
                    m: [u(prefix + "m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABkCAYAAACfIP5qAAAAmklEQVR42u3RAQ0AAAgDIPf+nbXG56ACWepkqCNFClKkIEUKUqQgBSlSkCIFKVKQghQpSJGCFClIQYoUpEhBihSkIEUKUqQgRQpSkCIFKVKQIgUpSJGCFClIkYIUpEhBihSkSEEKUqQgRQpSpCAFKVKQIgUpUpCCFClIkYIUKUhBihSkSEGKFKQgRQpSpCBFClKkIAUpUpDy1QGga5NE1OzMgwAAAABJRU5ErkJggg=="]
                }, "12 11 11 11", {inset: '-3 -9 -11 -2'});
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
                    c: [u(prefix + "c.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAjCAYAAACZ6FpfAAACI0lEQVRIx+WUv4sTQRiG39lcIoe33qJos+JVB2kC9vkHhBRqe9WeB4IiaGHhwf0hdlZ7G7TwbLWwS5HmCqtcd1cEjuRisiy6tz/ms3AnmZlsblYEGwde2MDk4XlnPsaCtjw/9Lzu9Hg3CGk3CMkLwiPv8PsjGJYl/9gLpv7t69m7rQ1+f9tJse2k2LKzh7fW6eNeMPUrgZ52J8/ubuQ7mw1CGAMnFwwnFwynUyC6BG408p3n/vlrAEzKEojdWac39RpwNgMmPwlEi8QpYfIDSLB2oEHm35b4uFbHvfOIEKccROVJcr4p/UcBzo1qDIjiHCB+dYBaEavMiAFAlnMQvzoA1kpACyMAyrmsCoB6CUw1Mtb6XU2ABGxuxMTtrTpkOQAaBUwYWcsgXumM9GoKqKhG5iwgyoEroIrVarpNya1VAlk6RJlsAADn5pgm+w/mSF9s6RmpWI2VvQAKqOJAmh+2inNkBv3N+h9A+w9u4v3LljH/xIgAUJqm30ybx+PxVwC5FF6EhBGNRqO3JlC/3z/SAGKwaG7kuq4fRVF3FWQ4HH7qdDpfSmy4Ug0At237xWAweDWbzT4LQBRFg16vd+C67j6AtEgmwUg2EuS82WweOo7zhDHWYoy1bNt+3G63PwBIighQpp+RAio2JABiKZdFEslKVFSMSIKIjXEJLCmppt6aZJRrINkmKbPRjUirp9dJpLNRbOTJphVW+i3pAPH20i/DUWKmoE/7VQAAAABJRU5ErkJggg==", u(prefix + "c.gif")],
                    v: [u(prefix + "v.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA+CAYAAAAmoEsaAAAAPklEQVRYhe3MoRGAMAAAsUhMHbKysvuvB4YBeof9DBC4MJ5D2FiYuDG+o6ioqKioqKioqKioqKioqKjob/QC+8jQBMwfUwoAAAAASUVORK5CYII=", u(prefix + "v.gif")],
                    h: [u(prefix + "h.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAAjCAYAAADCIMduAAAAs0lEQVRo3u3XsRGCQBCF4X+BAizBxMKszrosQSMR5AzEmeMkctDk/k3Jvnlv2Yvj6ZpwFtMddoMKJcr5EvSjEAuU22B7PlBSmlQoURBlJSmTKCv1cadYHxetO2XL+rhTrI8o39bHneKdYn083rxTfjqNBKKIIsqGE8lDxaSIIoooovz97wPsgQ5oZ6Qm+1bpgxDuwCNDiZpB3ih9kZIwKa+ktFlCRAHGuT5hdZYoeTqqR3kC7uQ+Qe6nFrEAAAAASUVORK5CYII=", u(prefix + "h.gif")],
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
            },
            list: function(rowHeight) {
                return new uki.background.Rows(rowHeight, '#EDF3FE');
            }
        },
        imageSrcs: {
            'icons-sprite': function() {
                var prefix = "icons/sprite-";
                return [u(prefix + "m.png"), "data:image/png;base64,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", u(prefix + "m.gif")];
            },
            x: function() {
                return [u("x.gif"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII="]; 
            },
            body: function() {
                return [u("body/normal-m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABMCAYAAACs0907AAAARklEQVQYV2P4DwRMDEAAIYA8IAHmglhQMRDBAOKis8Da/kOVYGfBDMVgYdFBhBJiDYV7AcrC6QUUz2A1FN0okoxHVYfiGQDA5GssMx8/9wAAAABJRU5ErkJggg=="];                
            },
            unknown: function() {
                return [u("icons/unknown.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAEIElEQVRIx52Wy28cRRDGf9U9O/uyHRwnJCIhvIQjQIEgLogT4o/mxgGEBAcOSIggJwRC/Ei88Xq9r9l5dRWHmZ3YieKs0yvNzO501Vdb9VV9LWZmrLRKzACJwAKCgAggrLocF9gqEgEQRLAGSFf2EL12h4EBhQmDo2PGoxmTtMALbG10effmNeIIVBXnzo9dVkljkhf88XCP4fEcbx6ziDxfMBkPWV/r8N03X7DW7wJSZXb1NNqpm6Jm7DwacDRKwbcx30IiI4o97X6P/cNn/PTrb6iBoM/tV62ZNVdlPEt5ejTDi0dUEbGqSiI4ccStDvf/2efg6bOaMBcEkwbMcXwyQ1UREZxzmFnDP5EqbSEoj3f3a0u5CJg0N0NI0gJxDkRYllfqwqhqE9ZwNDprf1HqK7BIMzBDgzZAZoYZmBmqihks0vTN+8wwBCFuR2dYZmaVkSpaBkIZAOjE7TcHExwC9DoxZqca1wwzpQwFRZFThoKyLNhYXz/L5gux0QQB+t32S+9UA3mek+UZRZFjKFtXLr8W7PwJYsZ6v4MTanIIqkqRZ2TpgixLKcuCdtzi6tWtc4FeCSanLv1um64vmCSKuBYh5CSLhEUyp0xTLA9cv77J1uZGRSlzryTkawexF+HWO1eZnBwzm42ZjE+YTcbMk4QszzEtuHvnE2Lv36TPXl63blzjyuYaR88OmYxHJLMpeVEQLHB7+z0+vf3hSu5WAFMi7/j8s21MS5JkTihzTBXvhK++vIP3riqXnS9v7qWi1tSu6G6UauwOjrm3s0u/f4mo1SLUQ7ooA9//8DM7Dx+hZiCGacDQxqvVnxck5nRoQlYqw9GM3SdHjCYJRSks0oTxZEgynVIUJSJCFEWsr/XY/uh9Pv7gJlfeWsd7afwZrp6yIKZmiKEEwFMG48nTIfuDMZO5ouJBqhCKIiXNZmTJgjzPEYROt0O7t0EcRUQE1joRN65vcuvm20ReoAaTs2BGmin3HuwxOJkjziOu1Wx0YmgIoEpe5LUSQNRq4V2E9x5VJcsyptMJly+1+Pbru3Tb7SZhzur8m8H9fw8ZjBZI1AZxmAWEgGmJaTUDnY+I2x063R6dbh/vW4gT1Ko6RXFM3Ovx+GDIj7/8XitDNe6c1M17PJoxGE6RyFd/vNYtU6skRRw4V5VeqpNVRYrqndWnLXGOduTodfvc//sx/+0dsJziDgPFcTAYo/V0t1osAZxzzTMv6FnTHPpcfgQQcXjvEXH8+dcDlnLrEMiKwHiWg4vqdEljXOmVVQpdgywJvDxNvfi7qeGcx7ViDg6PKk2swJQ0y0nLUB1aXM2+GqiS/ufK3DisAzCzBrT57j1GZbtY5Exn82VTC3leoBZwvpKWpuNPp/CMSlvz7JxrgljuNwNzijgoS2M6nQLwPw59cHxcVdIaAAAAAElFTkSuQmCC"];
            },
            'toolbar-button-down': function() {
                return [u("button/toolbar-button-down-m.png"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAYCAYAAABKtPtEAAAASElEQVRYw+3UAQ0AQQgDQdLzbwQzSPoX0iFZA4Qhu/s1lymfJJnq3nvTnAuwAD/AD0AAAQQQQAABBBBAAAEEEEAAgTYCdzfN/XZrf4Cm0hHTAAAAAElFTkSuQmCC"];
            }
            
        },
        doms: {
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
                        defaultCss + 'width:100%;height:' + (params.handleWidth) + 'px;' + commonVerticalStyle +
                        'background: url(' + uki.theme.imageSrc('x') + ')');
                
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
                        defaultCss + 'height:100%;width:' + (params.handleWidth) + 'px;' + commonHorizontalStyle + 
                        'background: url(' + uki.theme.imageSrc('x') + ');');
                if (!handle.style.cursor || window.opera) handle.style.cursor = 'e-resize';
                return handle;
            }
        },
        templates: {
            'contacts-render': function() {
                return [
                    '<div style="height:28px;text-align:left;font-size:12px;margin:4px 0 4px 39px;position:relative"><img style="position:absolute;left:-33px;top:-2px;border:1px solid #CCC;width:27px;height:27px;" src="',
                    T, '" />', T, '</div>'
                ];
            },
            'wave-render': function() {
                return [
                    '<div style="height:35px;text-align:left;font-size:13px;line-height:16px;margin:2px 0;position:relative;border-bottom:1px solid #EEE;color:#333">' +
                    '<img style="position:absolute;left:7px;top:2px;border:1px solid #CCC;width:27px;height:27px;" src="',T ,'" />' +
                    '<div style="margin:0 116px 0 104px;height:32px;overflow:hidden;">',T,' &ndash; <span style="color:#999">',T,'</span></div>' + 
                    '<div style="position:absolute;right:0;width:88px;top:0;">',T,'<div style="color:#999">',T,'</div></div></div>'
                ];
            },
            'toolbar-button': function(params) {
                return [
                    T, '<div style="background:',T,';width:', params.size.width, 'px;height:', params.size.height,
                    'px;position:absolute;top:', (params.height - params.size.height)/2, 'px;left:-',params.size.width + 4,'px"></div>'
                ];
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
                return 'color:#333;text-align:center;'
            }
        }
        
    });
    uki.theme.wave.backgrounds['button-hover'] = uki.theme.wave.backgrounds['button-normal'];
    uki.theme.wave.backgrounds['a-button-hover'] = uki.theme.wave.backgrounds['a-button-normal'];
    uki.theme.wave.backgrounds['plus-button-hover'] = uki.theme.wave.backgrounds['plus-button-normal'];
    uki.theme.wave.backgrounds['plus-big-button-hover'] = uki.theme.wave.backgrounds['plus-big-button-normal'];
    uki.theme.wave.backgrounds['search-button-down'] = uki.theme.wave.backgrounds['search-button-hover'] = uki.theme.wave.backgrounds['search-button-normal'];
    uki.theme.wave.backgrounds['link-button-down'] = uki.theme.wave.backgrounds['link-button-hover'] = uki.theme.wave.backgrounds['link-button-normal'];
    uki.theme.wave.backgrounds['toolbar-popup'] = uki.theme.wave.backgrounds['popup-normal'];
    uki.theme.wave.backgrounds['toolbar-popup-button-down'] = uki.theme.wave.backgrounds['toolbar-popup-button-hover'];
    
    uki.theme.register(uki.theme.wave);
})();