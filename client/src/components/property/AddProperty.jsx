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
    latitude: "",
    longitude: "",
    otherDetails: "",
    transactionType: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const propertyTypes = [
    "Apartment",
    "Single-Family",
    "Condominium",
    "Townhouse",
    "Duplex",
    "Triplex",
    "Multi-family",
    "Bungalow",
    "Mansion",
    "Villa",
    "Cottage",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Handle amenities array properly
      const amenitiesArray = formData.amenities
        ? formData.amenities.split(",").map((item) => item.trim())
        : [];

      // Create a property object
      const propertyData = {
        price: Number(formData.price),
        propertyType: formData.propertyType,
        propertySize: Number(formData.propertySize),
        numberOfBedrooms: Number(formData.numberOfBedrooms),
        numberOfBathrooms: Number(formData.numberOfBathrooms),
        amenities: amenitiesArray,
        location: formData.location,
        latitude: formData.latitude ? Number(formData.latitude) : null,
        longitude: formData.longitude ? Number(formData.longitude) : null,
        otherDetails: formData.otherDetails,
        transactionType: formData.transactionType,
      };

      let response;

      if (formData.image) {
        // If we have an image, use FormData approach
        const formDataToSend = new FormData();

        // Append each property field individually rather than as a JSON string
        Object.keys(propertyData).forEach((key) => {
          if (key === "amenities") {
            // For arrays, we can append with the same key multiple times
            amenitiesArray.forEach((amenity) => {
              formDataToSend.append("amenities[]", amenity);
            });
          } else {
            formDataToSend.append(key, propertyData[key]);
          }
        });

        // Append the image file
        formDataToSend.append("image", formData.image);

        response = await fetch(
          "https://terranova.onrender.com/api/properties",
          {
            method: "POST",
            body: formDataToSend,
          }
        );
      } else {
        // If no image, use JSON approach which might be more reliable
        response = await fetch(
          "https://terranova.onrender.com/api/properties",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(propertyData),
          }
        );
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add property");
      }

      const result = await response.json();
      console.log("Success:", result);

      setIsSubmitting(false);
      showNotification("Property added successfully!", "success");
      navigate("/TerraNova/propertyList");
    } catch (error) {
      console.error("Error adding property:", error);
      setIsSubmitting(false);
      showNotification(error.message || "Failed to add property", "error");
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
      className="max-w-4xl mx-auto mt-20 mb-20"
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
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Property Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price and Transaction Type */}
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
                    className="pl-8 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <select
                  name="transactionType"
                  value={formData.transactionType}
                  onChange={handleChange}
                  className="pl-4 pr-8 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Rent">Rent</option>
                  <option value="Sale">Sale</option>
                </select>
              </div>

              {/* Property Type and Location */}
              <div>
                <label className="flex items-center text-gray-700 mb-2">
                  <Home size={18} className="mr-2 text-blue-600" />
                  <span>Property Type</span>
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="pl-4 pr-8 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
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
                  className="pl-4 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter location"
                  required
                />
              </div>

              {/* Latitude and Longitude */}
              <div>
                <label className="flex items-center text-gray-700 mb-2">
                  <MapPin size={18} className="mr-2 text-blue-600" />
                  <span>Latitude</span>
                </label>
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="pl-4 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter latitude"
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 mb-2">
                  <MapPin size={18} className="mr-2 text-blue-600" />
                  <span>Longitude</span>
                </label>
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="pl-4 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter longitude"
                />
              </div>

              {/* Property Details */}
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
                  className="pl-4 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="pl-4 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="pl-4 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Size in square feet"
                  required
                />
              </div>
            </div>

            {/* Amenities and Description */}
            <div className="space-y-6">
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
                  className="pl-4 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Swimming Pool, Gymnasium, Security"
                  required
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 mb-2">
                  <span>Property Description</span>
                </label>
                <textarea
                  name="otherDetails"
                  value={formData.otherDetails}
                  onChange={handleChange}
                  rows="6"
                  className="pl-4 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Provide detailed information about the property..."
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="flex items-center text-gray-700 mb-2">
                  <PlusCircle size={18} className="mr-2 text-blue-600" />
                  <span>Property Image</span>
                </label>
                <div className="mt-1">
                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                      <div className="text-center">
                        <PlusCircle
                          size={48}
                          className="mx-auto text-gray-400 mb-4"
                        />
                        <div className="text-gray-600 mb-4">
                          Drag and drop your image here, or
                        </div>
                        <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Browse Files
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="space-x-4">
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setFormData({ ...formData, image: null });
                            }}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Remove
                          </button>
                          <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Change
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <motion.button
                type="submit"
                className={`bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium flex items-center ${
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
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddProperty;
