import React, { useState, useEffect } from "react";
import { getPropertyRecommendations } from "../Datasets/Dataset"; // Import the KNN dataset function

const KNNRecommendationComponent = ({ userPreference }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userPreference) {
      // Get recommendations based on user preference
      const results = getPropertyRecommendations(userPreference);
      setRecommendations(results);
      setLoading(false);
    }
  }, [userPreference]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl w-full border border-blue-100 mx-auto my-8">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <div className="w-full h-48 bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-blue-800 font-semibold">
                  Property Image
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-blue-600 text-white font-bold py-1 px-3 rounded-full text-sm">
                {property.matchPercentage}% Match
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {property.propertyType} in {property.location}
              </h3>
              <p className="text-blue-600 font-bold text-lg mb-3">
                {property.priceRange}
              </p>

              <div className="flex items-center mb-3">
                <svg
                  className="w-5 h-5 text-gray-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <p className="text-gray-600 text-sm">{property.location}</p>
              </div>

              <div className="flex flex-wrap mb-4">
                <div className="flex items-center mr-4 mb-2">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                  <span className="text-gray-700 text-sm">
                    {property.propertyType}
                  </span>
                </div>

                <div className="flex items-center mr-4 mb-2">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                    ></path>
                  </svg>
                  <span className="text-gray-700 text-sm">
                    {property.propertySize} sq ft
                  </span>
                </div>

                <div className="flex items-center mr-4 mb-2">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                  <span className="text-gray-700 text-sm">
                    {property.numberOfBedrooms} bd
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span className="text-gray-700 text-sm">
                    {property.numberOfBathrooms} ba
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                {property.otherDetails}
              </p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Amenities:
                </h4>
                <div className="flex flex-wrap">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full mr-2 mb-2"
                    >
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full mr-2 mb-2">
                      +{property.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-500">No matching properties found.</p>
        </div>
      ) : (
        <div className="mt-8 flex justify-center">
          <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-lg transition duration-300">
            View More Properties
          </button>
        </div>
      )}
    </div>
  );
};

export default KNNRecommendationComponent;
