uki.theme.airport = {
    imagePath: '/app/theme/airport/i/',
    
    backgrounds: {
        'button-normal': function() {
            var prefix = 'button/button-normal-';
            return new uki.background.Sliced9({
                tl: uki.image(prefix + "tl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAGUlEQVQIHWNkAIKZM2f+B9FgxuHDh/+DAABxngza32CAkwAAAABJRU5ErkJggg=="),
                t: uki.image(prefix + "t.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAACCAYAAABxAQMMAAAAHUlEQVQoFWOcOXPmf4ZRMCJDgPE/EIxIn496mgEA/McGyUnu7uQAAAAASUVORK5CYII="),
                tr: uki.image(prefix + "tr.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAHklEQVQIHWOYOXPmfxBmAALG/0Bw5MgRhmvXrjEAALhTDmA1oyQ0AAAAAElFTkSuQmCC"),
                l: uki.image(prefix + "l.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAUCAYAAABI+4ecAAAAUElEQVQYGVWPWwoAMQgD02Xv/+9ZNe0+FIyFFoeMSmFmh/v898Z7Ir4XSOBuYEWlpVdA0SiJuwA5NO+eCEkmUDSqRt0zenCtHr0gUHV+DkUP16g2cGIlxJkAAAAASUVORK5CYII="),
                m: uki.image(prefix + "m.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAUCAYAAACkjuKKAAAAiklEQVRoBe2YgRHAIAjEtPf7L6xocY7EDUJ4Dpl17h0+ZAWyN5Jb6K5Adh0LAa1AyuhD1b/kK58sv7DwdPBUufFRmyBrKR8rv8qxD5a/qOx47t72TT61C5RPNd/cfeFz7FP994XPsc+V7z+f6v6dd00+1X7GN6nseO7MoXxqF0T3VPX91Rvax9r/AWTuL65ROZiEAAAAAElFTkSuQmCC"),
                r: uki.image(prefix + "r.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAUCAYAAABI+4ecAAAAT0lEQVQYGXWNQQ6AQAgDi+H/D1B/Ct11zcZQDnLqpAMYx5xYc18nPPONezw5vgynVEsrbwFFozQRAmTTonbagQ4Ujb9/2g4Oq9MGAclwCD2vTDF/OTb4xAAAAABJRU5ErkJggg=="),
                bl: uki.image(prefix + "bl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJ0lEQVQIHWOcOXPmf2FRcQZpWSUGxv///6c1NzfPZAACRhABEgDRAAjZDE9tsp2AAAAAAElFTkSuQmCC"),
                b: uki.image(prefix + "b.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAADCAYAAAC6XdCpAAAAKklEQVQ4EWO8cfvBf4ZRMCJDgGXV8kUj0uOjnmZgYPz//3/aaECMzBAAANNJCO9ApSmhAAAAAElFTkSuQmCC"),
                br: uki.image(prefix + "br.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAALUlEQVQIHWO8cfvB/7evXzBcuXyRgVlMVKjh/r27DEVFRekM////TwNhBiAAAMBFFKkAP7lxAAAAAElFTkSuQmCC")
            });
        },
        'button-hover': function() {
            var prefix = 'button/button-hover-';
            return new uki.background.Sliced9({
                tl: uki.image(prefix + "tl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAGUlEQVQIHWNkAIKZM2f+B9FgxuHDh/+DAABxngza32CAkwAAAABJRU5ErkJggg=="),
                t: uki.image(prefix + "t.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAACCAYAAABxAQMMAAAAHUlEQVQoFWOcOXPmf4ZRMCJDgPE/EIxIn496mgEA/McGyUnu7uQAAAAASUVORK5CYII="),
                tr: uki.image(prefix + "tr.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAHklEQVQIHWOYOXPmfxBmAALG/0Bw5MgRhmvXrjEAALhTDmA1oyQ0AAAAAElFTkSuQmCC"),
                l: uki.image(prefix + "l.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAUCAYAAABI+4ecAAAAUklEQVQYGXVP0Q6AQAjiqv9/918PqbRNfchNNwaCwsxEV/SFp5zvBALQvYB3sNmZAX5lksqNzKAM7Ttkl6nLdgsdbuOcda7KQZrlP0gCR/DfuAEaWjenekNpMAAAAABJRU5ErkJggg=="),
                m: uki.image(prefix + "m.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAUCAYAAACkjuKKAAAAh0lEQVRoBe2YgRHAIAgDtc3+EwuWzvHvBskfkbCr710+pAPpQupW9DiQ6tYIqANp4UPRz+SfcvKp9OfPFz4XvrFPZW/sY8mP8FxrPpZ/qiz6VPpWPSr5P/arvO5S+aeusY+F38eej4Xvtk9F73mXS36UZ78bbQBZfJbLPpZ/loOPhf9glSt8fbQKMOVrbMrKAAAAAElFTkSuQmCC"),
                r: uki.image(prefix + "r.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAUCAYAAABI+4ecAAAAVElEQVQYGXVOwRGAMAwimv0H0I5aEmurJnnICw4OEJo7Btp5QI03XVCavXw4WXRmp4jfmK+Z2ahkDNVqcr55Yp5jPY2WtnJHdonXiDIowsD2ZQa5APbTMra7CQFkAAAAAElFTkSuQmCC"),
                bl: uki.image(prefix + "bl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJ0lEQVQIHWOcOXPmfykZBQY1TV0Gxv///zc0NzfXMwABI4gACYBoABCSDKJ79YJDAAAAAElFTkSuQmCC"),
                b: uki.image(prefix + "b.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAADCAYAAAC6XdCpAAAAKklEQVQ4EWN88uLdf4ZRMCJDgGXerCkj0uOjnmZgYPz//3/DaECMzBAAAFQtCQnoB3mQAAAAAElFTkSuQmCC"),
                br: uki.image(prefix + "br.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAALUlEQVQIHWN88uLd/2ePHzCcP3eagVmAj7vhzp1bDEVFRY0M////bwBhBiAAAMF6FNsFCPTfAAAAAElFTkSuQmCC")
            });
        },
        'button-down': function() {
            var prefix = 'button/button-down-';
            return new uki.background.Sliced9({
                tl: uki.image(prefix + "tl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAHElEQVQIHWNkAIKGhob/IJoRxPjw4SPDl6/fGQBl+QqyGaNjjQAAAABJRU5ErkJggg=="),
                t:  uki.image(prefix + "t.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAACCAYAAABxAQMMAAAAJUlEQVQoFWNsaGj4zzAKRmQIsLx+846BiYlpRHp+JHv6379/DACHrwhKT+bKvAAAAABJRU5ErkJggg=="),
                tr: uki.image(prefix + "tr.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAHklEQVQIHWNoaGj4D8IMQMCYkprxn4ebk0FAgJ8BAIF+B384jBW0AAAAAElFTkSuQmCC"),
                l:  uki.image(prefix + "l.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAUCAYAAABI+4ecAAAAfUlEQVQYGVWN3QrDMAhGP/9206Zr2AvnjTd6PzKNUlhA8PidKI0x5vtz4TieUPjr5wtn7+CAbd/QWkswe0BEE1gZYpKgbFCxSsQTr7VARCBaWnwOtRJXPF0Qza2Zg2ndATGIKLVobgATotYCbxGV8KfF3JfknVIWfOfE9MEPwjwLJWHYWMEAAAAASUVORK5CYII="),
                m:  uki.image(prefix + "m.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAUCAYAAACkjuKKAAAApUlEQVRoBe3awQ3DMAxDUdqiT80x6MbtoUPbVYFu8ZkNqKcItqHxen/OnFP5WBXYe8v3/dQYrOBJK50j+boejR99WkOc1re9aLmT918B16oUA1oBtz40emK7Kn8+tQ1cDj4WP2OfSt9XvYx9Mn7GPlbfy8aGpwf3GHnXpzZB4+dpF4uvGXwsfuip9H3Vy9gH4ysHPqy+c9bH2su90JFlDqD/b5njCzGjD7gVMqRzAAAAAElFTkSuQmCC"),
                r:  uki.image(prefix + "r.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAUCAYAAABI+4ecAAAAgUlEQVQYGVWNwQoCMQxEp5nEy1pRFj9XwU92ryI1042ghTZ9yeu03e6PsW1PXM4n+LpeQXMAL1jvHctxSQCMdEQcCoIwtx2cAbeoCS3dmtAJkqWlohAty7iEH02NOQnPf77QWgNaaYLZUAAsJ9oClf0q+NPm49KUs2dlHQnvoRP4AJvlDAI3hV/6AAAAAElFTkSuQmCC"),
                bl: uki.image(prefix + "bl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJElEQVQIHWNsaGj4z8cnyKChpcfAyAAEIAEQDeb8//8/DcQBALXtCRI9QRqeAAAAAElFTkSuQmCC"),
                b:  uki.image(prefix + "b.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAADCAYAAAC6XdCpAAAAMklEQVQ4EWM8eOTUf0YGRoZRMLJC4D/DfwaW/Xu2jSxfj/oWHgKM////T4PzRhkjKgQAMqUK6ddH5FYAAAAASUVORK5CYII="),
                br: uki.image(prefix + "br.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAKklEQVQIHWPctmP//xvXLjF8+vSegeXUiYMMINDQ0MDI8P///zQQBgkAAKPHEx/Del6kAAAAAElFTkSuQmCC")
            });
        },
        'panel': function() {
            var prefix = 'panel/panel-';
            return new uki.background.Sliced9({
                t: uki.image(prefix + "t.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAIElEQVQIHWNcvnzFfwYiAOP379+JUsjy/v0HIsxjYAAACIoJrr/y//YAAAAASUVORK5CYII="),
                m: uki.image(prefix + "m.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAABnCAYAAAA5WNM5AAAAkklEQVRYCe2XSwqAMAxEq3j/G9ajtIKYXQhvMVLEcVNoh3xehoBb7+ds4NuB5pZg4TEnytxwRCzUp9ZHXNiMU5dm189aH3HhCHEzFpY24yMcY5SR4lEPnNdIlz2vkXa9skZ9144Ybs5O7h5zzPjFnTkGifT8Jx6+SOlq1nPkNXoBpNZ+LvFkMHALK94v/OR+AfgFT2rKGho++KkAAAAASUVORK5CYII="),
                b: uki.image(prefix + "b.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAGElEQVQIHWPk5ua+wEAEYASqcSBCHfFKAIURATRo4K6PAAAAAElFTkSuQmCC")
            })         
        }
    }
};

uki.theme.airport.backgrounds['button-disabled'] = uki.theme.airport.backgrounds['button-normal'];

uki.theme.register(uki.theme.airport);