include('../view.js');

/**
 * Flyweight view rendering
 * Used in lists, tables, grids
 */
uki.view.Flyweight = uki.newClass({
    init: function() {},
    
    /**
     * Renders data to an html string
     * @param Object data Data to render
     * @return String html
     */
    render: function(data) {
        return data + '';
    },
    
    /**
     * Layouts a component with a given container
     * Only one instance of component should reside within the container
     *
     * @param uki.geometry.Rect rect
     * @param Node container
     */
    layout: function(rect, container) {
        
    }
})
