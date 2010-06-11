/**
@example_title uki.more Linear Gradient
@example_order 4200
@example_html
    <style>body, html { overflow: hidden; margin: 0; padding: 0; }</style>
    <script src="/src/uki.cjs"></script>
    <script src="/src/uki-more.cjs"></script>
    <script src="linearGradient.js"></script>
*/

uki({ 
    view: 'Box', 
    rect: '100 100 100 100', 
    anchors: 'left top',
    background: new uki.more.background.LinearGradient({
        startColor: '#FFFFFF',
        endColor: '#E6E6E6',
        css: ';border: 1px solid #CCC;'
    })
}).attachTo(window, '1000 1000');

uki({ 
    view: 'Box', 
    rect: '250 100 400 400', 
    anchors: 'left top',
    background: new uki.more.background.LinearGradient({
        startColor: '#FFFFFF',
        endColor: '#E6E6E6',
        css: ';border: 1px solid #CCC;',
        horizontal: true
    })
}).attachTo(window, '1000 1000');
