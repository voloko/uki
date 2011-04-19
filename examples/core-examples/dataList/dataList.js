/**
@example_title Data list
@example_order 60
@example_html
    <script src="dataList.js"></script>
*/

var uki = require('uki');
requireCss('./dataList.css');

var data = uki.map(uki.range(1, 50000), function(i) {
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


var dataWithHeaders = uki.map(uki.range(1, 10000), function(i) {
    var header = Math.random() > 0.95;
    return { value: header ? 'header' : 'row #' + i, header: header  };
});

var VarHeightMetrics = uki.newClass(uki.view.dataList.Metrics, {

    update: function() {
        this._cache = [];
        this._data = this._view.data();
        this.triggerChanges('totalHeight');
    },

    rowsForRange: function(range) {
        return {
            from: this.rowForPosition(range.from),
            to:   this.rowForPosition(range.to) + 1
        };
    },

    rowForPosition: function(px) {
        var i = this._cache.length - 1;
        while (this._cache[i] + this.rowHeight(i) < px) {
            this.prefilCache(i);
        }

        var index = uki.binarySearch(this._cache, px);
        return this._cache[index] > px ? index - 1 :
            Math.min(index, this._data.length - 1);
    },

    rowHeight: function(index) {
        return this._data[index].header ? 40 : 24;
    },

    prefilCache: function(index) {
        if (index === 10000) debugger;
        var i = this._cache.length;
        while (i <= index) {
            if (i === 0) {
                this._cache[i] = 0;
            } else {
                this._cache[i] = this._cache[i - 1] + this.rowHeight(i - 1);
            }
            i++;
        }
    },

    rowDimensions: function(index) {
        this.prefilCache(index);
        return {
            top: this._cache[index],
            height: this.rowHeight(index)
        };
    },

    // this is expensive
    totalHeight: function() {
        var index = this._data.length - 1;
        this.prefilCache(index);
        return this._cache[index] + this.rowHeight(index);
    }

});

uki([
    { view: 'Container', pos: 't:10px l:790px w:150px b:10px',
        addClass: 'scrollable', childViews: [
        { view: 'Header', text: 'Var Height List', size: 'small' },
        { view: 'DataList', pos: 't:20px r:0 b:0 l:0', key: 'value',
            template: requireText('withHeaders.html'),
            addClass: 'with-headers',
            data: dataWithHeaders,
            multiselect: true, init: { metrics: new VarHeightMetrics() } }
    ]}
]).attach();
