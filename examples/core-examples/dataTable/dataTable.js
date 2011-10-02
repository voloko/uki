/**
@example_title Data table
@example_order 70
@example_html
    <script src="/src/pkg/uki.js"></script>
    <script src="dataTable.js"></script>
*/

// custom formatter for duration column
function formatTime (t) {
    var m = Math.floor(t/60/1000),
        s = Math.floor(t/1000 - m * 60);

    return m + ':' + (s > 9 ? s : '0' + s);
}

var views = uki([
    { view: 'DataTable', as: 'table', debounce: 1,
      pos: 't:0 l:0 r:0 b:0', columns: [
        { label: 'ID', width: 40 },
        { label: 'Name', minWidth: 100, width: 250 },
        { label: 'Time', width: 50, formatter: formatTime },
        { label: 'Artist', minWidth: 100, width: 150 },
        { label: 'Album', minWidth: 100, width: 150 },
        { label: 'Genre', width: 100 },
        { label: 'Rating', minWidth: 30, width: 30, maxWidth: 30 },
        { label: 'Play Count', minWidth: 30, width: 30, maxWidth: 30 }
    ], multiselect: true },

    { view: 'Text', as: 'loading', pos: 't:30px l:45px', text: 'Loading...' }
]).attach();

// dinamicly load library json
window.onLibraryLoad = function(data) {
    views.view('loading').visible(false);
    views.view('table').data(data);
};

document.getElementsByTagName('head')[0].appendChild(
    uki.createElement('script', { src: 'library.js' }));
