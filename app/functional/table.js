var data = [],
    words = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'.split(/[,\.]\s?/)

for (var i=0; i < 1000; i++) {
    data[i] = [ i + 1, words[i % words.length], new Date() ];
};

uki({ view: 'Table', rect: '1000 1000', minHeight: 200, anchors: 'left top right bottom', data: data, columns: [
    { view: 'table.NumberColumn', width: 40 },
    { view: 'table.CustomColumn', width: 300 },
    { view: 'table.CustomColumn', width: 200, formatter: function(d) { return d.getFullYear() } }
] }).attachTo( window );