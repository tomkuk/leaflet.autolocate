# Leaflet.Control.Autolocate

This is a simple control to autolocate user.

## Usage
	
Include *leaflet.autolocate.js* after Leaflet is loaded.

	<script src="http://cdn.leafletjs.com/leaflet-0.4.5/leaflet.js"></script>
    <script src="leaflet.autolocate.js"></script>

Instantiate the Autolocate control and add it to the map:

    var autolocate = new L.Control.Autolocate();
    map.addControl(autolocate);

## Styles

This controle use css class `leaflet-control-autolocate`. You need to handle all styles for control and button:
	
	leaflet-control-autolocate {
      padding: 5px;
      background: rgba(0, 0, 0, 0.25);
      moz-border-radius: 7px;
      -webkit-border-radius: 7px;
      border-radius: 7px;
    }

    .leaflet-control-autolocate a {
      -moz-border-radius: 4px;
      -webkit-border-radius: 4px;
      border-radius: 4px;
      width: 19px;
      height: 19px;
      display: block;
      background-color: rgba(255, 255, 255, 0.75);
    }

    .leaflet-control-autolocate a:hover {
      background-color: white;
    }

    /**
     * button styles
     */
    .leaflet-control-autolocate-btn {
      background-image: url(http://f.cl.ly/items/3V2F1R3u0M0K1G1E0u2R/location.png);
      background-size: 70%;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }

# Notes

This control was built and tested for Leaflet veriosn 0.4.5  