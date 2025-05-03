import { useState } from "react";
import { motion } from "framer-motion";
import PropertyRequirementForm from "../components/property/PropertyRequirementForm";
import PropertyList from "../components/property/PropertyList";
import { usePropertyService } from "../hooks/usePropertyService";

const Home = () => {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const {
    processUserInput,
    isProcessing,
    userPreference,
    recommendations,
    error,
  } = usePropertyService();

  const handleFormSubmit = async (userInput) => {
    const result = await processUserInput(userInput);
    if (result) {
      setShowRecommendations(true);
    }
  };

  return (
    <div className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 pt-8"
        >
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            Find Your Dream Home with AI
          </h1>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto">
            Simply describe what you're looking for in natural language, and our
            AI will match you with properties that best fit your requirements.
          </p>
        </motion.div>

        {/* Property Requirement Form */}
        <div className="max-w-3xl mx-auto mb-12">
          <PropertyRequirementForm
            onSubmit={handleFormSubmit}
            isProcessing={isProcessing}
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          {userPreference && !showRecommendations && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Your Requirements:
              </h3>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap bg-white p-3 rounded border border-gray-200">
                {JSON.stringify(userPreference, null, 2)}
              </pre>
            </motion.div>
          )}
        </div>

        {/* Property Recommendations */}
        {showRecommendations && (
          <div className="max-w-6xl mx-auto mb-12">
            <PropertyList recommendations={recommendations} />
          </div>
        )}

        {/* Features Section */}
        {!showRecommendations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-6xl mx-auto mb-20 px-4"
          >
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
              Why Choose TerraNova?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center text-blue-800 mb-2">
                  AI-Powered Matching
                </h3>
                <p className="text-gray-600 text-center">
                  Our advanced AI understands your natural language requirements
                  and finds the perfect match.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center text-blue-800 mb-2">
                  Save Time
                </h3>
                <p className="text-gray-600 text-center">
                  Skip the endless browsing. Get personalized property
                  recommendations instantly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center text-blue-800 mb-2">
                  Trusted Partners
                </h3>
                <p className="text-gray-600 text-center">
                  All properties in our database are from verified agencies and
                  trusted sellers.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
