/** @example_title Wave layout
    @example_order 1000 */
document.body.style.backgroundImage = 'url(' + uki.theme.imageSrc('body') + ')';
var ContactsRender = {
    template: uki.theme.template('contacts-render'),
    render: function(data, rect, i) {
        return uki.extend(this.template, [undefined, uki.theme.imageSrc('unknown'), undefined, data[0] || data[1]]).join('');
    },
    setSelected: function(container, data, state, focus) {
        container.style.backgroundColor = state && focus ? '#E0E8A4' : state ? '#CCC' : '';
    }
};
var WaveRender = uki.extend({}, ContactsRender, {
    template: uki.theme.template('wave-render'),
    render: function(data, rect, i) {
        return uki.extend(this.template, [undefined, uki.theme.imageSrc('unknown'), undefined, data[0], undefined, data[1], undefined, data[2], undefined, data[3] + ' msgs']).join('');
    }
});

function toolbarButton (label, offset) {
    var html = uki.extend(uki.theme.template('toolbar-button', {height: 24, size: new uki.geometry.Size(16, 16)}), [label, undefined, 'url('+uki.theme.imageSrc('icons-sprite')+') ' + offset]);
    return { html: html.join(''), inset: '0 8 0 28', style: { fontWeight: 'normal', fontSize: '11px', textAlign: 'left', color: '' } };
}

function menuButton (label, offset, rect) {
    return uki.extend(toolbarButton(label, offset), { view: 'Button', style: { textAlign: 'left', fontSize: '13px', fontWeight: 'normal', color: '' }, rect: rect, backgroundPrefix: 'link-button-', focusable: 'false', anchors: 'left top right', inset: '0 8 0 30', focusable: false });
}

function panel (label, args) {
    args.childViews = (args.childViews || []).concat({ view: 'Label', rect: '7 6 100 13', anchors: 'left top right', text: label, style: { color: '#FFF', fontSize: '13px' } });
    return uki.extend({}, { view: 'Box', name: 'panel', background: 'theme(panel-blue)', rect: '100 100', anchors: 'left top right bottom' }, args);
}

