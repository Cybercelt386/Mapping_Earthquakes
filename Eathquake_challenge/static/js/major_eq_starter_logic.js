// use to veiw data
/* d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson').then(data =>{
    console.log(data);
});
*/

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

let baseMap = {'streets':streets, 'satellites':satelliteStreets};

let map = L.map('map', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [streets]
});
//add layer groups 

//add allearthquakes markers
let earthquakes = new L.layerGroup();

//add tectonic plates
let tectonicplates = new L.layerGroup();

//add major earthquakes
let majorEarthquakes = new L.layerGroup();

let overlays = {
'AllEarthquakes':earthquakes, 
'Tectonicplates':tectonicplates, 
'Major Earthquakes':majorEarthquakes
}
L.control.layers(baseMap,overlays).addTo(map);

d3.json('https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json').then(data => {

    L.geoJson(data,{color:'red',weight:2}).addTo(tectonicplates);
    tectonicplates.addTo(map)
});



d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson').then(data =>{
    L.geoJson(data).addTo(earthquakes);
	for (let i =0; i < data.features.length; i++) {
	let coords = data.features[i].geometry.coordinates.slice(0,2);
	let magnitude = data.features[i].properties.mag;
	console.log(coords),
	L.circleMarker(coords, {
		radius: magnitude * 5,
		fillColor: "red"
	}).addTo(map);

}

});