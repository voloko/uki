/**
@example_title Custom View
@example_order 80
@example_html
    <script src="customView.js"></script>
*/

var uki = require('uki');

var Img = uki.view.newClass('Image', uki.view.Base, {
    _createDom: function(initArgs) {
        this._dom = uki.createElement('img');
    },

    // manually set/get alt
    src: function(value) {
        if (value === undefined) return this._dom.src;
        this._dom.src = value;
        return this;
    },

    // delegate alt property to this._dom
    alt: uki.newDelegateProp('_dom', 'alt'),

    // simple accessor, will store value in _lowResSrc
    lowResSrc: uki.newProp('lowResSrc'),

    // simple accessor, will store value in _highResSrc
    highResSrc: uki.newProp('highResSrc'),

    _layout: function() {
        var src;

        if (this._dom.offsetWidth > 500 && this.highResSrc()) {
            src = this.highResSrc();
        } else if (this.lowResSrc()) {
            src = this.lowResSrc();
        } else {
            src = this.src();
        }

        if (this.src() != src) {
            this.src(src);
        }
    }

});


uki.builder.namespaces.unshift({ Image: Img });
uki({ view: 'Image',
    lowResSrc: './small.jpg', highResSrc: './large.jpg',
    pos: 'l:10px t:10px w:80%'
}).attach();


// Photo by Andreas Wonisch
// http://www.flickr.com/photos/andywon/4156354820/
// LICENSE
// http://creativecommons.org/licenses/by-nc/2.0/
