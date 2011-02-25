var uki = require('uki');

uki({
    view: "Flow", childViews: [
        { view: 'Button', label: "asdlfsdf" },
        { view: 'Button', label: "asdlfsdf" },
        { view: 'Button', label: "asdlfsdf" },
        { view: 'Button', label: "asdlfsdf" }
    ]
}).attach();

uki('Button').on('click', function() {
    alert(this.text());
})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
uki('Flow')[0].appendChild(uki({ view: 'Button', text: 'sadklfjsdlkfj' })[0]);