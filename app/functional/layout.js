include('jquery.js');
// layout stress test

function buildPanel (top) {
    var Base = uki.view.Base,
        Label = uki.view.Label;

    var panel = uki.build({
        view: 'Base',
        rect: new uki.geometry.Rect(0, top, d.rect().width, 79),
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
                view: new uki.view.Input(),
                rect: '-215 9 60 20',
                anchors: 'top right'
            }
        ]
    })[0];
    
    panel.dom().style.backgroundColor = '#EEE';
    panel.dom().style.borderBottom = '1px solid #999';
    
    // var panel = new uki.view.Base(new uki.geometry.Rect(0, top, d.rect().width, 79));
    // panel.autosize('width');
    // panel.anchors('left top right');
    // panel.dom().style.backgroundColor = '#EEE';
    // panel.dom().style.borderBottom = '1px solid #999';
    // var phrase = new uki.view.Label(new uki.geometry.Rect(10, 10, d.rect().width - 510, 60));
    // phrase.text('обмен валюты -крон -лиговский -лучший -продавать -заработать -санкт -спб -электронный -мир -выгодный -петербург -продажа -москва -льготный -центр -наличный -сбербанк -заработок -оптовый -табло -курс -банк -круглосуточный -доллар -фунт -пункт');
    // phrase.autosize('width');
    // phrase.anchors('left top right');
    // phrase.dom().style.lineHeight = '15px'
    // panel.addChild(phrase);
    // 
    // var l = new uki.view.Label(new uki.geometry.Rect(d.rect().width - 500, 10, 200, 20));
    // l.text('цена 1-го спецразмещения:');
    // l.selectable(false);
    // l.anchors('top right');
    // l.align('right');
    // panel.addChild(l);
    // l = new uki.view.Label(new uki.geometry.Rect(d.rect().width - 500, 25, 200, 20));
    // l.anchors('top right');
    // l.text('вход в спецразмещение:');
    // l.selectable(false);
    // l.align('right');
    // panel.addChild(l);
    // l = new uki.view.Label(new uki.geometry.Rect(d.rect().width - 500, 40, 200, 20));
    // l.anchors('top right');
    // l.text('цена 1-го места:');
    // l.selectable(false);
    // l.align('right');
    // panel.addChild(l);
    // l = new uki.view.Label(new uki.geometry.Rect(d.rect().width - 600, 55, 300, 20));
    // l.anchors('top right');
    // l.text('вход в гарантированные показы:');
    // l.selectable(false);
    // l.align('right');
    // panel.addChild(l);
    // 
    // l = new uki.view.Label(new uki.geometry.Rect(d.rect().width - 295, 10, 50, 20));
    // l.anchors('top right');
    // l.text('10,01');
    // l.align('right');
    // panel.addChild(l);
    // l = new uki.view.Label(new uki.geometry.Rect(d.rect().width - 295, 25, 50, 20));
    // l.anchors('top right');
    // l.text('9,89');
    // l.align('right');
    // panel.addChild(l);
    // l = new uki.view.Label(new uki.geometry.Rect(d.rect().width - 295, 40, 50, 20));
    // l.anchors('top right');
    // l.text('10,00');
    // l.align('right');
    // panel.addChild(l);
    // l = new uki.view.Label(new uki.geometry.Rect(d.rect().width - 295, 55, 50, 20));
    // l.anchors('top right');
    // l.text('1,73');
    // l.align('right');
    // panel.addChild(l);
    // 
    // var i = new uki.view.Input(new uki.geometry.Rect(d.rect().width - 215, 9, 60, 20))
    // i.anchors('top right');
    // panel.addChild(i);
    return panel;
}

var tmp;
var b = $('body');
var w = $(window);
var N = 100;
var d = new uki.view.Base(new uki.geometry.Rect(0, 0, w.width(), 80*N));
d.dom().style.backgroundColor = 'white';
for (var i=0; i < N; i++) {
    d.addChild(buildPanel(i*80));
};

uki.find('Label[name=phrase]', d).bind('click', function() {
    (tmp = this.parent().dom().style).backgroundColor = (tmp.backgroundColor == '' ? '#EEE' : '');
});


$('body').append(d.dom());
$(window).bind('resize', function(){  
    var t = (new Date()).getTime();
    d.rect( new uki.geometry.Rect(0,0,w.width(),80*N)) 
    uki.layout.perform();
    var dt = ((new Date()).getTime() - t)
    if (dt) document.title = 't: ' + dt + ' ms'; 
});
uki.layout.perform();
$(window).resize();