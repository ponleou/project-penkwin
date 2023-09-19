export function calculateDistance(pos1, pos2) {
    const R = 6378.137 // Radius of the Earth in kilometeres
    const rlat1 = pos1.lat * (Math.PI / 180) // Convert degrees to radians
    const rlat2 = pos2.lat * (Math.PI / 180) // Convert degrees to radians
    const difflat = rlat2 - rlat1 // Radian difference (latitudes)
    const difflon = (pos2.lng - pos1.lng) * (Math.PI / 180) // Radian difference (longitudes)

    const distance =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      )
    return distance 
  }