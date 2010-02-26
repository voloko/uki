describe 'uki.theme.Template'
    it 'should replace single value'
        var t = new uki.theme.Template('<code>${value}</code>')
        t.render({value: '111'}).should.be '<code>111</code>'
    end
    
    it 'should replace at the beggining of a string'
        var t = new uki.theme.Template('${before}<code>${value}</code>')
        t.render({before: '000', value: '111'}).should.be '000<code>111</code>'
    end
    
    it 'should replace at the end of a string'
        var t = new uki.theme.Template('<code>${value}</code>${after}')
        t.render({value: '111', after: '222'}).should.be '<code>111</code>222'
    end
    
    it 'should replace several same values'
        var t = new uki.theme.Template('<code>${value} ${value}</code>');
        t.render({value: '111'}).should.be '<code>111 111</code>'
    end
    
    it 'should replace adjacent values'
        var t = new uki.theme.Template('<code>${a}${b}</code>');
        t.render({a: '111', b: '222'}).should.be '<code>111222</code>'
    end
end
