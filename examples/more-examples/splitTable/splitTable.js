/**
@example_title uki.more SplitTable
@example_order 4107
@example_html
    <style>body, html { margin: 0; padding: 0; overflow:hidden; };</style>
    <script src="/src/uki.cjs"></script>
    <script src="/src/uki-more.cjs"></script>
    <script src="searchable.js"></script>
    <script src="splitTable.js"></script>
*/


// custom formatter for duration column
function formatTime (t) {
    var m = Math.floor(t/60/1000),
        s = Math.floor(t/1000 - m * 60);
        
    return m + ':' + (s > 9 ? s : '0' + s);
}

// formatter for highlighted strings
var hlt = '';
function formatHlted (t) {
    return t;
    return hlt ? (t || '').replace(hlt, '<strong>' + hlt + '</strong>') : t;
}

uki({ view: 'HSplitPane', rect: '1000 1000', anchors: 'left top right bottom', handleWidth: 1, handlePosition: 199,
        leftMin: 150, rightMin: 400,
        leftPane: { background: '#D0D7E2', childViews: [ // search panel
            { view: 'TextField', rect: '5 18 189 22', anchors: 'left top right', placeholder: 'search' }
        ] },
        rightChildViews: [ // table with resizable columns
            { view: 'uki.more.view.SplitTable', rect: '10 10 780 980', minSize: '0 200', anchors: 'left top right bottom', columns: [
                // left part
                { view: 'table.CustomColumn', label: 'Name', resizable: true, minWidth: 100, width: 250, formatter: formatHlted },
                // right part
                { view: 'table.NumberColumn', label: 'Time', resizable: true, width: 50, formatter: formatTime },
                { view: 'table.CustomColumn', label: 'Artist', resizable: true, minWidth: 100, width: 150, formatter: formatHlted },
                { view: 'table.CustomColumn', label: 'Album', resizable: true, minWidth: 100, width: 150, formatter: formatHlted },
                { view: 'table.CustomColumn', label: 'Genre', resizable: true, width: 100 },
                { view: 'table.NumberColumn', label: 'Rating', resizable: true, width: 30 },
                { view: 'table.NumberColumn', label: 'Play Count', resizable: true, width: 30 }
            ], multiselect: true, textSelectable: false, style: {fontSize: '11px'} },
            { view: 'Label', rect: '200 200 400 20', anchors: 'top', textAlign: 'center', text: 'Loading...', id: 'loading' }
        ]
    }
).attachTo( window, '1000 1000' );

// searchable model
window.DummyModel = uki.newClass(Searchable, new function() {
    this.init = function(data) {
        this.items = uki.map(data, function(row) {
            row = row.slice(1);
            row.searchIndex = row[0].toLowerCase();
            // var tmp = row[2];
            // row[2] = row[3];
            // row[3] = tmp;
            return row;
        })
    };
    
    this.matchRow = function(row, iterator) {
        return row.searchIndex.indexOf(iterator.query) > -1;
    };
});

// dinamicly load library json
window.onLibraryLoad = function(data) {
    uki('#loading').visible(false);
    var model = new DummyModel(data),
        lastQuery = '',
        table = uki('SplitTable');
        
    model.bind('search.foundInChunk', function(chunk) {
        table.data(table.data().concat(chunk)).layout();
    });
        
    table.data(model.items).layout();
    
    uki('TextField').bind('keyup click', function() {
        if (this.value().toLowerCase() == lastQuery) return;
        lastQuery = this.value().toLowerCase();
        if (lastQuery.match(/\S/)) {
            hlt = lastQuery;
            table.data([]);
            model.search(lastQuery);
        } else {
            hlt = '';
            table.data(model.items);
        }
    });
    document.body.className += '';
};
var script = document.createElement('script'),
    head = document.getElementsByTagName('head')[0];
script.src = 'library.js';
head.insertBefore(script, head.firstChild);
