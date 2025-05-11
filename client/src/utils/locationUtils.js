import { API_BASE_URL } from "../config/config";

// Global storage for coordinates and proximity matrix
let locationCoordinates = {};
const locationProximityMatrix = {};
let isInitialized = false;

// Fetch locations from the database
async function fetchLocationCoordinates() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/properties/locations`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const locations = await response.json();
    console.log("Received locations:", locations);

    if (!Array.isArray(locations)) {
      console.error("Expected array of locations, got:", typeof locations);
      return false;
    }

    // Update locationCoordinates
    locationCoordinates = locations.reduce((acc, loc) => {
      if (
        loc &&
        loc.location &&
        typeof loc.latitude === "number" &&
        typeof loc.longitude === "number"
      ) {
        acc[loc.location] = {
          lat: loc.latitude,
          long: loc.longitude,
        };
      }
      return acc;
    }, {});

    console.log("Processed coordinates:", locationCoordinates);

    // Only initialize if we have coordinates
    if (Object.keys(locationCoordinates).length > 0) {
      initializeProximityMatrix();
      isInitialized = true;
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error fetching location coordinates:", error);
    locationCoordinates = {}; // Reset to empty object on error
    return false;
  }
}

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

      if (!coord1 || !coord2) {
        locationProximityMatrix[loc1][loc2] = 0.1; // Missing coordinates
        return;
      }

      const distance = calculateDistance(
        coord1.lat,
        coord1.long,
        coord2.lat,
        coord2.long
      );

      // Convert distance to proximity score
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

  console.log("Proximity matrix initialized:", locationProximityMatrix);
}

// Get proximity score between two locations
async function getLocationProximityScore(location1, location2) {
  // Ensure the matrix is initialized
  if (!isInitialized) {
    const success = await fetchLocationCoordinates();
    if (!success) {
      console.warn("Failed to initialize proximity matrix");
      return 0.1; // Default fallback score
    }
  }

  if (!location1 || !location2) {
    console.warn("Missing location parameters", { location1, location2 });
    return 0.1;
  }

  location1 = location1.trim();
  location2 = location2.trim();

  console.log(`Calculating proximity for: "${location1}" and "${location2}"`);
  console.log("Available locations:", Object.keys(locationCoordinates));

  // Case insensitive comparison
  const loc1 = Object.keys(locationCoordinates).find(
    (loc) => loc.toLowerCase() === location1.toLowerCase()
  );

  const loc2 = Object.keys(locationCoordinates).find(
    (loc) => loc.toLowerCase() === location2.toLowerCase()
  );

  console.log("Matched locations:", { loc1, loc2 });

  // If either location is not in our database, return minimum score
  if (
    !loc1 ||
    !loc2 ||
    !locationProximityMatrix[loc1] ||
    !locationProximityMatrix[loc1][loc2]
  ) {
    console.warn("Locations not found in proximity matrix", {
      location1,
      location2,
      loc1,
      loc2,
      hasMatrix: loc1 && loc2 ? !!locationProximityMatrix[loc1] : false,
      hasScore:
        loc1 && loc2 && locationProximityMatrix[loc1]
          ? !!locationProximityMatrix[loc1][loc2]
          : false,
    });
    return 0.1;
  }

  const score = locationProximityMatrix[loc1][loc2];
  console.log(`Proximity score for ${loc1} and ${loc2}: ${score}`);
  return score;
}

// Check initialization status
function isLocationDataInitialized() {
  return isInitialized;
}

// Force refresh of the location data
async function refreshLocationData() {
  console.log("Forcing location data refresh");
  isInitialized = false;
  return await fetchLocationCoordinates();
}

// Initialize the proximity matrix when the module loads
fetchLocationCoordinates();

export {
  locationCoordinates,
  getLocationProximityScore,
  calculateDistance,
  initializeProximityMatrix,
  fetchLocationCoordinates,
  isLocationDataInitialized,
  refreshLocationData,
};
