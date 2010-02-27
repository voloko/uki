describe 'uki.background'

    it 'should unserialize themed backgrounds'
        b = uki.background('theme(panel)')
        b.should.be_an_instance_of uki.background.Sliced9
    end
    
    it 'should unserialize cssBox backgrounds'
        b = uki.background('cssBox(border: 1px solid red;background:#CCCCCC)')
        b.should.be_an_instance_of uki.background.CssBox
        b._container.style.border.should.be '1px solid red'
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