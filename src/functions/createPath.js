export function createPath(coord1, coord2, mapEl) {
  const pathLine = new google.maps.Polygon({
    paths: [coord1, coord2],
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 1,
  });

  pathLine.setMap(mapEl);
}
