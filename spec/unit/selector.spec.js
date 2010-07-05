describe 'uki.Selector'
    it 'should tokenize expression'
        tokens = uki.Selector.tokenize('label > * > project.views.CustomView Label[ name ^= "wow"]')[0];
        tokens.should_eql ['label', '>', '*', '>', 'project.views.CustomView', 'Label[ name ^= "wow"]']
    end
    
    it 'should copy find to uki'
        uki.find.should.not.be_undefined
    end
    
    describe 'filtering'
        before_each
            tree = uki.build([
                { view: 'Box', rect: '0 0 1000 1000', name: 'top', childViews: [
                    { view: 'Box', rect: '0 0 1000 1000', name: 'second', childViews: [
                        { view: 'Box', rect: '10 10 100 100', name: 'third', someAttribute: true, childViews: [
                            { view: 'Label', rect: '10 10 100 100', name: 'label1', someAttribute: false }
                        ]},
                        { view: 'Label', rect: '200 10 100 100', name: 'label2' },
                        { view: 'Label', rect: '400 10 100 100', name: 'label3' }
                    ]}
                ]}
            ]);
        
        end

        it 'by *'
            elements = uki.Selector.find('*', tree);
            elements.length.should.be 5
            uki.attr(elements[0], 'name').should.be 'second'
            uki.attr(elements[1], 'name').should.be 'third'
            uki.attr(elements[2], 'name').should.be 'label1'
            uki.attr(elements[3], 'name').should.be 'label2'
            uki.attr(elements[4], 'name').should.be 'label3'
        end
    
        it 'by * *'
            elements = uki.Selector.find('* *', tree);
            elements.length.should.be 4
            uki.attr(elements[0], 'name').should.be 'third'
            uki.attr(elements[1], 'name').should.be 'label1'
            uki.attr(elements[2], 'name').should.be 'label2'
            uki.attr(elements[3], 'name').should.be 'label3'
        end
    
        it 'by full typeName()'
            elements = uki.Selector.find('uki.view.Label', tree);
            elements.length.should.be 3
            uki.attr(elements[0], 'name').should.be 'label1'
            uki.attr(elements[1], 'name').should.be 'label2'
            uki.attr(elements[2], 'name').should.be 'label3'
        end
    
        it 'by contracted typeName()'
            elements = uki.Selector.find('Box', tree);
            elements.length.should.be 2
            uki.attr(elements[0], 'name').should.be 'second'
            uki.attr(elements[1], 'name').should.be 'third'
        end
    
        it 'by attribute'
            elements = uki.Selector.find('[name=second]', tree);
            elements.length.should.be 1
            uki.attr(elements[0], 'name').should.be 'second'
        end
        
        it 'by attribute in brackets'
            elements = uki.Selector.find('[name="second"]', tree);
            elements.length.should.be 1
            uki.attr(elements[0], 'name').should.be 'second'
        end
    
        it 'by attribute and typeName()'
            elements = uki.Selector.find('Box[name=second]', tree);
            elements.length.should.be 1
            uki.attr(elements[0], 'name').should.be 'second'
        end
        
        it 'by ^= attribute'
            elements = uki.Selector.find('[name^="label"]', tree);
            elements.length.should.be 3
            uki.attr(elements[0], 'name').should.be 'label1'
            uki.attr(elements[1], 'name').should.be 'label2'
            uki.attr(elements[2], 'name').should.be 'label3'
        end
        
        it 'by $= attribute'
            elements = uki.Selector.find('*[name$="bel1"]', tree);
            elements.length.should.be 1
            uki.attr(elements[0], 'name').should.be 'label1'
        end
        
        it 'by ~= attribute'
            elements = uki.Selector.find('*[name~="abe"]', tree);
            elements.length.should.be 3
            uki.attr(elements[0], 'name').should.be 'label1'
            uki.attr(elements[1], 'name').should.be 'label2'
            uki.attr(elements[2], 'name').should.be 'label3'
        end
        
        it 'by attribute presence'
            elements = uki.Selector.find('*[someAttribute]', tree);
            elements.length.should.be 1
            uki.attr(elements[0], 'name').should.be 'third'
        end
        
        it 'direct children with >'
            elements = uki.Selector.find('>', [tree[0].childViews()[0]]);
            elements.length.should.be 3
            uki.attr(elements[0], 'name').should.be 'third'
            uki.attr(elements[1], 'name').should.be 'label2'
            uki.attr(elements[2], 'name').should.be 'label3'
        end
        
        it 'direct children with > *'
            elements = uki.Selector.find('> *', [tree[0].childViews()[0]]);
            elements.length.should.be 3
            uki.attr(elements[0], 'name').should.be 'third'
            uki.attr(elements[1], 'name').should.be 'label2'
            uki.attr(elements[2], 'name').should.be 'label3'
        end
        
        it 'right after with +'
            elements = uki.Selector.find('Box + Label', tree);
            elements.length.should.be 1
            uki.attr(elements[0], 'name').should.be 'label2'
        end
        
        it 'right after with ~'
            elements = uki.Selector.find('Box ~ Label', tree);
            elements.length.should.be 2
            uki.attr(elements[0], 'name').should.be 'label2'
            uki.attr(elements[1], 'name').should.be 'label3'
        end
        
        it 'direct children within container >'
            elements = uki.Selector.find('Box > Label', tree);
            elements.length.should.be 3
            uki.attr(elements[0], 'name').should.be 'label2'
            uki.attr(elements[1], 'name').should.be 'label3'
            uki.attr(elements[2], 'name').should.be 'label1'
        end
        
        it 'by :eq modifier'
            elements = uki.Selector.find('Box:eq(0) > Label:eq(0)', tree);
            elements.length.should.be 1
            uki.attr(elements[0], 'name').should.be 'label2'
        end
        
        it 'by :gt modifier'
            elements = uki.Selector.find('Box:gt(0)', tree);
            elements.length.should.be 1
            uki.attr(elements[0], 'name').should.be 'third'
        end
    end
end