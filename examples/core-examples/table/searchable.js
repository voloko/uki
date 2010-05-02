/**
 * Search with chunks
 */
window.Searchable = uki.newClass(uki.view.Observable, new function() {
    this.chunkSize = 100;
    this.chunkTimeout = 20;
    
    this.init = function(data) {
        this.items = data;
    };
    
    this.search = function(query, callback) {
        stopSearch.call(this);
        
        this._query = query;
        var iterator = this.createIterator(query, callback);
        
        this.trigger('search.start', iterator);
        filterChunk.call(this, iterator);
    };
    
    this.matchRow = function( row, iterator ) { return false; };
    
    this.createIterator = function(query, callback) {
        return {
            query: query,
            iteration: 0,
            found: 0,
            callback: callback
        };
    };
    
    this._bindToDom = function() { return true };
    
    function filterChunk(iterator) {
        var filtered = 0,
            _this = this,
            foundInChunk = [],
            item;

        while(iterator.iteration < this.items.length) {
            if (filtered == this.chunkSize) {
                if (foundInChunk.length) this.trigger('search.foundInChunk', foundInChunk);
                this._searchTimer = setTimeout(function() { filterChunk.call(_this, iterator); }, this.chunkTimeout);
                return;
            }
            item = this.items[iterator.iteration];
            if (this.matchRow( item, iterator )) {
                iterator.found++;
                foundInChunk.push(item);
                this.trigger('search.found', item, iterator);
                if (iterator.callback) iterator.callback(item, iterator);
            } else {
                this.trigger('search.missed', item, iterator);
            }
            iterator.iteration++;
            filtered++;
        }
        this.trigger('search.foundInChunk', foundInChunk);

        stopSearch.call(this);
        this.trigger('search.finish', iterator);
    };

    function stopSearch () {
        if (this._searchTimer) {
            clearTimeout(this._searchTimer);
            this._searchTimer = false;
        }
    }    
});