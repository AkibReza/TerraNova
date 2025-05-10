import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  PenSquare,
  Building,
  Home,
  TrendingUp,
  Landmark,
  Handshake,
  ShieldCheck
} from "lucide-react";

const Blogs = () => {
  const navigate = useNavigate();

  const blogCards = [
    {
      id: 1,
      title: "Bangladesh Real Estate Market Outlook 2024",
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      description: "Analysis of emerging trends and investment opportunities in Dhaka's property market.",
      date: "May 15, 2024",
      isFeatured: true
    },
    {
      id: 2,
      title: "First-Time Home Buyer's Checklist",
      icon: <Home className="w-5 h-5 text-blue-600" />,
      description: "Essential steps every new buyer should follow when purchasing property in Bangladesh.",
      date: "April 28, 2024"
    },
    {
      id: 3,
      title: "Legal Framework for Property Transactions",
      icon: <Landmark className="w-5 h-5 text-blue-600" />,
      description: "Understanding Bangladesh's property laws and registration processes.",
      date: "April 10, 2024"
    },
    {
      id: 4,
      title: "Apartment vs. Land: Investment Comparison",
      icon: <Building className="w-5 h-5 text-blue-600" />,
      description: "Pros and cons of different real estate investment options in urban Bangladesh.",
      date: "March 22, 2024"
    },
    {
      id: 5,
      title: "Negotiation Tactics for Better Deals",
      icon: <Handshake className="w-5 h-5 text-blue-600" />,
      description: "Expert strategies to secure the best prices in property negotiations.",
      date: "March 5, 2024"
    },
    {
      id: 6,
      title: "Avoiding Property Scams in Bangladesh",
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      description: "Red flags and verification processes to ensure safe transactions.",
      date: "February 18, 2024"
    }
  ];

  const handleSignUp = () => {
    navigate("/auth"); // Same navigation pattern as your FAQs page
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-12 pb-8 max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">Real Estate Blogs</h1>
          <p className="text-lg text-gray-600">
            Expert insights and analysis on Bangladesh's property market trends and investment strategies.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="space-y-4">
          {blogCards.map((blog) => (
            <motion.div 
              key={blog.id}
              whileHover={{ y: -2 }}
              className={`p-6 rounded-lg border border-gray-200 shadow-sm ${blog.isFeatured ? "bg-blue-50" : "bg-white"}`}
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-lg mr-4 ${blog.isFeatured ? "bg-blue-100" : "bg-gray-100"}`}>
                  {blog.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-blue-600 mb-2">{blog.title}</h2>
                    {blog.isFeatured && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{blog.description}</p>
                  <p className="text-sm text-gray-500">{blog.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section - Updated to match your working pattern */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center border border-blue-100">
          <div className="flex justify-center mb-4">
            <PenSquare className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-blue-600 mb-3">Stay Updated With Our Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Get the latest market insights and property advice delivered to your inbox.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignUp}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg"
          >
            Sign Up
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Blogs;