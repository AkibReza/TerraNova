import { motion } from "framer-motion";

const PropertyCard = ({ property }) => {
  // Debug logging to see what's being received
  console.log("PropertyCard received property:", property);
  console.log("Match percentage value:", property.matchPercentage);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
    >
      {" "}
      <div className="relative">
        <div className="w-full h-48 overflow-hidden">
          {property.imageUrl ? (
            <img
              src={property.imageUrl}
              alt={`${property.propertyType} in ${property.location}`}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-blue-800 font-semibold">Property Image</div>
            </div>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-blue-600 text-white font-bold py-1 px-3 rounded-full text-sm">
          {typeof property.matchPercentage === "number"
            ? property.matchPercentage
            : 0}
          % Match
        </div>
      </div>
      <div className="p-5 h-fit">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {property.propertyType} in {property.location}
        </h3>
        <p className="text-blue-600 font-bold text-lg mb-3">
          ৳{getPrice()}
          {property.transactionType === "Rent" ? "/month" : ""}
        </p>

        <div className="flex flex-wrap mb-4">
          <div className="flex items-center mr-4 mb-2">
            <span className="text-gray-700 text-sm">
              {getPropertySize()} sq ft
            </span>
          </div>

          <div className="flex items-center mr-4 mb-2">
            <span className="text-gray-700 text-sm">{getBedrooms()} bd</span>
          </div>

          <div className="flex items-center mb-2">
            <span className="text-gray-700 text-sm">{getBathrooms()} ba</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4">{property.otherDetails}</p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Amenities:
          </h4>
          <div className="flex flex-wrap">
            {(property.amenities || []).map((amenity, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full mr-2 mb-2"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
