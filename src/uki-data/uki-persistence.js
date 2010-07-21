/**
 * persistencejs integration (http://www.persistencejs.org)
 * 
 **/ 
 
// Example
// =======
// // persistence engine
// include('path/to/persistence.js'); 
// include('path/to/persistence.sync.js'); // optional
// include('path/to/persistence.search.js'); // optional
// include('path/to/persistence.migrations.js'); // optional
// include('path/to/uki-data/uki-persistence.js');
//                  
// persistence.connect('myDbName', 'database', 5 * 1024 * 1024, '1.0'); 
//                          
// var User = uki.persistence.define('User', {
//   firstname: "TEXT",
//   lastname: "TEXT"
// });
// 
// var aUser = new User();
// 
// aUser.firstname("Mike") ;
// 
// console.log(aUser.firstname()); // => Mike 
// 
// persistence.add(aUser);
// 
// persistence.flush();


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
 
if (persistence.sync) { 
    persistence.sync.get = function(uri, onSuccess, onError) {
        uki.ajax({
            url: uri,
            type: 'GET',
            success: function(response) {
                if (onSuccess) onSuccess(response);
            },
            error: function(response) {
                if (onError) onError(response); 
            }
        });
    }
    persistence.sync.post = function(uri, data, successCallback, errorCallback) {
        uki.ajax({
            url: uri,
            type: 'POST',
            data: data, 
            dataType: 'json', 
            success: function(response) {
                if (onSuccess) onSuccess(response);
            },
            error: function(response) {
                if (onError) onError(response); 
            }
        });
    } 
}