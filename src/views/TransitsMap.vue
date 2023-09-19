<template>
    <div>
        <div>
            <button @click="getLocation" :disabled="showLocation">Get location</button>
        </div>
        <p></p>
        <div>
            <button @click="mapClickerFunction('startingCoords', 'start', 'yellow')" :disabled="startingCoords">Set starting
                location</button>
            <button @click="mapClickerFunction('destinationCoords', 'destination', 'lime')" :disabled="destinationCoords">Set
                destination</button>
        </div>
        <p></p>
        <button @click="cheapestOption(startingCoords, destinationCoords)"
            :disabled="!(destinationCoords && startingCoords)">Cheapest Option (shortest rideshare distances)</button>
        <button @click="shortestOption(startingCoords, destinationCoords)" :disabled="!(destinationCoords && startingCoords)">Shortest Option</button>
        <div v-if="startingCoords">
            Starting Coordinates: {{ startingCoords.lat }}, {{ startingCoords.lng }}
        </div>
        <div v-if="destinationCoords">
            Destination Coordinates: {{ destinationCoords.lat }}, {{ destinationCoords.lng }}
        </div>
        <div v-if="showLocation">
            <p v-if="currentPosition.lat || currentPosition.lng">
                {{ currentPosition.lat }}, {{ currentPosition.lng }}
            </p>
            <p v-else>Loading...</p>
            <p v-if="error">{{ error }}</p>
            <div v-else-if="!(currentPosition.lat || currentPosition.lng)">
                <p v-if="loadingTimeout">
                    If the location does not load, please check your permissions.
                </p>
            </div>
        </div>
        <p></p>
        <div ref="mapDiv" style="width: 100%; height: 80vh"></div>
    </div>
</template>

<script>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import { Loader } from "@googlemaps/js-api-loader"
import { addMarker } from "@/functions/addMarkers"
import { pathCalculations } from '@/functions/pathCalculations';
import { calculateDistance } from '@/functions/calculateDistance';

let supportedStopsDT = require('../../data/supported-stops/supportedStopsDT').DTStops;
let supportedStopsNS = require('../../data/supported-stops/supportedStopsNS').NSStops;
let supportedStopsTE = require('../../data/supported-stops/supportedStopsTE').TEStops;

let keys = require("../../data/google-map-apikey.json");
let errorText = null;
let loader = null;

// errorhandling for invalid apikey input
try {
    let apiKey = keys.apiKey;
    /*
    WARNING:
    make sure you put in a "Google Maps API Key" in the google-map-apikey.json file
    the file "google-map-apikey.json.example" shows the structure of the json file

    WARNING:
    if the website fails to load or crashes upon loading (especially on firefox) either:
    - replace the mapID in the google-map-apikey.json to "DEMO_MAP_ID"
    - try with a different browser
    */
    loader = new Loader({
        apiKey: apiKey,
    })
}
catch (e) {
    errorText = e.message
}

