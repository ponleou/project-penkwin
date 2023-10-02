<script>
import OneTapLogo from "@/components/OneTapLogo.vue";
import BackButton from "@/components/BackButton.vue";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import { addMarker } from "@/functions/addMarkers";
import { pathCalculations } from "@/functions/pathCalculations";
import { calculateDistance } from "@/functions/calculateDistance";
import { createPath } from "@/functions/createPath";
import { Icon } from "@iconify/vue";
import SettingButton from "@/components/SettingButton.vue";
import Button from "@/components/Button.vue";
import router from "@/router";

let supportedStopsDT =
  require("../../data/supported-stops/supportedStopsDT").DTStops;
let supportedStopsNS =
  require("../../data/supported-stops/supportedStopsNS").NSStops;
let supportedStopsTE =
  require("../../data/supported-stops/supportedStopsTE").TEStops;
let supportedStopsEW =
  require("../../data/supported-stops/supportedStopsEW").EWStops;

const supportedStops = [
  supportedStopsDT,
  supportedStopsNS,
  supportedStopsTE,
  supportedStopsEW,
];

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
  });
} catch (e) {
  errorText = e.message;
}

// all the function that requires using the map variable will stay in the main file
export default {
  setup() {
    let map = null;
    const mapDiv = ref(null);

    //
    //
    // GEOLOCATION FINDER
    let showLocation = ref(false);
    let loadingTimeout = ref(false);
    let error;
    // get the user's geolocation position
    const currentPosition = ref({ lat: null, lng: null });

    function getLocation() {
      const isSupported = navigator.geolocation; // check whether client's browser/device supports geolocation

      function outputError() {
        error = "Browser does not support geolocation.";
      }

      showLocation.value = !showLocation.value;
      setTimeout(() => {
        loadingTimeout.value = !loadingTimeout.value;
      }, 5000);

      if (isSupported) {
        navigator.geolocation.getCurrentPosition(function (position) {
          currentPosition.value.lat = position.coords.latitude;
          currentPosition.value.lng = position.coords.longitude;

          let settingMarker = setInterval(function () {
            if (currentPosition.value.lat) {
              addMarker(map, {
                lat: currentPosition.value.lat,
                lng: currentPosition.value.lng,
              });
              clearMarkerInterval(settingMarker);
            }
          }, 500);

          function clearMarkerInterval(variable) {
            clearInterval(variable);
          }
        });
      } else {
        outputError();
      }
    }

    //
    //
    // USER LOCATION SELECTION

    // click listener for the map
    let clickListener = null;

    // if true, button is clickable, if false, button is unclickable
    let buttonClickable = ref(true);

    // if true, button is shown, if false, button is hidden
    let showConfirm = ref(false);
    const confirmButton = ref(null);

    let startingCoords = ref(null);
    let destinationCoords = ref(null);
    let ranDestinationSelection = false;

    // whether the confirm button should generate an event listener (only one should be active at a time)
    // true: generate an event listener
    // false: dont generate an event listener
    let callConfirmListener = true;

    function startCollection() {
      ranDestinationSelection = false;
      startUserSelect("startingCoords");
    }

    async function startUserSelect(variableName) {
      await locationSelectMap(variableName);
    }

    // sets a marker at the starting and destination coordinates (loads a clean map)
    async function locationSelectMap(variableName, coords) {
      if (coords) {
        await loadMap(false, coords, 15);
      } else {
        await loadMap(false);
      }

      if (startingCoords.value) {
        addMarker(map, startingCoords.value, "start", "black", "1");
      }

      if (destinationCoords.value) {
        addMarker(map, destinationCoords.value, "destination", "black", "2");
      }

      userLocationSelect(variableName);
    }

    // listens for selected coordinates and assigns to starting and destination points
    async function userLocationSelect(variableName) {
      let coordinatesVariable = null;
      buttonClickable.value = false;

      // waits for addListener to run once before going next
      let listenerWaiter = Promise.resolve();

      clickListener = map.addListener("click", ({ latLng: { lat, lng } }) => {
        listenerWaiter = listenerWaiter.then(async () => {
          coordinatesVariable = { lat: lat(), lng: lng() };
          showConfirm.value = true;

          eval(variableName + ".value = coordinatesVariable");

          clearListener(clickListener);
          await locationSelectMap(variableName, coordinatesVariable);

          if (callConfirmListener) {
            listenConfirm();
            callConfirmListener = false;
          }
        });
      });

      // when confirmButton is clicked, the inputed coordinations is saved
      function listenConfirm() {
        confirmButton.value.addEventListener("click", handleConfirm);
      }

      function handleConfirm() {
        callConfirmListener = true;
        confirmButton.value.removeEventListener("click", handleConfirm);

        showConfirm.value = false;

        if (ranDestinationSelection) {
          confirmedLocation();
        }

        if (!ranDestinationSelection) {
          ranDestinationSelection = true;
          startUserSelect("destinationCoords", "destination");
        }

        buttonClickable.value = true;
      }

      // runs when the user finishes selecting the locations (returns to the default map)
      async function confirmedLocation() {
        await defaultMap();
      }
    }

    function clearListener(listener) {
      listener.remove();
    }

    //
    //
    // PATH CALCULATIONS

    // cheapest option chooses the route with the least rideshare distance
    function cheapestOption(startingCoord, destinationCoord) {
      const possibleRoutes = pathCalculations(startingCoord, destinationCoord);
      // finds the shortest route from the array of possibleRoutes
      let shortestRoute;

      const rideshareDistances = [];
      for (let route of possibleRoutes) {
        rideshareDistances.push(route.rideshareDistance);
      }

      let shortestRideshareDistance = rideshareDistances.sort(
        (a, b) => a - b
      )[0];
      for (let route of possibleRoutes) {
        if (route.rideshareDistance === shortestRideshareDistance) {
          shortestRoute = route;
          break;
        }
      }

      if (
        calculateDistance(startingCoord, destinationCoord) <
        shortestRideshareDistance
      ) {
        createPath(startingCoord, destinationCoord, map, "#68a677");
        return;
      }

      createPath(
        shortestRoute.coords.startPath.startingCoord,
        shortestRoute.coords.startPath.startingStop,
        map,
        "#68a677"
      );
      createPath(
        shortestRoute.coords.endPath.destinationCoord,
        shortestRoute.coords.endPath.destinationStop,
        map,
        "#68a677"
      );
    }

    // function to get the shortest path, counting the rideshare distance + transit distancec
    function shortestOption(startingCoord, destinationCoord) {
      const allDistances = [];
      const distancesAndRoute = [];
      let shortestRoute;

      const possibleRoutes = pathCalculations(startingCoord, destinationCoord);
      for (let route of possibleRoutes) {
        let endStopName = route.coords.endPath.stopName;
        let startStopname = route.coords.startPath.stopName;
        let d =
          calculateTransitDistance(
            startStopname,
            endStopName,
            eval("supportedStops" + endStopName.slice(0, 2))
          ) + route.rideshareDistance;
        allDistances.push(d);
        distancesAndRoute.push({ distance: d, route });
      }

      let shortestDistance = allDistances.sort((a, b) => a - b)[0];
      for (let route of distancesAndRoute) {
        if (route.distance === shortestDistance) {
          shortestRoute = route;
          break;
        }
      }

      if (
        calculateDistance(startingCoord, destinationCoord) < shortestDistance
      ) {
        createPath(startingCoord, destinationCoord, map, "#B33A3A");
        return;
      }

      createPath(
        shortestRoute.route.coords.endPath.destinationCoord,
        shortestRoute.route.coords.endPath.destinationStop,
        map,
        "#B33A3A"
      );
      createPath(
        shortestRoute.route.coords.startPath.startingCoord,
        shortestRoute.route.coords.startPath.startingStop,
        map,
        "#B33A3A"
      );
    }

    // function to calculate the distance from one stop to another stop in the same transit route
    function calculateTransitDistance(stopName1, stopName2, transitStopsArray) {
      let distance = 0;
      let transitStops = transitStopsArray;
      let stopsPathArray = [];
      let index;
      for (index = 0; index < transitStops.length; index++) {
        if (transitStops[index].name === stopName1) {
          for (let i = index; i < transitStops.length; i++) {
            if (stopName1 === stopName2) {
              distance = 0;
              return distance;
            }

            stopsPathArray.push(transitStops[i]);

            if (i === index) continue;

            if (transitStops[i].name === stopName2) {
              break;
            }
            if (i === transitStops.length - 1) {
              stopsPathArray = [];
              transitStops = transitStopsArray.reverse();
              index = -1;
              break;
            }
          }
        }
      }
      let index2;

      for (index2 = 0; index2 < stopsPathArray.length; index2++) {
        for (let index3 in stopsPathArray) {
          if (index2 === index3) continue;

          distance += calculateDistance(
            stopsPathArray[index2].coords,
            stopsPathArray[index3].coords
          );
          index2 = index3;
        }
      }

      return distance;
    }

    //
    //
    // MAP GENERATION

    // for generating the map
    async function loadMap(
      RouteOverlay = true,
      coords = { lat: 1.3517688686358171, lng: 103.8176628012383 },
      zoom = 12
    ) {
      const { Map } = await google.maps.importLibrary("maps");
      map = new Map(mapDiv.value, {
        center: coords,
        zoom: zoom,
        mapId: keys.mapID,
        disableDefaultUI: true,
      });

      if (RouteOverlay) {
        new google.maps.TransitLayer().setMap(map);
      }
    }

    // for setting the markers for each stop
    function setStopsMarker() {
      for (let routeStops of supportedStops) {
        for (let stop of routeStops) {
          addMarker(
            map,
            stop.coords,
            stop.name + ",\narrival: " + stop.timeArrival,
            stop.color,
            "",
            0.5,
            true
          );
        }
      }
    }

    // generate the default map (with markers)
    async function defaultMap() {
      await loadMap();
      setStopsMarker();

      if (startingCoords.value) {
        addMarker(map, startingCoords.value, "start", "black", "1");
      }

      if (destinationCoords.value) {
        addMarker(map, destinationCoords.value, "destination", "black", "2");
      }
    }

    // refreshes map (clear all coordinates)
    function refresh() {
      startingCoords.value = null;
      destinationCoords.value = null;
      defaultMap();
    }

    // loader.load() must run when mounted in order to use map
    onMounted(async function () {
      runOnMount();
      async function runOnMount() {
        try {
          // this loader.load only needs to run once per session
          await loader.load();

          defaultMap();
        } catch (e) {
          if (errorText)
            mapDiv.value.innerHTML =
              '<p style="color: red; width: 100%; word-wrap: break-word">Error loading map</p> <p style=" width: 100%; word-wrap: break-word">' +
              errorText +
              "</p>";
        }
      }
    });

    onUnmounted(async function () {
      if (clickListener) clickListener.remove();
    });

    return {
      currentPosition,

      //   for geolocation unsupported
      error,

      getLocation,
      showLocation,
      loadingTimeout,
      mapDiv,
      userLocationSelect,
      destinationCoords,
      startingCoords,
      cheapestOption,
      shortestOption,
      buttonClickable,
      refresh,
      showConfirm,
      confirmButton,
      startCollection,
    };
  },

  components: {
    OneTapLogo,
    BackButton,
    Icon,
    SettingButton,
    Button,
  },
};
</script>

