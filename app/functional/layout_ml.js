var panel = uki([
    {
        view: 'Panel',
        rect: '0 0 100% 80',
        background: '#EEE',
        autoresize: 'width',
        anchors: 'top left right',
        childViews: [
            {
                view: 'Label',
                rect: '10 10 -510 60',
                autoresize: 'width',
                anchors: 'top left right',
                text: 'обмен валюты -крон -лиговский -лучший -продавать -заработать -санкт -спб -электронный -мир -выгодный -петербург -продажа -москва -льготный -центр -наличный -сбербанк -заработок -оптовый -табло -курс -банк -круглосуточный -доллар -фунт -пункт'
            },
            
            // price labels
            {
                view: 'Label',
                rect: '-500 10 200 20',
                anchors: 'top right',
                text: 'цена 1-го спецразмещения:',
                selectable: 'false',
                align: 'right'
            },
            {
                view: 'Label',
                rect: '-500 30 200 20',
                anchors: 'top right',
                text: 'вход в спецразмещение:',
                selectable: 'false',
                align: 'right'
            },
            {
                view: 'Label',
                rect: '-500 50 200 20',
                anchors: 'top right',
                text: 'цена 1-го места:',
                selectable: 'false',
                align: 'right'
            },
            {
                view: 'Label',
                rect: '-500 70 200 20',
                anchors: 'top right',
                text: 'вход в гарантированные показы:',
                selectable: 'false',
                align: 'right'
            },
            
            // price values
            {
                view: 'Label',
                rect: '-295 10 200 20',
                anchors: 'top right',
                text: 'цена 1-го спецразмещения:',
                selectable: 'false',
                align: 'right'
            },
            {
                view: 'Label',
                rect: '-295 30 200 20',
                anchors: 'top right',
                text: 'вход в спецразмещение:',
                selectable: 'false',
                align: 'right'
            },
            {
                view: 'Label',
                rect: '-295 50 200 20',
                anchors: 'top right',
                text: 'цена 1-го места:',
                selectable: 'false',
                align: 'right'
            },
            {
                view: 'Label',
                rect: '-295 70 200 20',
                anchors: 'top right',
                text: 'вход в гарантированные показы:',
                selectable: 'false',
                align: 'right'
            },
            
            // price
            {
                view: 'TextField',
                rect: '-215 10 60 22',
                anchors: 'top right',
                validate: 'number'
            },
            
            // rub price
            {
                id: 'rub_price',
                view: 'Label',
                rect: '-100, 10, 60, 20',
                anchors: 'top right',
                align: 'right'
            }
        ]
    }
]);

panel.find('Panel[name=price] TextField[value=OK]').bind()

panel.find('TextField').bind('change', function() {
   panel.find('#rub_price').attr('text', this.getValue() * 30);
});