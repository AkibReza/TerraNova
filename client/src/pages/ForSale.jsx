import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Heart,
  Shield,
  Building,
  Landmark,
  Trees,
  Zap,
  ParkingCircle,
  Key,
  Award,
} from "lucide-react";
import ForPropertyCard from "../components/property/ForPropertyCard";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Icon mapping for features
const featureIcons = {
  Security: <Shield size={14} />,
  Parking: <ParkingCircle size={14} />,
  Elevator: <Landmark size={14} />,
  "Good Location": <MapPin size={14} />,
  "Ready to Move": <Key size={14} />,
  Garden: <Trees size={14} />,
  "24/7 Security": <Shield size={14} />,
  Generator: <Zap size={14} />,
  "Roof Access": <Building size={14} />,
  Registered: <Award size={14} />,
};

// This component represents an individual sale property card
const SalePropertyCard = ({ property }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Format price with commas
  const formattedPrice = property.price.toLocaleString();

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
      variants={fadeInUp}
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
          {/* Property image placeholder with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />

          {/* Location marker */}
          <div className="absolute bottom-3 left-3 flex items-center bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-blue-800">
            <MapPin size={12} className="mr-1" />
            {property.location}
          </div>

          {/* Property type tag */}
          <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-md flex items-center">
            <Home size={12} className="mr-1" />
            {property.type}
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
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
          {property.title}
        </h3>
        <p className="text-blue-600 font-bold mt-1 flex items-center">
          <span className="text-lg">৳{formattedPrice}</span>
        </p>

        <div className="flex items-center gap-4 text-gray-600 text-sm mt-3">
          <div className="flex items-center">
            <Maximize2 size={14} className="mr-1 text-blue-500" />
            <span>{property.sqft} sq ft</span>
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
          {property.description}
        </p>

        {property.features && property.features.length > 0 && (
          <div className="mt-4">
            <p className="text-gray-600 text-xs font-medium mb-2">Features:</p>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center"
                >
                  {featureIcons[feature] && (
                    <span className="mr-1">{featureIcons[feature]}</span>
                  )}
                  {feature}
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

const PropertyForSale = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setProperties([
        {
          id: 1,
          title: "Luxury Apartment in Gulshan",
          type: "Apartment",
          location: "Gulshan-2",
          price: 12000000,
          sqft: 1800,
          bedrooms: 3,
          bathrooms: 3,
          description:
            "Elegant apartment with premium finishes and stunning city views in a prestigious location.",
          features: [
            "Security",
            "Parking",
            "Elevator",
            "Ready to Move",
            "Registered",
          ],
        },
        {
          id: 2,
          title: "Spacious House in Dhanmondi",
          type: "House",
          location: "Dhanmondi-27",
          price: 25000000,
          sqft: 3200,
          bedrooms: 5,
          bathrooms: 4,
          description:
            "Beautiful family home with garden and modern amenities in a prime residential area.",
          features: ["Security", "Garden", "Parking", "Good Location"],
        },
        {
          id: 3,
          title: "Executive Penthouse in Banani",
          type: "Penthouse",
          location: "Banani DOHS",
          price: 35000000,
          sqft: 3500,
          bedrooms: 4,
          bathrooms: 4,
          description:
            "Exclusive penthouse with panoramic views, private terrace and premium fixtures.",
          features: [
            "24/7 Security",
            "Elevator",
            "Roof Access",
            "Parking",
            "Registered",
          ],
        },
        {
          id: 4,
          title: "Modern Flat in Uttara",
          type: "Apartment",
          location: "Uttara Sector 10",
          price: 8500000,
          sqft: 1400,
          bedrooms: 3,
          bathrooms: 2,
          description:
            "Contemporary apartment with excellent amenities in a developing neighborhood.",
          features: ["Security", "Elevator", "Generator", "Ready to Move"],
        },
        {
          id: 5,
          title: "Family Home in Mirpur",
          type: "House",
          location: "Mirpur DOHS",
          price: 18000000,
          sqft: 2600,
          bedrooms: 4,
          bathrooms: 3,
          description:
            "Spacious family residence with modern features and excellent school accessibility.",
          features: ["Security", "Parking", "Generator", "Garden"],
        },
        {
          id: 6,
          title: "Premium Villa in Baridhara",
          type: "Villa",
          location: "Baridhara",
          price: 45000000,
          sqft: 4800,
          bedrooms: 6,
          bathrooms: 5,
          description:
            "Prestigious villa with luxurious finishes, swimming pool and expansive living areas.",
          features: [
            "24/7 Security",
            "Garden",
            "Generator",
            "Parking",
            "Registered",
          ],
        },
      ]);
      setLoading(false);
    }, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header with background image and buildings */}
      <div className="bg-blue-100 relative overflow-hidden">
        <div className="container mx-auto px-4 pt-16 pb-32">
          <motion.h1
            className="text-4xl font-bold text-blue-700 text-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            PROPERTY FOR SALE
          </motion.h1>

          <motion.p
            className="text-blue-700 text-center mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Discover exclusive properties tailored to your lifestyle
          </motion.p>

          {/* Building silhouettes */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <motion.svg
              width="400"
              height="120"
              viewBox="0 0 400 120"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              {/* Building 1 */}
              <rect x="70" y="20" width="40" height="100" fill="#3B6FCB" />
              <rect
                x="75"
                y="30"
                width="10"
                height="10"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="95"
                y="30"
                width="10"
                height="10"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="75"
                y="50"
                width="10"
                height="10"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="95"
                y="50"
                width="10"
                height="10"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="75"
                y="70"
                width="10"
                height="10"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="95"
                y="70"
                width="10"
                height="10"
                fill="white"
                opacity="0.7"
              />

              {/* Building 2 */}
              <rect x="120" y="40" width="50" height="80" fill="#5D85D6" />
              <rect x="125" y="50" width="40" height="15" fill="#3B6FCB" />
              <rect
                x="130"
                y="75"
                width="10"
                height="10"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="150"
                y="75"
                width="10"
                height="10"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="130"
                y="95"
                width="10"
                height="10"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="150"
                y="95"
                width="10"
                height="10"
                fill="white"
                opacity="0.7"
              />

              {/* Building 3 */}
              <rect x="180" y="50" width="35" height="70" fill="#7599E0" />
              <rect
                x="185"
                y="60"
                width="8"
                height="8"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="202"
                y="60"
                width="8"
                height="8"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="185"
                y="75"
                width="8"
                height="8"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="202"
                y="75"
                width="8"
                height="8"
                fill="white"
                opacity="0.7"
              />

              {/* Building 4 */}
              <rect x="225" y="10" width="30" height="110" fill="#1C4CAA" />
              <rect
                x="230"
                y="20"
                width="5"
                height="5"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="245"
                y="20"
                width="5"
                height="5"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="230"
                y="35"
                width="5"
                height="5"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="245"
                y="35"
                width="5"
                height="5"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="230"
                y="50"
                width="5"
                height="5"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="245"
                y="50"
                width="5"
                height="5"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="230"
                y="65"
                width="5"
                height="5"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="245"
                y="65"
                width="5"
                height="5"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="230"
                y="80"
                width="5"
                height="5"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="245"
                y="80"
                width="5"
                height="5"
                fill="white"
                opacity="0.7"
              />

              {/* Building 5 */}
              <rect x="265" y="40" width="55" height="80" fill="#6E90DF" />
              <rect
                x="275"
                y="50"
                width="10"
                height="10"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="295"
                y="50"
                width="10"
                height="10"
                fill="white"
                opacity="0.7"
              />
              <rect x="285" y="70" width="15" height="15" fill="#3B6FCB" />
              <rect
                x="275"
                y="95"
                width="10"
                height="10"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="295"
                y="95"
                width="10"
                height="10"
                fill="white"
                opacity="0.7"
              />
            </motion.svg>
          </div>

          {/* Curved bottom edge */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 100H1440V30C1200 60 960 75 720 75C480 75 240 60 0 30V100Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 mt-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative w-20 h-20">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {properties.map((property) => (
              <ForPropertyCard
                type="sale"
                key={property.id}
                property={property}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PropertyForSale;
