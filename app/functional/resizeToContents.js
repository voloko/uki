uki({
    view: 'Box', rect: '1000 600', anchors: 'left right bottom top', background: '#CCF',
    childViews: [
        {view: 'Box', rect: '790 390 200 200', anchors: 'right bottom', background: '#CCC', childViews: 
            { view: 'Label', rect: '200 200', anchors: 'top left rigth', multiline: 'true',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                inset: '3 3', id: 'target'}
        },
        {view: 'Button', rect: '10 10 100 24', anchors: 'left top', text: 'resize', id: 'doIt' }
    ]
}).attachTo( document.getElementById('test'), '1000 600' )

uki('#doIt').click(function () {
    uki('#target')
        .html(uki('#target').html() + ' Lorem ipsum dolor sit amet, consectetur adipisicing elit ')
        .resizeToContents('height').parent().resizeToContents('height').layout();
});

uki('#doIt').resizeToContents('width').layout();
