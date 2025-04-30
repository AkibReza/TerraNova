//Sample

const propertyData = [
  {
    id: 1,
    price: 90000,
    propertyType: "Apartment",
    propertySize: 1650, // sq ft
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Swimming Pool", "Gymnasium", "24/7 Security", "Parking"],
    location: "Mohakhali",
    otherDetails:
      "Luxury apartment with panoramic city views and high-end finishes.",
    transactionType: "Rent",
  },
  {
    id: 2,
    price: 65000,
    propertyType: "Apartment",
    propertySize: 500, // sq ft
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    amenities: ["Balcony", "Parking", "Elevator", "Security"],
    location: "Banani",
    otherDetails: "Modern apartment in a prime location.",
    transactionType: "Rent",
  },
  {
    id: 3,
    price: 50000,
    propertyType: "Apartment",
    propertySize: 1100, // sq ft
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Elevator", "Security"],
    location: "Uttara",
    otherDetails: "Cozy apartment, ideal for small families or couples.",
    transactionType: "Rent",
  },
];

// Updated calculateRoomDistanceScore function

// Updated calculateRoomDistanceScore function with improved price scoring
function calculateRoomDistanceScore(userPreference, property, ranges) {
  let totalDistance = 0;
  let featuresConsidered = 0;
  let featureWeights = {};

  // Improved has() function that checks for null, undefined, and empty values
  const has = (key) => {
    // Check if the key exists and has a meaningful value
    if (userPreference[key] === undefined || userPreference[key] === null) {
      return false;
    }

    // For arrays, check if they're not empty
    if (Array.isArray(userPreference[key])) {
      return userPreference[key].length > 0;
    }

    // For strings, check if they're not empty after trimming
    if (typeof userPreference[key] === "string") {
      return userPreference[key].trim() !== "";
    }

    // For numbers, make sure they're valid numbers
    if (typeof userPreference[key] === "number") {
      return !isNaN(userPreference[key]);
    }

    return true;
  };

  // Define weights for different features - adjust as needed
  featureWeights = {
    price: 1.5, // Price is very important
    propertyType: 1.2, // Property type is quite important
    location: 1.3, // Location is very important
    numberOfBedrooms: 1.2, // Bedrooms are quite important
    numberOfBathrooms: 1, // Standard weight
    propertySize: 1, // Standard weight
    transactionType: 1.5, // Very important
    amenities: 0.8, // Slightly less important
  };

  // Improved Price Scoring - use percentage-based difference
  if (has("price")) {
    const userPrice = parseInt(
      String(userPreference.price).replace(/,/g, ""),
      10
    );
    const propertyPrice = property.price;

    // Calculate percentage difference relative to the user's price
    // This makes the same absolute difference more significant for lower prices
    const percentageDiff = Math.abs(userPrice - propertyPrice) / userPrice;

    // Apply a scaling factor to convert percentage to a reasonable score
    // This can be tuned based on your preferences
    const MAX_ACCEPTABLE_PERCENT_DIFF = 0.3; // 30% difference
    const priceScore = Math.min(
      percentageDiff / MAX_ACCEPTABLE_PERCENT_DIFF,
      1
    );

    totalDistance += priceScore * featureWeights.price;
    featuresConsidered += featureWeights.price;
  }

  // Property Type (Categorical)
  if (has("propertyType")) {
    const userType = (userPreference.propertyType || "").toLowerCase();
    const propType = (property.propertyType || "").toLowerCase();
    totalDistance +=
      (userType === propType ? 0 : 1) * featureWeights.propertyType;
    featuresConsidered += featureWeights.propertyType;
  }

  // Property Size
  if (has("propertySize") || has("size")) {
    const userSize = userPreference.propertySize ?? userPreference.size;
    const diff = Math.abs(userSize - property.propertySize);
    const norm = ranges.sizeRange ? diff / ranges.sizeRange : 0;
    totalDistance += norm * featureWeights.propertySize;
    featuresConsidered += featureWeights.propertySize;
  }

  // Bedrooms
  if (has("numberOfBedrooms")) {
    const diff = Math.abs(
      userPreference.numberOfBedrooms - property.numberOfBedrooms
    );
    const norm = ranges.bedroomRange ? diff / ranges.bedroomRange : 0;
    totalDistance += norm * featureWeights.numberOfBedrooms;
    featuresConsidered += featureWeights.numberOfBedrooms;
  }

  // Bathrooms
  if (has("numberOfBathrooms")) {
    const diff = Math.abs(
      userPreference.numberOfBathrooms - property.numberOfBathrooms
    );
    const norm = ranges.bathroomRange ? diff / ranges.bathroomRange : 0;
    totalDistance += norm * featureWeights.numberOfBathrooms;
    featuresConsidered += featureWeights.numberOfBathrooms;
  }

  // Location with proximity scoring
  if (has("location")) {
    // Get the location proximity score (0-1 where 1 is perfect match)
    const userLocation = userPreference.location.trim();
    const propLocation = property.location.trim();

    // The proximityScore is already between 0-1 where 1 is perfect match and 0 is completely different
    const proximityScore = getLocationProximityScore(
      userLocation,
      propLocation
    );

    // Convert to a distance (0 is perfect match, 1 is completely different)
    const locationDistance = 1 - proximityScore;

    totalDistance += locationDistance * featureWeights.location;
    featuresConsidered += featureWeights.location;
  }

  // Transaction Type (Categorical)
  if (has("transactionType")) {
    const userTrans = (userPreference.transactionType || "")
      .toLowerCase()
      .trim();
    const propTrans = (property.transactionType || "").toLowerCase().trim();
    totalDistance +=
      (userTrans === propTrans ? 0 : 1) * featureWeights.transactionType;
    featuresConsidered += featureWeights.transactionType;
  }

  // Amenities (Jaccard Distance)
  if (has("amenities")) {
    const userAmen = new Set(userPreference.amenities);
    const propAmen = new Set(property.amenities);
    const intersection = new Set([...userAmen].filter((x) => propAmen.has(x)));
    const union = new Set([...userAmen, ...propAmen]);
    totalDistance +=
      (1 - (intersection.size / union.size || 0)) * featureWeights.amenities;
    featuresConsidered += featureWeights.amenities;
  }

  // Return the normalized distance score
  return featuresConsidered ? totalDistance / featuresConsidered : 0;
}

