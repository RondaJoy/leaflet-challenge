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

  // Create a layer with the features array on the eqData object.
  // Run the onEachFeature function.
  let eqs = L.geoJSON(eqData, {
    onEachFeature: eachFeat});

  // Send our earthquakes layer to the createMap function/
  createMap(eqs);}

function createMap(eqs) {

  // Create the base layer.
  let baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})

  // Create a baseMaps object.
  let baseMaps = {"Street Map": baseLayer,};

  // Create an overlay object to hold our overlay.
  let overLay = {Earthquakes: eqs};

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let eqMap = L.map("map", {
    center: [34.1347, -84.0669],
    zoom: 3,
    layers: [baseLayer, eqs]});

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false}).addTo(myMap);}
