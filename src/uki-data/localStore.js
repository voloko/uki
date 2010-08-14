include('json.js');

/**
 * Stores/retrieves an object in localStorage (if available) otherwise as cookie
 * 
 * @author rsaccon
 * @param {string} key
 * @param {object} value 
 * @param {string} path 
 * @returns {object}
 */ 
uki.localStore = function(key, value, path) {
    if (('localStorage' in window) && window.localStorage !== null) {
        var name = "prefs";
        if (value === undefined) {
            return localStorage[key];
        } else {
            localStorage[key] = value; 
        };
    } else { 
        if (value === undefined) { 
            var result;
            if (result = new RegExp("(?:^|; )" +key+ "=([^;]*)").exec(document.cookie)) {
                return uki.parseJSON(unescape(result[1]));
            } else return false;
        } else {
            var date = new Date(); 
            // set expiration to far-future (one year)
            date.setTime(date.getTime()+(365*24*60*60*1000));
            document.cookie = [
                key , '=' , escape(uki.stringifyJSON(value)),
                '; expires=', date.toUTCString(),
                '; path=', path || '/'
            ].join("");
        }
    } 
};