<template>
  <div class="header">
    <div class="header__banner">
      <BackButton @click="$router.push({ name: 'One Tap' })"></BackButton>
      <SettingButton></SettingButton>
    </div>
    <div>
      <div v-if="!buttonClickable" class="header__instruction-text">
        Click on the map to select a location
      </div>
      <div
        v-if="destinationCoords && startingCoords && buttonClickable"
        class="ready-buttons"
      >
        <Button
          @click="cheapestOption(startingCoords, destinationCoords)"
          secondary="true"
          >Cheapest Option</Button
        >
        <Button
          @click="shortestOption(startingCoords, destinationCoords)"
          secondary="true"
          >Shortest Option</Button
        >
      </div>
    </div>
  </div>
  <div class="screen">
    <div ref="mapDiv" class="mapDiv"></div>
  </div>
  <div class="footer">
    <Button v-if="buttonClickable" @click="startCollection"
      >Select Locations</Button
    >
    <span v-show="!buttonClickable" ref="confirmButton">
      <Button :disabled="!showConfirm" :class="{ disabled: !showConfirm }"
        >Confirm</Button
      >
    </span>
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}

.header__banner {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.header__instruction-text {
  color: red;
  text-align: center;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.7);
  font-weight: bold;
}
.screen {
  height: 100%;
  box-sizing: border-box;
}

.mapDiv {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.mapDiv p {
  width: 100vw;
}

.footer {
  z-index: 99;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background-color: white;
}

.disabled {
  background-color: grey;
  cursor: not-allowed;
}

.disabled:hover {
  background-color: grey;
}

.ready-buttons {
  display: flex;
  padding: 1rem;
  background-color: white;
  gap: 1rem;
}
</style>
