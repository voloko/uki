uki({ view: 'Button', rect: '0 0 180 24', anchors: 'left top', text: 'Run code >>' })
    .attachTo( document.getElementById('runner') )
    .click(function() {
        uki({ view: "Button", text: "Hello world!", rect: "120 80 180 24" })
            .attachTo( document.getElementById("test") );
        
        uki("Button[text^=Hello]").click(
          function() { alert(this.text()); }
        );

        this.unbind('click', arguments.callee);
    });