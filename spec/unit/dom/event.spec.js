describe 'uki.dom.Event'
    
    before_each
        dom = uki.createElement('div', '', '<span>1<u>2</u></span><b>3</b>')
        u = dom.getElementsByTagName('u')[0]
        b = dom.getElementsByTagName('b')[0]
    end
    
    it 'should handle dom events'
        uki.dom.probe(dom, function() { // safari won't bubble unless dom attached to document
            called = false
            uki.dom.bind(dom, 'click', function() {
               called = true; 
            });
            triggerEvent(u, 'click', {});
            called.should.be_true
        });
    end
    
    it 'should handle several types with single handler'
        uki.dom.probe(dom, function() {
            called = []
            uki.dom.bind(dom, 'click mouseup', function(e) {
               called.push(e.type); 
            });
            triggerEvent(u, 'click', {});
            triggerEvent(u, 'mouseup', {});
            called.should.eql ['click', 'mouseup']
        });
    end
    
    it 'should support preventDefault in all browsers'
        uki.dom.probe(dom, function() { // safari won't bubble unless dom attached to document
            called = false
            uki.dom.bind(dom, 'click', function(e) {
                called = true; 
                e.preventDefault.should.not.be_null
            });
            triggerEvent(u, 'click', {});
            called.should.be_true
        });
    end
    
    it 'should support stopPropagation in all browsers'
        uki.dom.probe(dom, function() { // safari won't bubble unless dom attached to document
            called = false
            uki.dom.bind(dom, 'click', function(e) {
                called = true; 
                e.stopPropagation.should.not.be_null
            });
            triggerEvent(u, 'click', {});
            called.should.be_true
        });
    end
    
    it 'should support mouseenter in all browser'
        uki.dom.probe(dom, function() { // safari won't bubble unless dom attached to document
            called = false
            uki.dom.bind(dom, 'mouseenter', function(e) {
                called = true; 
            });
            triggerEvent(u, 'mouseover', {relatedTarget: 'b'});
            called.should.be_true
        });
    end
    
    it 'should support mouseleave in all browser'
        uki.dom.probe(dom, function() { // safari won't bubble unless dom attached to document
            called = false
            uki.dom.bind(dom, 'mouseleave', function(e) {
                called = true; 
            });
            triggerEvent(u, 'mouseout', {relatedTarget: 'b'});
            called.should.be_true
        });
    end
      
end