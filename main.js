/* Vienna Sightseeing Beispiel */

// Stephansdom Objekt
let stephansdom = {
    lat: 48.208493,
    lng: 16.373118,
    zoom: 12,
    title: "Domkirche St. Stephan",
};

// Karte initialisieren
let map = L.map("map").setView([stephansdom.lat, stephansdom.lng], stephansdom.zoom);

// Hintergrundkarte definieren


//Layercontrol
L.control.layers({
    "BasemapAT grau": L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png', {
        maxZoom: 19,
        attribution: 'Hintergrundkarte: <a href="https://www.basemap.at">basemap.at</a>'
    }).addTo(map)
},{
    "Sehenswürdigkeiten": L.featureGroup().addTo(map),
    "Vienna sightseeing Linien": L.featureGroup().addTo(map),
    "Vienna sightseeing Haltestellen": L.featureGroup().addTo(map),
    "Fußgängerzone": L.featureGroup().addTo(map),
}).addTo(map);

//Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);

//sehnswürdigkeiten Standorte
async function loadSights(url) {
    //console.log(url);
    let response = await fetch(url);
    let jasondata = await response.json();
    //console.log(jasondata);
    L.geoJSON(jasondata,{
        attribution: "Datenquelle: <a href='https://data.wien.gv.at'>Stadt Wien</a>"
    }).addTo(map);
}

//sehnswürdigkeiten Touristische Kraftfahrlinien Liniennetz Vienna Sightseeing Linie Wien 
async function loadLines(url) {
    //console.log(url);
    let response = await fetch(url);
    let jasondata = await response.json();
    //console.log(jasondata);
    L.geoJSON(jasondata,{
        attribution: "Datenquelle: <a href='https://data.wien.gv.at'>Stadt Wien</a>"
    }).addTo(map);
}

//sehnswürdigkeiten Touristische Kraftfahrlinien Haltestellen Vienna Sightseeing Linie Standorte Wien
async function loadStops(url) {
    //console.log(url);
    let response = await fetch(url);
    let jasondata = await response.json();
    //console.log(jasondata);
    L.geoJSON(jasondata,{
        attribution: "Datenquelle: <a href='https://data.wien.gv.at'>Stadt Wien</a>"
    }).addTo(map);
}

//sehnswürdigkeiten Fußgängerzone
async function loadZones(url) {
    //console.log(url);
    let response = await fetch(url);
    let jasondata = await response.json();
    //console.log(jasondata);
    L.geoJSON(jasondata,{
        attribution: "Datenquelle: <a href='https://data.wien.gv.at'>Stadt Wien</a>"
    }).addTo(map);
}

// GeoJOSN Daten laden und visualisieren
loadSights("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SEHENSWUERDIGOGD&srsName=EPSG:4326&outputFormat=json");
loadLines("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKLINIEVSLOGD&srsName=EPSG:4326&outputFormat=json");
loadStops("hhttps://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKHTSVSLOGD&srsName=EPSG:4326&outputFormat=json");
loadZones("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:FUSSGEHERZONEOGD&srsName=EPSG:4326&outputFormat=json");

