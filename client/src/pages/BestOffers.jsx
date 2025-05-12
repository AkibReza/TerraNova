import React, { useState, useEffect } from "react";
// Remove framer-motion if causing issues
import {
  Heart,
  Share2,
  MessageSquare,
  Tag,
  ArrowUpRight,
  Filter,
  MapPin,
  Maximize2,
  Bed,
  Bath,
  Home,
  Calendar,
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
          image: "/images/propertyimg/property_1.jpg",
          bedrooms: 4,
          bathrooms: 3,
          sqft: 2800,
          tags: ["Lakefront", "Luxury", "New"],
          matchScore: 96,
          propertyType: "Villa",
          transactionType: "Sale",
          location: "Lakewood",
          otherDetails:
            "Pristine lakefront property with panoramic water views and modern architecture.",
        },
        {
          id: 2,
          title: "Downtown Penthouse",
          address: "789 Urban Ave, Metro City",
          price: 1200000,
          discount: 100000,
          image: "/images/propertyimg/property_4.jpg",
          bedrooms: 3,
          bathrooms: 3.5,
          sqft: 2400,
          tags: ["Penthouse", "City View", "Smart Home"],
          matchScore: 94,
          propertyType: "Penthouse",
          transactionType: "Sale",
          location: "Metro City",
          otherDetails:
            "Luxury penthouse with floor-to-ceiling windows and private rooftop terrace.",
        },
        {
          id: 3,
          title: "Suburban Family Home",
          address: "456 Maple Road, Greenville",
          price: 550000,
          discount: 25000,
          image: "/images/propertyimg/property_5.jpg",
          bedrooms: 5,
          bathrooms: 3,
          sqft: 3200,
          tags: ["Family", "Large Yard", "Renovated"],
          matchScore: 91,
          propertyType: "House",
          transactionType: "Sale",
          location: "Greenville",
          otherDetails:
            "Spacious family home with recently renovated kitchen and bathrooms.",
        },
        {
          id: 4,
          title: "Cozy Urban Apartment",
          address: "321 Downtown St, Metro City",
          price: 2500,
          discount: 200,
          image: "/images/propertyimg/property_2.jpg",
          bedrooms: 2,
          bathrooms: 1,
          sqft: 950,
          tags: ["Rental", "City Center", "Pet Friendly"],
          matchScore: 95,
          propertyType: "Apartment",
          transactionType: "Rent",
          location: "Metro City",
          availableFrom: "June 1",
          otherDetails:
            "Modern apartment in the heart of downtown, walking distance to shops and restaurants.",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 pt-16">
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
            <button className="bg-white px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Price
            </button>
            <button className="bg-white px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Bedrooms
            </button>
            <button className="bg-white px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Home Type
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-4 py-2 rounded-lg text-sm font-medium text-white shadow-sm hover:shadow-md transition-all">
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
              <PropertyCard
                key={property.id}
                property={property}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PropertyCard = ({ property, formatPrice }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine if this is a rental or sale property
  const isRental = property.transactionType === "Rent";

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-full h-64 relative overflow-hidden">
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
            {property.location}
          </div>

          {/* Top-left tag: Available date for rentals, property type for sales */}
          <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-md flex items-center">
            {isRental ? (
              <>
                <Calendar size={12} className="mr-1" />
                {property.availableFrom || "Available Now"}
              </>
            ) : (
              <>
                <Home size={12} className="mr-1" />
                {property.propertyType}
              </>
            )}
          </div>

          {/* Discount badge */}
          {property.discount > 0 && (
            <div className="absolute bottom-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded-md flex items-center">
              Save {formatPrice(property.discount)}
            </div>
          )}
        </div>

        {/* Favorite button */}
        <div className="absolute top-3 right-3">
          <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
            <Heart
              size={16}
              className="text-gray-400 hover:text-red-500 transition-colors"
            />
          </button>
        </div>

        {/* Match percentage badge */}
        <div className="absolute top-14 right-3">
          <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md flex items-center">
            {property.matchScore}% Match
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
          {property.title}
        </h3>
        <p className="text-blue-600 font-bold mt-1 flex items-center">
          <span className="text-lg">{formatPrice(property.price)}</span>
          {isRental && (
            <span className="text-xs text-gray-500 ml-2">/month</span>
          )}
        </p>
        <p className="text-gray-600 text-sm mt-1">{property.address}</p>

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

        {property.tags && property.tags.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {property.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center"
                >
                  <Tag size={12} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <button className="text-gray-500 hover:text-blue-600 transition-colors">
                <Share2 size={18} />
              </button>
              <button className="text-gray-500 hover:text-blue-600 transition-colors">
                <MessageSquare size={18} />
              </button>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-sm hover:shadow-md transition-all">
              View Details
              <ArrowUpRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestOffers;
