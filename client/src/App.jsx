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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/TerraNova/" element={<Home />} />
            <Route path="/TerraNova/insights" element={<InsightsAnalytics />} />
            <Route path="/TerraNova/best-offers" element={<BestOffers />} />
            <Route path="/TerraNova/favorites" element={<Favorites />} />
            <Route path="/TerraNova/contact" element={<Contact />} />
            <Route path="/TerraNova/auth" element={<Auth />} />
            <Route path="/TerraNova/propertyList" element={<PropertyList />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
