// Sample real estate property dataset
const propertyData = [
  {
    id: 1,
    price: 850000,
    priceRange: "$800,000 - $900,000",
    propertyType: "Condominium",
    propertySize: 1650,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Pool", "Gym", "24/7 Security", "Parking"],
    location: "Downtown Riverside",
    otherDetails:
      "Modern waterfront property with panoramic city views and premium finishes throughout.",
  },
  {
    id: 2,
    price: 565000,
    priceRange: "$500,000 - $600,000",
    propertyType: "Single Family",
    propertySize: 2100,
    numberOfBedrooms: 4,
    numberOfBathrooms: 2.5,
    amenities: ["Backyard", "Garage", "Fireplace", "Updated Kitchen"],
    location: "Maple Heights",
    otherDetails:
      "Spacious family home in a quiet neighborhood with excellent schools nearby.",
  },
  {
    id: 3,
    price: 425000,
    priceRange: "$400,000 - $450,000",
    propertyType: "Loft",
    propertySize: 1200,
    numberOfBedrooms: 1,
    numberOfBathrooms: 1.5,
    amenities: [
      "High Ceilings",
      "Industrial Finishes",
      "Rooftop Access",
      "Pet Friendly",
    ],
    location: "Arts District",
    otherDetails:
      "Converted industrial space with character, perfect for the urban professional.",
  },
  {
    id: 4,
    price: 650000,
    priceRange: "$600,000 - $700,000",
    propertyType: "Townhouse",
    propertySize: 1850,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2.5,
    amenities: [
      "Community Pool",
      "Gated Community",
      "Balcony",
      "Smart Home Features",
    ],
    location: "Harbor View",
    otherDetails:
      "Newly renovated townhome with ocean views and modern amenities.",
  },
  {
    id: 5,
    price: 975000,
    priceRange: "$950,000 - $1,000,000",
    propertyType: "Single Family",
    propertySize: 2800,
    numberOfBedrooms: 5,
    numberOfBathrooms: 3.5,
    amenities: [
      "Swimming Pool",
      "Home Office",
      "Theater Room",
      "Large Backyard",
      "Smart Home",
    ],
    location: "Sunset Hills",
    otherDetails:
      "Luxurious family home with premium finishes and spacious entertaining areas.",
  },
  {
    id: 6,
    price: 315000,
    priceRange: "$300,000 - $350,000",
    propertyType: "Condominium",
    propertySize: 950,
    numberOfBedrooms: 2,
    numberOfBathrooms: 1,
    amenities: ["Fitness Center", "Parking", "Elevator", "Laundry in Unit"],
    location: "Midtown",
    otherDetails:
      "Cozy condo in vibrant downtown area, walking distance to restaurants and shops.",
  },
  {
    id: 7,
    price: 720000,
    priceRange: "$700,000 - $750,000",
    propertyType: "Single Family",
    propertySize: 2200,
    numberOfBedrooms: 4,
    numberOfBathrooms: 3,
    amenities: [
      "Home Office",
      "Finished Basement",
      "Fireplace",
      "Deck",
      "Fenced Yard",
    ],
    location: "Oak Grove",
    otherDetails:
      "Traditional home with modern updates, perfect for growing families.",
  },
  {
    id: 8,
    price: 1250000,
    priceRange: "$1,200,000 - $1,300,000",
    propertyType: "Luxury Apartment",
    propertySize: 2100,
    numberOfBedrooms: 3,
    numberOfBathrooms: 3,
    amenities: [
      "Concierge",
      "Private Terrace",
      "Wine Cellar",
      "Gym",
      "Spa",
      "Valet Parking",
    ],
    location: "Financial District",
    otherDetails:
      "Ultra-luxury apartment with panoramic city views and premium finishes.",
  },
  {
    id: 9,
    price: 495000,
    priceRange: "$450,000 - $500,000",
    propertyType: "Townhouse",
    propertySize: 1600,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: [
      "Community Garden",
      "Clubhouse",
      "Tennis Courts",
      "Walking Trails",
    ],
    location: "Willow Creek",
    otherDetails:
      "Charming townhome in a family-friendly community with excellent amenities.",
  },
  {
    id: 10,
    price: 385000,
    priceRange: "$350,000 - $400,000",
    propertyType: "Condominium",
    propertySize: 1100,
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    amenities: ["Balcony", "Pool", "Secured Entry", "Gym"],
    location: "University District",
    otherDetails:
      "Modern condo near university campus, perfect for students or professors.",
  },
  {
    id: 11,
    price: 529000,
    priceRange: "$500,000 - $550,000",
    propertyType: "Single Family",
    propertySize: 1750,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Garage", "Renovated Kitchen", "Hardwood Floors", "Backyard"],
    location: "Greenfield",
    otherDetails:
      "Charming craftsman-style home with original character and modern updates.",
  },
  {
    id: 12,
    price: 799000,
    priceRange: "$750,000 - $800,000",
    propertyType: "Penthouse",
    propertySize: 1900,
    numberOfBedrooms: 2,
    numberOfBathrooms: 2.5,
    amenities: [
      "Rooftop Terrace",
      "Floor-to-Ceiling Windows",
      "Concierge",
      "Garage",
    ],
    location: "City Center",
    otherDetails:
      "Stunning penthouse with 360-degree views and high-end finishes.",
  },
  {
    id: 13,
    price: 329000,
    priceRange: "$300,000 - $350,000",
    propertyType: "Condominium",
    propertySize: 1050,
    numberOfBedrooms: 2,
    numberOfBathrooms: 1.5,
    amenities: ["Pool", "Fitness Center", "Gated Community", "Covered Parking"],
    location: "River Hills",
    otherDetails:
      "Well-maintained condo with scenic river views and updated interiors.",
  },
  {
    id: 14,
    price: 620000,
    priceRange: "$600,000 - $650,000",
    propertyType: "Single Family",
    propertySize: 2000,
    numberOfBedrooms: 4,
    numberOfBathrooms: 2.5,
    amenities: [
      "Outdoor Kitchen",
      "Home Office",
      "Landscaped Garden",
      "Screened Porch",
    ],
    location: "Lakewood",
    otherDetails: "Beautiful home with outdoor living space and lake views.",
  },
  {
    id: 15,
    price: 450000,
    priceRange: "$450,000 - $500,000",
    propertyType: "Townhouse",
    propertySize: 1450,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Community Pool", "Playground", "Walking Trails", "Garage"],
    location: "Pinewood",
    otherDetails:
      "End-unit townhome with extra windows and bright, open floor plan.",
  },
];

