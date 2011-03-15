var uki = require('uki');

requireCss('./runner.css');

var benches = []
    .concat(require('./dom.observable').benches);

uki({ view: 'Container', addClass: 'runner', childViews: [
    { view: 'nativeControl.Select', options: uki.pluck(benches, 'name') },
    { view: 'Button', label: 'Run' },
    { view: 'Label', init: { tagName: 'span' }, text: 'Result: 0ms' }
] }).attach();