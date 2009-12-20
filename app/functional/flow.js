uki({ view: 'Button', rect: '0 0 100 22', anchors: '', text: 'Remove' }).attachTo(window, '100 100');

uki({ view: 'Flow', rect: '10 10 100 100', anchors: 'left top', className: 'flow', childViews: [
    { view: 'Label', rect: '0 0 100 100', anchors: 'left top', autosizeToContents: 'height', multiline: true, html: '<a href="#">Link 1</a>' }
]}).attachTo(window, '100 100');

for (var i=1; i < 11; i++) {
    var l = uki({ view: 'Label', rect: '0 0 100 20', anchors: 'left top', autosizeToContents: 'height', html: '<a href="#">Link ' + (i+1) + '</a>' });
    uki('Flow').append(l);
};
uki('Flow').resizeToContents().layout();

uki('Button').click(function() {
    uki('Flow').removeChild(uki('Flow').childViews()[1]);
})