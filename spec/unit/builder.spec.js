describe 'uki.build'
    it 'should create single view'
        var c = uki.build([{
            view: new uki.view.Base()
        }])[0];

        c.should.not.be_null
        c.should.be_type 'object'
    end
    
    it 'should create view from path'
        var c = uki.build([{
            view: 'uki.view.Base'
        }])[0];

        c.should.not.be_null
        c.should.be_type 'object'
    end
    
    it 'should create view from should path'
        var c = uki.build([{
            view: 'Base'
        }])[0];

        c.should.not.be_null
        c.should.be_type 'object'
    end
    
    it 'should create view from a function call'
        var c = uki.build([{
            view: function() { return new uki.view.Base(); }
        }])[0];

        c.should.not.be_null
        c.should.be_type 'object'
    end
    
    it 'should create view from an object'
        var c = uki.build([{
            view: new uki.view.Base()
        }])[0];

        c.should.be_an_instance_of uki.view.Base
    end
    
    it 'should not update precreated views'
        var c = uki.build([new uki.view.Base()])[0]
        c.should.be_an_instance_of uki.view.Base
    end

end