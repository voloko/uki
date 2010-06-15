/**
@example_title Popup
@example_order 52
@example_html
    <style>body, html { overflow: hidden; margin: 0; padding: 0; }</style>
    <div id="test" style="width: 90%; height: 300px;"></div>
    <script src="/src/uki.cjs"></script>
    <script src="popup.js"></script>
*/

// create 8 buttons
uki({ view: 'Box', rect: '1000 400', anchors: 'left top', childViews: [
    { view: 'Button', rect: '10 370 100 24', anchors: 'left top', text: 'Left Bottom', id: 'left_bottom' },
    { view: 'Button', rect: '160 370 100 24', anchors: 'left top', text: 'Mid Bottom', id: 'mid_bottom' },
    { view: 'Button', rect: '320 370 100 24', anchors: 'left top', text: 'Right Bottom', id: 'right_bottom' },
    { view: 'Button', rect: '10 10 100 24', anchors: 'left top', text: 'Left Top', id: 'left_top' },
    { view: 'Button', rect: '160 10 100 24', anchors: 'left top', text: 'Mid Top', id: 'mid_top' },
    { view: 'Button', rect: '320 10 100 24', anchors: 'left top', text: 'Rigth Top', id: 'right_top' },
    
    { view: 'Button', rect: '450 190 100 24', anchors: 'left top', text: 'Mid', id: 'mid' },
    
    { view: 'Box', rect: '640 0 400 400', anchors: 'left top', childViews: [
        { view: 'Button', rect: '70 370 100 24', anchors: 'left top', text: 'Left Bottom', id: 'h_left_bottom' },
        { view: 'Button', rect: '180 370 100 24', anchors: 'left top', text: 'Right Bottom', id: 'h_right_bottom' },
        { view: 'Button', rect: '70 190 100 24', anchors: 'left top', text: 'Left Mid', id: 'h_left_mid' },
        { view: 'Button', rect: '70 10 100 24', anchors: 'left top', text: 'Left Top', id: 'h_left_top' },
        { view: 'Button', rect: '180 10 100 24', anchors: 'left top', text: 'Rigth Top', id: 'h_right_top' },
        { view: 'Button', rect: '180 190 100 24', anchors: 'left top', text: 'Right Mid', id: 'h_right_mid' }
    ] }
] }).attachTo( window, '1000 400' );

// on button click
uki('Button').click(function() {
    var button = this;
    // find relative popup and toggle it
    uki('Popup').grep(function(e) { return e.relativeTo() == button; }).toggle();
});

// attach on popup per button
uki({ view: 'Popup', rect: '120 120', anchors: 'left bottom', relativeTo: uki('#left_bottom')[0] })[0].show();
uki({ view: 'Popup', rect: '120 120', anchors: 'bottom', relativeTo: uki('#mid_bottom')[0] })[0].show();
uki({ view: 'Popup', rect: '120 120', anchors: 'left top', visible: true, relativeTo: uki('#left_top')[0] }).show();
uki({ view: 'Popup', rect: '120 120', anchors: 'top', visible: true, relativeTo: uki('#mid_top')[0] }).show();
uki({ view: 'Popup', rect: '120 120', anchors: 'right bottom', relativeTo: uki('#right_bottom')[0] }).show();
uki({ view: 'Popup', rect: '120 120', anchors: 'right top', relativeTo: uki('#right_top')[0] }).show();

uki({ view: 'Popup', rect: '120 120', anchors: '', relativeTo: uki('#mid')[0] }).show();

uki({ view: 'Popup', rect: '120 120', anchors: 'left bottom', horizontal: true, relativeTo: uki('#h_left_bottom')[0] }).show();
uki({ view: 'Popup', rect: '120 120', anchors: 'left top', horizontal: true, relativeTo: uki('#h_left_top')[0] }).show();
uki({ view: 'Popup', rect: '120 120', anchors: 'right bottom', horizontal: true, relativeTo: uki('#h_right_bottom')[0] }).show();
uki({ view: 'Popup', rect: '120 120', anchors: 'right top', horizontal: true, relativeTo: uki('#h_right_top')[0] }).show();
uki({ view: 'Popup', rect: '120 120', anchors: 'left', horizontal: true, relativeTo: uki('#h_left_mid')[0] }).show();
uki({ view: 'Popup', rect: '120 120', anchors: 'right', horizontal: true, relativeTo: uki('#h_right_mid')[0] }).show();