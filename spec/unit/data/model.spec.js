describe 'uki.data.Model'

    before_each
        model = new uki.data.Model();
    end
    
    it 'should allow event binding'
        uki.isFunction(model.bind).should.be_true
    end
    
    it 'should update model'
        model.update({ firstName: 'John', lastName: 'Smith' })
        model.firstName.should.be 'John'
        model.lastName.should.be 'Smith'
    end
    
    it 'should notify of changed fields'
        model.bind('change', function(e) {
            e.fields.should.eql ['name']
            e.changes.name.should.not.be_null
        });
        model.update({ name: 'something' });
    end
    
    it 'should allow accesor methods'
        uki.data.model.addFields(model, ['firstName', 'lastName'])
        model.update({ firstName: 'John', lastName: 'Smith' })
        model.firstName().should.be 'John'
        model.lastName().should.be 'Smith'
    end
    
    it 'should trigger change with accessor methods'
        uki.data.model.addFields(model, ['firstName', 'lastName'])
        model.bind('change', function(e) {
            e.fields.should.eql ['firstName']
            e.changes.firstName.should.be_true
        });
        model.firstName('something')
    end
end