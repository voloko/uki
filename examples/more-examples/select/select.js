/**
@example_title uki.more Select
@example_order 4200
@example_html
    <style>body, html { overflow: hidden; margin: 0; padding: 0; }</style>
    <script src="/src/uki.cjs"></script>
    <script src="/src/uki-more.cjs"></script>
    <script src="select.js"></script>
*/

uki({ 
    view: 'Select', 
    rect: '40 40 300 23', 
    anchors: 'left top', 
    rowHeight: 22,
    options: [
        { text: 'one' },
        { text: 'two' },
        { text: 'three' },
        { text: 'one' },
        { text: 'two' },
        { text: 'three' },
        { text: 'one' },
        { text: 'two' },
        { text: 'three' },
        { text: 'one' },
        { text: 'two' },
        { text: 'three' },
        { text: 'one' },
        { text: 'two' },
        { text: 'three' },
        { text: 'one' },
        { text: 'two' },
        { text: 'three' },
        { text: 'one' },
        { text: 'two' },
        { text: 'three' },
        { text: 'four' }
    ]
}).attachTo(window, '1000 1000')
