//we create the map object with options
let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
//let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}',
{attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    tileSize:512,
    maxZoom: 18,
    zoomOffset: -1,
    id:"mapbox/steets-v11",
    accessToken: API_KEY
}); 

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

//  Add a marker to the map for Los Angeles, California.
let marker = L.marker([34.0522, -118.2437]).addTo(map);

L.circle([34.0522, -118.2437], {
    radius: 300,
    color: "black",
    fillColor:"#ffffa1"
 }).addTo(map);

 // An array containing each city's location, state, and population.
let cities = [{
    location: [40.7128, -74.0059],
    city: "New York City",
    state: "NY",
    population: 8398748
  },
  {
    location: [41.8781, -87.6298],
    city: "Chicago",
    state: "IL",
    population: 2705994
  },
  {
    location: [29.7604, -95.3698],
    city: "Houston",
    state: "TX",
    population: 2325502
  },
  {
    location: [34.0522, -118.2437],
    city: "Los Angeles",
    state: "CA",
    population: 3990456
  },
  {
    location: [33.4484, -112.0740],
    city: "Phoenix",
    state: "AZ",
    population: 1660272
  }
  ];


  // Loop through the cities array and create one marker for each city.
cities.forEach(function(city) {
    console.log(city)
    L.marker(city.location).addTo(map);
   });

   // Get data from cities.js
let cityData = cities;

cityData.forEach(function(city) {
  console.log(city)
  L.circleMarker(city.location, {
    radius: city.population/100000
  })
  .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString + "</h3>")
  .addTo(map);
});


// Coordinates for each point to be used in the polyline.
let line = [
  [33.9416, -118.4085],
  [37.6214, -122.3790],
  [40.7899, -111.9791],
  [47.4502, -122.3088]
];

// Create a polyline using the line coordinates and make the line yellow.
L.polyline(line, {
  color: "red"
}).addTo(map);

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"14",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

L.geoJSON(geojsonFeature).addTo(map);

L.geoJson(data, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng);
   }
});
// Grabbing our GeoJSON data.
L.geoJSON(sanFranAirport, {
  // We turn each feature into a marker on the map.
  pointToLayer: function(feature, latlng) {
    console.log(feature);
    return L.marker(latlng)
    .bindPopup("<h2>" + feature.properties.city + "</h2>");
  }

}).addTo(map);

L.geoJSON(data, {
  onEachFeature: function(feature, layer) {
    layer.bindPopup();
   }
});

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/<GitHub_name>/Mapping_Earthquakes/main/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data).addTo(map);
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Dark: dark
};

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/<GitHub_name>/Mapping_Earthquakes/main/torontoRoutes.json";

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data).addTo(map);
});

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/<GitHub_name>/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Create a legend control object.
let legend = L.control({
  position: "bottomright"
});

// Then add all the details for the legend.
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
};

const magnitudes = [0, 1, 2, 3, 4, 5];
const colors = [
  "#98ee00",
  "#d4ee00",
  "#eecc00",
  "#ee9c00",
  "#ea822c",
  "#ea2c2c"
];

