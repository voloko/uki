include('../list.js');

/**
 * Flyweight view rendering
 * Used in lists, tables, grids
 */
uki.view.list.Render = uki.newClass({
    init: function() {},
    
    /**
     * Renders data to an html string
     * @param Object data Data to render
     * @return String html
     */
    render: function(data, rect, i) {
        return '<div style="line-height: ' + rect.height + 'px; font-size: 12px; padding: 0 4px;">' + data + '</div>';
    },
    
    setSelected: function(container, data, state, focus) {
        container.style.backgroundColor = state && focus ? '#3875D7' : state ? '#CCC' : '';
        container.style.color = state && focus ? '#FFF' : '#000';
    }
});
