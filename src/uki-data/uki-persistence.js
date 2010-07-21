/**
 * persistencejs integration (http://www.persistencejs.org)
 * 
 * (persistence.js from http://github.com/rsaccon/persistencejs)
 *  
 * Example:
 *
 * // persistence engine
 * include('/path/to/persistence.js'); 
 * include('/path/to/persistence.sync.js'); // optional
 * include('/path/to/persistence.search.js'); // optional
 * include('/path/to/persistence.migrations.js'); // optional
 * include('/path/to/uki-data/uki-persistence.js');
 * uki.persistence = persistence;
 *                  
 * uki.persistence.connect('myDbName', 'database', 5 * 1024 * 1024, '1.0'); 
 *                          
 * var User = uki.persistence.define('User', {
 *   firstname: "TEXT",
 *   lastname: "TEXT"
 * });
 *
 * var aUser = new User();
 *
 * aUser.firstname("Mike") ;
 *
 * console.log(aUser.firstname()); // => Mike 
 *
 * uki.persistence.add(aUser);
 * 
 * uki.persistence.flush();
 * 
 */
 
 persistence.defineProp = function(scope, field, setterCallback, getterCallback) {
    scope[field] = function(val) {
        if (val === undefined) { 
            return getterCallback();
        } else {
            setterCallback(val); 
            return scope;
        }
    };
};      

persistence.entityPropToEntityVal = function(val) { 
    return val(); 
};