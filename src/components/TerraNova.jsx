import React, { useState } from "react";
import { propertyData, getPropertyRecommendations } from "../Dataset/Dataset"; // Make sure the path is correct
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const TerraNova = () => {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");
  const [userPreference, setUserPreference] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Function to process the Gemini output
  const processGeminiOutput = (output) => {
    try {
      // First try to find JSON inside markdown code blocks
      let jsonMatch = output.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      let jsonText = jsonMatch ? jsonMatch[1] : output;

      // Clean up any non-JSON content
      if (!jsonMatch) {
        jsonMatch = output.match(/\{[\s\S]*\}/);
        jsonText = jsonMatch ? jsonMatch[0] : output;
      }

      // Parse the extracted text as JSON
      const parsedData = JSON.parse(jsonText.trim());

      // Convert property names to match your dataset expectations
      const formattedData = {
        price: parsedData.price ? parseInt(parsedData.price) : null,
        propertyType: parsedData.propertyType || null,
        propertySize: parsedData.propertySize
          ? parseFloat(parsedData.propertySize)
          : null,
        numberOfBedrooms: parsedData.numberOfBedrooms
          ? parseInt(parsedData.numberOfBedrooms)
          : null,
        numberOfBathrooms: parsedData.numberOfBathrooms
          ? parseInt(parsedData.numberOfBathrooms)
          : null,
        amenities: Array.isArray(parsedData.amenities)
          ? parsedData.amenities
          : [],
        location: parsedData.location || null,
        otherDetails: parsedData.otherDetails || null,
      };

      return formattedData;
    } catch (error) {
      console.error("Error parsing Gemini output:", error);
      return null;
    }
  };

  const generateContent = async () => {
    try {
      // Similar to your GeminiComponent implementation
      const genAI = new GoogleGenerativeAI(
        "AIzaSyD95GqpWFRZZQ7nzMNXB21XkhqTiHzICaI"
      );
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-lite",
      });

      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ];

      const fullPrompt = `Extract the following information from the user's natural language description of their desired property. If a field is not explicitly mentioned, leave it as null, unless it is a detail that falls under 'OtherDetails'. If price is mentioned vaguely such as "around" a specific number then use that exact number. Remember price MUST be a integer value. Return the result as a JSON object with the following structure:

      {
  "price": "integer or null",
  "propertyType": "string or null",
  "propertySize": "decimal or null",
  "numberOfBedrooms": "integer or null",
  "numberOfBathrooms": "integer or null",
  "amenities": "array of strings or null",
  "location": "string or null",
  "otherDetails": "string or null"
      }
      
      User's Description: ${userInput}
      
      Output:`;

      const parts = [{ text: fullPrompt }];
      const resultGemini = await model.generateContent({
        contents: [{ parts }],
        generationConfig,
        safetySettings,
      });

      const response = resultGemini.response;
      const responseText = response.text();
      setResult(responseText);

      // Process the output to get user preferences
      const processedData = processGeminiOutput(responseText);
      if (processedData) {
        setUserPreference(processedData);

        // Generate recommendations based on the processed data
        const recommendations = getPropertyRecommendations(processedData);
        setRecommendations(recommendations);
        setShowRecommendations(true);
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setResult("Error generating content. Please check the console.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">TerraNova</h1>
          <p className="text-lg text-blue-700">
            AI-Powered Real Estate Advisor
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-3xl w-full border border-blue-100 mx-auto mb-8">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-900">
            Describe Your Dream Property
          </h2>

          <div className="mb-6">
            <label
              htmlFor="prompt-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Requirements
            </label>
            <textarea
              id="prompt-input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your detailed property requirements here... (e.g., 'I'm looking for a 3-bedroom house with a backyard in Lakewood, budget around $600,000')"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
              style={{ minHeight: "100px", maxHeight: "300px" }}
            />
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={generateContent}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Find My Dream Home
            </button>
          </div>

          {result && (
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Your Requirements (Parsed):
              </h3>
              <div className="overflow-auto max-h-[300px] bg-white p-4 rounded-md border border-gray-200">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                  {JSON.stringify(userPreference, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {showRecommendations && recommendations.length > 0 && (
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl w-full border border-blue-100 mx-auto my-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">
              AI-Powered Property Recommendations
            </h2>

            <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-blue-700 text-sm">
                Based on your preferences, our AI has found these properties
                that might interest you. The match percentage indicates how
                closely each property aligns with your requirements.
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
                      ${property.price.toLocaleString()}
                    </p>

                    <div className="flex flex-wrap mb-4">
                      <div className="flex items-center mr-4 mb-2">
                        <span className="text-gray-700 text-sm">
                          {property.propertySize} sq ft
                        </span>
                      </div>

                      <div className="flex items-center mr-4 mb-2">
                        <span className="text-gray-700 text-sm">
                          {property.numberOfBedrooms} bd
                        </span>
                      </div>

                      <div className="flex items-center mb-2">
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
                        {property.amenities
                          .slice(0, 3)
                          .map((amenity, index) => (
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
          </div>
        )}
      </div>
    </div>
  );
};

export default TerraNova;
