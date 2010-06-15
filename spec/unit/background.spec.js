describe 'uki.background'

    it 'should unserialize themed backgrounds'
        b = uki.background('theme(panel)')
        b.should.be_an_instance_of uki.background.LinearGradient
    end
    
    it 'should unserialize cssBox backgrounds'
        b = uki.background('cssBox(border: 1px solid red;background:#CCCCCC)')
        b.should.be_an_instance_of uki.background.CssBox
        // IE reorders elements
        b._container.style.border.should.include 'solid'
        b._container.style.border.should.include '1px'
        b._container.style.border.should.include 'red'
    end
    
    it 'should unserialize rows backgrounds'
        b = uki.background('rows(30, #CCCCCC, #FFFFFF)')
        b.should.be_an_instance_of uki.background.Rows
        b._colors.should.eql ['#CCCCCC', '#FFFFFF']
    end
    
    it 'should unserialize simple css backgrounds'
        b = uki.background('#CCCCCC')
        b.should.be_an_instance_of uki.background.Css
        b._options.background.should.be '#CCCCCC'
    end
  
end