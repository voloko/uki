/** 
@example_title Drag and Drop
@example_order 400 
@example_html
    <style>body, html { margin: 0; padding: 0; overflow: hidden };</style>
    <div id="draggable" draggable="true"  unselectable="unselectable"
        style="position:absolute;left:600px;top:50px;width:100px;height:100px; 
               line-height:100px;font-size:18px;background:#CCF;font-family:sans-serif;text-align:center;
               -webkit-user-drag:element;-webkit-user-select:none;-moz-user-select:none">
        draggable
    </div>
    <script src="/src/uki.cjs"></script>
    <script src="dnd.js"></script>
 */
 
uki([
    { view: 'Label', rect: '350 10 100 20', anchors: 'left top', style: { fontSize: '14px' },
        html: '&larr; Drag items from the list on the left or from &darr; the draggable div. <a href="http://github.com/voloko/ukijs.org/blob/master/examples/core-examples/dnd/dnd.js">Source</a>, <a href="http://blog.ukijs.org/2010/03/16/drag-and-drop-in-uki/">about</a> ' },
    { view: 'ScrollableList', rect: '0 0 300 600', anchors: 'left top bottom', id: 'source', 
        draggable: true, textSelectable: false, multiselect: true },
    { view: 'Label', rect: '350 50 150 150', anchors: 'left top', text: 'drop target', 
        style: { fontSize: '25px', textAlign: 'center' }, 
        background: 'cssBox(border:2px dashed #CCC; background:#EEE)', name: 'target' },
    { view: 'Label', rect: '350 250 150 150', anchors: 'left top', text: 'drop target', 
        style: { fontSize: '25px', textAlign: 'center' }, 
        background: 'cssBox(border:2px dashed #CCC; background:#EEE)', name: 'target' }
]).attachTo(window, '1000 600');

var data = [];
for (var i=0; i < 8000; i++) {
    data[i] = 'Row ' + Math.random();
};
uki('#source List')
    .data(data)
    .dragstart(function(e) {
        e.dataTransfer.setDragImage(uki({ view: 'Label', rect: '100 20', anchors: 'left top', 
            inset: '0 5', background: 'cssBox(border: 1px solid #CCC;background:#EEF)', 
            text: this.selectedIndexes().length + ' rows' })
            , 10, 10);
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', this.selectedRows().join('\n'));
    }).parent().layout();
    

uki.dom.bind(document.getElementById('draggable'), 'dragstart', function(e) {
    e.dataTransfer.setDragImage(uki.createElement('div', 'background:blue;width:20px;height:20px'), 5, 5);
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', 'test');
});


uki('[name=target]')
    .dragover(function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    })
    .dragenter(function(e) {
        this.text('over');
    })
    .dragleave(function(e) {
        this.text('drop target');
    })
    .drop(function(e) {
        e.preventDefault();
        this.text('droped');
        alert(e.dataTransfer.getData('text/plain'))
        setTimeout(uki.proxy(function() {
            this.text('drop target');
        }, this), 100)
    });