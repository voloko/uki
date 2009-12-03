include('../uki.js');

uki.theme = {
    themes: [],
    
    register: function(theme) {
        uki.theme.themes.push(theme);
    },
    
    background: function(name) {
        return uki.theme._namedResource(name, 'background');
    },
    
    image: function(name) {
        return uki.theme._namedResource(name, 'image');
    },
    
    _namedResource: function(name, type) {
        for (var i = uki.theme.themes.length - 1; i >= 0; i--){
            var result = uki.theme.themes[i][type](name);
            if (result) return result;
        };
        return null;
        
    }
};