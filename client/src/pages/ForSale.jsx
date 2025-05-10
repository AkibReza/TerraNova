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
  Car, 
  Droplet, 
  Wifi, 
  Dumbbell, 
  ParkingCircle,
  Landmark,
  Trees,
  ServerCog,
  Fan
} from "lucide-react";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Icon mapping for amenities
const amenityIcons = {
  "Security": <Shield size={14} />,
  "Parking": <ParkingCircle size={14} />,
  "Elevator": <Landmark size={14} />,
  "Swimming Pool": <Droplet size={14} />,
  "Prayer Room": <Home size={14} />,
  "Garden": <Trees size={14} />,
  "Gym": <Dumbbell size={14} />,
  "Rooftop": <Wifi size={14} />,
  "24/7 Security": <Shield size={14} />,
  "Generator": <ServerCog size={14} />,
  "AC": <Fan size={14} />
};

// This component represents an individual property card
const PropertyCard = ({ property }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
      variants={fadeInUp}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <motion.div 
          className="bg-gradient-to-br from-blue-100 to-indigo-50 w-full h-48 relative overflow-hidden"
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
        </motion.div>
        
        {/* Favorite button */}
        <div className="absolute top-3 right-3">
          <motion.button 
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={16} className="text-gray-400 hover:text-red-500 transition-colors" />
          </motion.button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
          {property.title}
        </h3>
        <p className="text-blue-600 font-bold mt-1 flex items-center">
          <span className="text-lg">৳{property.price.toLocaleString()}</span>
          {property.pricePerSqft && (
            <span className="text-xs text-gray-500 ml-2">
              (৳{property.pricePerSqft}/sq ft)
            </span>
          )}
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
        
        {property.amenities && property.amenities.length > 0 && (
          <div className="mt-4">
            <p className="text-gray-600 text-xs font-medium mb-2">Amenities:</p>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity, index) => (
                <span 
                  key={index} 
                  className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center"
                >
                  {amenityIcons[amenity] && (
                    <span className="mr-1">{amenityIcons[amenity]}</span>
                  )}
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

const PropertyListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setProperties([
        {
          id: 1,
          title: "Apartment in Shahbag",
          location: "Shahbag",
          price: 8000000,
          pricePerSqft: 6667,
          sqft: 1200,
          bedrooms: 4,
          bathrooms: 3,
          description: "Luxury apartment with modern amenities and prime location in Shahbag area.",
          amenities: ["Security", "Parking", "Elevator", "AC"]
        },
        {
          id: 2,
          title: "Apartment in Mirpur",
          location: "Mirpur DOHS",
          price: 7000000,
          pricePerSqft: 5833,
          sqft: 1200,
          bedrooms: 3,
          bathrooms: 4,
          description: "Beautiful home in a quiet neighborhood with excellent facilities.",
          amenities: ["Security", "Swimming Pool", "Prayer Room"]
        },
        {
          id: 3,
          title: "Luxury Villa in Banani",
          location: "Banani",
          price: 12000000,
          pricePerSqft: 4800,
          sqft: 2500,
          bedrooms: 5,
          bathrooms: 4,
          description: "Premium living space with exclusive amenities and high-end finishes.",
          amenities: ["Security", "Garden", "Gym", "Rooftop"]
        },
        {
          id: 4,
          title: "Modern Apartment in Gulshan",
          location: "Gulshan-2",
          price: 9500000,
          pricePerSqft: 5278,
          sqft: 1800,
          bedrooms: 3,
          bathrooms: 2,
          description: "Contemporary design with high-quality fixtures in prime location.",
          amenities: ["24/7 Security", "Parking", "Elevator", "Generator"]
        },
        {
          id: 5,
          title: "Family Home in Dhanmondi",
          location: "Dhanmondi",
          price: 10200000,
          pricePerSqft: 5100,
          sqft: 2000,
          bedrooms: 4,
          bathrooms: 3,
          description: "Spacious family residence in the heart of Dhanmondi with excellent amenities.",
          amenities: ["Security", "Parking", "Garden", "Generator"]
        },
        {
          id: 6,
          title: "Penthouse in Uttara",
          location: "Uttara Sector 13",
          price: 15000000,
          pricePerSqft: 6000,
          sqft: 2500,
          bedrooms: 4,
          bathrooms: 4,
          description: "Luxurious penthouse with panoramic city views and premium finishes.",
          amenities: ["24/7 Security", "Elevator", "Rooftop", "Gym"]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Added more spacing (mt-16) between navigation bar and heading */}
        <motion.h1 
          className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text text-center mb-2 mt-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          PROPERTY FOR SALE
        </motion.h1>
        
        <motion.p
          className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Discover exclusive properties tailored to your lifestyle and preferences
        </motion.p>
        
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
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PropertyListings;