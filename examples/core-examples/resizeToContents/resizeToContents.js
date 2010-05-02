/**
@example_title Resize to contents
@example_order 3071
@example_html
    <div id='test' style='width: 90%; height: 350px;'></div>
    <script src="/src/uki.cjs"></script>
    <script src='resizeToContents.js'></script>
*/


uki({
    view: 'Box', rect: '1000 600', anchors: 'left right bottom top', background: '#CCF',
    childViews: [
        {view: 'Box', rect: '790 390 200 200', // container box
            anchors: 'right bottom', // anchored to the bottom (grow up)
            background: '#CCC', childViews: 
            { view: 'Label', rect: '200 200',  // label with long text
                anchors: 'top left rigth', // anchored to the top right (grow down)
                multiline: 'true',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                inset: '3 3', id: 'target'}
        },
        {view: 'Button', rect: '10 10 100 24', anchors: 'left top', text: 'resize', id: 'doIt' }
    ]
}).attachTo( document.getElementById('test'), '1000 600' )

// on click
uki('#doIt').click(function () {
    uki('#target') 
        .html(uki('#target').html() + ' Lorem ipsum dolor sit amet, consectetur adipisicing elit ') // add more text
        .resizeToContents('height').parent().resizeToContents('height').layout(); // resize to contents and relayout
});

uki('#doIt').resizeToContents('width').layout(); // fix button size
