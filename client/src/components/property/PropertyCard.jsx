import { motion } from "framer-motion";

const PropertyCard = ({ property }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
          <div className="text-blue-800 font-semibold">Property Image</div>
        </div>
        <div className="absolute top-3 right-3 bg-blue-600 text-white font-bold py-1 px-3 rounded-full text-sm">
          {property.matchPercentage}% Match
        </div>
      </div>

      <div className="p-5 h-fit">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {property.propertyType} in {property.location}
        </h3>
        <p className="text-blue-600 font-bold text-lg mb-3">
          ৳{property.price.toLocaleString()}
          {property.transactionType === "Rent" ? "/month" : ""}
        </p>

        <div className="flex flex-wrap mb-4">
          <div className="flex items-center mr-4 mb-2">
            <span className="text-gray-700 text-sm">
              {property.propertySize} sq ft
            </span>
          </div>

          <div className="flex items-center mr-4 mb-2">
            <span className="text-gray-700 text-sm">
              {property.numberOfBedrooms} bd
            </span>
          </div>

          <div className="flex items-center mb-2">
            <span className="text-gray-700 text-sm">
              {property.numberOfBathrooms} ba
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4">{property.otherDetails}</p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Amenities:
          </h4>
          <div className="flex flex-wrap">
            {property.amenities.map((amenity, index) => (
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
