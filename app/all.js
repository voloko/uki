uki({
    view: 'Base',
    rect: '0 0 1000px 100px',
    children: [{
        view: 'Panel',
        rect: '0 0 1000px 100px',
        anchors: 'top left rigth', autosize: 'width',
        children: [
            {
                view: 'Button',
                rect: '10px 10px 200px 24px',
                anchors: 'left top',
                text: 'uki is awesome!'
            },
            {
                view: 'Checkbox',
                anchors: 'left top',
                rect: '250px 10px 22px 22px'
            },
            {
                view: 'Label',
                rect: '275px 10px 100px 22px',
                anchors: 'left top',
                text: 'Checkbox 1'
            },
            {
                view: 'Checkbox',
                rect: '250px 35px 22px 22px',
                anchors: 'left top',
                checked: true
            },
            {
                view: 'Label',
                rect: '275px 35px 100px 22px',
                anchors: 'left top',
                text: 'Checkbox 2'
            }
        ]
    }]
}).attachTo( document.getElementById('test') );

