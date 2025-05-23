import { motion } from "framer-motion";
import { useState } from "react";
import {
  MapPin,
  Calendar,
  Heart,
  Maximize2,
  Bed,
  Bath,
  Home,
} from "lucide-react";

const PropertyCard = ({ property, type = "sale" }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine if this is a rental or sale property
  const isRental = property.transactionType === "Rent";

  // Handle price that might be a number or an object with $numberInt
  const getPrice = () => {
    if (typeof property.price === "object" && property.price.$numberInt) {
      return parseInt(property.price.$numberInt).toLocaleString();
    } else if (typeof property.price === "number") {
      return property.price.toLocaleString();
    }
    return property.price;
  };

  // Handle property size that might be a number or an object with $numberInt
  const getPropertySize = () => {
    if (
      typeof property.propertySize === "object" &&
      property.propertySize.$numberInt
    ) {
      return property.propertySize.$numberInt;
    }
    return property.propertySize;
  };

  // Handle bedrooms that might be a number or an object with $numberInt
  const getBedrooms = () => {
    if (
      typeof property.numberOfBedrooms === "object" &&
      property.numberOfBedrooms.$numberInt
    ) {
      return property.numberOfBedrooms.$numberInt;
    }
    return property.numberOfBedrooms;
  };

  // Handle bathrooms that might be a number or an object with $numberInt
  const getBathrooms = () => {
    if (
      typeof property.numberOfBathrooms === "object" &&
      property.numberOfBathrooms.$numberInt
    ) {
      return property.numberOfBathrooms.$numberInt;
    }
    return property.numberOfBathrooms;
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
      variants={fadeInUp}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <motion.div
          className="bg-gradient-to-br from-blue-100 to-blue-50 w-full h-48 relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {property.imageUrl ? (
            <img
              src={property.imageUrl}
              alt={`${property.propertyType} in ${property.location}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <div className="text-blue-800 font-semibold">Property Image</div>
            </div>
          )}

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
        </motion.div>

        {/* Favorite button */}
        <div className="absolute top-3 right-3">
          <motion.button
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              size={16}
              className="text-gray-400 hover:text-red-500 transition-colors"
            />
          </motion.button>
        </div>

        {/* Match percentage badge */}
        {typeof property.matchPercentage === "number" && (
          <div className="absolute top-14 right-3">
            <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md flex items-center">
              {property.matchPercentage}% Match
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
          {property.propertyType} in {property.location}
        </h3>
        <p className="text-blue-600 font-bold mt-1 flex items-center">
          <span className="text-lg">৳{getPrice()}</span>
          {isRental && (
            <span className="text-xs text-gray-500 ml-2">/month</span>
          )}
        </p>

        <div className="flex items-center gap-4 text-gray-600 text-sm mt-3">
          <div className="flex items-center">
            <Maximize2 size={14} className="mr-1 text-blue-500" />
            <span>{getPropertySize()} sq ft</span>
          </div>
          <div className="flex items-center">
            <Bed size={14} className="mr-1 text-blue-500" />
            <span>{getBedrooms()} bed</span>
          </div>
          <div className="flex items-center">
            <Bath size={14} className="mr-1 text-blue-500" />
            <span>{getBathrooms()} ba</span>
          </div>
        </div>

        <p className="text-gray-700 mt-3 text-sm border-l-2 border-blue-200 pl-2">
          {property.otherDetails}
        </p>

        {property.amenities && property.amenities.length > 0 && (
          <div className="mt-4">
            <p className="text-gray-600 text-xs font-medium mb-2">Amenities:</p>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-gray-100">
          <motion.button
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-medium transition-all shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
