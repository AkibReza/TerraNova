// filepath: /real-estate-project/real-estate-project/src/components/layout/Footer.jsx
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 border-t border-gray-200 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <div className="text-3xl font-bold text-blue-600">TerraNova</div>
          </div>
          <div className="mt-6 md:mt-0">
            <div className="flex justify-center md:justify-end space-x-6">
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Mail size={24} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Properties
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/for-sale"
                  className="text-base text-gray-600 hover:text-blue-600 transition-colors"
                >
                  For Sale
                </Link>
              </li>
              <li>
                <Link
                  to="/for-rent"
                  className="text-base text-gray-600 hover:text-blue-600 transition-colors"
                >
                  For Rent
                </Link>
              </li>
              <li>
                <Link
                  to="/new-projects"
                  className="text-base text-gray-600 hover:text-blue-600 transition-colors"
                >
                  New Projects
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/about-us"
                  className="text-base text-gray-600 hover:text-blue-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/our-team"
                  className="text-base text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-base text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/guides"
                  className="text-base text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-base text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="text-base text-gray-600 hover:text-blue-600 transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-base text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-base text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  className="text-base text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500">
            &copy; {currentYear} TerraNova. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
