import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import InsightsAnalytics from "./pages/InsightsAnalytics";
import BestOffers from "./pages/BestOffers";
import Favorites from "./pages/Favorites";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import { AuthProvider } from "./contexts/AuthContext";
import PropertyList from "./components/property/PropertyList";
import AddProperty from "./components/property/AddProperty";
import ForSale from "./components/pages/ForSale";
import AboutUs from "./components/pages/AboutUs";
import Footer from "./components/layout/Footer";
import ForRent from "./components/pages/ForRent";
import NewProjects from "./components/pages/NewProjects";
import OurTeam from "./components/pages/OurTeam";
import Careers from "./components/pages/Careers";
import Guides from "./components/pages/Guides";
import Blog from "./components/pages/Blog";
import FAQs from "./components/pages/FAQs";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import TermsOfService from "./components/pages/TermsOfService";
import CookiePolicy from "./components/pages/CookiePolicy";
import ScrollToTop from "./components/utils/ScrollToTop";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <AuthProvider>
      <Router basename="/TerraNova/">
        <ScrollToTop />
        <Navbar />
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/insights" element={<InsightsAnalytics />} />
              <Route path="/best-offers" element={<BestOffers />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/add-property" element={<AddProperty />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/for-sale" element={<ForSale />} />
              <Route path="/for-rent" element={<ForRent />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/new-projects" element={<NewProjects />} />
              <Route path="/our-team" element={<OurTeam />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
