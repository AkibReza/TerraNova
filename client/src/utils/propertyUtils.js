import { propertyData } from "../dataset/Dataset";
import {
  getLocationProximityScore,
  isLocationDataInitialized,
  refreshLocationData,
} from "./locationUtils";
import { propertyService } from "../services/propertyService";

/**
 * Calculate the Room Distance Score between user preferences and property
 * @param {Object} userPreference - User's preferences from the prompt
 * @param {Object} property - Property from the dataset
 * @returns {number} - Normalized distance score (0-1, where 0 is perfect match)
 */
async function calculateRoomDistanceScore(userPreference, property, ranges) {
  console.log("Calculating score for property:", property);
  console.log("User preferences:", userPreference);
  console.log("Ranges:", ranges);

  let totalDistance = 0;
  let featuresConsidered = 0;
  const has = (key) =>
    userPreference[key] !== undefined && userPreference[key] !== null;

  // Location scoring with proximity consideration
  if (has("location")) {
    // Ensure location data is ready
    if (!isLocationDataInitialized()) {
      console.log("Location data not initialized, refreshing...");
      await refreshLocationData();
    }

    const proximityScore = await getLocationProximityScore(
      userPreference.location,
      property.location
    );
    console.log(
      `Location proximity score for ${property.location}: ${proximityScore}`
    );
    totalDistance += 1 - proximityScore;
    featuresConsidered++;
  }

  // Price scoring
  if (has("price")) {
    const userPrice =
      typeof userPreference.price === "string"
        ? parseInt(userPreference.price.replace(/,/g, ""), 10)
        : userPreference.price;

    const propertyPrice =
      typeof property.price === "object" && property.price.$numberInt
        ? parseInt(property.price.$numberInt, 10)
        : property.price;

    const diff = Math.abs(userPrice - propertyPrice);
    const scalingFactor = 0.8;
    const relativeDiff = diff / userPrice;
    const scaledDiff = Math.tanh(relativeDiff / scalingFactor);

    console.log("Price comparison:", {
      userPrice,
      propertyPrice,
      diff,
      scaledDiff,
    });

    totalDistance += scaledDiff;
    featuresConsidered++;
  }

  // Property Type
  if (has("propertyType")) {
    const userType = (userPreference.propertyType || "").toLowerCase();
    const propType = (property.propertyType || "").toLowerCase();
    const typeMatch = userType === propType ? 0 : 1;
    console.log("Property type match:", { userType, propType, typeMatch });
    totalDistance += typeMatch;
    featuresConsidered++;
  }

  // Property Size
  if (has("propertySize") || has("size")) {
    const userSize = userPreference.propertySize ?? userPreference.size;
    const propertySize =
      typeof property.propertySize === "object" &&
      property.propertySize.$numberInt
        ? parseInt(property.propertySize.$numberInt, 10)
        : property.propertySize;

    const diff = Math.abs(userSize - propertySize);
    const norm = ranges.sizeRange ? diff / ranges.sizeRange : 0;
    console.log("Size comparison:", { userSize, propertySize, diff, norm });
    totalDistance += norm;
    featuresConsidered++;
  }

  // Bedrooms
  if (has("numberOfBedrooms")) {
    const propertyBedrooms =
      typeof property.numberOfBedrooms === "object" &&
      property.numberOfBedrooms.$numberInt
        ? parseInt(property.numberOfBedrooms.$numberInt, 10)
        : property.numberOfBedrooms;

    const diff = Math.abs(userPreference.numberOfBedrooms - propertyBedrooms);
    const norm = ranges.bedroomRange ? diff / ranges.bedroomRange : 0;
    console.log("Bedroom comparison:", {
      userBedrooms: userPreference.numberOfBedrooms,
      propertyBedrooms,
      diff,
      norm,
    });
    totalDistance += norm;
    featuresConsidered++;
  }

  // Bathrooms
  if (has("numberOfBathrooms")) {
    const propertyBathrooms =
      typeof property.numberOfBathrooms === "object" &&
      property.numberOfBathrooms.$numberInt
        ? parseInt(property.numberOfBathrooms.$numberInt, 10)
        : property.numberOfBathrooms;

    const diff = Math.abs(userPreference.numberOfBathrooms - propertyBathrooms);
    const norm = ranges.bathroomRange ? diff / ranges.bathroomRange : 0;
    console.log("Bathroom comparison:", {
      userBathrooms: userPreference.numberOfBathrooms,
      propertyBathrooms,
      diff,
      norm,
    });
    totalDistance += norm;
    featuresConsidered++;
  }

  // Transaction type
  if (has("transactionType")) {
    const typeMatch =
      userPreference.transactionType === property.transactionType ? 0 : 1;
    console.log("Transaction type match:", {
      userType: userPreference.transactionType,
      propertyType: property.transactionType,
      typeMatch,
    });
    totalDistance += typeMatch;
    featuresConsidered++;
  }

  // Amenities
  if (has("amenities") && Array.isArray(userPreference.amenities)) {
    const userAmen = new Set(
      userPreference.amenities.map((a) => a.toLowerCase())
    );
    const propAmen = new Set(
      (property.amenities || []).map((a) => a.toLowerCase())
    );
    const matchCount = [...userAmen].filter((x) => propAmen.has(x)).length;
    const score = userAmen.size > 0 ? matchCount / userAmen.size : 1;
    console.log("Amenities comparison:", {
      userAmenities: [...userAmen],
      propertyAmenities: [...propAmen],
      matchCount,
      score,
    });
    totalDistance += 1 - score;
    featuresConsidered++;
  }

  const finalScore = featuresConsidered
    ? totalDistance / featuresConsidered
    : 0;
  console.log("Final distance score:", finalScore);
  return finalScore;
}

