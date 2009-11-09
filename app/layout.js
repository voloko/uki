include('jquery.js');
// layout stress test

function buildPanel (top) {
    var Base = uki.component.Base,
        Label = uki.component.Label;

    var panel = uki.build({
        view: new Base(),
        rect: new uki.geometry.Rect(0, top, d.rect().size.width, 79),
        anchors: 'left top right', autosize: 'width',
        children: [
            {
                view: new Label(),
                name: 'phrase',
                rect: '10px 10px -510px 60px',
                anchors: 'left top right', autosize: 'width',
                text: 'обмен валюты -крон -лиговский -лучший -продавать -заработать -санкт -спб -электронный -мир -выгодный -петербург -продажа -москва -льготный -центр -наличный -сбербанк -заработок -оптовый -табло -курс -банк -круглосуточный -доллар -фунт -пункт'
            },
            {
                view: new Label(),
                rect: '-500px 10 200 20',
                anchors: 'top right',
                text: 'цена 1-го спецразмещения:',
                align: 'right'
            },
            {
                view: new Label(),
                rect: '-500px 25 200 20',
                anchors: 'top right',
                text: 'вход в спецразмещение:',
                align: 'right'
            },
            {
                view: new Label(),
                rect: '-500px 40 200 20',
                anchors: 'top right',
                text: 'цена 1-го места:',
                align: 'right'
            },
            {
                view: new Label(),
                rect: '-500px 55 200 20',
                anchors: 'top right',
                text: 'цена 1-го места:',
                align: 'right'
            },
            {
                view: new Label(),
                rect: '-295 10 50 20',
                anchors: 'top right',
                text: '10,01', align: 'rigth'
            },
            {
                view: new Label(),
                rect: '-295 25 50 20',
                anchors: 'top right',
                text: '9,89', align: 'rigth'
            },
            {
                view: new Label(),
                rect: '-295 40 50 20',
                anchors: 'top right',
                text: '10,00', align: 'rigth'
            },
            {
                view: new Label(),
                rect: '-295 55 50 20',
                anchors: 'top right',
                text: '1,73', align: 'rigth'
            },
            {
                view: new uki.component.Input(),
                rect: '-215 9 60 20',
                anchors: 'top rigth'
            }
        ]
    });
    
    panel.domStyle().backgroundColor = '#EEE';
    panel.domStyle().borderBottom = '1px solid #999';
    panel.children()[0].domStyle().lineHeight = '15px'
    
    // var panel = new uki.component.Base(new uki.geometry.Rect(0, top, d.rect().size.width, 79));
    // panel.autosize('width');
    // panel.anchors('left top right');
    // panel.domStyle().backgroundColor = '#EEE';
    // panel.domStyle().borderBottom = '1px solid #999';
    // var phrase = new uki.component.Label(new uki.geometry.Rect(10, 10, d.rect().size.width - 510, 60));
    // phrase.text('обмен валюты -крон -лиговский -лучший -продавать -заработать -санкт -спб -электронный -мир -выгодный -петербург -продажа -москва -льготный -центр -наличный -сбербанк -заработок -оптовый -табло -курс -банк -круглосуточный -доллар -фунт -пункт');
    // phrase.autosize('width');
    // phrase.anchors('left top right');
    // phrase.domStyle().lineHeight = '15px'
    // panel.addChild(phrase);
    // 
    // var l = new uki.component.Label(new uki.geometry.Rect(d.rect().size.width - 500, 10, 200, 20));
    // l.text('цена 1-го спецразмещения:');
    // l.selectable(false);
    // l.anchors('top right');
    // l.align('right');
    // panel.addChild(l);
    // l = new uki.component.Label(new uki.geometry.Rect(d.rect().size.width - 500, 25, 200, 20));
    // l.anchors('top right');
    // l.text('вход в спецразмещение:');
    // l.selectable(false);
    // l.align('right');
    // panel.addChild(l);
    // l = new uki.component.Label(new uki.geometry.Rect(d.rect().size.width - 500, 40, 200, 20));
    // l.anchors('top right');
    // l.text('цена 1-го места:');
    // l.selectable(false);
    // l.align('right');
    // panel.addChild(l);
    // l = new uki.component.Label(new uki.geometry.Rect(d.rect().size.width - 600, 55, 300, 20));
    // l.anchors('top right');
    // l.text('вход в гарантированные показы:');
    // l.selectable(false);
    // l.align('right');
    // panel.addChild(l);
    // 
    // l = new uki.component.Label(new uki.geometry.Rect(d.rect().size.width - 295, 10, 50, 20));
    // l.anchors('top right');
    // l.text('10,01');
    // l.align('right');
    // panel.addChild(l);
    // l = new uki.component.Label(new uki.geometry.Rect(d.rect().size.width - 295, 25, 50, 20));
    // l.anchors('top right');
    // l.text('9,89');
    // l.align('right');
    // panel.addChild(l);
    // l = new uki.component.Label(new uki.geometry.Rect(d.rect().size.width - 295, 40, 50, 20));
    // l.anchors('top right');
    // l.text('10,00');
    // l.align('right');
    // panel.addChild(l);
    // l = new uki.component.Label(new uki.geometry.Rect(d.rect().size.width - 295, 55, 50, 20));
    // l.anchors('top right');
    // l.text('1,73');
    // l.align('right');
    // panel.addChild(l);
    // 
    // var i = new uki.component.Input(new uki.geometry.Rect(d.rect().size.width - 215, 9, 60, 20))
    // i.anchors('top right');
    // panel.addChild(i);
    return panel;
}

var b = $('body');
var w = $(window);
var N = 100;
var d = new uki.component.Base(new uki.geometry.Rect(0, 0, w.width(), 80*N));
d.domStyle().backgroundColor = 'white';
$('body').append(d.dom());
for (var i=0; i < N; i++) {
    d.addChild(buildPanel(i*80));
};
$(window).bind('resize', function(){  
    var t = (new Date()).getTime();
    d.rect( new uki.geometry.Rect(0,0,w.width(),80*N)) 
    uki.layout.perform();
    var dt = ((new Date()).getTime() - t)
    if (dt) document.title = 't: ' + dt + ' ms'; 
});
uki.layout.perform();
$(window).resize();