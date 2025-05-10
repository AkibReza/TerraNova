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
  Fan,
  Calendar
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
  "AC": <Fan size={14} />,
  "Furnished": <Home size={14} />
};

// This component represents an individual rental property card
const RentalPropertyCard = ({ property }) => {
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
          
          {/* Availability tag if available */}
          {property.availableFrom && (
            <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-md flex items-center">
              <Calendar size={12} className="mr-1" />
              Available: {property.availableFrom}
            </div>
          )}
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
          <span className="text-xs text-gray-500 ml-2">/month</span>
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

const PropertyForRent = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setProperties([
        {
          id: 1,
          title: "Modern Apartment in Gulshan",
          location: "Gulshan-1",
          price: 50000,
          sqft: 1400,
          bedrooms: 3,
          bathrooms: 2,
          availableFrom: "Immediate",
          description: "Beautifully furnished apartment with modern amenities in the heart of Gulshan.",
          amenities: ["Security", "Parking", "Elevator", "AC", "Furnished"]
        },
        {
          id: 2,
          title: "Family Flat in Dhanmondi",
          location: "Dhanmondi",
          price: 35000,
          sqft: 1200,
          bedrooms: 3,
          bathrooms: 2,
          availableFrom: "June 1",
          description: "Spacious family apartment in a quiet area with excellent facilities and schools nearby.",
          amenities: ["Security", "Generator", "Parking"]
        },
        {
          id: 3,
          title: "Executive Suite in Banani",
          location: "Banani DOHS",
          price: 60000,
          sqft: 1800,
          bedrooms: 4,
          bathrooms: 3,
          availableFrom: "Immediate",
          description: "Premium furnished apartment perfect for executives with all modern amenities.",
          amenities: ["Security", "Swimming Pool", "Gym", "Furnished", "AC"]
        },
        {
          id: 4,
          title: "Cozy Studio in Uttara",
          location: "Uttara Sector 7",
          price: 22000,
          sqft: 650,
          bedrooms: 1,
          bathrooms: 1,
          availableFrom: "Immediate",
          description: "Perfect studio apartment for single professionals or small families in Uttara.",
          amenities: ["Security", "Elevator", "Generator"]
        },
        {
          id: 5,
          title: "Spacious Flat in Mirpur",
          location: "Mirpur DOHS",
          price: 30000,
          sqft: 1100,
          bedrooms: 3,
          bathrooms: 2,
          availableFrom: "July 15",
          description: "Well-maintained 3-bedroom apartment in a peaceful location with community facilities.",
          amenities: ["Security", "Parking", "Generator", "Garden"]
        },
        {
          id: 6,
          title: "Luxury Apartment in Baridhara",
          location: "Baridhara",
          price: 75000,
          sqft: 2200,
          bedrooms: 4,
          bathrooms: 4,
          availableFrom: "August 1",
          description: "High-end luxury apartment with panoramic city views and premium features.",
          amenities: ["24/7 Security", "Swimming Pool", "Gym", "Rooftop", "Furnished", "AC"]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text text-center mb-2 mt-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          PROPERTY FOR RENT
        </motion.h1>
        
        <motion.p
          className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Find your perfect rental home with flexible terms and great amenities
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
              <RentalPropertyCard key={property.id} property={property} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PropertyForRent;