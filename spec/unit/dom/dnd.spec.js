describe 'DnD'
    before_each
        dom = uki.createElement('div', '', '<span>1<u>2</u></span><b>3</b>')
        u = dom.getElementsByTagName('u')[0]
        b = dom.getElementsByTagName('b')[0]
    end
    
    describe 'uki.dom.DataTransfer'
        before_each
            dt = new uki.dom.DataTransfer();
        end
        
        it 'should set data'
            dt.setData('text/plain', 'value')
            dt.getData('text/plain').should.be 'value'
        end
        
        it 'should add data to types list'
            dt.setData('text/plain', 'value')
            dt.setData('text/html', '<b>value</b>')
            dt.types.should.eql ['text/plain', 'text/html']
        end
        
        it 'should remove single data element'
            dt.setData('text/plain', 'value')
            dt.setData('text/html', '<b>value</b>')
            dt.clearData('text/html')
            dt.types.should.eql ['text/plain']
            dt.getData('text/html').should.be_undefined
        end
        
        it 'should remove all data'
            dt.setData('text/plain', 'value')
            dt.setData('text/html', '<b>value</b>')
            
            dt.clearData()
            
            dt.types.should.eql []
            dt.getData('text/html').should.be_undefined
            dt.getData('text/plain').should.be_undefined
        end
        
        it 'should convert uki views to dom nodes'
            dt.setDragImage(uki({ view: 'Label', rect: '0 0 100 100', anchors: 'left top' }))
            dt._dragImage.tagName.should.be 'DIV'
        end
        
        it 'should remove drag image after cleanup'
            dt.setDragImage(uki({ view: 'Label', rect: '0 0 100 100', anchors: 'left top' }))
            dt.cleanup()
            dt._dragImage.should.be_undefined
        end
    end
    
    describe 'uki.dom.DataTransferWrapper'
        before_each
            domDataTransfer = new uki.dom.DataTransfer();
            dt = new uki.dom.DataTransferWrapper(domDataTransfer);
        end
        
        it 'should convert uki views to dom nodes'
            var image
            domDataTransfer.setDragImage = function(i) {
                image = i
            };
            dt.setDragImage(uki({ view: 'Label', rect: '0 0 100 100', anchors: 'left top' }))
            image.tagName.should.be 'DIV'
        end
    end
  
end