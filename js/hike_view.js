function hike_map_init() {

	var mapboxgl_accessToken = 'pk.eyJ1IjoiYWphcnYiLCJhIjoiY2ppYXFrYnV5MHlpMzN2bG13cXF0NHd4cyJ9.JI8nxtMD6lbhFmhybaSyEA';
	
	// create the map object and set the cooridnates of the initial view:
	var hike_data = hike_info;
	var waypoints = hike_data.map.waypoints;
	var mapDivId11 = 'map_' + hike_data.id + '_zl_11';
	var mapDivId09 = 'map_' + hike_data.id + '_zl_09';

	if (waypoints.length > 0) {

    
		var map09 = L.map(mapDivId09).setView([waypoints[0].lat, waypoints[0].lng], 12);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            maxZoom: 11,
            id: 'mapbox.streets',
            accessToken: mapboxgl_accessToken
		}).addTo(map09);

		if (waypoints.length) {
			L.marker([waypoints[0].lat, waypoints[0].lng]).addTo(map09).bindPopup(waypoints[0].label)
		}

		var map11 = L.map(mapDivId11).setView([waypoints[0].lat, waypoints[0].lng], 16);

		// create the tile layer with correct attribution: 
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            maxZoom: 21,
            id: 'mapbox.satellite',
            accessToken: mapboxgl_accessToken
		}).addTo(map11);

        var markers = []
		for (var ix = 0; ix < waypoints.length; ix++) {
            var marker = L.marker([waypoints[ix].lat, waypoints[ix].lng]).addTo(map11).bindPopup(waypoints[ix].label)
            markers.push(marker)
        }
        var group = new L.featureGroup(markers);
        map11.fitBounds(group.getBounds());


 map.fitBounds(group.getBounds());
	}
}
if (typeof $ !== 'undefined' && typeof hike_info !== 'undefined') {
	$(hike_map_init)
}
