import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  DollarSign,
  MapPin,
  Bed,
  Bath,
  Maximize,
  PlusCircle,
  ArrowLeft,
  Tag,
} from "lucide-react";

const AddProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    price: "",
    propertyType: "Apartment",
    propertySize: "",
    numberOfBedrooms: "",
    numberOfBathrooms: "",
    amenities: "",
    location: "",
    otherDetails: "",
    transactionType: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Convert amenities string to array
    const processedData = {
      ...formData,
      amenities: formData.amenities.split(",").map((item) => item.trim()),
      price: Number(formData.price),
      propertySize: Number(formData.propertySize),
      numberOfBedrooms: Number(formData.numberOfBedrooms),
      numberOfBathrooms: Number(formData.numberOfBathrooms),
    };

    try {
      const response = await fetch("http://localhost:5000/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData),
      });

      if (response.ok) {
        setIsSubmitting(false);
        // Show success notification
        showNotification("Property added successfully!", "success");
        navigate("/TerraNova/propertyList");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      setIsSubmitting(false);
      showNotification("Failed to add property", "error");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showNotification = (message, type) => {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white max-w-md z-50 transition-opacity duration-300 opacity-0`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.classList.remove("opacity-0");
    }, 10);

    // Hide and remove notification
    setTimeout(() => {
      notification.classList.add("opacity-0");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const progressBarWidth = `${(currentStep / totalSteps) * 100}%`;

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-10 mb-20"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Add New Property</h2>
            <Home size={28} />
          </div>
          <p className="mt-2 opacity-80">
            Enter the details of your property listing
          </p>

          {/* Progress bar */}
          <div className="mt-6 bg-white/20 h-2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: progressBarWidth }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {currentStep === 1 && (
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-gray-700 mb-2">
                    <DollarSign size={18} className="mr-2 text-blue-600" />
                    <span>Price</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="pl-8 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter price"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-gray-700 mb-2">
                    <Tag size={18} className="mr-2 text-blue-600" />
                    <span>Transaction Type</span>
                  </label>
                  <div className="relative">
                    <select
                      name="transactionType"
                      value={formData.transactionType}
                      onChange={handleChange}
                      className="pl-4 pr-8 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Rent">Rent</option>
                      <option value="Sale">Sale</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-gray-700 mb-2">
                    <Home size={18} className="mr-2 text-blue-600" />
                    <span>Property Type</span>
                  </label>
                  <div className="relative">
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="pl-4 pr-8 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                      required
                    >
                      <option value="Apartment">Apartment</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-gray-700 mb-2">
                    <MapPin size={18} className="mr-2 text-blue-600" />
                    <span>Location</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="pl-4 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter location"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Next
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Property Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="flex items-center text-gray-700 mb-2">
                    <Bed size={18} className="mr-2 text-blue-600" />
                    <span>Bedrooms</span>
                  </label>
                  <input
                    type="number"
                    name="numberOfBedrooms"
                    value={formData.numberOfBedrooms}
                    onChange={handleChange}
                    className="pl-4 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="No. of bedrooms"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-gray-700 mb-2">
                    <Bath size={18} className="mr-2 text-blue-600" />
                    <span>Bathrooms</span>
                  </label>
                  <input
                    type="number"
                    name="numberOfBathrooms"
                    value={formData.numberOfBathrooms}
                    onChange={handleChange}
                    className="pl-4 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="No. of bathrooms"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-gray-700 mb-2">
                    <Maximize size={18} className="mr-2 text-blue-600" />
                    <span>Size (sqft)</span>
                  </label>
                  <input
                    type="number"
                    name="propertySize"
                    value={formData.propertySize}
                    onChange={handleChange}
                    className="pl-4 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Size in square feet"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center text-gray-700 mb-2">
                  <PlusCircle size={18} className="mr-2 text-blue-600" />
                  <span>Amenities (comma-separated)</span>
                </label>
                <input
                  type="text"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  className="pl-4 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., Swimming Pool, Gymnasium, Security"
                  required
                />
              </div>

              <div className="flex justify-between mt-6">
                <motion.button
                  type="button"
                  onClick={prevStep}
                  className="border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Back
                </motion.button>

                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Next
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Additional Information
              </h3>

              <div>
                <label className="flex items-center text-gray-700 mb-2">
                  <span>Property Description</span>
                </label>
                <textarea
                  name="otherDetails"
                  value={formData.otherDetails}
                  onChange={handleChange}
                  rows="6"
                  className="pl-4 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Provide detailed information about the property..."
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">
                  Ready to submit?
                </h4>
                <p className="text-blue-600 text-sm">
                  Please review all the information before submitting. Once
                  submitted, the property will be added to your listings.
                </p>
              </div>

              <div className="flex justify-between mt-6">
                <motion.button
                  type="button"
                  onClick={prevStep}
                  className="border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Back
                </motion.button>

                <motion.button
                  type="submit"
                  className={`bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium flex items-center transition-colors ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isSubmitting ? (
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
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Property
                      <PlusCircle size={18} className="ml-2" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default AddProperty;
