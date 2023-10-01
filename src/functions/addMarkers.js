export async function addMarker(
  map,
  position,
  title,
  color,
  insideText = "",
  scale = 1,
  clickable = false
) {
  const { InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker"
  );

  map.addListener("mapcapabilities_changed", () => {
    const mapCapabilities = map.getMapCapabilities();

    if (!mapCapabilities.isAdvancedMarkersAvailable) {
      alert("no support for markers");
    }
  });

  let markerDesign = null;

  if (insideText) {
    markerDesign = new PinElement({
      scale: scale,
      background: color,
      glyphColor: "white",
      borderColor: "black",
      glyph: insideText,
    });
  } else {
    markerDesign = new PinElement({
      scale: scale,
      background: color,
      glyphColor: color,
      borderColor: "black",
    });
  }

  const marker = new AdvancedMarkerElement({
    map,
    position: position,
    title: title,
    content: markerDesign.element,
  });

  const infoWindow = new InfoWindow();
  if (clickable) {
    marker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;

      infoWindow.close();
      infoWindow.setContent(title);
      infoWindow.open(marker.map, marker);
    });
  }

  return marker;
}
