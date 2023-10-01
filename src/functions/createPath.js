export function createPath(coord1, coord2, mapEl, color = "lightblue") {
  const pathLine = new google.maps.Polygon({
    paths: [coord1, coord2],
    strokeColor: color,
    strokeOpacity: 0.8,
    strokeWeight: 1,
  });

  pathLine.setMap(mapEl);
}