export default {
    setup() {
        let showLocation = ref(false);
        let loadingTimeout = ref(false);
        let error;

        let map = null;
        const mapDiv = ref(null);

        // get the user's position
        const currentPosition = ref({ lat: null, lng: null });

        function getLocation() {
            const isSupported = navigator.geolocation; // check whether client's browser/device supports geolocation

            function outputError() {
                error = "Browser does not support geolocation.";
            }

            showLocation.value = !showLocation.value;
            setTimeout(() => {
                loadingTimeout.value = !loadingTimeout.value;
            }, 5000)


            if (isSupported) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    currentPosition.value.lat = position.coords.latitude;
                    currentPosition.value.lng = position.coords.longitude;

                    let settingMarker = setInterval(function () {
                        if (currentPosition.value.lat) {
                            const { marker } = addMarker(map, { lat: currentPosition.value.lat, lng: currentPosition.value.lng });
                            clearMarkerInterval(settingMarker);
                        }
                    }, 500)

                    function clearMarkerInterval(variable) {
                        clearInterval(variable);
                    }
                });
            } else {
                outputError()
            }
        }

        // setting the starting and destination coordinates
        let clickListener = null;

        function mapClickerFunction(variableName, name, color) {
            let coordinatesVariable = null;
            clickListener = map.addListener('click', ({ latLng: { lat, lng } }) => {
                coordinatesVariable = { lat: lat(), lng: lng() }
            })

            let createMarker = setInterval(function () {
                if (coordinatesVariable) {
                    let { marker } = addMarker(map, { lat: coordinatesVariable.lat, lng: coordinatesVariable.lng }, name, color)
                    clearDestinationInterval(createMarker);
                }
            }, 250)

            function clearDestinationInterval() {
                clearInterval(createMarker);
                if (variableName === "destinationCoords") {
                    destinationCoords.value = coordinatesVariable
                }
                if (variableName === "startingCoords") {
                    startingCoords.value = coordinatesVariable
                }
            }
        }

        // calculating the paths
        let startingCoords = ref(null);
        let destinationCoords = ref(null);

        function cheapestOption(startingCoord, destinationCoord) {
            const possibleRoutes = pathCalculations(startingCoord, destinationCoord);
            // finds the shortest route from the array of possibleRoutes
            let shortestRoute;

            const rideshareDistances = []
            for (let route of possibleRoutes) {
                rideshareDistances.push(route.rideshareDistance)
            }

            let shortestRideshareDistance = rideshareDistances.sort((a, b) => a - b)[0];
            for (let route of possibleRoutes) {
                if (route.rideshareDistance === shortestRideshareDistance) {
                    shortestRoute = route;
                    break;
                }
            }

            if(calculateDistance(startingCoord, destinationCoord) < shortestRideshareDistance) {
                createPath(startingCoord, destinationCoord);
                return;
            }

            createPath(shortestRoute.coords.startPath.startingCoord, shortestRoute.coords.startPath.startingStop);
            createPath(shortestRoute.coords.endPath.destinationCoord, shortestRoute.coords.endPath.destinationStop);
        }

        function shortestOption(startingCoord, destinationCoord) {
            const allDistances = [];
            const distancesAndRoute = [];
            let shortestRoute;

            const possibleRoutes = pathCalculations(startingCoord, destinationCoord);
            for(let route of possibleRoutes) {
                let endStopName = route.coords.endPath.stopName;
                let startStopname = route.coords.startPath.stopName;
                    let d = calculateTransitDistance(startStopname, endStopName, eval("supportedStops" + endStopName.slice(0,2))) + route.rideshareDistance;
                    allDistances.push(d);
                    distancesAndRoute.push({distance: d, route});
            }

            let shortestDistance = allDistances.sort((a, b) => a - b)[0];
            for (let route of distancesAndRoute) {
                if (route.distance === shortestDistance) {
                    shortestRoute = route;
                    break;
                }
            }

            if(calculateDistance(startingCoord, destinationCoord) < shortestDistance) {
                createPath(startingCoord, destinationCoord);
                return;
            }

            createPath(shortestRoute.route.coords.endPath.destinationCoord, shortestRoute.route.coords.endPath.destinationStop);
            createPath(shortestRoute.route.coords.startPath.startingCoord, shortestRoute.route.coords.startPath.startingStop);
        }

        function calculateTransitDistance(stopName1, stopName2, transitStopsArray) {
            let distance = 0;
            let transitStops = transitStopsArray;
            let stopsPathArray = [];
            let index;
            for(index = 0; index < transitStops.length; index++) {
                if(transitStops[index].name === stopName1) {
                    for(let i = index; i < transitStops.length; i++) {
                        stopsPathArray.push(transitStops[i])

                        if(i === index) continue;

                        if(transitStops[i].name === stopName2) {
                            break;
                        }
                        if(i === (transitStops.length - 1)) {
                            stopsPathArray = []
                            transitStops = transitStopsArray.reverse();
                            index = -1;
                            break;
                        }
                    }
                }
            }
            let index2;

            for(index2 = 0; index2 < stopsPathArray.length; index2++) {

                for(let index3 in stopsPathArray) {

                    if(index2 === index3) continue;

                    distance += calculateDistance(stopsPathArray[index2].coords, stopsPathArray[index3].coords);
                    index2 = index3;
                }
            }

            return distance;
        }

        // create path line from 2 coordinates
        function createPath(coord1, coord2) {
            const pathLine = new google.maps.Polygon({
                paths: [coord1, coord2],
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 1,
            });

            pathLine.setMap(map)

        }

        // everything that uses the map variable goes into the onMounted() lifecycle, only executed when the map is mounted
        onMounted(async function () {
            try {
                loader.load().then(async () => {
                    const { Map } = await google.maps.importLibrary("maps");

                    map = new Map(mapDiv.value, {
                        center: { lat: 1.3704592477966075, lng: 103.80867157782815 },
                        zoom: 12,
                        mapId: keys.mapID,
                        disableDefaultUI: true,
                    });
                    const transitLayer = new google.maps.TransitLayer();
                    transitLayer.setMap(map);

                    for (let stop of supportedStopsDT) {
                        const { marker } = addMarker(map, stop.coords, stop.name, 'dodgerblue', 0.5,)
                    }

                    for (let stop of supportedStopsNS) {
                        const { marker } = addMarker(map, stop.coords, stop.name, 'red', 0.5,)
                    }

                    for (let stop of supportedStopsTE) {
                        const { marker } = addMarker(map, stop.coords, stop.name, 'sienna', 0.5,)
                    }
                })
            }
            catch (e) {
                if (errorText) mapDiv.value.innerHTML = "error loading map <br/>" + errorText
            }
        })

        onUnmounted(async function () {
            if (clickListener) clickListener.remove()
        })

        return {
            currentPosition,
            error,
            getLocation,
            showLocation,
            loadingTimeout,
            mapDiv,
            mapClickerFunction,
            destinationCoords,
            startingCoords,
            cheapestOption,
            shortestOption,
        }
    }
}
</script>

<style lang="scss" scoped></style>
