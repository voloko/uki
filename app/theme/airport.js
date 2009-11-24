uki.theme.airport = {
    imagePath: '/app/theme/airport/i/',
    
    backgrounds: {
        'button-normal': function() {
            return new uki.background.Sliced9({
                tl: uki.image("button-normal-tl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAGUlEQVQIHWNkAIKGhob/IBrM2LJly38QAABnTgwXSVYoCQAAAABJRU5ErkJggg=="),
                t: uki.image("button-normal-t.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAACCAYAAABxAQMMAAAAHUlEQVQoFWNsaGj4zzAKRmQIMP4HghHp81FPMwAA0xAGfrxkVwAAAAAASUVORK5CYII="),
                tr: uki.image("button-normal-tr.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAHUlEQVQIHWNoaGj4D8IMQMD4Hwi2bt3KcObMGQYAqdoNf3wXm2AAAAAASUVORK5CYII="),
                l: uki.image("button-normal-l.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAUCAYAAABI+4ecAAAAT0lEQVQYGVWPCQoAMQgD02Uf7r817R4KxkKLQ0alMLPDff574z0R3wskcDewotLSK6BolMRdgByad0+EJBMoGlWj7hk9uFaPXhCoOj+HogeMEjYlUeFPGQAAAABJRU5ErkJggg=="),
                m: uki.image("button-normal-m.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAUCAYAAACkjuKKAAAAiklEQVRoBe2YgRHAIAjEtPf7L6xocY7EDUJ4Dpl17h0+ZAWyN5Jb6K5Adh0LAa1AyuhD1b/kK58sv7DwdPBUufFRmyBrKR8rv8qxD5a/qOx47t72TT61C5RPNd/cfeFz7FP994XPsc+V7z+f6v6dd00+1X7GN6nseO7MoXxqF0T3VPX91Rvax9r/AWTuL65ROZiEAAAAAElFTkSuQmCC"),
                r: uki.image("button-normal-r.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAUCAYAAABI+4ecAAAATklEQVQYGXWNQQ6AQAgDi+Hj6rOhu67ZGMpBTp10AOOYE2vu64RnvnGPJ8eX4ZRqaeUtoGiUJkKAbFrUTjvQgaLx90/bwWF12iAgGQ6hB2YOMTRHmHUwAAAAAElFTkSuQmCC"),
                bl: uki.image("button-normal-bl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAIklEQVQIHWNsaGj4LyuvxKClY8DAyAAEIAEQDQf///9PAwCvUQlIWy3i4gAAAABJRU5ErkJggg=="),
                b: uki.image("button-normal-b.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAADCAYAAAC6XdCpAAAAKklEQVQ4EWO8dPX2f4ZRMCJDgGXd6qUj0uOjnmZgYPz//3/aaECMzBAAAJmsCOlzyDKFAAAAAElFTkSuQmCC"),
                br: uki.image("button-normal-br.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAKklEQVQIHWO8dPX2//t3bzGcP3eagWXd6qUMINDQ0MDI8P///zQwD0gAAIfmD2ftiCCpAAAAAElFTkSuQmCC")
            });
        },
        'button-hover': function() {
            return new uki.background.Sliced9({
                tl: uki.image("button-hover-tl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAGUlEQVQIHWNkAIKZM2f+B9FgxuHDh/+DAABxngza32CAkwAAAABJRU5ErkJggg=="),
                t: uki.image("button-hover-t.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAACCAYAAABxAQMMAAAAHUlEQVQoFWOcOXPmf4ZRMCJDgPE/EIxIn496mgEA/McGyUnu7uQAAAAASUVORK5CYII="),
                tr: uki.image("button-hover-tr.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAHklEQVQIHWOYOXPmfxBmAALG/0Bw5MgRhmvXrjEAALhTDmA1oyQ0AAAAAElFTkSuQmCC"),
                l: uki.image("button-hover-l.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAUCAYAAABI+4ecAAAAUklEQVQYGXVP0Q6AQAjiqv9/918PqbRNfchNNwaCwsxEV/SFp5zvBALQvYB3sNmZAX5lksqNzKAM7Ttkl6nLdgsdbuOcda7KQZrlP0gCR/DfuAEaWjenekNpMAAAAABJRU5ErkJggg=="),
                m: uki.image("button-hover-m.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAUCAYAAACkjuKKAAAAh0lEQVRoBe2YgRHAIAgDtc3+EwuWzvHvBskfkbCr710+pAPpQupW9DiQ6tYIqANp4UPRz+SfcvKp9OfPFz4XvrFPZW/sY8mP8FxrPpZ/qiz6VPpWPSr5P/arvO5S+aeusY+F38eej4Xvtk9F73mXS36UZ78bbQBZfJbLPpZ/loOPhf9glSt8fbQKMOVrbMrKAAAAAElFTkSuQmCC"),
                r: uki.image("button-hover-r.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAUCAYAAABI+4ecAAAAVElEQVQYGXVOwRGAMAwimv0H0I5aEmurJnnICw4OEJo7Btp5QI03XVCavXw4WXRmp4jfmK+Z2ahkDNVqcr55Yp5jPY2WtnJHdonXiDIowsD2ZQa5APbTMra7CQFkAAAAAElFTkSuQmCC"),
                bl: uki.image("button-hover-bl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJklEQVQIHWOcOXPmfykZBQY1TV0GRgYgaGpq+g+iwZz///+ngTgAxg0JiL2HMPQAAAAASUVORK5CYII="),
                b: uki.image("button-hover-b.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAADCAYAAAC6XdCpAAAAKklEQVQ4EWN88uLdf4ZRMCJDgGXerCkj0uOjnmZgYPz//3/aaECMzBAAACDjCO9WqFRwAAAAAElFTkSuQmCC"),
                br: uki.image("button-hover-br.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAALUlEQVQIHWN88uLd/2ePHzCcP3eagVmAj7vhzp1bDMXFxYwM////TwNhBiAAALk+FCpbn8tGAAAAAElFTkSuQmCC")
            });
        },
        'button-down': function() {
            return new uki.background.Sliced9({
                tl: uki.image("button-down-tl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAHElEQVQIHWNkAIKGhob/IJoRxPjw4SPDl6/fGQBl+QqyGaNjjQAAAABJRU5ErkJggg=="),
                t: uki.image("button-down-t.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAACCAYAAABxAQMMAAAAJUlEQVQoFWNsaGj4zzAKRmQIsLx+846BiYlpRHp+JHv6379/DACHrwhKT+bKvAAAAABJRU5ErkJggg=="),
                tr: uki.image("button-down-tr.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAHklEQVQIHWNoaGj4D8IMQMCYkprxn4ebk0FAgJ8BAIF+B384jBW0AAAAAElFTkSuQmCC"),
                l: uki.image("button-down-l.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAUCAYAAABI+4ecAAAAfUlEQVQYGVWN3QrDMAhGP/9206Zr2AvnjTd6PzKNUlhA8PidKI0x5vtz4TieUPjr5wtn7+CAbd/QWkswe0BEE1gZYpKgbFCxSsQTr7VARCBaWnwOtRJXPF0Qza2Zg2ndATGIKLVobgATotYCbxGV8KfF3JfknVIWfOfE9MEPwjwLJWHYWMEAAAAASUVORK5CYII="),
                m: uki.image("button-down-m.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAUCAYAAACkjuKKAAAApUlEQVRoBe3awQ3DMAxDUdqiT80x6MbtoUPbVYFu8ZkNqKcItqHxen/OnFP5WBXYe8v3/dQYrOBJK50j+boejR99WkOc1re9aLmT918B16oUA1oBtz40emK7Kn8+tQ1cDj4WP2OfSt9XvYx9Mn7GPlbfy8aGpwf3GHnXpzZB4+dpF4uvGXwsfuip9H3Vy9gH4ysHPqy+c9bH2su90JFlDqD/b5njCzGjD7gVMqRzAAAAAElFTkSuQmCC"),
                r: uki.image("button-down-r.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAUCAYAAABI+4ecAAAAgUlEQVQYGVWNwQoCMQxEp5nEy1pRFj9XwU92ryI1042ghTZ9yeu03e6PsW1PXM4n+LpeQXMAL1jvHctxSQCMdEQcCoIwtx2cAbeoCS3dmtAJkqWlohAty7iEH02NOQnPf77QWgNaaYLZUAAsJ9oClf0q+NPm49KUs2dlHQnvoRP4AJvlDAI3hV/6AAAAAElFTkSuQmCC"),
                bl: uki.image("button-down-bl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJElEQVQIHWNsaGj4z8cnyKChpcfAyAAEIAEQDeb8//8/DcQBALXtCRI9QRqeAAAAAElFTkSuQmCC"),
                b: uki.image("button-down-b.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAADCAYAAAC6XdCpAAAAMklEQVQ4EWM8eOTUf0YGRoZRMLJC4D/DfwaW/Xu2jSxfj/oWHgKM////T4PzRhkjKgQAMqUK6ddH5FYAAAAASUVORK5CYII="),
                br: uki.image("button-down-br.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAKklEQVQIHWPctmP//xvXLjF8+vSegeXUiYMMINDQ0MDI8P///zQQBgkAAKPHEx/Del6kAAAAAElFTkSuQmCC")
            });
        }
    }
};

uki.theme.airport.backgrounds['button-disabled'] = uki.theme.airport.backgrounds['button-normal'];

uki.theme.register(uki.theme.airport);