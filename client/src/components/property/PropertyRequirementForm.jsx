import { useState } from "react";
import { motion } from "framer-motion";

const PropertyRequirementForm = ({ onSubmit, isProcessing }) => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      onSubmit(userInput);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 w-full"
    >
      <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-900">
        Describe Your Dream Property
      </h2>

      <form onSubmit={handleSubmit}>
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
            type="submit"
            disabled={isProcessing}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md flex items-center"
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Find My Dream Home"
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PropertyRequirementForm;
