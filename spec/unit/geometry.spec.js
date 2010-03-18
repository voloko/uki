describe 'uki.Geometry'
    Rect = uki.geometry.Rect;
    Size = uki.geometry.Size;
    Point = uki.geometry.Point;
    Inset = uki.geometry.Inset;
    
    describe 'Point'
        it 'should serialize to string'
            s = new Point(-1, 12)
            (s + '').should.be '-1 12'
        end
        
        it 'should unserialize from string'
            Point.fromString('10 -11').should.eql new Point(10, -11)
        end
    end  
    
    describe 'Size'
        it 'should serialize to string'
            s = new Size(10, 20)
            (s + '').should.be '10 20'
        end
        
        it 'should unserialize from string'
            Size.fromString('20 21').should.eql new Size(20, 21)
        end
    end
    
    describe 'Rect'
        it 'should serialize to string'
            s = new Rect(10, 11, 21, 22)
            (s + '').should.be '10 11 21 22'
        end
    
        it 'should unserialize from string'
            Rect.fromString('10 11 21 22').should.eql new Rect(10, 11, 21, 22)
        end
    
        it 'should create iteself from Point and Size'
            s = new Rect(new Point(10, 11), new Size(12, 13))
            s.should.eql new Rect(10, 11, 12, 13)
        end
        
        it 'should create itself from coords'
            Rect.fromCoords(10, 20, 100, 200).should.eql new Rect(10, 20, 90, 180)
        end
        
        it 'should create itself from 2 Points'
            Rect.fromCoords(new Point(10, 20), new Point(100, 200)).should.eql new Rect(10, 20, 90, 180)
        end
        
        it 'should serialize to coords string'
            r = new Rect(10, 11, 21, 22);
            r.toCoordsString().should.be '10 11 31 33'
        end
    end
    
    describe 'Inset'
        it 'should create itself from 4 offsets'
            var i = new Inset(0, 1, 2, 3);
            (i + '').should.be '0 1 2 3'
        end
        
        it 'should create itself from 2 offsets'
            i = new Inset(2, 4);
            (i + '').should.be '2 4 2 4'
        end
      
        it 'should create itself from zerros'
            i = new Inset(2, 4, 0, 0);
            (i + '').should.be '2 4 0 0'
        end
        
        it 'should unserialize from string'
            i = Inset.fromString('1 2 3 4');
            (i + '').should.be '1 2 3 4'
        end
    end
end