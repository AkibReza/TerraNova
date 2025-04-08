import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const GeminiComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const apiKey = "AIzaSyD95GqpWFRZZQ7nzMNXB21XkhqTiHzICaI"; // Replace with your actual API key

  const generateContent = async ({ onOutputChange }) => {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
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

      const fullPrompt = `Extract the following information from the user's natural language description of their desired property. If a field is not explicitly mentioned, leave it as null, unless it is a detail that falls under 'OtherDetails'. Return the result as a JSON object with the following structure:

      {
        "PriceRange": "string or null",
        "PropertyType": "string or null",
        "PropertySize": "decimal or null",
        "NumberOfBedrooms": "integer or null",
        "NumberOfBathrooms": "integer or null",
        "Amenities": "array of strings or null",
        "Location": "string or null",
        "OtherDetails": "string or null"
      }
      
      User's Description: ${prompt}
      
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
      if (onOutputChange) {
        onOutputChange(responseText);
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setResult("Error generating content. Please check the console.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-3xl w-full border border-blue-100">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-900">
          TerraNova: Real Estate Advisor
        </h2>

        <div className="mb-6">
          <label
            htmlFor="prompt-input"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your Prompt
          </label>
          <textarea
            id="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your detailed prompt here..."
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
            Generate Insights
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Result:</h3>
          <div className="overflow-auto max-h-[500px] bg-white p-4 rounded-md border border-gray-200">
            <div className="prose prose-sm max-w-none text-gray-800">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {result || "Your generated content will appear here..."}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiComponent;