/**
 * Find the k nearest neighbors (properties) to the user's preferences
 */
async function findKNearestNeighbors(userPreference, properties, k = 5) {
  // Calculate feature ranges
  const prices = properties.map((p) => {
    return typeof p.price === "object" && p.price.$numberInt
      ? parseInt(p.price.$numberInt, 10)
      : p.price;
  });

  const sizes = properties.map((p) => {
    return typeof p.propertySize === "object" && p.propertySize.$numberInt
      ? parseInt(p.propertySize.$numberInt, 10)
      : p.propertySize;
  });

  const bedrooms = properties.map((p) => {
    return typeof p.numberOfBedrooms === "object" &&
      p.numberOfBedrooms.$numberInt
      ? parseInt(p.numberOfBedrooms.$numberInt, 10)
      : p.numberOfBedrooms;
  });

  const bathrooms = properties.map((p) => {
    return typeof p.numberOfBathrooms === "object" &&
      p.numberOfBathrooms.$numberInt
      ? parseInt(p.numberOfBathrooms.$numberInt, 10)
      : p.numberOfBathrooms;
  });

  const ranges = {
    priceRange: Math.max(...prices) - Math.min(...prices),
    sizeRange: Math.max(...sizes) - Math.min(...sizes),
    bedroomRange: Math.max(...bedrooms) - Math.min(...bedrooms),
    bathroomRange: Math.max(...bathrooms) - Math.min(...bathrooms),
  };

  console.log("Property feature ranges:", ranges);

  // Process properties in parallel with async scoring
  const withScoresPromises = properties.map(async (property) => ({
    ...property,
    roomDistanceScore: await calculateRoomDistanceScore(
      userPreference,
      property,
      ranges
    ),
  }));

  const withScores = await Promise.all(withScoresPromises);

  return withScores
    .sort((a, b) => a.roomDistanceScore - b.roomDistanceScore)
    .slice(0, k);
}

/**
 * Calculate match percentage from room distance score
 */
function calculateMatchPercentage(roomDistanceScore) {
  const percentage = Math.max(
    0,
    Math.min(100, Math.round((1 - roomDistanceScore) * 100))
  );
  console.log("Calculated match percentage:", percentage);
  return percentage;
}

/**
 * Get property recommendations based on user preferences
 */
async function getPropertyRecommendations(userPreference) {
  try {
    // Make sure location data is initialized
    await refreshLocationData();

    // Fetch properties from MongoDB
    const properties = await propertyService.getAllProperties();
    console.log("All properties fetched:", properties.length);

    // Filter by transaction type if specified
    let filteredProperties = properties;
    if (userPreference.transactionType) {
      filteredProperties = properties.filter(
        (property) =>
          property.transactionType === userPreference.transactionType
      );
      console.log("Filtered by transaction type:", filteredProperties.length);
    }

    // Find k nearest neighbors
    const nearestNeighbors = await findKNearestNeighbors(
      userPreference,
      filteredProperties,
      5
    );
    console.log("Nearest neighbors found:", nearestNeighbors.length);

    // Calculate match percentages and add location context
    const recommendations = await Promise.all(
      nearestNeighbors.map(async (property) => {
        let locationContext = "";
        if (userPreference.location && property.location) {
          const proximityScore = await getLocationProximityScore(
            userPreference.location,
            property.location
          );
          locationContext = getLocationDescription(proximityScore);
        }

        const matchPercentage = calculateMatchPercentage(
          property.roomDistanceScore
        );

        // Debug the property and its match percentage
        console.log(`Property ${property._id}: ${matchPercentage}% match`);

        return {
          ...property,
          matchPercentage,
          locationContext,
        };
      })
    );

    console.log(
      "Final recommendations with match percentages:",
      recommendations.map((rec) => ({
        id: rec._id,
        location: rec.location,
        matchPercentage: rec.matchPercentage,
      }))
    );

    return recommendations;
  } catch (error) {
    console.error("Error getting recommendations:", error);
    throw error;
  }
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
