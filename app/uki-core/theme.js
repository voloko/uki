include('../uki.js');

uki.theme = {
    themes: [],
    
    register: function(theme) {
        uki.theme.themes.push(theme);
    },
    
    background: function(name, params) {
        return uki.theme._namedResource(name, 'background', params);
    },
    
    image: function(name, params) {
        return uki.theme._namedResource(name, 'image', params);
    },
    
    _namedResource: function(name, type, params) {
        for (var i = uki.theme.themes.length - 1; i >= 0; i--){
            var result = uki.theme.themes[i][type](name, params);
            if (result) return result;
        };
        return null;
        
    }
};