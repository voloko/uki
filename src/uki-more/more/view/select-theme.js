include("../view.js");

(function() {
    function selectHandle (image, css) {
        return new uki.background.CssBox((css || '') + 'background: url(' + uki.theme.imageSrc(image) + '); background-position: 100% 50%; background-repeat: no-repeat;');
    }
    
    var theme = uki.extend({}, uki.theme.Base, {
        backgrounds: {
            // 'select-list': function() {
            //     
            // },
            // 'select-popup': function() {
            //     
            // },
            'select-normal': function() {
                return new uki.background.Multi(
                    selectHandle('select-handle-normal'),
                    uki.theme.background('button-normal')
                );
            },
            'select-hover': function() {
                return new uki.background.Multi(
                    selectHandle('select-handle-normal'),
                    uki.theme.background('button-hover')
                );
            },
            'select-checked-normal': function() {
                return new uki.background.Multi(
                    selectHandle('select-handle-normal'),
                    uki.theme.background('button-down')
                );
            },
            'select-disabled': function() {
                return new uki.background.Multi(
                    selectHandle('select-handle-normal', 'opacity:0.4;'),
                    uki.theme.background('button-disabled')
                );
            },
            
            'select-popup': function() {
                return uki.theme.background('popup-normal');
            }
        },
        
        imageSrcs: {
            'select-handle-normal': function() {
                return ["select-down-m.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAABkCAYAAABtnKvPAAAAeUlEQVRo3u3SMQ2AMBAFUCQgAQlIQUKTthq6IhEpOIAOTIWFABPvkr/c8IZ/15VStu6rgcPhcDgcDofD4XA4HA6HnybnvNRsF1ke4yGEoUJrA691379SS4xxavDx1c5TSvMBh08Oegv253A4HA6Hw+FwOBwOh8P/ie9z0RuWFOYPhAAAAABJRU5ErkJggg==", "select-down-m.gif"];
            }
        }
    });
    theme.backgrounds['select-checked-hover'] = theme.backgrounds['select-checked-normal'];
    
    uki.theme.register(theme);
})();
