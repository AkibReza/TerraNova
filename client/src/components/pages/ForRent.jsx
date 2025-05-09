import React, { useState, useEffect } from "react";

// This component represents an individual property card
const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <div className="bg-blue-100 w-full h-48"></div>
        {property.matchPercentage && (
          <div className="absolute top-3 right-3">
            <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
              {property.matchPercentage}% Match
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {property.title}
        </h3>
        <p className="text-blue-600 font-medium mt-1">
          ৳{property.price.toLocaleString()}/month
        </p>
        
        <div className="flex items-center gap-3 text-gray-600 text-sm mt-3">
          <span>{property.sqft} sq ft</span>
          <span>•</span>
          <span>{property.bedrooms} bed</span>
          <span>•</span>
          <span>{property.bathrooms} ba</span>
        </div>
        
        <p className="text-gray-700 mt-3 text-sm">
          {property.description}
        </p>
        
        {property.amenities && property.amenities.length > 0 && (
          <div className="mt-4">
            <p className="text-gray-600 text-sm font-medium mb-2">Amenities:</p>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-4 pt-3 border-t border-gray-100">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const PropertyRentals = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setProperties([
        {
          id: 1,
          title: "Cozy Studio in Dhanmondi",
          price: 30000,
          sqft: 800,
          bedrooms: 1,
          bathrooms: 1,
          description: "Perfect for singles or couples",
          amenities: ["Security", "Parking", "Elevator"],
          matchPercentage: 92
        },
        {
          id: 2,
          title: "Family Home in Uttara",
          price: 50000,
          sqft: 1600,
          bedrooms: 3,
          bathrooms: 2,
          description: "Spacious and well-ventilated",
          amenities: ["Security", "Playground", "Community Hall"],
          matchPercentage: 85
        },
        {
          id: 3,
          title: "Executive Suite in Baridhara",
          price: 90000,
          sqft: 2200,
          bedrooms: 4,
          bathrooms: 3,
          description: "Luxury Diplomatic Zone Living",
          amenities: ["24/7 Security", "Garden", "Gym", "Swimming Pool"],
          matchPercentage: 78
        },
        {
          id: 4,
          title: "Modern Flat in Bashundhara",
          price: 40000,
          sqft: 1100,
          bedrooms: 2,
          bathrooms: 2,
          description: "Contemporary Design with Balcony",
          amenities: ["Security", "Parking", "Generator", "Playground"],
          matchPercentage: 88
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-12 mt-6">
        PROPERTY FOR RENT
      </h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyRentals;