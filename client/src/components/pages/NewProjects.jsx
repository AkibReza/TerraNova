import React, { useState, useEffect } from "react";

// This component represents an individual property card
const NewPropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <div className="bg-blue-100 w-full h-48"></div>
        {property.isNew && (
          <div className="absolute top-3 right-3">
            <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
              New Listing
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {property.title}
        </h3>
        <p className="text-blue-600 font-medium mt-1">
          ৳{property.price.toLocaleString()}
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

const NewProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setProperties([
        {
          id: 1,
          title: "Luxury Apartment in Gulshan",
          price: 125000000,
          sqft: 2200,
          bedrooms: 3,
          bathrooms: 3,
          description: "Brand new luxury apartment with premium finishes",
          amenities: ["Swimming Pool", "Gym", "24/7 Security", "Parking"],
          isNew: true
        },
        {
          id: 2,
          title: "Modern Duplex in Banani",
          price: 118000000,
          sqft: 1800,
          bedrooms: 3,
          bathrooms: 2,
          description: "Contemporary design with smart home features",
          amenities: ["Generator", "Elevator", "Security", "Balcony"],
          isNew: true
        },
        {
          id: 3,
          title: "Residential Plot in Bashundhara",
          price: 135000000,
          sqft: 3000,
          bedrooms: 0,
          bathrooms: 0,
          description: "Prime location for building your dream home",
          amenities: ["Gated Community", "Road Access", "Drainage"],
          isNew: true
        },
        {
          id: 4,
          title: "Commercial Space in Motijheel",
          price: 150000000,
          sqft: 3500,
          bedrooms: 0,
          bathrooms: 2,
          description: "Ideal for corporate office or retail business",
          amenities: ["Parking", "Elevator", "Fire Safety", "Generator"],
          isNew: true
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-12 mt-6">
        NEW PROPERTIES
      </h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map(property => (
            <NewPropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewProperties;