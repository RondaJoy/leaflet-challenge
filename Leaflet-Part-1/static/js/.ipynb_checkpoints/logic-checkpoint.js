// Store our API endpoint as queryUrl.
let usgsURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL/
d3.json(usgsURL).then(function (usgsData) {
    // Send the data features object to createFeatures function.
    createFeatures(usgsData.features);});

function createFeatures(eqData) {
    // Define a function for the features in the array.
    // Assign popup that describes the place and time of the earthquake.
    function eachFeat(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);}
    
    // Define a function to create circle markers with size and color based on earthquake properties.
    function pointToLayer(feature, coords) {
        // Magnitude-based size calculation
        let size = feature.properties.mag * 4;
        // Depth-based color calculation
        let depth = feature.geometry.coordinates[2];
        let color = depth > 100 ? "#006600" : depth > 50 ? "#00b300" : depth > 20 ? "#1aff1a" : "#b3ffb3";
        
        // Customize circle marker.
        return L.circleMarker(coords, {radius: size,
                                       fillColor: color,
                                       color: "#000",
                                       weight: 1,
                                       opacity: 1,
                                       fillOpacity: 0.7});}
    
    // Create a layer with the features array on the eqData object.
    // Run the onEachFeature function.
    let eqs = L.geoJSON(eqData, {
        onEachFeature: eachFeat,
        pointToLayer: pointToLayer});

    // Send eqs layer to the createMap function
    createMap(eqs);}

function createMap(eqs) {

    // Create the base layer.
    let baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})

    // Create a baseMaps object.
    let baseMaps = {"Street Map": baseLayer,};

    // Create an overlay object to hold our overlay.
    let overlayMaps = {Earthquakes: eqs};

    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    let eqMap = L.map("map", {center: [34.1347, -84.0669], zoom: 3, layers: [baseLayer, eqs]});

    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(myMap);}
