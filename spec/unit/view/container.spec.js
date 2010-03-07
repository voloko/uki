describe 'uki.view.Container'
    before_each
        parentView = new uki.view.Container('100 200')
    end
    
    it 'should append child views'
        child = new uki.view.Base('10 10')
        parentView.appendChild(child)
        parentView.childViews().length.should.be 1
        parentView.childViews().should.eql [child]
    end
    
    it 'should insert child before'
        firstChild = new uki.view.Base('10 10')
        secondChild = new uki.view.Base('10 10')
        parentView.appendChild(secondChild)
        parentView.insertBefore(firstChild, secondChild)
        parentView.childViews().should.eql [firstChild, secondChild]
    end
    
    it 'should set correct parent'
        child = new uki.view.Base('10 10')
        parentView.appendChild(child)
        child.parent().should.be parentView
    end
    
    it 'should remove children'
        child = new uki.view.Base('10 10')
        parentView.appendChild(child)
        parentView.removeChild(child)
        child.parent().should.be_null
    end
    
    it 'should allow childViews() writing'
        child = new uki.view.Base('10 10')
        parentView.childViews([child])
        parentView.childViews().should.eql [child]
    end
    
    it 'should remove children on childViews() write'
        firstChild = new uki.view.Base('10 10')
        secondChild = new uki.view.Base('10 10')
        thirdChild = new uki.view.Base('10 10')
        parentView.childViews([firstChild, secondChild])
        parentView.childViews([secondChild, thirdChild])
        firstChild.parent().should.be_null
        secondChild.parent().should.be parentView
        thirdChild.parent().should.be parentView
    end
    
    it 'should allow nextView, prevView accessors for children'
        secondChild = new uki.view.Base('10 10')
        firstChild = new uki.view.Base('10 10')
        parentView.appendChild(firstChild)
        parentView.appendChild(secondChild)
        firstChild.nextView().should.be secondChild
        secondChild.prevView().should.be firstChild
        firstChild.prevView().should.be_null
        secondChild.nextView().should.be_null
    end
        
    it 'should resize children on rect resize'
        child = new uki.view.Base('10 10')
        called = 0
        stub(child, 'parentResized').and_return(function() {
            called++;
        });
        parentView.appendChild(child)
        parentView.rect('200 200')
        called.should.be 1
    end
  
end