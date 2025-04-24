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
      return {
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
        transactionType: parsedData.transactionType || null,
      };
    } catch (error) {
      console.error("Error parsing Gemini output:", error);
      setError("Failed to parse AI response. Please try again.");
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

      const fullPrompt = `Extract the following information from the user's natural language description of their desired property. If a field is not explicitly mentioned, leave it as null, unless it is a detail that falls under 'OtherDetails'. If price is mentioned vaguely such as "around" a specific number then use that exact number. Remember price MUST be a integer value. 

Also detect if the user is looking for a property for rent or for sale and set the transactionType field accordingly.

Return the result as a JSON object with the following structure:

{
  "price": "integer or null",
  "propertyType": "string or null",
  "propertySize": "decimal or null",
  "numberOfBedrooms": "integer or null",
  "numberOfBathrooms": "integer or null",
  "amenities": "array of strings or null",
  "location": "string or null",
  "otherDetails": "string or null",
  "transactionType": "Rent or Sale"
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
