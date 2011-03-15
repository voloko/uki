var uki = require('uki-core');

// min time for coarse estimate of total runtime
var MIN_TIME_ESTIMATE = 100;

// max number of runs when estimating
var MAX_RUNS_ESTIMATE = 1e5;

var MIN_TIME_BENCH = 2000;

/**
* Try always run for at least 2sec, then calculate the time of
* one call.
*/
module.exports = uki.newClass({
    init: function(name, fn) {
        this.name = name;
        this._fn = fn;
    },
    
    bench: function() {
        var e = this._estimate(),
            k = MIN_TIME_BENCH / e.t,
            n = e.n * k << 0;
        
        return this._run(n) / n;
    },
    
    name: 'Untitled Bench',
    
    _estimate: function() {
        var n = 1,
            t = 0;
            
        while (n < MAX_RUNS_ESTIMATE && (t = this._run(n)) < MIN_TIME_ESTIMATE)
            t *= 10;
            
        return { n: n, t: t };
    },
    
    _run: function(n) {
        var fn = this.fn,
            t  = new Date;
            
        while (n-- > 0) fn();
        
        return new Date - t;
    }
});