include('../uki.js');

uki.initNativeLayout = function() {
    if (uki.supportNativeLayout === undefined) {
        uki.dom.probe(
            uki.createElement(
                'div', 
                'position:absolute;width:100px;height:100px;left:-999em;', 
                '<div style="position:absolute;left:0;right:0"></div>'
            ),
            function(div) {
                uki.supportNativeLayout = div.childNodes[0].offsetWidth == 100;
            }
        );
    }
};

// uki.supportNativeLayout = false;