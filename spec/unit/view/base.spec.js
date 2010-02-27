describe 'uki.view.Base'

    before_each
        v = new uki.view.Base('100 100');
    end
    
    it 'should create a dom node upon construction'
        v.dom().should.not.be_null
    end
    
    it 'should delegate className to dom'
        v.className('test')
        v.className().should.be 'test'
        v.dom().className.should.be 'test'
    end
    
    it 'should delegate id to dom'
        v.id('test')
        v.id().should.be 'test'
        v.dom().id.should.be 'test'
    end
    
    it 'should register id in a hash'
        called = false
        stub(uki, 'registerId').and_return(function(view) {
            view.id().should.be 'test1'
            called = true
        });
        v.id('test1')
        called.should.be_true
    end
    
    it 'should unregister id from hash on change'
        called = false
        stub(uki, 'unregisterId').and_return(function(view) {
            view.id().should.be 'test2'
            called = true
        });
        v.id('test2')
        v.id('test3')
        called.should.be_true
    end
    
    it 'should attach background'
        var bg = new uki.background.Null()
        called = false
        stub(bg, 'attachTo').and_return(function(view) {
            view.should.be v
            called = true
        })
        v.background(bg)
        called.should.be_true
    end
    
    it 'should return default background if none specified'
        v._defaultBackground = '#CCC'
        v.background().should.be_an_instance_of uki.background.Css
    end
    
    it 'should set rect property'
        v.rect('0 10 20 30')
        v.rect().should.be_an_instance_of uki.geometry.Rect
    end
    
    it 'should set minSize and maxSize properties'
        v.minSize('10 20').maxSize('100 200')
        v.dom().style.minWidth.should.be '10px'
        v.dom().style.minHeight.should.be '20px'
        v.dom().style.maxWidth.should.be '100px'
        v.dom().style.maxHeight.should.be '200px'
        v.minSize().should.eql new uki.geometry.Size(10, 20)
        v.maxSize().should.eql new uki.geometry.Size(100, 200)
    end
    
    it 'should normailze rect according to min and max sizes'
        v.minSize('110 10')
        v.rect().width.should.be 110
        v.maxSize('200 50')
        v.rect().height.should.be 50
    end
    
    it 'should return null for next/prev views'
        v.nextView().should.be_null
        v.prevView().should.be_null
    end
end