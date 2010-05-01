include('uki.js');

/**
 * @namespace
 */
uki$theme = (function (uki$theme) { return uki$theme = {
    themes: [],
    
    register: function(theme, /* internal */ themes) {
        (themes = uki$theme.themes)[ themes.length] = theme;
    },
    
    background: function(name, params) {
        return uki$theme._namedResource(name, 'background', params) || new uki.background.Null();
    },
    
    image: function(name, params) {
        return uki$theme._namedResource(name, 'image', params) || new Image();
    },
    
    imageSrc: function(name, params) {
        return uki$theme._namedResource(name, 'imageSrc', params) || '';
    },
    
    style: function(name, params) {
        return uki$theme._namedResource(name, 'style', params) || '';
    },
    
    dom: function(name, params) {
        return uki$theme._namedResource(name, 'dom', params) || uki.createElement('div');
    },
    
    template: function(name, params) {
        return uki$theme._namedResource(name, 'template', params) || '';
    },
    
    _namedResource: function(name, type, params, i, result) {
        for ( i = uki$theme.themes.length - 1, ; i >= 0; i--) {
            if (result = uki$theme.themes[i] [type](name, params))
				return result;
        };
        return null;
        
    }
}; })();