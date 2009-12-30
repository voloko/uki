uki({ view: 'Flow', rect: '10 10 100 0', anchors: 'left top', background: '#CCC', className: 'flow', childViews: [
    { view: 'Label', rect: '0 0 100 100', anchors: 'left top', inset: '1 5', multiline: true, html: '<a href="#">Link 1</a>' }
]}).attachTo(window, '100 100');

uki({ view: 'HorizontalFlow', rect: '120 10 0 100', anchors: 'left top', background: '#CCC', horizontal: true, className: 'flow', childViews: [
    { view: 'Label', rect: '0 0 100 100', anchors: 'left top', inset: '1 5', multiline: true, html: '<a href="#">Link 1</a>' },
    { view: 'Label', rect: '0 0 100 100', anchors: 'left top', inset: '1 5', multiline: true, html: '<a href="#">Link 2</a>' }
]}).attachTo(window, '100 100');


for (var i=1; i < 11; i++) {
    var l = uki({ view: 'Label', rect: '0 0 100 20', anchors: 'left top', inset: '1 5', html: '<a href="#">Link ' + (i+1) + '</a>' });
    uki('Flow:eq(0)').append(l);
    l = uki({ view: 'Label', rect: '0 0 100 20', anchors: 'left top', inset: '1 5', html: '<a href="#">Link ' + (i+1) + '</a>' });
    uki('Flow:eq(1)').append(l);
};
uki('Flow:eq(0)').resizeToContents('height').layout();
uki('Flow:eq(1)').resizeToContents('width').layout();

uki({ view: 'Button', rect: '0 0 100 22', text: 'Remove' }).attachTo(window, '100 100').click(function() {
    uki('Flow:eq(0)').removeChild(uki('Flow:eq(0)').childViews()[1]).resizeToContents('height').layout();
});

uki({ view: 'Button', rect: '0 30 100 22', text: 'Remove from list 2'}).attachTo(window, '100 100')
.resizeToContents('width').layout().click(function() {
    uki('Flow:eq(1)').removeChild(uki('Flow:eq(1)').childViews()[1]).resizeToContents('width').layout();
})