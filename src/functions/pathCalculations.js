import { calculateDistance } from "./calculateDistance";
let supportedStopsDT = require('../../data/supported-stops/supportedStopsDT').DTStops;
let supportedStopsNS = require('../../data/supported-stops/supportedStopsNS').NSStops;
let supportedStopsTE = require('../../data/supported-stops/supportedStopsTE').TEStops;

// outputs an array of best paths for each transit route
export function pathCalculations(startingCoord, destinationCoord) {
    const possibleRoutes = [];

    const transitRoutes = [
        supportedStopsDT,
        supportedStopsNS,
        supportedStopsTE,
    ]
    let tempArray = [];

    const bothCoords = [startingCoord, destinationCoord]
    for (let transitRoute of transitRoutes) {
        for (let coords of bothCoords) {
            const distanceAndStops = [];
            const allDistances = [];
            let closestStopCoord;
            // calculates the distance between coords and all stops, pushes to "allDistances" and "distanceAndStops" to track the stop
            for (let stop of transitRoute) {
                let distance = 0;
                distance = calculateDistance(coords, stop.coords)
                distanceAndStops.push({ distance, stop });
                allDistances.push(distance)
            }

            let smallestDistance = allDistances.sort((a, b) => a - b)[0];
            let stopName;

            // finds the closest stop and outputs the coords into closestStopCoord
            for (let item of distanceAndStops) {
                if (item.distance === smallestDistance) {
                    closestStopCoord = item.stop.coords;
                    stopName = item.stop.name;
                    break;
                }
            }

            // outputs the distance and the coordinates for one transit route
            tempArray.push(calculateDistance(coords, closestStopCoord), closestStopCoord, stopName)
        }

        // collects and organizes data from tempArray
        possibleRoutes.push(
            {
                rideshareDistance: tempArray[0] + tempArray[3],
                coords: {
                    startPath: {
                        startingCoord: startingCoord,
                        startingStop: tempArray[1],
                        stopName: tempArray[2],
                    },
                    endPath: {
                        destinationCoord: destinationCoord,
                        destinationStop: tempArray[4],
                        stopName: tempArray[5],
                    }
                }
            }
        )
        tempArray = []
    }
    return possibleRoutes
}