function panel (label, args) {
    args = args || {};
    args.childViews = (args.childViews || []).concat({ view: 'Label', rect: '7 6 100 10', anchors: 'left top right', text: label, color: '#FFF', fontSize: '13px' });
    return uki.extend({}, { view: 'Box', name: 'panel', background: 'theme(panel-blue)', rect: '100 100', anchors: 'left top right bottom' }, args);
}

uki({ view: 'SplitPane', id: 'splitMain', rect: '15 50 975 950', anchors: 'left top right bottom', 
    handleWidth: 15, handlePosition: 166, leftMin: 166, rightMin: 600,
    leftChildViews: { view: 'SplitPane', id: 'splitLeft', rect: '166 950', anchors: 'left top right bottom', 
        handleWidth: 16, vertical: true, handlePosition: 200, bottomMin: 250, topMin: 120,
        topChildViews: panel('Navigation', { rect: '166 200' }),
        bottomChildViews: panel('Contacts', { rect: '166 714', childViews: [
            { view: 'Box', rect: '0 23 166 70', background: 'theme(box-lblue-top)', anchors: 'left top right', childViews: [
                { view: 'TextField', rect: '16 40 120 24', anchors: 'left top right', fontSize: '12px', 
                    backgroundPrefix: 'search-', value: '', placeholder: 'Search contacts' }
            ] },
            { view: 'Box', rect: '0 678 166 32', background: 'theme(box-lblue-bottom)', anchors: 'left bottom right', childViews: [
                { view: 'Label', rect: '7 13 30 12', anchors: 'left top', fontSize: '12px', text: 'Manage contacts', background: 'theme(link)' },
                { view: 'Button', rect: '136 10 24 18', backgroundPrefix: 'plus-', anchors: 'right bottom' }
            ] }
        ] })
    },
    rightChildViews: { view: 'SplitPane', id: 'splitRight', rect: '795 950', anchors: 'left top right bottom', 
        handleWidth: 15, handlePosition: 300, leftMin: 300, rightMin: 300,
        leftChildViews: panel('Inbox 1 - 4 of 4', { rect: '300 930', childViews: [
            { view: 'Box', rect: '0 23 300 56', background: 'theme(box-lblue)', anchors: 'left top right', childViews: [
                { view: 'Button', rect: '7 16 70 24', anchors: 'left top', text: 'New wave', fontWeight: 'normal', 
                    fontSize: '11px', focusable: false },
                { view: 'TextField', rect: '90 16 180 24', anchors: 'left top right', fontSize: '12px', 
                    backgroundPrefix: 'search-', value: 'in:inbox', placeholder: 'Search waves' }
            ] },
            { view: 'Toolbar', rect: '0 79 300 24', anchors: 'left top right', background: 'theme(toolbar-normal)' },
            { view: 'Box', rect: '0 894 300 32', background: 'theme(box-lblue-bottom)', anchors: 'left bottom right', childViews: [
                { view: 'Button', rect: '213 7 80 24', anchors: 'right bottom', text: 'Save search', 
                    fontWeight: 'normal', fontSize: '11px', focusable: false }
            ] }
        ] }),
        rightChildViews: panel('флдвыаоыдалвоы', { rect: '470 930', background: 'theme(panel-blue)', childViews: [
            { view: 'Box', rect: '0 23 470 56', background: 'theme(box-lblue)', anchors: 'left top right' },
            { view: 'Toolbar', rect: '0 79 470 24', anchors: 'left top right', background: 'theme(toolbar-normal)' },
            { view: 'Box', rect: '0 894 470 32', background: 'theme(box-lblue-bottom)', anchors: 'left bottom right', childViews: [
                { view: 'Label', rect: '7 13 30 12', anchors: 'left top', fontSize: '12px', text: 'Tags:' },
                { view: 'Button', rect: '45 10 24 18', backgroundPrefix: 'plus-', anchors: 'left bottom' },
                { view: 'Button', rect: '343 7 65 24', anchors: 'right bottom', text: 'Images', 
                    backgroundPrefix: 'a-', inset: '0 16 0 2', fontWeight: 'normal', fontSize: '11px', focusable: false },
                { view: 'Button', rect: '413 7 50 24', anchors: 'right bottom', text: 'Files', 
                    backgroundPrefix: 'a-', inset: '0 16 0 2', fontWeight: 'normal', fontSize: '11px', focusable: false }
            ] }
        ] })
    }
}).attachTo(window, '1000 1000', {minSize: '800 500'});

uki('#splitRight').bind('handleMove', function(e) {
    var main = uki('#splitMain')[0];
    if (e.handlePosition > e.dragValue) main.handlePosition(main.handlePosition() - (e.handlePosition - e.dragValue) ).layout();
})

document.body.style.backgroundImage = 'url(' + uki.theme.imageSrc('body') + ')';