import { useState } from "react";
import { getPropertyRecommendations } from "../utils/propertyUtils";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const usePropertyService = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [userPreference, setUserPreference] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  // Process the Gemini output
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

      // Convert property names to match dataset expectations
      // Only include values that are explicitly provided and meaningful
      const result = {};

      // Only add properties that have meaningful values
      if (parsedData.price !== null && parsedData.price !== undefined) {
        result.price = parseInt(parsedData.price);
      }

      if (
        parsedData.propertyType !== null &&
        parsedData.propertyType !== undefined &&
        parsedData.propertyType.trim() !== ""
      ) {
        result.propertyType = parsedData.propertyType;
      }

      if (
        parsedData.propertySize !== null &&
        parsedData.propertySize !== undefined
      ) {
        result.propertySize = parseFloat(parsedData.propertySize);
      }

      if (
        parsedData.numberOfBedrooms !== null &&
        parsedData.numberOfBedrooms !== undefined
      ) {
        result.numberOfBedrooms = parseInt(parsedData.numberOfBedrooms);
      }

      if (
        parsedData.numberOfBathrooms !== null &&
        parsedData.numberOfBathrooms !== undefined
      ) {
        result.numberOfBathrooms = parseInt(parsedData.numberOfBathrooms);
      }

      if (
        Array.isArray(parsedData.amenities) &&
        parsedData.amenities.length > 0
      ) {
        result.amenities = parsedData.amenities.map((amenity) =>
          typeof amenity === "string"
            ? amenity.charAt(0).toUpperCase() + amenity.slice(1).toLowerCase()
            : amenity
        );
      }

      if (
        parsedData.location !== null &&
        parsedData.location !== undefined &&
        parsedData.location.trim() !== ""
      ) {
        result.location = parsedData.location;
      }

      if (
        parsedData.otherDetails !== null &&
        parsedData.otherDetails !== undefined &&
        parsedData.otherDetails.trim() !== ""
      ) {
        result.otherDetails = parsedData.otherDetails;
      }

      if (
        parsedData.transactionType !== null &&
        parsedData.transactionType !== undefined
      ) {
        const transType = parsedData.transactionType.toLowerCase();
        if (transType === "rent" || transType === "sale") {
          result.transactionType =
            transType.charAt(0).toUpperCase() +
            transType.slice(1).toLowerCase();
        }
      }

      return result;
    } catch (error) {
      console.error("Error parsing Gemini output:", error);
      return null;
    }
  };
  // Process user input and get recommendations
  const processUserInput = async (userInput) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Initialize Gemini API
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

      const fullPrompt = `Extract the following information from the user's natural language description of their desired property. 

      IMPORTANT: Only extract information that is EXPLICITLY mentioned. If a field is not mentioned, do NOT include that field in the JSON response at all.
      
      For example:
      - If the user only says "Banani", then the JSON should only have {"location": "Banani"} and no other fields.
      - If they mention "3 bedroom apartment", include only "propertyType" and "numberOfBedrooms".
      
      Return the result as a JSON object with ONLY the mentioned fields:
      
      {
        "price": [only if mentioned - integer],
        "propertyType": [only if mentioned - string],
        "propertySize": [only if mentioned - decimal],
        "numberOfBedrooms": [only if mentioned - integer],
        "numberOfBathrooms": [only if mentioned - integer],
        "amenities": [only if mentioned - array of strings],
        "location": [only if mentioned - string],
        "otherDetails": [only if mentioned - string],
        "transactionType": [only if mentioned - "Rent" or "Sale"]
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

      // Process the output to get user preferences
      const processedData = processGeminiOutput(responseText);

      if (processedData) {
        setUserPreference(processedData);

        // Generate recommendations based on the processed data
        const recommendations = getPropertyRecommendations(processedData);
        setRecommendations(recommendations);
        return { preferences: processedData, recommendations };
      }

      return null;
    } catch (error) {
      console.error("Error generating content:", error);
      setError("Failed to process your request. Please try again later.");
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processUserInput,
    isProcessing,
    userPreference,
    recommendations,
    error,
  };
};
