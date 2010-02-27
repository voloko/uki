describe 'uki.view'
    it 'should declare new views'
        called = false
        uki.view.declare('tmp.view.TestView', uki.view.Base, function(base) {
            base.should.be uki.view.Base.prototype
            called = true
        });
        tmp.view.TestView.should.not.be_null
        called.should.be_true
        (new tmp.view.TestView()).typeName().should.be 'tmp.view.TestView'
    end
  
end