import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Home, Building, FileText, Check, ChevronDown, ChevronUp } from 'lucide-react';

const TermsOfService = () => {
  const [expandedSections, setExpandedSections] = useState({
    acceptance: true,
    services: true,
    privacy: true,
    intellectual: true,
    liability: true,
    termination: true
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  // Improved accordion animation properties
  const accordionVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        opacity: { duration: 0.2, delay: 0.1 }
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        opacity: { duration: 0.2 }
      }
    }
  };

  // Improved chevron animation properties
  const chevronVariants = {
    up: {
      rotate: 180,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    down: {
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const AccordionSection = ({ id, title, icon: Icon, children }) => {
    // Determine if this section should have smaller text
    const isSmaller = ["acceptance", "privacy", "intellectual", "termination"].includes(id);
    
    return (
    <motion.div 
      className="border-b border-gray-200 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button 
        onClick={() => toggleSection(id)}
        className={`flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-indigo-600 transition-colors ${isSmaller ? "text-sm" : ""}`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`${isSmaller ? "h-4 w-4" : "h-5 w-5"} text-indigo-500`} />
          <span>{title}</span>
        </div>
        <motion.div
          initial={false}
          animate={expandedSections[id] ? "up" : "down"}
          variants={chevronVariants}
        >
          <ChevronDown className={`${isSmaller ? "h-4 w-4" : "h-5 w-5"} text-gray-500`} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {expandedSections[id] && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={accordionVariants}
            className="overflow-hidden"
          >
            <div className={`mt-3 text-gray-600 pl-8 ${isSmaller ? "text-sm" : ""}`}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    );
  };

  // Current date for the last updated field
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Improved window animation properties
  const windowAnimationVariants = {
    maximize: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4
      }
    },
    minimize: {
      scale: 0.95,
      opacity: 0.8,
      y: 10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Page Header - Empty for clean look */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {/* Header content removed as requested */}
      </header>
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial="minimize"
          animate="maximize"
          variants={windowAnimationVariants}
        >
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-8 md:px-10">
            <div className="flex items-center justify-between">
              <motion.div {...fadeInUp}>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Terms of Service</h1>
                <p className="mt-2 text-indigo-100">Last Updated: {lastUpdated}</p>
              </motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  delay: 0.2 
                }}
              >
                <Shield className="h-12 w-12 text-white opacity-80" />
              </motion.div>
            </div>
          </div>
          
          <div className="px-6 py-6 md:px-10 md:py-8">
            <motion.div {...fadeInUp} className="mb-6 text-gray-600">
              <p>
                Please read these Terms of Service carefully before using our real estate recommendation 
                application that uses natural language processing and machine learning algorithms to 
                provide personalized property recommendations.
              </p>
            </motion.div>
            
            <div className="space-y-1">
              <AccordionSection id="acceptance" title="1. Acceptance of Terms" icon={Check}>
                <p className="mb-3">
                  By accessing or using our real estate recommendation application, you agree to be bound by these Terms of Service.
                  If you disagree with any part of the terms, you may not access the service.
                </p>
                <p>
                  We reserve the right to update or change our Terms of Service at any time without prior notice.
                  Your continued use of the service after we post any modifications to the Terms of Service will constitute
                  your acknowledgment of the modifications and your consent to abide by the modified terms.
                </p>
              </AccordionSection>
              
              <AccordionSection id="services" title="2. Description of Services" icon={Building}>
                <p className="mb-3">
                  Our application provides real estate recommendations based on natural language processing and K-nearest neighbor
                  algorithms. User queries are processed by machine learning models to match with properties in our database.
                </p>
                <p className="mb-3">
                  The recommendations provided are for informational purposes only and do not constitute real estate, financial, 
                  or legal advice. We make no warranty regarding the accuracy, completeness, or relevance of the recommendations.
                </p>
                <p>
                  We reserve the right to modify, suspend, or discontinue the service at any time without notice. We shall not be
                  liable to you or any third party for any modification, suspension, or discontinuation of the service.
                </p>
              </AccordionSection>
              
              <AccordionSection id="privacy" title="3. Privacy Policy" icon={Shield}>
                <p className="mb-3">
                  Our Privacy Policy, available on our website, explains how we collect, use, and protect your personal data. 
                  By using our service, you consent to our collection and use of personal information as described in our Privacy Policy.
                </p>
                <p>
                  We will store your search history, preferences, and interactions with our application to improve our recommendation
                  algorithm and provide personalized experiences. You can request deletion of your data according to applicable laws.
                </p>
              </AccordionSection>
              
              <AccordionSection id="intellectual" title="4. Intellectual Property" icon={FileText}>
                <p className="mb-3">
                  The Service and its original content, features, and functionality are owned by our company and are protected by 
                  international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p>
                  You may not copy, modify, create derivative works, publicly display, publicly perform, republish, or transmit any
                  of the material obtained through our Service, or exploit the Service in any way not expressly authorized.
                </p>
              </AccordionSection>
              
              <AccordionSection id="liability" title="5. Limitation of Liability" icon={Home}>
                <p className="mb-3">
                  In no event shall our company, its directors, employees, partners, agents, suppliers, or affiliates be liable for any
                  indirect, incidental, special, consequential, or punitive damages resulting from your use of our Service.
                </p>
                <p className="mb-3">
                  We do not guarantee that real estate information provided through our Service is accurate, complete, or current.
                  Property information should be independently verified before making any real estate decisions.
                </p>
                <p>
                  Our application uses artificial intelligence for recommendations, which may occasionally produce unexpected results.
                  We are not responsible for any decisions made based on these recommendations.
                </p>
              </AccordionSection>
              
              <AccordionSection id="termination" title="6. Termination" icon={Check}>
                <p className="mb-3">
                  We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason
                  including, without limitation, breach of these Terms of Service.
                </p>
                <p>
                  All provisions of the Terms which by their nature should survive termination shall survive termination, including, 
                  without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </AccordionSection>
            </div>
            
            <motion.div 
              className="mt-8 pt-6 border-t border-gray-200 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                delay: 0.3, 
                duration: 0.5,
                ease: "easeOut" 
              }}
            >
              <p className="text-sm text-gray-500">
                By using our Service, you acknowledge that you have read and understand these Terms of Service
                and agree to be bound by them.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default TermsOfService;