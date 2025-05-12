import React, { useState, useEffect } from "react";
import {
  Trash2,
  MapPin,
  Calendar,
  Heart,
  ChevronDown,
  Share,
  Maximize2,
  Bed,
  Bath,
  Home,
} from "lucide-react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setFavorites([
        {
          id: 1,
          title: "Luxury Condo with City Views",
          address: "123 Downtown Blvd, Metro City",
          price: 750000,
          image: "/images/propertyimg/property_15.jpg",
          bedrooms: 2,
          bathrooms: 2,
          sqft: 1200,
          category: "Buy",
          dateAdded: "2025-04-15",
          matchPercentage: 95,
          propertyType: "Condo",
          availableFrom: "Immediate",
          otherDetails:
            "Modern finishes with panoramic views of the city skyline",
        },
        {
          id: 2,
          title: "Spacious Family Home",
          address: "456 Suburban Lane, Greenfield",
          price: 495000,
          image: "/images/propertyimg/property_2.jpg",
          bedrooms: 4,
          bathrooms: 3,
          sqft: 2800,
          category: "Buy",
          dateAdded: "2025-04-10",
          matchPercentage: 88,
          propertyType: "House",
          availableFrom: "30 Days",
          otherDetails: "Large backyard with newly renovated kitchen",
        },
        {
          id: 3,
          title: "Modern Downtown Apartment",
          address: "789 Urban Ave, Metro City",
          price: 2400,
          image: "/images/propertyimg/property_3.jpg",
          bedrooms: 1,
          bathrooms: 1,
          sqft: 850,
          category: "Rent",
          dateAdded: "2025-04-05",
          matchPercentage: 76,
          propertyType: "Apartment",
          availableFrom: "2025-06-01",
          otherDetails: "Walking distance to restaurants and shopping",
        },
        {
          id: 4,
          title: "Lakefront Retreat",
          address: "101 Lake Shore Dr, Lakeville",
          price: 1200000,
          image: "/images/propertyimg/property_4.jpg",
          bedrooms: 5,
          bathrooms: 4,
          sqft: 3500,
          category: "Buy",
          dateAdded: "2025-03-28",
          matchPercentage: 92,
          propertyType: "House",
          availableFrom: "Immediate",
          otherDetails:
            "Private dock with stunning lake views and sunset exposure",
        },
      ]);
      setLoading(false);
    }, 0);
  }, []);

  const formatPrice = (price, category) => {
    if (category === "Rent") {
      return `$${price.toLocaleString()}/mo`;
    } else {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(price);
    }
  };

  const handleRemove = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 pt-16">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Your Favorites</h1>
          <p className="text-gray-600 mt-2">
            Manage your saved properties and track updates
          </p>
        </div>
      </div>

      {/* Favorites Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filter and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <p className="text-gray-700 font-medium mb-4 md:mb-0">
            {favorites.length}{" "}
            {favorites.length === 1 ? "Property" : "Properties"} Saved
          </p>

          <div className="flex space-x-4">
            <div className="relative">
              <button className="flex items-center bg-white px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Category <ChevronDown size={16} className="ml-2" />
              </button>
              {/* Dropdown would go here */}
            </div>

            <div className="relative">
              <button className="flex items-center bg-white px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Sort By <ChevronDown size={16} className="ml-2" />
              </button>
              {/* Dropdown would go here */}
            </div>
          </div>
        </div>

        {/* Favorites List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
              <Heart size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Favorites Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start adding properties to your favorites to compare and track
              updates.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-full h-48 relative overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Added gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />

                    {/* Location marker */}
                    <div className="absolute bottom-3 left-3 flex items-center bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-blue-800">
                      <MapPin size={12} className="mr-1" />
                      {property.address.split(",")[0]}
                    </div>

                    {/* Top-left tag */}
                    <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-md flex items-center">
                      {property.category === "Rent" ? (
                        <>
                          <Calendar size={12} className="mr-1" />
                          {property.availableFrom}
                        </>
                      ) : (
                        <>
                          <Home size={12} className="mr-1" />
                          {property.propertyType}
                        </>
                      )}
                    </div>

                    {/* Match percentage badge */}
                    <div className="absolute top-14 right-3">
                      <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md flex items-center">
                        {property.matchPercentage}% Match
                      </div>
                    </div>

                    {/* Favorite button */}
                    <div className="absolute top-3 right-3">
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                        onClick={() => handleRemove(property.id)}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-blue-600 font-bold mt-1 flex items-center">
                    <span className="text-lg">
                      {formatPrice(property.price, property.category)}
                    </span>
                    {property.category === "Rent" && (
                      <span className="text-xs text-gray-500 ml-2">/month</span>
                    )}
                  </p>

                  <div className="flex items-center gap-4 text-gray-600 text-sm mt-3">
                    <div className="flex items-center">
                      <Maximize2 size={14} className="mr-1 text-blue-500" />
                      <span>{property.sqft.toLocaleString()} sq ft</span>
                    </div>
                    <div className="flex items-center">
                      <Bed size={14} className="mr-1 text-blue-500" />
                      <span>{property.bedrooms} bed</span>
                    </div>
                    <div className="flex items-center">
                      <Bath size={14} className="mr-1 text-blue-500" />
                      <span>{property.bathrooms} ba</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mt-3 text-sm border-l-2 border-blue-200 pl-2">
                    {property.otherDetails}
                  </p>

                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-medium transition-all shadow-sm hover:shadow-md">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