function findKNearestNeighbors(userPreference, properties, k = 3) {
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

function calculateMatchPercentage(roomDistanceScore) {
  return Math.round((1 - roomDistanceScore) * 100);
}

function getPropertyRecommendations(userPreference) {
  // Find k nearest neighbors
  const nearestNeighbors = findKNearestNeighbors(
    userPreference,
    originalPropertyData,
    5
  );

  // Calculate match percentages
  const recommendations = nearestNeighbors.map((property) => {
    // Add detailed match explanation if location is part of the criteria
    let locationMatchDescription = "";
    if (userPreference.location && property.location) {
      const proximityScore = getLocationProximityScore(
        userPreference.location,
        property.location
      );
      if (proximityScore === 1.0) {
        locationMatchDescription = "Exact location match";
      } else if (proximityScore >= 0.7) {
        locationMatchDescription = "In adjacent area";
      } else if (proximityScore >= 0.4) {
        locationMatchDescription = "In nearby area";
      } else {
        locationMatchDescription = "In different area";
      }
    }

    return {
      ...property,
      matchPercentage: calculateMatchPercentage(property.roomDistanceScore),
      locationMatchDescription: locationMatchDescription,
    };
  });

  return recommendations;
}

// Export functions for use in your application
export {
  calculateRoomDistanceScore,
  findKNearestNeighbors,
  calculateMatchPercentage,
  getPropertyRecommendations,
};
