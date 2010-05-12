include('uki.js');

/**
 * @namespace
 */
(function() {
var self = uki.theme = {
    themes: [],

    register: function(theme, /* internal */ themes) {
        (themes = self.themes)[ themes.length] = theme;
    },

    background: function(name, params) {
        return self._namedResource(name, 'background', params) || new uki.background.Null();
    },

    image: function(name, params) {
        return self._namedResource(name, 'image', params) || new Image();
    },

    imageSrc: function(name, params) {
        return self._namedResource(name, 'imageSrc', params) || '';
    },

    style: function(name, params) {
        return self._namedResource(name, 'style', params) || '';
    },

    dom: function(name, params) {
        return self._namedResource(name, 'dom', params) || uki.createElement('div');
    },

    template: function(name, params) {
        return self._namedResource(name, 'template', params) || '';
    },

    _namedResource: function(name, type, params, i, result) {
        for ( i = self.themes.length - 1 ; i >= 0; i--) {
            if (result = (self.themes[i] [type](name, params)))
				return result;
        };
        return null;
    }
};
})();
