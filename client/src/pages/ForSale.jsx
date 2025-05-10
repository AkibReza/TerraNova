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
  CheckCircle,
  Building
} from "lucide-react";

// Utility components
const PriceTag = ({ price }) => {
  const formattedPrice = new Intl.NumberFormat('en-US').format(price);
  return (
    <div className="flex items-center">
      <span className="text-2xl font-bold text-blue-700">৳{formattedPrice}</span>
    </div>
  );
};

const AmenityIcon = ({ name }) => {
  const icons = {
    Security: <Shield className="w-4 h-4" />,
    Dexing: <ServerCog className="w-4 h-4" />,
    Elevator: <Droplet className="w-4 h-4" />,
    AC: <Fan className="w-4 h-4" />,
    Furnished: <Home className="w-4 h-4" />,
    Generator: <ServerCog className="w-4 h-4" />,
    Parking: <ParkingCircle className="w-4 h-4" />,
    "Swimming Pool": <Droplet className="w-4 h-4" />,
    Gym: <Dumbbell className="w-4 h-4" />,
  };

  return (
    <div className="flex items-center space-x-1 text-sm text-gray-600">
      {icons[name] || <CheckCircle className="w-4 h-4" />}
      <span>{name}</span>
    </div>
  );
};

const PropertyCard = ({ property }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative">
        {/* Placeholder for property image */}
        <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
          <Building className="w-16 h-16 text-white opacity-50" />
        </div>

        {/* Favorite button */}
        <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-sm hover:bg-red-100 transition-colors">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-2">
          <h3 className="text-xl font-bold text-gray-800">{property.title}</h3>
          <PriceTag price={property.price} />
        </div>

        <p className="text-gray-600 mb-4">{property.location}</p>

        <div className="flex items-center space-x-4 text-gray-500 mb-4">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{property.beds} beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.baths} baths</span>
          </div>
          <div className="flex items-center">
            <Maximize2 className="w-4 h-4 mr-1" />
            <span>{property.area} sq ft</span>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{property.description}</p>

        <div className="border-t border-gray-100 pt-4">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">Amenities:</h4>
          <div className="grid grid-cols-2 gap-2">
            {property.amenities.map((amenity, index) => (
              <AmenityIcon key={index} name={amenity} />
            ))}
          </div>
        </div>

        <button className="mt-6 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
          View Details
        </button>
      </div>
    </motion.div>
  );
};

// Animation variants
const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Building components for the heading background
const BuildingRow = () => (
  <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center space-x-1">
    {/* Tall building */}
    <div className="w-8 h-24 bg-blue-800 relative">
      <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-sm"></div>
      <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-sm"></div>
      <div className="absolute top-5 left-1 w-2 h-2 bg-white rounded-sm"></div>
      <div className="absolute top-5 right-1 w-2 h-2 bg-white rounded-sm"></div>
    </div>

    {/* Medium building */}
    <div className="w-10 h-20 bg-blue-700 relative">
      <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-sm"></div>
      <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-sm"></div>
    </div>

    {/* Short building */}
    <div className="w-12 h-16 bg-blue-600 relative">
      <div className="absolute top-3 left-3 w-2 h-2 bg-white rounded-sm"></div>
      <div className="absolute top-3 right-3 w-2 h-2 bg-white rounded-sm"></div>
    </div>

    {/* Skyscraper */}
    <div className="w-6 h-28 bg-blue-900 relative">
      <div className="absolute top-2 left-1 w-1 h-1 bg-white rounded-sm"></div>
      <div className="absolute top-2 right-1 w-1 h-1 bg-white rounded-sm"></div>
      <div className="absolute top-5 left-1 w-1 h-1 bg-white rounded-sm"></div>
      <div className="absolute top-5 right-1 w-1 h-1 bg-white rounded-sm"></div>
    </div>

    {/* House */}
    <div className="w-14 h-14 bg-blue-500 relative">
      <div className="absolute -top-2 left-0 right-0 h-4 bg-blue-600 transform rotate-2 origin-bottom"></div>
      <div className="absolute top-4 left-4 w-3 h-3 bg-white rounded-sm"></div>
    </div>
  </div>
);

const PropertyListings = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Luxury Residence in Gulshan",
      location: "Gulshan District",
      price: 7500000,
      beds: 3,
      baths: 2,
      area: 1400,
      description: "Beautifully furnished residence with modern amenities in the heart of Gulshan.",
      amenities: ["Security", "Dexing", "Elevator", "AC", "Furnished"],
    },
    {
      id: 2,
      title: "Premium Family Home in Dhanmondi",
      location: "Dhanmondi Area",
      price: 6800000,
      beds: 3,
      baths: 2,
      area: 1200,
      description: "Spacious family home in a quiet area with excellent facilities and schools nearby.",
      amenities: ["Security", "Generator", "Parking"],
    },
    {
      id: 3,
      title: "Executive Penthouse in Banani",
      location: "Banani DOHS",
      price: 9200000,
      beds: 4,
      baths: 3,
      area: 1800,
      description: "Premium furnished penthouse perfect for executives with all modern amenities.",
      amenities: ["Security", "Swimming Pool", "Gym", "Furnished", "AC"],
    },
    {
      id: 4,
      title: "Affordable Apartment in Mirpur",
      location: "Mirpur Section 10",
      price: 4200000,
      beds: 2,
      baths: 2,
      area: 950,
      description: "Affordable and cozy 2-bedroom apartment perfect for small families.",
      amenities: ["Generator", "Parking", "AC"],
    },
    {
      id: 5,
      title: "Modern Condo in Bashundhara",
      location: "Bashundhara R/A",
      price: 8000000,
      beds: 3,
      baths: 3,
      area: 1500,
      description: "Stylish and modern condo with all essential facilities and a secure environment.",
      amenities: ["Security", "Elevator", "Gym", "Furnished"],
    },
    {
      id: 6,
      title: "Elegant Flat in Uttara",
      location: "Uttara Sector 4",
      price: 7000000,
      beds: 3,
      baths: 2,
      area: 1350,
      description: "Elegant and well-ventilated flat located close to schools and shopping centers.",
      amenities: ["Security", "Parking", "AC", "Generator"],
    }
  ]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      {/* Header section with background image */}
      <div className="relative overflow-hidden h-96">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-100 to-blue-200">
          <BuildingRow />
          <div className="absolute bottom-8 left-0 right-0 opacity-70">
            <BuildingRow />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/30"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            PROPERTY FOR SALE
          </motion.h1>

          <motion.p
            className="text-gray-700 text-lg md:text-xl max-w-2xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Discover exclusive properties tailored to your lifestyle
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-12 md:h-16">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,53.3C672,43,768,21,864,16C960,11,1056,21,1152,32C1248,43,1344,53,1392,58.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Properties Section */}
      <div className="container mx-auto px-4 py-16 relative z-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative w-20 h-20">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
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
