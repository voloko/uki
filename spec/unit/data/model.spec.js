describe 'uki.data.Model'

    before_each
        model = new uki.data.Model();
    end
    
    it 'should allow event binding'
        uki.isFunction(model.bind).should.be_true
    end
    
    it 'should update model'
        model.change({ firstName: 'John', lastName: 'Smith' })
        model.firstName.should.be 'John'
        model.lastName.should.be 'Smith'
    end
    
    it 'should notify of changed fields'
        model.bind('change', function(e) {
            e.fields.should.eql ['name']
            e.changes.name.should.not.be_null
        });
        model.change({ name: 'something' });
    end
    
    it 'should use 2 params call'
        model.change('name', 'John Smith')
        model.name.should.be 'John Smith'
    end
end