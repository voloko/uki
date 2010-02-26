describe 'uki.utils'
    utils = uki.utils;
    
    it 'should test isFunction'
        var f1 = function() {};
        function f2 () {};
        utils.isFunction(function() {}).should.be_true('anonimous function')
        utils.isFunction(f1).should.be_true('var f = function')
        utils.isFunction(f2).should.be_true('function f')
        utils.isFunction({}).should.not.be_true('object')
    end
    
    it 'should test isArray'
        var x = [1, 2]
        utils.isArray([]).should.be_true('anonimous array')
        utils.isArray(x).should.be_true('x = []')
        utils.isArray({}).should.not.be_true('object')
    end
    
    describe '.each()'
        it 'should iterate over array'
            var count = 0;
            utils.each([1, 1, 1], function() {
                count ++;
            });
            count.should.be 3
        end
    
        it 'should set this to current element'
            utils.each([1, 1, 1], function() {
                this.valueOf().should.eql 1
            });
        end
    
        it 'should iterate with given context'
            var context = {};
            utils.each([1, 1, 1], function() {
                this.should.be context
            }, context);
        end
        
        it 'should iterave over hash'
            utils.each({a: 1, b: 1, c: 1}, function() {
                this.valueOf().should.be 1
            });
        end
        
        it 'should iterate over hash with given context'
            var context = {};
            utils.each({a: 1, b: 1, c: 1}, function() {
                this.should.be context
            }, context);
        end
    end
    
    it 'should trim text'
        utils.trim('  TEST TEST ').should.be 'TEST TEST'
    end
    
    it 'should escape html'
        utils.escapeHTML('<span class="a">1</span>').should.be '&lt;span class=&quot;a&quot;&gt;1&lt;/span&gt;'
    end
    
    it 'should test if is inArray'
        utils.inArray(1, [0, 1, 2]).should.be 1
        utils.inArray(3, [0, 1, 2]).should.be -1
    end
    
    it 'should make uniq array'
        utils.unique([1, 1, 2, 3]).should.eql [1, 2, 3]
    end
    
    it 'should grep array for items'
        var result = utils.grep([1, 2, 3, 4], function(v) {
            return v > 2;
        });
        result.should.eql [3, 4]
    end
    
    it 'should map array'
        var result = utils.map([1, 2, 3, 4], function(v) {
            return -v;
        });
        result.should.eql [-1, -2, -3, -4]
    end
    
    it 'should reduce array'
        var result = utils.reduce(1, [1,2,3,4], function(x, e) { return e*x; });
        result.should.be 2*3*4
    end
    
    it 'should map in given context'
        var context = {};
        var result = utils.map([1, 2, 3, 4], function(v) {
            this.should.be context
        }, context);
    end
    
    it 'should map by field name (shortcut)'
        var result = utils.map([{a: 1}, {a: 2}, {a: 3}], 'a');
        result.should.eql [1, 2, 3]
    end
    
    it 'should map extend objects'
        var e = utils.extend({a: 1}, {b: 2}, {c: 3, d: undefined});
        e.should.eql {a: 1, b: 2, c: 3}
    end
    
    it 'should extend uki with utils'
        var functions = ['isFunction', 'isArray', 'trim', 'escapeHTML', 'each', 'inArray', 'unique', 'grep', 'map', 'extend'];
        utils.each(functions, function() {
            uki[this].should.not.be_null
        });
    end
end
