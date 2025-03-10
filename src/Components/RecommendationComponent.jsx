import React from "react";

import image1 from "../../assets/img/1.jpg"; // Import image1
import image2 from "../../assets/img/2.jpg"; // Import image1
import image3 from "../../assets/img/3.jpg"; // Import image1

const RecommendationComponent = () => {
  // Dummy data for recommendations
  const recommendations = [
    {
      id: 1,
      matchPercentage: 95,
      image: image1,
      title: "Luxury Waterfront Condo",
      price: "$850,000",
      location: "Downtown Riverside, 90210",
      propertyType: "Condominium",
      propertySize: 1650,
      bedrooms: 3,
      bathrooms: 2,
      amenities: ["Pool", "Gym", "24/7 Security", "Parking"],
      description:
        "Modern waterfront property with panoramic city views and premium finishes throughout.",
    },
    {
      id: 2,
      matchPercentage: 87,
      image: image2,
      title: "Charming Suburban Family Home",
      price: "$565,000",
      location: "Maple Heights, 90120",
      propertyType: "Single Family",
      propertySize: 2100,
      bedrooms: 4,
      bathrooms: 2.5,
      amenities: ["Backyard", "Garage", "Fireplace", "Updated Kitchen"],
      description:
        "Spacious family home in a quiet neighborhood with excellent schools nearby.",
    },
    {
      id: 3,
      matchPercentage: 79,
      image: image3,
      title: "Modern Urban Loft",
      price: "$425,000",
      location: "Arts District, 90015",
      propertyType: "Loft",
      propertySize: 1200,
      bedrooms: 1,
      bathrooms: 1.5,
      amenities: [
        "High Ceilings",
        "Industrial Finishes",
        "Rooftop Access",
        "Pet Friendly",
      ],
      description:
        "Converted industrial space with character, perfect for the urban professional.",
    },
  ];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-5xl w-full border border-blue-100 mx-auto my-8">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-900">
        Recommended Properties
      </h2>

      <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <p className="text-blue-700 text-sm">
          Based on your preferences, we've found these properties that might
          interest you. The match percentage indicates how closely each property
          aligns with your requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 bg-blue-600 text-white font-bold py-1 px-3 rounded-full text-sm">
                {property.matchPercentage}% Match
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {property.title}
              </h3>
              <p className="text-blue-600 font-bold text-lg mb-3">
                {property.price}
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
                    {property.bedrooms} bd
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
                    {property.bathrooms} ba
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                {property.description}
              </p>

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

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-lg transition duration-300">
          View More Properties
        </button>
      </div>
    </div>
  );
};

export default RecommendationComponent;