uki({ view: 'HSplitPane', id: 'splitMain', rect: '15 50 975 950', minSize: '800 400', anchors: 'left top right bottom', handleWidth: 15, handlePosition: 166, leftMin: 166, rightMin: 600,
    leftChildViews: { view: 'VSplitPane', id: 'splitLeft', rect: '166 950', anchors: 'left top right bottom', handleWidth: 16, handlePosition: 200, bottomMin: 230, topMin: 120,
        topChildViews: panel('Navigation', { rect: '166 200', background: 'theme(panel-white)', childViews: [
            { view: 'ScrollPane', rect: '0 24 166 170', anchors: 'left top right bottom', childViews: [
                { view: 'VFlow', rect: '0 0 166 168', anchors: 'left top right', childViews: [
                    menuButton('Inbox', '-176px 0', '166 24'), menuButton('All', '-160px 0', '0 2 166 24'), menuButton('By me', '-192px 0', '0 0 166 24'), menuButton('Requests', '-240px 0', '0 0 166 24'), menuButton('Spam', '-208px 0', '0 0 166 24'), menuButton('Settings', '-240px 0', '0 0 166 24'), menuButton('Trash', '-223px 0', '0 0 166 24')
                ] }
            ] }
        ]}),
        bottomChildViews: panel('Contacts', { rect: '166 714', childViews: [
            { view: 'Box', rect: '0 23 166 70', background: 'theme(box-lblue-top)', anchors: 'left top right', childViews: [
                { view: 'Image', rect: '7 6 27 27', anchors: 'left top', src: 'voloko.jpg', background: 'theme(thumb)' },
                { view: 'Label', rect: '40 8 100 13', anchors: 'left top', text: 'Volodya', style: { fontWeight: 'bold', fontSize: '13px' }, textSelectable: true },
                { view: 'TextField', rect: '16 41 120 24', anchors: 'left top right', style: { fontSize: '12px' }, backgroundPrefix: 'search-', value: '', placeholder: 'Search contacts' },
                { view: 'Button', rect: '139 46 13 13', anchors: 'right top', backgroundPrefix: 'search-button-', focusable: false }
            ] },
            { view: 'ScrollPane', rect: '0 93 166 586', anchors: 'left top right bottom', childViews: [
                { view: 'List', id: "contactsList", rect: '166 586', anchors: 'left top right bottom', minSize: '0 100', rowHeight: 34, render: ContactsRender }
            ] },
            { view: 'Box', rect: '0 678 166 32', background: 'theme(box-lblue-bottom)', anchors: 'left bottom right', childViews: [
                { view: 'Label', rect: '7 13 90 12', anchors: 'left top', style: { fontSize: '12px' }, html: '<u>Manage contacts</u>', background: 'theme(link)' },
                { view: 'Button', rect: '136 10 24 18', backgroundPrefix: 'plus-button-', anchors: 'right bottom', focusable: false }
            ] }
        ] })
    },
    rightChildViews: { view: 'HSplitPane', id: 'splitRight', rect: '795 950', anchors: 'left top right bottom', handleWidth: 15, handlePosition: 300, leftMin: 300, rightMin: 300,
        leftChildViews: panel('Inbox 1 - 4 of 4', { rect: '300 930', childViews: [
            { view: 'Box', rect: '0 23 300 56', background: 'theme(box-lblue)', anchors: 'left top right', childViews: [
                { view: 'Button', rect: '7 16 70 24', anchors: 'left top', text: 'New wave', style: { fontWeight: 'normal', fontSize: '11px' }, focusable: false },
                { view: 'TextField', rect: '90 16 180 24', anchors: 'left top right', style: { fontSize: '12px' }, backgroundPrefix: 'search-', value: 'in:inbox', placeholder: 'Search waves' },
                { view: 'Button', rect: '274 21 13 13', anchors: 'right top', backgroundPrefix: 'search-button-', focusable: false }
            ] },
            { view: 'Toolbar', rect: '0 79 300 24', anchors: 'left top right', background: 'theme(toolbar-normal)', buttons: [
                toolbarButton('Follow', '0 0'), toolbarButton('Unfollow', '-16px 0'), toolbarButton('Archive', '-32px 0'), toolbarButton('Inbox', '0 0'), toolbarButton('Spam', '-48px 0'), toolbarButton('Read', '-64px 0'), toolbarButton('Unread', '-80px 0'), toolbarButton('Trash', '-96px 0'), toolbarButton('Move to', '-112px 0')
            ] },
            { view: 'ScrollPane', rect: '0 103 300 791', anchors: 'left top right bottom', childViews: [
                { view: 'List', id: "waveList", rect: '300 791', anchors: 'left top right bottom', background: 'none', textSelectable: false, rowHeight: 38, render: WaveRender }
            ] },
            { view: 'Box', rect: '0 894 300 32', background: 'theme(box-lblue-bottom)', anchors: 'left bottom right', childViews: [
                { view: 'Button', rect: '213 7 80 24', anchors: 'right bottom', text: 'Save search', style: { fontWeight: 'normal', fontSize: '11px' }, focusable: false }
            ] }
        ] }),
        rightChildViews: panel('Simplicity is the key', { rect: '470 930', background: 'theme(panel-blue)', childViews: [
            { view: 'Box', rect: '0 23 470 56', background: 'theme(box-lblue)', anchors: 'left top right', childViews: [
                { view: 'Image', rect: '7 7 40 40', anchors: 'left top', src: 'voloko.jpg', background: 'theme(thumb)' },
                { view: 'Button', rect: '58 16 33 24', backgroundPrefix: 'plus-big-button-', anchors: 'left bottom', focusable: false }
            ] },
            { view: 'Toolbar', rect: '0 79 470 24', anchors: 'left top right', background: 'theme(toolbar-normal)', buttons: [
                toolbarButton('Reply', '-128px 0'), toolbarButton('Playback', '-144px 0'), toolbarButton('Unfollow', '-16px 0'), toolbarButton('Archive', '-32px 0'), toolbarButton('Spam', '-48px 0'), toolbarButton('Read', '-64px 0'), toolbarButton('Unread', '-80px 0'), toolbarButton('Trash', '-96px 0'), toolbarButton('Move to', '-112px 0')
            ] },
            { view: 'Label', id: 'message', rect: '0 103 470 791', anchors: 'left top right bottom', multiline: true, scrollable: true, inset: '2 2', textSelectable: true },
            { view: 'Box', rect: '0 894 470 32', background: 'theme(box-lblue-bottom)', anchors: 'left bottom right', childViews: [
                { view: 'Label', rect: '7 13 30 12', anchors: 'left top', fontSize: '12px', text: 'Tags:' },
                { view: 'Button', rect: '45 10 24 18', backgroundPrefix: 'plus-button-', anchors: 'left bottom', focusable: false },
                { view: 'Button', rect: '343 7 65 24', anchors: 'right bottom', text: 'Images', backgroundPrefix: 'a-button-', inset: '0 16 0 2', style: { fontWeight: 'normal', fontSize: '11px' }, focusable: false },
                { view: 'Button', rect: '413 7 50 24', anchors: 'right bottom', text: 'Files', backgroundPrefix: 'a-button-', inset: '0 16 0 2', style: { fontWeight: 'normal', fontSize: '11px' }, focusable: false }
            ] }
        ] })
    }
}).attachTo(window, '1000 1000');

uki('#splitRight').bind('handleMove', function(e) {
    if (e.handlePosition > e.dragValue) uki('#splitMain').handlePosition(uki('#splitMain').handlePosition() - (e.handlePosition - e.dragValue) ).layout();
});

uki('#splitRight').handlePosition(400).layout();
uki('#contactsList').data(contacts).parent().layout();
uki('#waveList').data(waves).parent().layout();
uki('#message').html( document.getElementById('message').innerHTML );