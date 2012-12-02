L.Control.Autolocate = L.Control.extend({
  includes: L.Mixin.Events,
  
  options: {
    position: 'topleft',
    maxZoom: 16,
    showMarker: true,
    showCircle: true,
    button: {
      title: "Get current location"
    },
    markerStyle: {
      color: '#136AEC',
      fillColor: '#2A93EE',
      fillOpacity: 0.7,
      weight: 2,
      opacity: 0.9,
      radius: 4
    },
    circleStyle: {
      color: '#136AEC',
      fillColor: '#2A93EE',
      fillOpacity: 0.7,
      weight: 2,
      opacity: 0.9,
      radius: 4
    }

  },

  initialize: function(options) {
     L.Util.setOptions(this, options);
  },
    
  onAdd: function (map) {
    var className = 'leaflet-control-autolocate', 
        container = L.DomUtil.create('div', className);
    
    this._map = map;
    this._layer = new L.LayerGroup();
    this._layer.addTo(this._map);
    this._isActive = false;
    this._locationData = null;
    this._atLocation = false;

    this._locateOptions = {
      'setView': true,
      'watch': false,
      'maxZoom': this.options.maxZoom
    };
    
    this._createButton(this.options.button.title, 'leaflet-control-autolocate-btn', container, this.autolocate, this);
    
    this._map.on('locationfound', this._onLocationFound, this);
    this._map.on('locationerror', this._onLocationError, this);
    this._map.on('move', this._locationChanged, this);

    return container;
  },

  _onLocationFound: function (e) {
    if (this._locationData &&
      (this._locationData.latlng.lat != e.latlng.lat ||
      this._locationData.latlng.lon != e.latlng.lon)) {

      this._locationData._atLocation = false;
    } else { this._atLocation = true; }

    this._locationData = e;
    
    //if (!self._isActive) {
    //  return;
    //}

    this._showCircle();
  },

  _onLocationError: function (err) {
    alert(err.message);
  },

  _locationChanged: function (e) {
    this._atLocation = false;
  }, 

  autolocate: function() {
    if ( this._isActive && this._atLocation){
      this._hideCircle();
    } else { 
      if (!this._locationData || !this._atLocation) {
        this._enterCurrentLocation();
      } else { this._showCircle(); }
    }
  },

  _hideCircle: function() {
    if (this._circle) {
      this._layer.removeLayer(this._circle);
      this._isActive = false; 
    }
  },

  _showCircle: function() {
    var radius = this._locationData.accuracy / 2;

    this._layer.clearLayers();

    if (this.options.showCircle) {
      this._circle = L.circle(this._locationData.latlng, radius); 
      this._circle.addTo(this._layer);
    }

    L.circleMarker(this._locationData.latlng, this.options.markerStyle).addTo(this._layer);
    this._isActive = true;
  },

  _enterCurrentLocation: function() {
    this._map.locate(this._locateOptions);
  },

	_createButton: function (title, className, container, fn, context) {
		var link = L.DomUtil.create('a', className, container);
		link.href = '#';
		link.title = title;
    
		L.DomEvent
			.on(link, 'click', L.DomEvent.stopPropagation)
			.on(link, 'click', L.DomEvent.preventDefault)
			.on(link, 'click', fn, context)
			.on(link, 'dblclick', L.DomEvent.stopPropagation);

		return link;
	}
});