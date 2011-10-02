/**
@example_title Button
@example_order 10
@example_html
    <script src="/src/pkg/uki.js"></script>
    <script src="button.js"></script>
*/

uki([
    
    {
        view: 'Button', pos: 'l:50% t:40px w:200px ml:-100px',
        label: 'Normal Button', tabIndex: 1, on: {
            click: function() {
                alert('Inline click handler for ' + this.label());
            }
        }
    },
    {
        view: 'Button', pos: 'l:50% t:75px w:200px ml:-100px',
        label: 'Confirm Button', tabIndex: 1, confirm: true
    },
    {
        view: 'Button', pos: 'l:50% t:110px w:200px ml:-100px',
        label: 'With Icon', tabIndex: 1, iconSrc: './settings.png'
    },
    {
        view: 'Button', pos: 'l:50% t:145px w:40px ml:-20px',
        tabIndex: 1, iconSrc: './settings.png'
    },
    
    {
        view: 'Button', pos: 'l:50% t:200px w:200px ml:-100px',
        label: 'Disabled Button', tabIndex: 1, disabled: true
    },
    {
        view: 'Button', pos: 'l:50% t:235px w:200px ml:-100px',
        label: 'Disabled Confirm Button', tabIndex: 1, confirm: true,
        disabled: true
    },
    {
        view: 'Button', pos: 'l:50% t:270px w:200px ml:-100px',
        label: 'Disabled With Icon', tabIndex: 1, iconSrc: './settings.png',
        disabled: true
    },
    {
        view: 'Button', pos: 'l:50% t:305px w:40px ml:-20px',
        tabIndex: 1, iconSrc: './settings.png', disabled: true
    }
    
]).attach();

uki('Button:gt(0)').on('click', function() {
    alert('Selector click handler for ' + this.label());
});

// Settings icon comes under http://creativecommons.org/licenses/by-sa/3.0/deed.de LICENSE
// See http://www.softicons.com/free-icons/web-icons/dusseldorf-icons-by-pc.de/settings-icon
