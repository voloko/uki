
/**
 * Google Map View. 
 * @author Piotr Duda
 * @name uki.view.GMap
 * @class
 * @extends uki.view.Base 
*/

uki.view.declare('uki.view.GMap', uki.view.Base, function() {

	/* Link to the Google Maps service */
	this._gmapURL = 'http://maps.google.com/maps/api/staticmap?';
	this._markers = [];

	/* Returns the name of the component */
    this.typeName = function() {
		return 'uki.view.GMap';	
	}
    
   	/* Set the string location value for the map */
	this.location = uki.newProp('_location', function(value) {
	    this._location = value;
	    this._onChange();
	}); 
	
	this.zoom = uki.newProp('_zoom', function(value) {
	    this._zoom = value;
	    this._onChange();
	});
	
	this.maptype = uki.newProp('_maptype', function(value) {
	    this._maptype = value;
	    this._onChange();
	});
	
	this.markers = uki.newProp('_markers', function(value) {
	    this._markers = value;
	    this._onChange();
	});
	
	this._createDom = function() {
        this._a = uki.createElement('a', this.defaultCss);
        this._img = uki.createElement('img', this.defaultCss);	
		this._a.appendChild(this._img);
		this._dom = this._a;
		this._initClassName();
	}
	
	/* The location was changed. Recalculate and display the map */
	this._onChange = function() {
		var map_url = this._gmapURL;
		var rect = this.rect();
	    var mapping = {
	        'center'    : this._location,
	        'size'      : rect.width+"x" + rect.height,
	        'zoom'      : this._zoom,
	        'maptype'   : this._maptype,
	        'sensor'    : 'false'
	    };
	    
	    // Generate the URL
        uki.each(mapping, function(k,v) {
            if(v != null && v != undefined)
                map_url += "&" + k + "=" + v;       
        });        
        
        uki.each(this._markers, function(i,v) {
            map_url += "&markers=" + "color:" + v.color + '|' + "label:" + v.label +
                '|' + v.lot + ',' + v.lat;
        });
        		
	    this._a.href = encodeURI(map_url);
    	this._img.src= encodeURI(map_url);
	}
	
});

	    
//Basic Usage:
/*
gmap = uki({
    view: 'uki.view.GMap',
    rect: '0 0 512 512',
    location: 'New York,NY',
    zoom : '20',
    markers: [
        { color : "green",  lot: 40.711614, lat: -74.01231, label: "S" }
    ]
});

gmap.attachTo( document.getElementById('gmaps'));
*/
