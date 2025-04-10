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

//Overlays definieren
let overlays = {
    sights: L.featureGroup().addTo(map),
    lines: L.featureGroup().addTo(map),
    stops: L.featureGroup().addTo(map),
    zones: L.featureGroup().addTo(map),
    hotels: L.featureGroup().addTo(map),
};
//Layercontrol
L.control.layers({
    "BasemapAT": L.tileLayer.provider('BasemapAT.basemap'),
    "BasemapAT grau": L.tileLayer.provider('BasemapAT.grau').addTo(map),
    "BasemapAT HighDPI": L.tileLayer.provider('BasemapAT.highdpi'),
    "BasemapAT Orthofoto": L.tileLayer.provider('BasemapAT.orthofoto'),
    "BasemapAT Overlay": L.tileLayer.provider('BasemapAT.overlay'),
    "BasemapAT Terrain": L.tileLayer.provider('BasemapAT.terrain'),
    "BasemapAT Surface": L.tileLayer.provider('BasemapAT.surface'),
},{
    "Sehenswürdigkeiten": overlays.sights,
    "Vienna sightseeing Linien": overlays.lines,
    "Vienna sightseeing Haltestellen": overlays.stops,
    "Fußgängerzone": overlays.zones,
    "Hotels": overlays.hotels,
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
    }).addTo(overlays.sights);
}

//sehnswürdigkeiten Touristische Kraftfahrlinien Liniennetz Vienna Sightseeing Linie Wien 
async function loadLines(url) {
    //console.log(url);
    let response = await fetch(url);
    let jasondata = await response.json();
    //console.log(jasondata);
    L.geoJSON(jasondata,{
        attribution: "Datenquelle: <a href='https://data.wien.gv.at'>Stadt Wien</a>",
        style: function (feature) {
            //console.log(feature);
            let lineColor;
            if(feature.properties.LINE_NAME == "Yellow Line") {
                lineColor = "#FFDC00";
            }else if(feature.properties.LINE_NAME == "Blue Line") {
                lineColor = "#0074D9";
            }else if(feature.properties.LINE_NAME == "Green Line") {
                lineColor = "#2ECC40";
            }else if(feature.properties.LINE_NAME == "Grey Line") {
                lineColor = "#AAAAAA";
            }else if(feature.properties.LINE_NAME == "Orange Line") {
                lineColor = "#FF851B";
            }else if(feature.properties.LINE_NAME == "Red Line") {
                lineColor = "#FF4136";
            } else{
                lineColor = "#111111";
            }
            return {
                color: lineColor
                
            }
        }
    }).addTo(overlays.lines);
}

//sehnswürdigkeiten Touristische Kraftfahrlinien Haltestellen Vienna Sightseeing Linie Standorte Wien
async function loadStops(url) {
    //console.log(url);
    let response = await fetch(url);
    let jasondata = await response.json();
    //console.log(jasondata);
    L.geoJSON(jasondata,{
        attribution: "Datenquelle: <a href='https://data.wien.gv.at'>Stadt Wien</a>"
    }).addTo(overlays.stops);
}

//sehnswürdigkeiten Fußgängerzone
async function loadZones(url) {
    //console.log(url);
    let response = await fetch(url);
    let jasondata = await response.json();
    //console.log(jasondata);
    L.geoJSON(jasondata,{
        attribution: "Datenquelle: <a href='https://data.wien.gv.at'>Stadt Wien</a>",
        style: function (feature) {
            //console.log(feature);
            return {
                color:"#F012BE",
                weight: 1,
                opacity: 0.4,
                fillOpacity: 0.1,
            }
        }
    }).addTo(overlays.zones);
}

//Hotels
async function loadHotels(url) {
    //console.log(url);
    let response = await fetch(url);
    let jasondata = await response.json();
    //console.log(jasondata);
    L.geoJSON(jasondata,{
        attribution: "Datenquelle: <a href='https://data.wien.gv.at'>Stadt Wien</a>"
    }).addTo(overlays.hotels);
}


// GeoJOSN Daten laden und visualisieren
loadSights("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SEHENSWUERDIGOGD&srsName=EPSG:4326&outputFormat=json");
//loadLines("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKLINIEVSLOGD&srsName=EPSG:4326&outputFormat=json");
//loadStops("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKHTSVSLOGD&srsName=EPSG:4326&outputFormat=json");
//loadZones("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:FUSSGEHERZONEOGD&srsName=EPSG:4326&outputFormat=json");
//loadHotels("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:UNTERKUNFTOGD&srsName=EPSG:4326&outputFormat=json")
