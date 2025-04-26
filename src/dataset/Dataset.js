//Sample

const propertyData = [
  {
    id: 1,
    price: 18000000,
    propertyType: "Apartment",
    propertySize: 1650, // sq ft
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Swimming Pool", "Gymnasium", "24/7 Security", "Parking"],
    location: "Gulshan 2",
    otherDetails:
      "Luxury apartment with panoramic city views and high-end finishes.",
    transactionType: "Sale",
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
];

// Updated calculateRoomDistanceScore function

// Updated calculateRoomDistanceScore function with improved price scoring
function calculateRoomDistanceScore(userPreference, property, ranges) {
  let totalDistance = 0;
  let featuresConsidered = 0;

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

    totalDistance += priceScore;
    featuresConsidered++;
  }

  // Property Type (Categorical)
  if (has("propertyType")) {
    const userType = (userPreference.propertyType || "").toLowerCase();
    const propType = (property.propertyType || "").toLowerCase();
    totalDistance += userType === propType ? 0 : 1;
    featuresConsidered++;
  }

  // Property Size
  if (has("propertySize") || has("size")) {
    const userSize = userPreference.propertySize ?? userPreference.size;
    const diff = Math.abs(userSize - property.propertySize);
    const norm = ranges.sizeRange ? diff / ranges.sizeRange : 0;
    totalDistance += norm;
    featuresConsidered++;
  }

  // Bedrooms
  if (has("numberOfBedrooms")) {
    const diff = Math.abs(
      userPreference.numberOfBedrooms - property.numberOfBedrooms
    );
    const norm = ranges.bedroomRange ? diff / ranges.bedroomRange : 0;
    totalDistance += norm;
    featuresConsidered++;
  }

  // Bathrooms
  if (has("numberOfBathrooms")) {
    const diff = Math.abs(
      userPreference.numberOfBathrooms - property.numberOfBathrooms
    );
    const norm = ranges.bathroomRange ? diff / ranges.bathroomRange : 0;
    totalDistance += norm;
    featuresConsidered++;
  }

  // Location (Categorical)
  if (has("location")) {
    // Only consider location if it's not an empty string
    const userLocation = (userPreference.location || "").toLowerCase().trim();
    const propLocation = (property.location || "").toLowerCase().trim();
    totalDistance += userLocation === propLocation ? 0 : 1;
    featuresConsidered++;
  }

  // Transaction Type (Categorical)
  if (has("transactionType")) {
    const userTrans = (userPreference.transactionType || "")
      .toLowerCase()
      .trim();
    const propTrans = (property.transactionType || "").toLowerCase().trim();
    totalDistance += userTrans === propTrans ? 0 : 1;
    featuresConsidered++;
  }

  // Amenities (Jaccard Distance)
  if (has("amenities")) {
    const userAmen = new Set(userPreference.amenities);
    const propAmen = new Set(property.amenities);
    const intersection = new Set([...userAmen].filter((x) => propAmen.has(x)));
    const union = new Set([...userAmen, ...propAmen]);
    totalDistance += 1 - (intersection.size / union.size || 0);
    featuresConsidered++;
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
    propertyData,
    5
  );

  // Calculate match percentages
  const recommendations = nearestNeighbors.map((property) => {
    return {
      ...property,
      matchPercentage: calculateMatchPercentage(property.roomDistanceScore),
    };
  });

  return recommendations;
}

// Export functions for use in your application
export {
  propertyData,
  calculateRoomDistanceScore,
  findKNearestNeighbors,
  calculateMatchPercentage,
  getPropertyRecommendations,
};
