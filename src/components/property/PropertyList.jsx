import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";

const PropertyList = ({ properties }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-xl shadow-lg border border-blue-100 w-full"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">
        AI-Powered Property Recommendations
      </h2>

      <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <p className="text-blue-700 text-sm">
          Based on your preferences, our AI has found these properties that
          might interest you. The match percentage indicates how closely each
          property aligns with your requirements.
        </p>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No properties found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PropertyList;
