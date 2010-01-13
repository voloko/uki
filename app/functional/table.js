function formatTime (t) {
    var m = Math.floor(t/60/1000),
        s = Math.floor(t/1000 - m * 60);
        
    return m + ':' + (s > 9 ? s : '0' + s);
}

uki({ view: 'SplitPane', rect: '1000 1000', anchors: 'left top right bottom', handleWidth: 1, handlePosition: 199,
        leftMin: 150, rightMin: 400,
        leftPane: { background: '#D0D7E2' },
        rightChildViews: { view: 'Table', rect: '0 0 800 1000', minSize: '0 200', anchors: 'left top right bottom', data: library, columns: [
            { view: 'table.NumberColumn', label: 'ID', width: 40 },
            { view: 'table.CustomColumn', label: 'Name', resizable: true, minWidth: 100, width: 250 },
            { view: 'table.NumberColumn', label: 'Time', width: 50, formatter: formatTime },
            { view: 'table.CustomColumn', label: 'Artist', resizable: true, minWidth: 100, width: 150 },
            { view: 'table.CustomColumn', label: 'Album',  resizable: true, minWidth: 100, width: 150 },
            { view: 'table.CustomColumn', label: 'Genre', width: 100 },
            { view: 'table.NumberColumn', label: 'Rating', width: 30 },
            { view: 'table.NumberColumn', label: 'Play Count', width: 30 }
        ] }
    }
).attachTo( window, '1000 1000' );        

