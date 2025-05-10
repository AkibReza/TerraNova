import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Database, ChevronDown, ChevronUp, Lock, Bell, Server, Users } from 'lucide-react';

const PrivacyPolicy = () => {
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    collection: true,
    usage: true,
    sharing: true,
    storage: true,
    rights: true,
    cookies: true,
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
    // Determine if this section should have smaller text
    const isSmaller = ["overview", "sharing", "cookies", "changes"].includes(id);
    
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
          {expandedSections[id] ? 
            <ChevronUp className={`${isSmaller ? "h-4 w-4" : "h-5 w-5"} text-gray-500`} /> : 
            <ChevronDown className={`${isSmaller ? "h-4 w-4" : "h-5 w-5"} text-gray-500`} />
          }
        </button>
        
        {expandedSections[id] && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`mt-3 text-gray-600 pl-8 ${isSmaller ? "text-sm" : ""}`}
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
      {/* Page Header - Empty for clean look */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {/* Header content removed as requested */}
      </header>
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-500 px-6 py-8 md:px-10">
            <div className="flex items-center justify-between">
              <motion.div {...fadeInUp}>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Privacy Policy</h1>
                <p className="mt-2 text-blue-100">Last Updated: {lastUpdated}</p>
              </motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Lock className="h-12 w-12 text-white opacity-80" />
              </motion.div>
            </div>
          </div>
          
          <div className="px-6 py-6 md:px-10 md:py-8">
            <motion.div {...fadeInUp} className="mb-6 text-gray-600">
              <p>
                This Privacy Policy explains how we collect, use, store, protect, and share your personal information 
                through our real estate recommendation application using natural language processing and machine learning algorithms.
                By using our Service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </motion.div>
            
            <div className="space-y-1">
              <AccordionSection id="overview" title="1. Privacy Policy Overview" icon={FileText}>
                <p className="mb-3">
                  This Privacy Policy applies to all users of our real estate recommendation application. We are committed to 
                  protecting your privacy and handling your data with transparency and care.
                </p>
                <p>
                  We process your personal data to provide and improve our Service. By using the Service, you consent to the 
                  collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, 
                  terms used have the same meanings as in our Terms of Service.
                </p>
              </AccordionSection>
              
              <AccordionSection id="collection" title="2. Information Collection" icon={Database}>
                <p className="mb-3">
                  <strong>Personal Information:</strong> We collect information that you provide directly to us, including but not limited to: 
                  name, email address, phone number, location preferences, property type preferences, budget ranges, and other real estate 
                  search criteria.
                </p>
                <p className="mb-3">
                  <strong>Usage Data:</strong> We collect data about how you interact with our application, including:
                </p>
                <ul className="list-disc pl-5 mb-3">
                  <li>Search queries and natural language inputs</li>
                  <li>Properties viewed or saved</li>
                  <li>Time spent viewing specific properties</li>
                  <li>Features of the application you use</li>
                  <li>Device information and IP address</li>
                </ul>
                <p>
                  <strong>Natural Language Processing:</strong> Our application processes the text you input to generate property 
                  recommendations. These natural language inputs are stored and analyzed using machine learning algorithms to 
                  improve our recommendation engine.
                </p>
              </AccordionSection>
              
              <AccordionSection id="usage" title="3. How We Use Your Information" icon={Server}>
                <p className="mb-3">
                  <strong>Primary Uses:</strong> We use the collected information to:
                </p>
                <ul className="list-disc pl-5 mb-3">
                  <li>Process and analyze your natural language queries</li>
                  <li>Generate personalized real estate recommendations using our K-nearest neighbor algorithm</li>
                  <li>Create and maintain your account</li>
                  <li>Send notifications about properties matching your criteria</li>
                  <li>Respond to your inquiries and provide customer support</li>
                </ul>
                <p className="mb-3">
                  <strong>Machine Learning Improvements:</strong> We use aggregated and anonymized data to train and improve our 
                  natural language processing models and recommendation algorithms, enhancing the accuracy and relevance of 
                  property recommendations for all users.
                </p>
                <p>
                  <strong>Communications:</strong> With your consent, we may send you marketing communications about our services, 
                  special offers, and property updates. You can opt out of these communications at any time.
                </p>
              </AccordionSection>
              
              <AccordionSection id="sharing" title="4. Information Sharing and Disclosure" icon={Users}>
                <p className="mb-3">
                  We do not sell your personal information to third parties. We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-5 mb-3">
                  <li><strong>Service Providers:</strong> We share information with trusted third parties who assist us in operating our 
                  application, conducting our business, or servicing you.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to 
                  valid requests by public authorities.</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or asset sale, your personal information 
                  may be transferred as a business asset.</li>
                </ul>
                <p>
                  <strong>Aggregated Data:</strong> We may share aggregated, anonymized data with partners, such as real estate agencies 
                  or property developers, for market analysis and trend identification purposes.
                </p>
              </AccordionSection>
              
              <AccordionSection id="storage" title="5. Data Security and Storage" icon={Lock}>
                <p className="mb-3">
                  <strong>Data Security:</strong> We implement appropriate technical and organizational measures to protect the security of 
                  your personal information, including encryption, access controls, and regular security assessments.
                </p>
                <p className="mb-3">
                  <strong>Data Retention:</strong> We retain your personal information only for as long as necessary to fulfill the purposes 
                  for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                </p>
                <p className="mb-3">
                  <strong>Machine Learning Data:</strong> Data used to train our natural language processing and K-nearest neighbor 
                  algorithms may be retained indefinitely in an anonymized format, separated from personal identifiers.
                </p>
                <p>
                  <strong>Data Storage Location:</strong> Your information may be transferred to, and maintained on, computers located 
                  outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ 
                  from those in your jurisdiction.
                </p>
              </AccordionSection>
              
              <AccordionSection id="rights" title="6. Your Data Rights" icon={Shield}>
                <p className="mb-3">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-5 mb-3">
                  <li><strong>Access:</strong> Right to request copies of your personal information</li>
                  <li><strong>Correction:</strong> Right to request that we correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Right to request that we delete your personal information</li>
                  <li><strong>Restriction:</strong> Right to request that we restrict the processing of your information</li>
                  <li><strong>Portability:</strong> Right to receive your personal information in a structured, machine-readable format</li>
                  <li><strong>Objection:</strong> Right to object to our processing of your personal information</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us using the contact information provided at the end of this Privacy Policy. 
                  We may ask you to verify your identity before responding to such requests.
                </p>
              </AccordionSection>
              
              <AccordionSection id="cookies" title="7. Cookies and Tracking Technologies" icon={Bell}>
                <p className="mb-3">
                  Our application uses cookies and similar tracking technologies to track activity and store certain information. 
                  Cookies are files with a small amount of data that may include an anonymous unique identifier. 
                </p>
                <p className="mb-3">
                  <strong>Types of Cookies We Use:</strong>
                </p>
                <ul className="list-disc pl-5 mb-3">
                  <li><strong>Essential cookies:</strong> Required for the operation of our application</li>
                  <li><strong>Preference cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Analytics cookies:</strong> Help us understand how you use our application</li>
                  <li><strong>Marketing cookies:</strong> Track your browsing habits to deliver targeted advertising</li>
                </ul>
                <p>
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, 
                  if you do not accept cookies, you may not be able to use some portions of our Service.
                </p>
              </AccordionSection>
              
              <AccordionSection id="changes" title="8. Changes to This Privacy Policy" icon={FileText}>
                <p className="mb-3">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                  Privacy Policy on this page and updating the "Last Updated" date.
                </p>
                <p className="mb-3">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy 
                  are effective when they are posted on this page.
                </p>
                <p>
                  By continuing to use our Service after changes to the Privacy Policy, you acknowledge and agree to the updated terms.
                </p>
              </AccordionSection>
            </div>
            
            <motion.div 
              className="mt-8 pt-6 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="text-lg font-medium text-gray-900">Contact Us</h3>
              <p className="mt-2 text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-1 text-gray-600">
                Email: privacy@yourrealestateapp.com<br />
                Address: 123 Main Street, Suite 456, Anytown, ST 12345
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;