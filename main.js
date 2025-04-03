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
L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png', {
    maxZoom: 19,
    attribution: 'Hintergrundkarte: <a href="https://www.basemap.at">basemap.at</a>'
}).addTo(map);

// Marker mit Popup beim Stephansdom
let marker = L.marker([stephansdom.lat, stephansdom.lng]).addTo(map);
marker.bindPopup(stephansdom.title).openPopup();

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
loadSights("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SEHENSWUERDIGOGD&srsName=EPSG:4326&outputFormat=json");

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
loadLines("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKLINIEVSLOGD&srsName=EPSG:4326&outputFormat=json");

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
loadStops("hhttps://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKHTSVSLOGD&srsName=EPSG:4326&outputFormat=json");

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
loadZones("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:FUSSGEHERZONEOGD&srsName=EPSG:4326&outputFormat=json");

