import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Mail, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const socialIcons = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "#" },
    { icon: <Mail size={20} />, label: "Email", href: "#" }
  ];

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="md:flex md:items-center md:justify-between">
          <motion.div 
            variants={itemVariants}
            className="flex justify-center md:justify-start"
          >
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              TerraNova
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="mt-6 md:mt-0"
          >
            <div className="flex justify-center md:justify-end space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200 text-gray-600 hover:text-blue-600"
                >
                  {social.icon}
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Properties
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/for-sale"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-base">For Sale</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/for-rent"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-base">For Rent</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/new-projects"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-base">New Projects</span>
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/about-us"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-base">About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/our-team"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-base">Our Team</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-base">Careers</span>
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/guides"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-base">Guides</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-base">Blog</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-base">FAQs</span>
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-base">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-base">Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-base">Cookie Policy</span>
                </Link>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-12 border-t border-gray-200 pt-8"
        >
          <p className="text-center text-gray-500 text-sm">
            &copy; {currentYear} TerraNova. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;