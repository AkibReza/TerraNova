import React, { useState, useEffect } from "react";
import {
  Trash2,
  MapPin,
  Home,
  Bed,
  Bath,
  Ruler,
  Heart,
  ChevronDown,
  Share,
  Star,
  StarOff,
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
          image: "/api/placeholder/800/500",
          bedrooms: 2,
          bathrooms: 2,
          sqft: 1200,
          category: "Buy",
          dateAdded: "2025-04-15",
          stars: 5,
        },
        {
          id: 2,
          title: "Spacious Family Home",
          address: "456 Suburban Lane, Greenfield",
          price: 495000,
          image: "/api/placeholder/800/500",
          bedrooms: 4,
          bathrooms: 3,
          sqft: 2800,
          category: "Buy",
          dateAdded: "2025-04-10",
          stars: 4,
        },
        {
          id: 3,
          title: "Modern Downtown Apartment",
          address: "789 Urban Ave, Metro City",
          price: 2400,
          image: "/api/placeholder/800/500",
          bedrooms: 1,
          bathrooms: 1,
          sqft: 850,
          category: "Rent",
          dateAdded: "2025-04-05",
          stars: 3,
        },
        {
          id: 4,
          title: "Lakefront Retreat",
          address: "101 Lake Shore Dr, Lakeville",
          price: 1200000,
          image: "/api/placeholder/800/500",
          bedrooms: 5,
          bathrooms: 4,
          sqft: 3500,
          category: "Buy",
          dateAdded: "2025-03-28",
          stars: 5,
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

  const updateStars = (id, newStars) => {
    setFavorites((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stars: newStars } : item))
    );
  };

  const renderStars = (property) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          onClick={() => updateStars(property.id, i)}
          className="focus:outline-none"
        >
          {i <= property.stars ? (
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
          ) : (
            <StarOff size={16} className="text-gray-300" />
          )}
        </button>
      );
    }
    return stars;
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
          <div className="grid grid-cols-1 gap-6">
            {favorites.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {property.category}
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {property.title}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin size={16} className="mr-1" />
                          <span>{property.address}</span>
                        </div>
                      </div>
                      <p className="text-xl font-bold text-blue-600">
                        {formatPrice(property.price, property.category)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-6 mb-6">
                      <div className="flex items-center text-gray-700">
                        <Bed size={18} className="mr-2" />
                        <span>
                          {property.bedrooms}{" "}
                          {property.bedrooms === 1 ? "Bed" : "Beds"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Bath size={18} className="mr-2" />
                        <span>
                          {property.bathrooms}{" "}
                          {property.bathrooms === 1 ? "Bath" : "Baths"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Ruler size={18} className="mr-2" />
                        <span>{property.sqft.toLocaleString()} sq ft</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm text-gray-500 mr-2">
                          Your rating:
                        </p>
                        <div className="flex space-x-1">
                          {renderStars(property)}
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                          title="Share"
                        >
                          <Share size={18} className="text-gray-600" />
                        </button>
                        <button
                          className="bg-red-50 hover:bg-red-100 p-2 rounded-full"
                          title="Remove from favorites"
                          onClick={() => handleRemove(property.id)}
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
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
