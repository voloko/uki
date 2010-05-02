/**
@example_title uki.more Toggle Button
@example_order 4105
@example_html
    <div id='test' style='width: 50%; height: 100px; background: #EEE'>#test</div>
    <script src="/src/uki.cjs"></script>
    <script src="/src/uki-more.cjs"></script>
    <script src="toggleButton.js"></script>
*/

uki([
    { view: 'uki.more.view.ToggleButton', rect: '90 40 100 24', text: 'Toggle me' },
    { view: 'uki.more.view.ToggleButton', rect: '210 40 100 24', text: 'Me to' }
]).attachTo( document.getElementById('test'), '400 100' );
