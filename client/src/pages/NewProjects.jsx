import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  Check, 
  Calendar, 
  Code2, 
  LineChart, 
  BrainCircuit, 
  MapPin, 
  Building2, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";

const fadeIn = {
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

const VersionCard = ({ version, date, features, isCurrent, isUpcoming }) => {
  const [isExpanded, setIsExpanded] = useState(isCurrent);
  
  const statusColors = {
    current: "bg-green-100 text-green-800 border-green-300",
    upcoming: "bg-blue-100 text-blue-800 border-blue-300",
    past: "bg-gray-100 text-gray-800 border-gray-300"
  };
  
  const status = isUpcoming ? "upcoming" : isCurrent ? "current" : "past";
  
  return (
    <motion.div 
      className={`border rounded-lg shadow-sm mb-6 overflow-hidden ${isUpcoming ? "border-blue-200" : isCurrent ? "border-green-200" : "border-gray-200"}`}
      variants={fadeIn}
      layout
    >
      <div 
        className={`p-4 flex justify-between items-center cursor-pointer ${isExpanded ? "border-b" : ""}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <motion.div 
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${isCurrent ? "bg-gradient-to-br from-green-400 to-green-500" : isUpcoming ? "bg-gradient-to-br from-blue-400 to-blue-500" : "bg-gradient-to-br from-gray-300 to-gray-400"}`}
            whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.5 } }}
          >
            {isUpcoming ? (
              <Clock size={20} className="text-white" />
            ) : (
              <Check size={20} className="text-white" />
            )}
          </motion.div>
          
          <div>
            <h3 className="font-bold text-lg">{version}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={14} className="mr-1" />
              <span>{date}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.span 
            className={`text-xs px-3 py-1 rounded-full border ${statusColors[status]}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isUpcoming ? "✨ Upcoming" : isCurrent ? "🚀 Current" : "🏆 Released"}
          </motion.span>
          {isExpanded ? (
            <ChevronUp size={20} className="text-gray-500" />
          ) : (
            <ChevronDown size={20} className="text-gray-500" />
          )}
        </div>
      </div>
      
      {isExpanded && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={`p-4 ${isUpcoming ? "bg-blue-50" : isCurrent ? "bg-green-50" : "bg-gray-50"}`}
        >
          <h4 className="font-semibold mb-3 text-gray-700">Features:</h4>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <motion.div 
                  className={`mt-1 p-2 rounded-full ${isUpcoming ? "bg-blue-100" : isCurrent ? "bg-green-100" : "bg-gray-100"}`}
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {feature.icon}
                </motion.div>
                <div>
                  <p className="font-medium">{feature.title}</p>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default function NewProjects() {
  const versions = [
    {
      version: "Version 3.0 (Upcoming)",
      date: "Expected Q3 2025",
      isUpcoming: true,
      isCurrent: false,
      features: [
        {
          icon: <BrainCircuit size={18} className="text-blue-600" />,
          title: "Advanced Sentiment Analysis",
          description: "Real-time analysis of user satisfaction and property sentiment from reviews and social media."
        },
        {
          icon: <LineChart size={18} className="text-blue-600" />,
          title: "Predictive Market Trends",
          description: "AI-powered predictions for property value changes based on historical data and market conditions."
        },
        {
          icon: <MapPin size={18} className="text-blue-600" />,
          title: "Neighborhood Compatibility Score",
          description: "Match lifestyle preferences with neighborhood characteristics for personalized recommendations."
        }
      ]
    },
    {
      version: "Version 2.5",
      date: "April 2025",
      isUpcoming: false,
      isCurrent: true,
      features: [
        {
          icon: <Code2 size={18} className="text-green-600" />,
          title: "Enhanced NLP Processing",
          description: "Improved language understanding for more accurate property requirement extraction."
        },
        {
          icon: <Building2 size={18} className="text-green-600" />,
          title: "Expanded Property Database",
          description: "Integration with 50+ new real estate sources for broader recommendation options."
        },
        {
          icon: <MapPin size={18} className="text-green-600" />,
          title: "Location-based Preferences",
          description: "Fine-tuned location matching using advanced geographical datasets and commute analysis."
        }
      ]
    },
    {
      version: "Version 2.0",
      date: "January 2025",
      isUpcoming: false,
      isCurrent: false,
      features: [
        {
          icon: <BrainCircuit size={18} className="text-gray-600" />,
          title: "K-Nearest Neighbor Implementation",
          description: "Algorithm to find closest property matches based on user preferences and available inventory."
        },
        {
          icon: <Code2 size={18} className="text-gray-600" />,
          title: "Natural Language Query System",
          description: "Convert user text inputs into structured property search parameters."
        },
        {
          icon: <LineChart size={18} className="text-gray-600" />,
          title: "Personalized Recommendation Metrics",
          description: "Custom scoring system for property recommendations based on user priorities."
        }
      ]
    },
    {
      version: "Version 1.0",
      date: "October 2024",
      isUpcoming: false,
      isCurrent: false,
      features: [
        {
          icon: <Building2 size={18} className="text-gray-600" />,
          title: "Basic Property Search",
          description: "Simple filtering system for property listings based on standard parameters."
        },
        {
          icon: <MapPin size={18} className="text-gray-600" />,
          title: "Location Filtering",
          description: "Search properties by city, neighborhood, and zip code."
        },
        {
          icon: <Calendar size={18} className="text-gray-600" />,
          title: "Availability Tracking",
          description: "Real-time updates on property availability and listing status."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto p-6 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-blue-600 mb-4">NEW PROJECTS</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text font-medium">Explore the evolution</span> of our real estate recommendation platform powered by natural language processing and K-nearest neighbor algorithms.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-blue-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ boxShadow: "0 10px 25px rgba(59, 130, 246, 0.1)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 text-white p-3 rounded-lg shadow-md shadow-blue-200 rotate-3">
              <Code2 size={24} />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Version History</h2>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600">
              Track our development journey from a simple property search tool to an advanced AI-powered real estate recommendation engine.
            </p>
          </div>
          
          <motion.div 
            className="relative"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {versions.map((version, index) => (
              <VersionCard 
                key={index}
                version={version.version}
                date={version.date}
                features={version.features}
                isCurrent={version.isCurrent}
                isUpcoming={version.isUpcoming}
              />
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <p className="text-gray-500 text-sm italic">
              The development roadmap is subject to change based on user feedback and market needs.
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="text-center"
        >
          <motion.a 
            href="/" 
            className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Check Current Version <ArrowRight size={16} className="ml-1" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}