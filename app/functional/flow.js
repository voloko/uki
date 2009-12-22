uki({ view: 'Flow', rect: '10 10 100 100', anchors: 'left top', background: '#CCC', className: 'flow', childViews: [
    { view: 'Label', rect: '0 0 100 100', anchors: 'left top', inset: '1 5', autosizeToContents: 'height', multiline: true, html: '<a href="#">Link 1</a>' }
]}).attachTo(window, '100 100');

uki({ view: 'Flow', rect: '120 10 200 100', anchors: 'left top', background: '#CCC', horizontal: true, className: 'flow', childViews: [
    { view: 'Label', rect: '0 0 100 100', anchors: 'left top', inset: '1 5', autosizeToContents: 'height', multiline: true, html: '<a href="#">Link 1</a>' },
    { view: 'Label', rect: '0 0 100 100', anchors: 'left top', inset: '1 5', autosizeToContents: 'height', multiline: true, html: '<a href="#">Link 2</a>' }
]}).attachTo(window, '100 100');


for (var i=1; i < 11; i++) {
    var l = uki({ view: 'Label', rect: '0 0 100 20', anchors: 'left top', inset: '1 5', autosizeToContents: 'height', html: '<a href="#">Link ' + (i+1) + '</a>' });
    uki('Flow:eq(0)').append(l);
    l = uki({ view: 'Label', rect: '0 0 100 20', anchors: 'left top', inset: '1 5', autosizeToContents: 'height', html: '<a href="#">Link ' + (i+1) + '</a>' });
    uki('Flow:eq(1)').append(l);
};
uki('Flow:eq(0)').resizeToContents().layout();
uki('Flow:eq(1)').resizeToContents().layout();


uki({ view: 'Button', rect: '0 0 100 22', anchors: '', text: 'Remove' }).attachTo(window, '100 100').click(function() {
    uki('Flow:eq(0)').removeChild(uki('Flow:eq(0)').childViews()[1]).resizeToContents().layout();
})

uki({ view: 'Button', rect: '0 30 100 22', text: 'Remove from list 2', autosizeToContents: 'width'}).attachTo(window, '100 100')
.resizeToContents().layout().click(function() {
    uki('Flow:eq(1)').removeChild(uki('Flow:eq(1)').childViews()[1]).resizeToContents().layout();
})