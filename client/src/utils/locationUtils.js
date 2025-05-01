// Location coordinates for different areas
const locationCoordinates = {
  Uttara: { lat: 23.8759, long: 90.3795 },
  Banani: { lat: 23.7937, long: 90.4066 },
  Mohakhali: { lat: 23.7778, long: 90.4057 },
  // Add more locations as needed
};

// Precomputed distance matrix and proximity scores
const locationProximityMatrix = {};

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

// Initialize proximity matrix
function initializeProximityMatrix() {
  const locations = Object.keys(locationCoordinates);

  locations.forEach((loc1) => {
    locationProximityMatrix[loc1] = {};

    locations.forEach((loc2) => {
      if (loc1 === loc2) {
        locationProximityMatrix[loc1][loc2] = 1.0; // Same location gets full score
        return;
      }

      const coord1 = locationCoordinates[loc1];
      const coord2 = locationCoordinates[loc2];

      const distance = calculateDistance(
        coord1.lat,
        coord1.long,
        coord2.lat,
        coord2.long
      );

      // Convert distance to proximity score
      // These thresholds can be adjusted based on your specific needs
      let proximityScore;
      if (distance <= 2) {
        // Within 2km - Adjacent
        proximityScore = 0.8;
      } else if (distance <= 5) {
        // Within 5km - Nearby
        proximityScore = 0.5;
      } else if (distance <= 10) {
        // Within 10km - Distant but relevant
        proximityScore = 0.2;
      } else {
        // Very distant
        proximityScore = 0.1;
      }

      locationProximityMatrix[loc1][loc2] = proximityScore;
    });
  });
}

// Get proximity score between two locations
function getLocationProximityScore(location1, location2) {
  location1 = location1.trim();
  location2 = location2.trim();

  // Case insensitive comparison
  location1 =
    Object.keys(locationCoordinates).find(
      (loc) => loc.toLowerCase() === location1.toLowerCase()
    ) || location1;
  location2 =
    Object.keys(locationCoordinates).find(
      (loc) => loc.toLowerCase() === location2.toLowerCase()
    ) || location2;

  // If either location is not in our database, return minimum score
  if (
    !locationProximityMatrix[location1] ||
    !locationProximityMatrix[location1][location2]
  ) {
    return 0.1;
  }

  return locationProximityMatrix[location1][location2];
}

// Initialize the proximity matrix when the module loads
initializeProximityMatrix();

export {
  locationCoordinates,
  getLocationProximityScore,
  calculateDistance,
  initializeProximityMatrix,
};
