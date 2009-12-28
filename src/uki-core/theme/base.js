include('../theme.js');

uki.theme.Base = {
    images: [],
    backgrounds: [],
    doms: [],
    styles: [],
    templates: [],
    
    background: function(name, params) {
        return this.backgrounds[name] && this.backgrounds[name](params);
    },

    image: function(name, params) {
        return this.images[name] && uki.image.apply(uki, this.images[name](params));
    },
    
    imageSrc: function(name, params) {
        return this.images[name] && uki.imageSrc.apply(uki, this.images[name](params));
    },
    
    dom: function(name, params) {
        return this.doms[name] && this.doms[name](params);
    },
    
    style: function(name, params) {
        return this.styles[name] && this.styles[name](params);
    },
    
    template: function(name, params) {
        return this.templates[name] && this.templates[name](params);
    }
};