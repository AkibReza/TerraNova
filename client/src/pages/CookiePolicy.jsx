import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cookie, ChevronDown, ChevronUp, Shield, Database, Server, Globe, AlertCircle, Clock } from 'lucide-react';

const CookiePolicy = () => {
  const [expandedSections, setExpandedSections] = useState({
    whatAreCookies: true,
    howWeUse: true,
    typesOfCookies: true,
    thirdParty: true,
    managingCookies: true,
    changes: true
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

  const AccordionSection = ({ id, title, icon: Icon, children }) => {
    return (
      <motion.div 
        className="border-b border-gray-200 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button 
          onClick={() => toggleSection(id)}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-indigo-600 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-indigo-500" />
            <span>{title}</span>
          </div>
          {expandedSections[id] ? 
            <ChevronUp className="h-5 w-5 text-gray-500" /> : 
            <ChevronDown className="h-5 w-5 text-gray-500" />
          }
        </button>
        
        {expandedSections[id] && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 text-gray-600 pl-8"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    );
  };

  // Current date for the last updated field
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-8 md:px-10">
            <div className="flex items-center justify-between">
              <motion.div {...fadeInUp}>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Cookie Policy</h1>
                <p className="mt-2 text-indigo-100">Last Updated: {lastUpdated}</p>
              </motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Cookie className="h-12 w-12 text-white opacity-80" />
              </motion.div>
            </div>
          </div>
          
          <div className="px-6 py-6 md:px-10 md:py-8">
            <motion.div {...fadeInUp} className="mb-6 text-gray-600">
              <p>
                This Cookie Policy explains how our real estate recommendation application uses cookies and similar 
                technologies to recognize you when you visit our website. It explains what these technologies are,
                why we use them, and your rights to control our use of them.
              </p>
            </motion.div>
            
            <div className="space-y-1">
              <AccordionSection id="whatAreCookies" title="What Are Cookies" icon={Cookie}>
                <p className="mb-3">
                  Cookies are small data files that are placed on your computer or mobile device when you visit a website.
                  Cookies are widely used by website owners to make their websites work more efficiently and to provide
                  reporting information.
                </p>
                <p>
                  Cookies set by the website owner (in this case, our real estate recommendation application) are called 
                  "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies".
                  Third-party cookies enable third-party features or functionality to be provided on or through the website
                  (such as advertising, interactive content, and analytics).
                </p>
              </AccordionSection>
              
              <AccordionSection id="howWeUse" title="How We Use Cookies" icon={Database}>
                <p className="mb-3">
                  Our real estate recommendation application uses cookies for several purposes. Some cookies are required for 
                  technical reasons for our website to operate. We refer to these as "essential" or "strictly necessary" cookies.
                </p>
                <p className="mb-3">
                  When you use our natural language processing feature to search for properties, we use cookies to:
                </p>
                <ul className="list-disc pl-5 mb-3 space-y-2">
                  <li>Remember your search queries to improve our AI recommendations</li>
                  <li>Process your natural language inputs through our machine learning models</li>
                  <li>Store temporary data structures needed for our K-nearest neighbor algorithm</li>
                  <li>Track which properties you've viewed to refine future recommendations</li>
                </ul>
                <p>
                  We also use cookies to understand how visitors interact with our website, which allows us to improve
                  the functionality and user experience of our real estate recommendation service.
                </p>
              </AccordionSection>
              
              <AccordionSection id="typesOfCookies" title="Types of Cookies We Use" icon={Server}>
                <p className="mb-3">Our application uses the following types of cookies:</p>
                
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Essential Cookies</h3>
                  <p>
                    These cookies are strictly necessary to provide you with services available through our website and to use
                    some of its features, such as access to secure areas. Without these cookies, our AI-based recommendation 
                    system cannot function properly.
                  </p>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Performance Cookies</h3>
                  <p>
                    These cookies collect information that is used to help us understand how our website is being used or how
                    effective our marketing campaigns are. They also help us customize our website for you and optimize the 
                    machine learning algorithms that power our property recommendations.
                  </p>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Functionality Cookies</h3>
                  <p>
                    These cookies allow our website to remember choices you make (such as your preferred location for property
                    searches, your language preference, or your login details) and provide enhanced, more personalized features.
                    These cookies help our natural language processing feature understand your preferences better.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Targeting Cookies</h3>
                  <p>
                    These cookies record your visit to our website, the pages you have visited, and the links you have followed.
                    They are used to deliver advertising that is more relevant to your interests based on your past searches and
                    interactions with our real estate recommendation platform.
                  </p>
                </div>
              </AccordionSection>
              
              <AccordionSection id="thirdParty" title="Third-Party Cookies" icon={Globe}>
                <p className="mb-3">
                  In addition to our own cookies, we may also use various third-party cookies to report usage statistics of our
                  real estate recommendation service, deliver advertisements, and so on.
                </p>
                <p className="mb-3">
                  These may include:
                </p>
                <ul className="list-disc pl-5 mb-3 space-y-2">
                  <li>Analytics providers (such as Google Analytics) to help us understand how visitors interact with our website</li>
                  <li>Machine learning service providers that help power our natural language processing capabilities</li>
                  <li>Real estate data providers that supply property information for our K-nearest neighbor algorithm</li>
                  <li>Advertising networks that require the data to select and serve relevant advertisements to you and others</li>
                </ul>
                <p>
                  Please note that these third parties may have their own privacy policies that govern how they use the information
                  they collect through cookies they set.
                </p>
              </AccordionSection>
              
              <AccordionSection id="managingCookies" title="Managing Your Cookies" icon={AlertCircle}>
                <p className="mb-3">
                  Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability
                  of websites to set cookies, you may worsen your overall user experience and impact the functionality of our natural
                  language processing and recommendation algorithms.
                </p>
                <p className="mb-3">
                  To opt-out of having your website activity tracked by Google Analytics across all websites, you can install the
                  Google Analytics opt-out browser add-on.
                </p>
                <p className="mb-3">
                  If you want to delete cookies that are already on your device, please refer to the instructions for your browser,
                  as the process varies by browser.
                </p>
                <p>
                  Please note that if you choose to refuse cookies, our real estate recommendation application's machine learning
                  features may not be able to learn from your preferences or provide you with personalized property recommendations.
                </p>
              </AccordionSection>
              
              <AccordionSection id="changes" title="Changes to this Cookie Policy" icon={Clock}>
                <p className="mb-3">
                  We may update this Cookie Policy from time to time to reflect changes to the cookies we use or for other operational,
                  legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies.
                </p>
                <p>
                  When we post changes to this Cookie Policy, we will update the "Last Updated" date at the top of this policy.
                  If we make significant changes to this policy, we will notify you either through an email or a prominent notice
                  on our website.
                </p>
              </AccordionSection>
            </div>
            
            <motion.div 
              className="mt-8 pt-6 border-t border-gray-200 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="text-sm text-gray-500">
                By continuing to use our real estate recommendation application, you consent to our use of cookies as described in this Cookie Policy.
              </p>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Shield className="h-5 w-5 mr-2" />
                Update Cookie Preferences
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CookiePolicy;