/**
@example_title uki.more TreeList
@example_order 4100
@example_html
    <style>body, html { overflow: hidden; margin: 0; padding: 0; }</style>
    <script src="/src/uki.cjs"></script>
    <script src="/src/uki-more.cjs"></script>
    <script src="treeList.js"></script>
*/

sampleData = [
    { data: 'Sample value' },
    { data: 'Sample value' },
    { data: 'Sample value', children: [
        { data: 'Sample sub value' },
        { data: 'Sample sub value', children: [
            { data: 'Sample sub value' },
            { data: 'Sample sub value' },
            { data: 'Sample sub value' }
        ] },
        { data: 'Sample sub value' }
    ] },
    { data: 'Sample value' },
    { data: 'Sample value' }
];

uki({ 
    view: 'uki.more.view.TreeList', 
    rect: '200 1000', 
    anchors: 'left top bottom', 
    data: sampleData,
    rowHeight: 22,
    style: {fontSize: '12px'},
    multiselect: true
}).attachTo(window, '1000 1000')