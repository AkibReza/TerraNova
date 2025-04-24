//Sample

const propertyData = [
  {
    id: 1,
    price: 18000000,
    propertyType: "apartment",
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
    propertyType: "apartment",
    propertySize: 1200, // sq ft
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    amenities: ["Balcony", "Parking", "Elevator", "Security"],
    location: "Banani",
    otherDetails: "Modern apartment in a prime location.",
    transactionType: "Rent",
  },
  {
    id: 3,
    price: 35000000,
    propertyType: "House",
    propertySize: 2800, // sq ft
    numberOfBedrooms: 5,
    numberOfBathrooms: 4,
    amenities: ["Large Garden", "Garage", "Swimming Pool", "Home Office"],
    location: "Baridhara Diplomatic Zone",
    otherDetails: "Spacious family home in a prestigious area.",
    transactionType: "Sale",
  },
  {
    id: 4,
    price: 120000,
    propertyType: "apartment",
    propertySize: 1850, // sq ft
    numberOfBedrooms: 3,
    numberOfBathrooms: 3,
    amenities: [
      "Community Hall",
      "Children's Play Area",
      "Power Backup",
      "Security",
    ],
    location: "Dhanmondi",
    otherDetails:
      "Well-maintained apartment complex with family-friendly amenities.",
    transactionType: "Rent",
  },
  {
    id: 5,
    price: 12000000,
    propertyType: "apartment",
    propertySize: 1100, // sq ft
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Elevator", "Security"],
    location: "Uttara",
    otherDetails: "Cozy apartment, ideal for small families or couples.",
    transactionType: "Sale",
  },
  {
    id: 6,
    price: 45000,
    propertyType: "apartment",
    propertySize: 950, // sq ft
    numberOfBedrooms: 3,
    numberOfBathrooms: 3,
    amenities: ["Balcony", "Parking", "Security"],
    location: "Mirpur",
    otherDetails: "Affordable apartment with essential amenities.",
    transactionType: "Rent",
  },
  {
    id: 7,
    price: 25000000,
    propertyType: "Duplex",
    propertySize: 2200, // sq ft
    numberOfBedrooms: 4,
    numberOfBathrooms: 3,
    amenities: ["Garden", "Parking", "Security"],
    location: "Bashundhara R/A",
    otherDetails: "Modern duplex house with ample space.",
    transactionType: "Sale",
  },
  {
    id: 8,
    price: 80000,
    propertyType: "apartment",
    propertySize: 1500, // sq ft
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Swimming Pool", "Gymnasium", "Security", "Parking"],
    location: "Mohakhali",
    otherDetails: "Spacious apartment with good facilities.",
    transactionType: "Rent",
  },
  {
    id: 9,
    price: 9500000,
    propertyType: "apartment",
    propertySize: 1300, // sq ft
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Elevator", "Security"],
    location: "Eskaton",
    otherDetails: "Comfortable apartment in a central location.",
    transactionType: "Sale",
  },
  {
    id: 10,
    price: 55000,
    propertyType: "apartment",
    propertySize: 1000, // sq ft
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    amenities: ["Balcony", "Parking", "Security"],
    location: "Lalmatia",
    otherDetails: "Cozy apartment in a quiet neighborhood.",
    transactionType: "Rent",
  },
  {
    id: 11,
    price: 30000000,
    propertyType: "House",
    propertySize: 2500, // sq ft
    numberOfBedrooms: 4,
    numberOfBathrooms: 3,
    amenities: ["Garden", "Garage", "Security"],
    location: "Purbachal",
    otherDetails: "Newly built house in a developing area.",
    transactionType: "Sale",
  },
  {
    id: 12,
    price: 110000,
    propertyType: "apartment",
    propertySize: 1700, // sq ft
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Swimming Pool", "Gymnasium", "Parking", "Security"],
    location: "Baridhara",
    otherDetails: "Luxury apartment with modern amenities.",
    transactionType: "Rent",
  },
  {
    id: 13,
    price: 7000000,
    propertyType: "apartment",
    propertySize: 1200, // sq ft
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Elevator", "Security"],
    location: "Shantinagar",
    otherDetails: "Well-located apartment.",
    transactionType: "Sale",
  },
  {
    id: 14,
    price: 60000,
    propertyType: "apartment",
    propertySize: 900, // sq ft
    numberOfBedrooms: 1,
    numberOfBathrooms: 1,
    amenities: ["Balcony", "Parking", "Security"],
    location: "Rampura",
    otherDetails: "Compact apartment.",
    transactionType: "Rent",
  },
  {
    id: 15,
    price: 20000000,
    propertyType: "Duplex",
    propertySize: 2000, // sq ft
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Garden", "Parking", "Security"],
    location: "Aftab Nagar",
    otherDetails: "Stylish duplex house.",
    transactionType: "Sale",
  },
];

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

  // Categorical features
  if (has("propertyType")) {
    totalDistance +=
      userPreference.propertyType === property.propertyType ? 0 : 1;
    featuresConsidered++;
  }

  if (has("location")) {
    totalDistance += userPreference.location === property.location ? 0 : 1;
    featuresConsidered++;
  }

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
// Replace the current module.exports with:
export {
  propertyData,
  calculateRoomDistanceScore,
  findKNearestNeighbors,
  calculateMatchPercentage,
  getPropertyRecommendations,
};

/* I want a 3 bedroom and 3 bathroom house for rent in Mirpur. The rent shouldn't be more than 50,000 taka. Balcony, Elevator, Security Guard is required.  Although I don't have a car yet, a parking space would be great.  */
