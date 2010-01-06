include('../theme.js');

/**
 * @class
 */
uki.theme.Base = {
    images: [],
    imageSrcs: [],
    backgrounds: [],
    doms: [],
    styles: [],
    templates: [],
    
    background: function(name, params) {
        return this.backgrounds[name] && this.backgrounds[name](params);
    },

    image: function(name, params) {
        if (this.images[name]) return this.images[name](params);
        return this.imageSrcs[name] && uki.image.apply(uki, this.imageSrcs[name](params));
    },
    
    imageSrc: function(name, params) {
        if (this.imageSrcs[name]) return uki.imageSrc.apply(uki, this.imageSrcs[name](params));
        return this.images[name] && this.images[name](params).src;
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