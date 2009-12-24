function panel (label, args) {
    args = args || {};
    args.childViews = (args.childViews || []).concat({ view: 'Label', rect: '7 6 100 10', anchors: 'left top right', text: label, color: '#FFF', fontSize: '13px' });
    return uki.extend({}, { view: 'Box', name: 'panel', background: 'theme(panel-blue)', rect: '100 100', anchors: 'left top right bottom' }, args);
}

uki({ view: 'SplitPane', id: 'splitMain', rect: '15 50 980 950', anchors: 'left top right bottom', 
    handleWidth: 20, handlePosition: 166, leftMin: 166, rightMin: 600,
    leftChildViews: { view: 'SplitPane', id: 'splitLeft', rect: '166 950', anchors: 'left top right bottom', 
        handleWidth: 16, vertical: true, handlePosition: 200,
        topChildViews: panel('Navigation', { rect: '166 200' }),
        bottomChildViews: panel('Contacts', { rect: '166 714'})
    },
    rightChildViews: { view: 'SplitPane', id: 'splitRight', rect: '840 950', anchors: 'left top right bottom', 
        handleWidth: 20, handlePosition: 300, leftMin: 200, rightMin: 300,
        leftChildViews: panel('Inbox 1 - 4 of 4', { rect: '300 930' }),
        rightChildViews: panel('флдвыаоыдалвоы', { rect: '460 930', background: 'theme(panel-white)' })
    }
}).attachTo(window, '1000 1000', {minSize: '800 400'});

uki('#splitRight').bind('handleMove', function(e) {
    var main = uki('#splitMain')[0];
    if (e.handlePosition > e.dragValue) main.handlePosition(main.handlePosition() - (e.handlePosition - e.dragValue) ).layout();
})
