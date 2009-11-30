include('../uki.js');

uki.theme = {
    themes: [],
    
    register: function(theme) {
        this.themes.push(theme);
    },
    
    background: function(name) {
        return this._namedResource(name, 'background');
    },
    
    image: function(name) {
        return this._namedResource(name, 'image');
    },
    
    _namedResource: function(name, type) {
        for (var i = this.themes.length - 1; i >= 0; i--){
            var result = this.themes[i][type](name);
            if (result) return result;
        };
        return null;
        
    }
};