uki.more.view.splitTable.Render = uki.newClass(uki.view.table.Render, new function() {
    
    this.setSelected = function(container, data, state, focus) {
        focus = true;
        container.style.backgroundColor = state && focus ? '#3875D7' : state ? '#CCC' : '';
        container.style.color = state && focus ? '#FFF' : '#000';
    }

});