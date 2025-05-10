import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Home as HomeIcon,
  FileText,
  Calculator,
  Landmark,
  Handshake,
  ShieldCheck
} from "lucide-react";

const Guides = () => {
  const navigate = useNavigate();

  const guideCards = [
    {
      id: 1,
      title: "First-Time Buyer Guide",
      icon: <HomeIcon className="w-5 h-5 text-blue-600" />,
      description: "Everything you need to know about purchasing your first property in Bangladesh.",
      isHeading: true
    },
    {
      id: 2,
      title: "Tax & Regulations",
      icon: <Landmark className="w-5 h-5 text-blue-600" />,
      description: "Understand property taxes, registration fees, and government regulations."
    },
    {
      id: 3,
      title: "Legal Documentation",
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      description: "Complete checklist of legal documents required for property transactions.",
      isHeading: true
    },
    {
      id: 4,
      title: "Negotiation Strategies",
      icon: <Handshake className="w-5 h-5 text-blue-600" />,
      description: "Expert tips for negotiating the best deal on your property purchase."
    },
    {
      id: 5,
      title: "Mortgage Calculator",
      icon: <Calculator className="w-5 h-5 text-blue-600" />,
      description: "Calculate your monthly payments and find the best mortgage options.",
      isHeading: true
    },
    {
      id: 6,
      title: "Property Verification",
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      description: "How to verify property authenticity and avoid fraudulent listings."
    }
  ];

  const handleFindProperties = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-12 pb-8 max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">Property Guides</h1>
          <p className="text-lg text-gray-600">
            Expert resources to help you navigate Bangladeshi's real estate market with confidence.
          </p>
        </div>

        {/* Guide Cards in Boxes */}
        <div className="space-y-4">
          {guideCards.map((guide) => (
            <motion.div 
              key={guide.id}
              whileHover={{ y: -2 }}
              className={`p-6 rounded-lg border border-gray-200 shadow-sm ${guide.isHeading ? "bg-blue-50" : "bg-white"}`}
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-lg mr-4 ${guide.isHeading ? "bg-blue-100" : "bg-gray-100"}`}>
                  {guide.icon}
                </div>
                <div>
                  {guide.isHeading ? (
                    <h2 className="text-xl font-semibold text-blue-600 mb-2">{guide.title}</h2>
                  ) : (
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">{guide.title}</h3>
                  )}
                  <p className="text-gray-600">{guide.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">Need Personalized Advice?</h2>
          <p className="text-gray-600 mb-4">
            Our AI-powered recommendation system can analyze your specific needs and provide
            customized property suggestions based on your preferences and budget.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFindProperties}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
          >
            Try Our Property Finder
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Guides;