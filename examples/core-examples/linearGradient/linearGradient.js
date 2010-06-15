/**
@example_title uki Linear Gradient
@example_order 4200
@example_html
    <style>body, html { overflow: hidden; margin: 0; padding: 0; }</style>
    <script src="/src/uki.cjs"></script>
    <script src="linearGradient.js"></script>
*/

uki({ 
    view: 'Box', 
    rect: '100 100 100 100', 
    anchors: 'left top',
    background: new uki.background.LinearGradient({
        startColor: '#FFFFFF',
        endColor: '#E6E6E6',
        css: ';border: 1px solid #CCC;'
    })
}).attachTo(window, '1000 1000');

uki(
    { 
        view: 'Box', 
        rect: '1000 80', 
        anchors: 'left top right',
        background: new uki.background.LinearGradient({
            startColor: '#E4E5EB',
            endColor: '#AFB2B8',
            stops: [ { pos: 0.75, color: '#ADAEB3' } ]
        }),
        childViews: [
            {
                view: 'Label',
                rect: '100 28 100 44',
                anchors: 'left top',
                text: 'Button',
                style: { textAlign: 'center', fontWeight: 'bold', color: '#333' },
                background: new uki.background.LinearGradient({
                    startColor: '#FDFEFF',
                    stops: [ 
                        { pos: 0.15, color: '#F5F7FD' },
                        { pos: 0.8, color: '#C9CACF' }
                    ],
                    endColor: '#C7CBD2',
                    
                    innerHTML: '<div style="position:absolute;z-index:1;left:1px;bottom:0px;right:1px;height:1px;overflow:hidden;background:rgba(255,255,255,0.4)"></div>',
                    css: 'border:1px solid #666;' +
                        '-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;' +
                        'box-shadow:0 1px 0 rgba(255,255,255,0.5);-webkit-box-shadow:0 1px 0 rgba(255,255,255,0.5);' +
                        '-moz-box-shadow:0 1px 0 rgba(255,255,255,0.5);'
                })
            },
            {
                view: 'Label',
                rect: '340 28 100 44',
                anchors: 'left top',
                text: 'Hover',
                style: { textAlign: 'center', fontWeight: 'bold', color: '#333' },
                background: new uki.background.LinearGradient({
                    startColor: '#FFFFFF',
                    stops: [ 
                        { pos: 0.7, color: '#D7DAE4' }
                    ],
                    endColor: '#D9DEE6',
                    css: 'border:1px solid #666;' + uki.browser.cssBorderRadius() + ':3px;' + uki.browser.cssBoxShadow() + ':0 1px 0 rgba(255,255,255,0.5);'
                })
            },
            
            { view: 'Button', rect: '220 28 100 44', anchors: 'left top', text: 'Original' }
        ] 
    }
).attachTo(window, '1000 1000');

uki({ 
    view: 'Box', 
    rect: '250 100 400 400', 
    anchors: 'left top',
    background: new uki.background.LinearGradient({
        startColor: '#FFFFFF',
        endColor: '#E6E6E6',
        css: ';border: 1px solid #CCC;',
        stops: [
            { pos: 0.5, color: '#CCCCCC' }
        ],
        horizontal: true
    })
}).attachTo(window, '1000 1000');
