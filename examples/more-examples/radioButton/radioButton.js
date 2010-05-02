/**
@example_title uki.more Radio Button
@example_order 4106
@example_html
    <div id='test' style='width: 50%; height: 100px; background: #EEE'>#test</div>
    <script src="/src/uki.cjs"></script>
    <script src="/src/uki-more.cjs"></script>
    <script src="radioButton.js"></script>
*/

uki([
    { view: 'uki.more.view.RadioButton', rect: '15 40 70 24', text: 'Group 1', group: 'group_1' },
    { view: 'uki.more.view.RadioButton', rect: '90 40 70 24', text: 'Group 1', group: 'group_1' },
    
    { view: 'uki.more.view.RadioButton', rect: '200 40 70 24', text: 'Group 2', group: 'group_2' },
    { view: 'uki.more.view.RadioButton', rect: '275 40 70 24', text: 'Group 2', group: 'group_2', checked: true }
]).attachTo( document.getElementById('test'), '400 100' );
