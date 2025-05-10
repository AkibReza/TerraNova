import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  HelpCircle,
  Home,
  FileText,
  Calculator,
  Handshake,
  ShieldCheck
} from "lucide-react";

const FAQs = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0); // First question open by default

  const faqItems = [
    {
      id: 1,
      question: "How can I avoid property scams in Bangladesh?",
      answer: "Always deal with registered brokers and verify all documents personally.",
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />
    },
    {
      id: 2,
      question: "How do I verify a property's legal documents?",
      answer: "Check the original deed (Porcha) and mutation certificate at the local land office.",
      icon: <FileText className="w-5 h-5 text-blue-600" />
    },
    {
      id: 3,
      question: "What are typical property registration fees?",
      answer: "Typically 2% of property value plus stamp duties and VAT.",
      icon: <Calculator className="w-5 h-5 text-blue-600" />
    },
    {
      id: 4,
      question: "How can I negotiate better property prices?",
      answer: "Research recent sales and be willing to walk away if needed.",
      icon: <Handshake className="w-5 h-5 text-blue-600" />
    },
    {
      id: 5,
      question: "What to check before buying an apartment?",
      answer: "Verify developer's track record and all RAJUK approvals.",
      icon: <Home className="w-5 h-5 text-blue-600" />
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleContactUs = () => {
    navigate("/contact");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-12 pb-8 max-w-4xl">
        {/* Only Added This Blue Headline */}
        <h1 className="text-3xl font-bold text-blue-600 mb-8">Frequently Asked Questions</h1>

        {/* Everything Below Remains Exactly The Same */}
        <div className="space-y-6 mb-12">
          {faqItems.map((item, index) => (
            <motion.div 
              key={item.id}
              className="p-6 rounded-lg border border-gray-200 shadow-sm bg-white"
            >
              <div 
                className="flex items-start cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-blue-600 mb-2">{item.question}</h2>
                  {activeIndex === index && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-600"
                    >
                      {item.answer}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center border border-blue-100">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-blue-600 mb-3">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            Contact our expert team for personalized assistance with your property needs.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContactUs}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg"
          >
            Contact Us
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default FAQs;