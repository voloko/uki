describe 'uki.dom'
    it 'should create elements with style'
        x = uki.createElement('div', 'margin: 2px;border: 1px solid red');
        // IE reorders elements
        x.style.border.should.include 'solid'
        x.style.border.should.include '1px'
        x.style.border.should.include 'red'
    end

    it 'should create stylesheets'
        x = uki.createElement('div')
        x.className = 'test' + uki.guid++
        uki.dom.createStylesheet('.' + x.className + ' { display: inline !important; }')
        uki.dom.probe(x, function() {
            uki.dom.computedStyle(x).display.should.be 'inline'
        });
    end  
    
    it 'should check if element contains another one'
        x = uki.createElement('div', '', '<span><b>1</b></span>')
        uki.dom.contains(x, x.firstChild).should.be_true
        uki.dom.contains(x, x.firstChild.firstChild).should.be_true
        uki.dom.contains(document.body, x).should.be_false
        uki.dom.probe(x, function() {
            uki.dom.contains(document.body, x).should.be_true
        })
    end
end