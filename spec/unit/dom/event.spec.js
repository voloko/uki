describe 'uki.dom.Event'
    
    before_each
        dom = uki.createElement('div', '', '<span>1<u>2</u></span>')
        u = dom.getElementsByTagName('u')[0]
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
      
end