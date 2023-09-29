export async function addMarker(map, position, title, color, scale = 1) {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const { PinElement } = await google.maps.importLibrary("marker");

  map.addListener("mapcapabilities_changed", () => {
    const mapCapabilities = map.getMapCapabilities();

    if (!mapCapabilities.isAdvancedMarkersAvailable) {
      alert("no support for markers");
    }
  });

  let markerDesign = new PinElement({
    scale: scale,
    background: color,
    glyphColor: color,
    borderColor: "black",
  });

  const marker = new AdvancedMarkerElement({
    map,
    position: position,
    title: title,
    content: markerDesign.element,
  });

  return { marker };
}