/**
 * Calculate the Room Distance Score between user preferences and property
 * @param {Object} userPreference - User's preferences from the prompt
 * @param {Object} property - Property from the dataset
 * @returns {number} - Normalized distance score (0-1, where 0 is perfect match)
 */
function calculateRoomDistanceScore(userPreference, property) {
  const MAX_DIFFERENCE_BEDROOMS = 5; // Assuming max difference we care about
  const MAX_DIFFERENCE_BATHROOMS = 4; // Assuming max difference we care about

  let bedroomDifference = 0;
  let bathroomDifference = 0;

  // Calculate bedroom difference if user specified a preference
  if (
    userPreference.numberOfBedrooms !== null &&
    userPreference.numberOfBedrooms !== undefined
  ) {
    bedroomDifference = Math.abs(
      userPreference.numberOfBedrooms - property.numberOfBedrooms
    );
    bedroomDifference = Math.min(bedroomDifference, MAX_DIFFERENCE_BEDROOMS); // Cap the difference
  }

  // Calculate bathroom difference if user specified a preference
  if (
    userPreference.numberOfBathrooms !== null &&
    userPreference.numberOfBathrooms !== undefined
  ) {
    bathroomDifference = Math.abs(
      userPreference.numberOfBathrooms - property.numberOfBathrooms
    );
    bathroomDifference = Math.min(bathroomDifference, MAX_DIFFERENCE_BATHROOMS); // Cap the difference
  }

  // Normalize the differences to a 0-1 scale
  const normalizedBedroomDifference =
    bedroomDifference / MAX_DIFFERENCE_BEDROOMS;
  const normalizedBathroomDifference =
    bathroomDifference / MAX_DIFFERENCE_BATHROOMS;

  // If user didn't specify one of the preferences, only consider the other
  if (
    userPreference.numberOfBedrooms === null ||
    userPreference.numberOfBedrooms === undefined
  ) {
    return normalizedBathroomDifference;
  }
  if (
    userPreference.numberOfBathrooms === null ||
    userPreference.numberOfBathrooms === undefined
  ) {
    return normalizedBedroomDifference;
  }

  // Combine the two scores (equal weighting)
  return (normalizedBedroomDifference + normalizedBathroomDifference) / 2;
}

/**
 * Find the k nearest neighbors based on room distance
 * @param {Object} userPreference - User's preferences from the prompt
 * @param {Array} properties - Array of properties
 * @param {number} k - Number of neighbors to return
 * @returns {Array} - Array of k nearest neighbors
 */
function findKNearestNeighbors(userPreference, properties, k = 3) {
  // Calculate distance scores for all properties
  const propertiesWithScores = properties.map((property) => {
    return {
      ...property,
      roomDistanceScore: calculateRoomDistanceScore(userPreference, property),
    };
  });

  // Sort by distance score (ascending - lower is better)
  propertiesWithScores.sort(
    (a, b) => a.roomDistanceScore - b.roomDistanceScore
  );

  // Return top k results
  return propertiesWithScores.slice(0, k);
}

/**
 * Calculate match percentage based on room distance score
 * @param {number} roomDistanceScore - Room distance score (0-1)
 * @returns {number} - Match percentage (0-100)
 */
function calculateMatchPercentage(roomDistanceScore) {
  // Convert distance score to match percentage
  // Distance 0 = 100% match, Distance 1 = 0% match
  return Math.round((1 - roomDistanceScore) * 100);
}

/**
 * Main function to get property recommendations based on user preferences
 * @param {Object} userPreference - User's preferences from the prompt
 * @returns {Array} - Array of recommended properties with match percentages
 */
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

// Example usage
function example() {
  // Sample user preference from NLP parsed prompt
  const userPreference = {
    priceRange: "$500,000 - $700,000",
    propertyType: "Single Family",
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    size: 2000,
    amenities: ["Garage", "Backyard"],
    location: "Lakewood",
    otherDetails:
      "Looking for a family home with a nice backyard in a good school district",
  };

  console.log("User Preference:", userPreference);

  // Get recommendations
  const recommendations = getPropertyRecommendations(userPreference);

  console.log("Top Recommendations:");
  recommendations.forEach((property, index) => {
    console.log(
      `${index + 1}. ${property.propertyType} - ${
        property.numberOfBedrooms
      } bd, ${property.numberOfBathrooms} ba`
    );
    console.log(
      `   Match: ${property.matchPercentage}%, Price: ${property.priceRange}`
    );
    console.log(`   Location: ${property.location}`);
    console.log("   -----");
  });
}

// Export functions for use in your application
// Replace the current module.exports with:
export {
  propertyData,
  calculateRoomDistanceScore,
  findKNearestNeighbors,
  calculateMatchPercentage,
  getPropertyRecommendations,
};
