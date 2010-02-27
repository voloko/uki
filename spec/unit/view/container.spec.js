describe 'uki.view.Container'
    before_each
        parent = new uki.view.Container('100 200')
    end
    
    it 'should append child views'
        child = new uki.view.Base('10 10')
        parent.appendChild(child)
        parent.childViews().length.should.be 1
        parent.childViews().should.eql [child]
    end
    
    it 'should insert child before'
        firstChild = new uki.view.Base('10 10')
        secondChild = new uki.view.Base('10 10')
        parent.appendChild(secondChild)
        parent.insertBefore(firstChild, secondChild)
        parent.childViews().should.eql [firstChild, secondChild]
    end
    
    it 'should set correct parent'
        child = new uki.view.Base('10 10')
        parent.appendChild(child)
        child.parent().should.be parent
    end
    
    it 'should remove children'
        child = new uki.view.Base('10 10')
        parent.appendChild(child)
        parent.removeChild(child)
        child.parent().should.be_null
    end
    
    it 'should allow childViews() writing'
        child = new uki.view.Base('10 10')
        parent.childViews([child])
        parent.childViews().should.eql [child]
    end
    
    it 'should remove children on childViews() write'
        firstChild = new uki.view.Base('10 10')
        secondChild = new uki.view.Base('10 10')
        thirdChild = new uki.view.Base('10 10')
        parent.childViews([firstChild, secondChild])
        parent.childViews([secondChild, thirdChild])
        firstChild.parent().should.be_null
        secondChild.parent().should.be parent
        thirdChild.parent().should.be parent
    end
    
    it 'should allow nextView, prevView accessors for children'
        secondChild = new uki.view.Base('10 10')
        firstChild = new uki.view.Base('10 10')
        parent.appendChild(firstChild)
        parent.appendChild(secondChild)
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
        parent.appendChild(child)
        parent.rect('200 200')
        called.should.be 1
    end
  
end