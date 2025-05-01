import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-t border-gray-200 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <div className="text-2xl font-bold text-blue-600">TerraNova</div>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="text-center md:text-right text-gray-500">
              &copy; {currentYear} TerraNova. All rights reserved.
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Properties
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-blue-600"
                >
                  For Sale
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-blue-600"
                >
                  For Rent
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-blue-600"
                >
                  New Projects
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-blue-600"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-blue-600"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-blue-600"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-blue-600"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-blue-600"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-blue-600"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-blue-600"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-blue-600"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-blue-600"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
