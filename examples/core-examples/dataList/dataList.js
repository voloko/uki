/**
@example_title Data list
@example_order 60
@example_html
    <script src="dataList.js"></script>
*/

var uki = require('uki');
requireCss('./dataList.css');

var data = uki.map(uki.range(1, 10000), function(i) {
    return 'row #' + i;
});

uki([
    { view: 'Container', pos: 't:10px l:10px w:150px b:10px',
        addClass: 'scrollable', childViews: [
        { view: 'Header', text: 'Base Data List', size: 'small' },
        { view: 'DataList', pos: 't:20px r:0 b:0 l:0', data: data }
    ]},

    { view: 'Container', pos: 't:10px l:190px w:150px b:10px',
        addClass: 'scrollable', childViews: [
        { view: 'Header', text: 'Multiselect Data List', size: 'small' },
        { view: 'Text', addClass: 'help',
            html: requireText('./multiselectHelp.html') },
        { view: 'DataList', pos: 't:100px r:0 b:0 l:0', data: data,
			multiselect: true }
    ]},
    
    { view: 'Container', pos: 't:10px l:390px w:150px b:10px',
        addClass: 'scrollable', childViews: [
        { view: 'Header', text: 'Debounced list 100ms', size: 'small' },
        { view: 'DataList', pos: 't:20px r:0 b:0 l:0', data: data,
            debounce: 100, multiselect: true }
    ]},
]).attach();


// this list loads data asyncronously, each chunk in 500ms
var DummyAsyncData = uki.newClass({
    init: function(source) {
        this._loaded = [];
        this._source = data;
        this.length = data.length;
    },
    
    loadRange: function(from, to, callback) {
        var idxToLoad = [];
        for (var i = from; i < to; i++) {
            if (this._loaded[i] === undefined) {
                idxToLoad.push(i);
            }
        }
        if (idxToLoad.length) {
            setTimeout(uki.bind(function() {
                for (var i = 0; i < idxToLoad.length; i++) {
                    this._loaded[idxToLoad[i]] = this._source[idxToLoad[i]];
                }
                this._trigger(from, to, callback);
            }, this), 500);
        } else {
            this._trigger(from, to, callback);
        }
    },
    
    _trigger: function(from, to, callback) {
        callback(this.slice(from, to));
    },

    slice: function(from, to) {
        return this._loaded.slice(from, to);
    }
});

var dummy = new DummyAsyncData(data);
uki([
    { view: 'Container', pos: 't:10px l:590px w:150px b:10px',
        addClass: 'scrollable', childViews: [
        { view: 'Header', text: 'Async Data List', size: 'small' },
        { view: 'DataList', pos: 't:20px r:0 b:0 l:0', data: dummy,
            multiselect: true }
    ]}
]).attach();