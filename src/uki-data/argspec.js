// from http://github.com/zefhemel/argspecjs
   
uki.argspec = {
    getArgs: function(args, specs) {
      var argIdx = 0;
      var specIdx = 0;
      var argObj = {};
      while(specIdx < specs.length) {
        var s = specs[specIdx];
        var a = args[argIdx];
        if(s.optional) {
          if(a !== undefined && s.check(a)) {
            argObj[s.name] = a;
            argIdx++;
            specIdx++;
          } else {
            if(s.defaultValue) {
              argObj[s.name] = s.defaultValue;
            }
            specIdx++;
          }
        } else {
          if(s.check && !s.check(a)) {
            throw "Invalid value for argument: " + s.name + " Value: " + a; // TODO: replace with uki.error ??
          }
          argObj[s.name] = a;
          specIdx++;
          argIdx++;
        }
      }
      return argObj;
    }, 
    
    hasProperty: function(name) {
      return function(obj) {
        return obj[name] !== undefined;
      };
    },

    hasType: function(type) {
      return function(obj) {
        return typeof obj === type;
      };
    },

    isCallback: function() {
      return function(obj) {
        return obj && obj.apply;
      };
    }
};