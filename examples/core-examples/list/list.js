/**
@example_title List
@example_order 20
@example_html
    <script src="list.js"></script>
*/

var uki = require('uki');

uki([
    { view: 'List', pos: 'l:10px t:10px', 
      childViews: [
        { view: 'Button', text: '1' },
        { view: 'Button', text: '2' },
        { view: 'Button', text: '3' }
    ]},
    
    { view: 'List', pos: 'l:50px t:10px', 
      spacing: 'medium', childViews: [
        { view: 'Button', text: '1' },
        { view: 'Button', text: '2' },
        { view: 'Button', text: '3' }
    ]},
    
    { view: 'List', pos: 'l:90px t:10px', 
      spacing: 'large', childViews: [
        { view: 'Button', text: '1' },
        { view: 'Button', text: '2' },
        { view: 'Button', text: '3' }
    ]},
    
    { view: 'List', horizontal: true, 
      pos: 'l:200px t:10px', childViews: [
        { view: 'Button', text: '1' },
        { view: 'Button', text: '2' },
        { view: 'Button', text: '3' }
    ]},
    
    { view: 'List', horizontal: true, spacing: 'medium',
      pos: 'l:200px t:50px', childViews: [
        { view: 'Button', text: '1' },
        { view: 'Button', text: '2' },
        { view: 'Button', text: '3' }
    ]},
    
    { view: 'List', horizontal: true, spacing: 'large',
      pos: 'l:200px t:90px', childViews: [
        { view: 'Button', text: '1' },
        { view: 'Button', text: '2' },
        { view: 'Button', text: '3' }
    ]}
]).attach();

// Settings icon comes under http://creativecommons.org/licenses/by-sa/3.0/deed.de LICENSE
// See http://www.softicons.com/free-icons/web-icons/dusseldorf-icons-by-pc.de/settings-icon
