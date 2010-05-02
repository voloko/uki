/**
@example_title Slider
@example_order 3122
@example_html
    <div id='test' style='width: 50%; height: 100px; background: #EEE'></div>
    <script src="/src/uki.cjs"></script>
    <script src="slider.js"></script>
*/

uki({ view: 'Box', rect: '500 100', anchors: 'left top right bottom', childViews: [
        { view: 'Label', rect: '10 12 70 18', anchors: 'left top', text: 'Continuous' },
        { view: 'Slider', rect: '90 12 300 18', anchors: 'left right top' },
        { view: 'TextField', rect: '400 10 90 22', anchors: 'right top' },
        { view: 'Label', rect: '10 68 70 18', anchors: 'left top', text: 'With steps' },
        { view: 'Slider', rect: '90 68 300 18', anchors: 'left right top', values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { view: 'TextField', rect: '400 66 90 22', anchors: 'right top' }
    ]})
    .attachTo( document.getElementById('test'), '500 100' );
    
uki('Slider').change(function() {
    this.nextView().value(this.value());
}).change();

