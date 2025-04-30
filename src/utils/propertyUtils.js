import { propertyData } from "../dataset/Dataset";
import { getLocationProximityScore } from "./locationUtils";

/**
 * Calculate the Room Distance Score between user preferences and property
 * @param {Object} userPreference - User's preferences from the prompt
 * @param {Object} property - Property from the dataset
 * @returns {number} - Normalized distance score (0-1, where 0 is perfect match)
 */
function calculateRoomDistanceScore(userPreference, property, ranges) {
  let totalDistance = 0;
  let featuresConsidered = 0;
  const has = (key) =>
    userPreference[key] !== undefined && userPreference[key] !== null;

  // Location scoring with proximity consideration
  if (has("location")) {
    const proximityScore = getLocationProximityScore(
      userPreference.location,
      property.location
    );
    totalDistance += 1 - proximityScore; // Convert proximity to distance
    featuresConsidered++;
  }

  // Numerical features
  if (has("price")) {
    const userPrice = parseInt(
      String(userPreference.price).replace(/,/g, ""),
      10
    );
    const diff = Math.abs(userPrice - property.price);
    const norm = ranges.priceRange ? diff / ranges.priceRange : 0;
    totalDistance += norm;
    featuresConsidered++;
  }

  // Property Type
  if (has("propertyType")) {
    const userType = (userPreference.propertyType || "").toLowerCase();
    const propType = (property.propertyType || "").toLowerCase();
    totalDistance += userType === propType ? 0 : 1;
    featuresConsidered++;
  }

  if (has("propertySize") || has("size")) {
    const userSize = userPreference.propertySize ?? userPreference.size;
    const diff = Math.abs(userSize - property.propertySize);
    const norm = ranges.sizeRange ? diff / ranges.sizeRange : 0;
    totalDistance += norm;
    featuresConsidered++;
  }

  if (has("numberOfBedrooms")) {
    const diff = Math.abs(
      userPreference.numberOfBedrooms - property.numberOfBedrooms
    );
    const norm = ranges.bedroomRange ? diff / ranges.bedroomRange : 0;
    totalDistance += norm;
    featuresConsidered++;
  }

  if (has("numberOfBathrooms")) {
    const diff = Math.abs(
      userPreference.numberOfBathrooms - property.numberOfBathrooms
    );
    const norm = ranges.bathroomRange ? diff / ranges.bathroomRange : 0;
    totalDistance += norm;
    featuresConsidered++;
  }

  // Transaction type (rent/sale)
  if (has("transactionType")) {
    totalDistance +=
      userPreference.transactionType === property.transactionType ? 0 : 1;
    featuresConsidered++;
  }

  // Amenities (Jaccard Distance)
  if (has("amenities") && Array.isArray(userPreference.amenities)) {
    const userAmen = new Set(userPreference.amenities);
    const propAmen = new Set(property.amenities);
    const intersection = new Set([...userAmen].filter((x) => propAmen.has(x)));
    const union = new Set([...userAmen, ...propAmen]);
    totalDistance += 1 - (intersection.size / union.size || 0);
    featuresConsidered++;
  }

  return featuresConsidered ? totalDistance / featuresConsidered : 0;
}

/**
 * Find the k nearest neighbors (properties) to the user's preferences
 */
function findKNearestNeighbors(userPreference, properties, k = 5) {
  // Calculate feature ranges
  const prices = properties.map((p) => p.price);
  const sizes = properties.map((p) => p.propertySize);
  const bedrooms = properties.map((p) => p.numberOfBedrooms);
  const bathrooms = properties.map((p) => p.numberOfBathrooms);

  const ranges = {
    priceRange: Math.max(...prices) - Math.min(...prices),
    sizeRange: Math.max(...sizes) - Math.min(...sizes),
    bedroomRange: Math.max(...bedrooms) - Math.min(...bedrooms),
    bathroomRange: Math.max(...bathrooms) - Math.min(...bathrooms),
  };

  const withScores = properties.map((property) => ({
    ...property,
    roomDistanceScore: calculateRoomDistanceScore(
      userPreference,
      property,
      ranges
    ),
  }));

  return withScores
    .sort((a, b) => a.roomDistanceScore - b.roomDistanceScore)
    .slice(0, k);
}

/**
 * Calculate match percentage from room distance score
 */
function calculateMatchPercentage(roomDistanceScore) {
  return Math.round((1 - roomDistanceScore) * 100);
}

/**
 * Get property recommendations based on user preferences
 */
function getPropertyRecommendations(userPreference) {
  // Filter by transaction type if specified
  let filteredProperties = propertyData;

  if (userPreference.transactionType) {
    filteredProperties = propertyData.filter(
      (property) => property.transactionType === userPreference.transactionType
    );
  }

  // Find k nearest neighbors
  const nearestNeighbors = findKNearestNeighbors(
    userPreference,
    filteredProperties,
    5
  );

  // Calculate match percentages and add location context
  const recommendations = nearestNeighbors.map((property) => {
    let locationContext = "";
    if (userPreference.location && property.location) {
      const proximityScore = getLocationProximityScore(
        userPreference.location,
        property.location
      );
      locationContext = getLocationDescription(proximityScore);
    }

    return {
      ...property,
      matchPercentage: calculateMatchPercentage(property.roomDistanceScore),
      locationContext,
    };
  });

  return recommendations;
}

// Helper function to get human-readable location context
function getLocationDescription(proximityScore) {
  if (proximityScore === 1.0) return "Exact location match";
  if (proximityScore >= 0.8) return "In adjacent area";
  if (proximityScore >= 0.5) return "In nearby area";
  if (proximityScore >= 0.2) return "In accessible area";
  return "In different area";
}

export {
  calculateRoomDistanceScore,
  findKNearestNeighbors,
  calculateMatchPercentage,
  getPropertyRecommendations,
};
