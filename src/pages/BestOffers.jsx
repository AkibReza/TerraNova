import React, { useState, useEffect } from "react";
import {
  Heart,
  Share2,
  MessageSquare,
  Briefcase,
  Tag,
  ArrowUpRight,
  Filter,
} from "lucide-react";

const BestOffers = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setProperties([
        {
          id: 1,
          title: "Modern Lakefront Villa",
          address: "123 Lake Drive, Lakewood",
          price: 850000,
          discount: 50000,
          image: "/api/placeholder/800/500",
          bedrooms: 4,
          bathrooms: 3,
          sqft: 2800,
          tags: ["Lakefront", "Luxury", "New"],
          matchScore: 96,
        },
        {
          id: 2,
          title: "Downtown Penthouse",
          address: "789 Urban Ave, Metro City",
          price: 1200000,
          discount: 100000,
          image: "/api/placeholder/800/500",
          bedrooms: 3,
          bathrooms: 3.5,
          sqft: 2400,
          tags: ["Penthouse", "City View", "Smart Home"],
          matchScore: 94,
        },
        {
          id: 3,
          title: "Suburban Family Home",
          address: "456 Maple Road, Greenville",
          price: 550000,
          discount: 25000,
          image: "/api/placeholder/800/500",
          bedrooms: 5,
          bathrooms: 3,
          sqft: 3200,
          tags: ["Family", "Large Yard", "Renovated"],
          matchScore: 91,
        },
      ]);
      setLoading(false);
    }, 0);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Best Offers For You
          </h1>
          <p className="text-gray-600 mt-2">
            Properties recommended for you based on your preferences and search
            history
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-blue-600" />
            <span className="font-medium text-gray-700">Filters</span>
          </div>
          <div className="flex space-x-2">
            <button className="bg-white px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Price
            </button>
            <button className="bg-white px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Bedrooms
            </button>
            <button className="bg-white px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Home Type
            </button>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-blue-700">
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Property Cards */}
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                      <Heart size={20} className="text-gray-500" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                    {property.matchScore}% Match
                  </div>
                  {property.discount > 0 && (
                    <div className="absolute bottom-4 left-4 bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                      Save {formatPrice(property.discount)}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {property.title}
                    </h3>
                    <p className="text-xl font-bold text-blue-600">
                      {formatPrice(property.price)}
                    </p>
                  </div>
                  <p className="text-gray-600 mb-4">{property.address}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>{property.bedrooms} Beds</span>
                    <span>{property.bathrooms} Baths</span>
                    <span>{property.sqft.toLocaleString()} sq.ft</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full flex items-center"
                      >
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <div className="flex space-x-3">
                      <button className="text-gray-500 hover:text-blue-600">
                        <Share2 size={18} />
                      </button>
                      <button className="text-gray-500 hover:text-blue-600">
                        <MessageSquare size={18} />
                      </button>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                      View Details
                      <ArrowUpRight size={16} className="ml-1" />
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

export default BestOffers;
