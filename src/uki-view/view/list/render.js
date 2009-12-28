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
        return '<div style="line-height: 30px; text-align: center; font-size: 12px">' + data + '</div>';
    },
    
    setSelected: function(container, data, state, focus) {
        container.style.backgroundColor = state && focus ? '#3875D7' : state ? '#CCC' : '';
        container.style.color = state && focus ? '#FFF' : '#000';
    }
    
    /**
     * Layouts a component with a given container
     * Only one instance of component should reside within the container
     *
     * @param uki.geometry.Rect rect
     * @param Node container
     */
    // layout: function(rect, container) {
    //     
    // }
});
