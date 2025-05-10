import React from 'react';
import { motion } from "framer-motion";

const PageTemplate = ({ title, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{title}</h1>
        {children}
      </div>
    </motion.div>
  );
};

export default PageTemplate;