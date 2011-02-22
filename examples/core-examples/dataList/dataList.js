/**
@example_title Data list
@example_order 50
@example_html
    <script src="dataList.js"></script>
*/

var uki = require('uki');
requireCss('./dataList.css');

var data = uki.range(1, 10000).map(function(i) {
    return 'row #' + i;
});

uki([ 
    { view: 'Container', pos: 't:10px l:10px w:150px b:10px', addClass: 'scrollable', childViews: [
        { view: 'Header', text: 'Base Data List', size: 'small' },
        { view: 'DataList', pos: 't:20px r:0 b:0 l:0', data: data }
    ]},
    
    { view: 'Container', pos: 't:10px l:190px w:150px b:10px', addClass: 'scrollable', childViews: [
        { view: 'Header', text: 'Multiselect Data List', size: 'small' },
        { view: 'Text', addClass: 'help', html: requireText('./multiselectHelp.html') },
        { view: 'DataList', pos: 't:100px r:0 b:0 l:0', data: data, multiselect: true }
    ]}
]).attach();
