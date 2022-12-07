//we create the map object with options
let map = L.map('mapid').setView([40.7,-94.5],4)
.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v12'));

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/1/1/0?access_token=pk.eyJ1IjoiY3liZXJjZWx0Mzg2IiwiYSI6ImNsYmNwODlxYzFveDIzbnBrd3F1cG5mcGcifQ.nM81HgZGU5LjaAmSJo_Y9A", {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

