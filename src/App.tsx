import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import LandingPage from "./pages/LandingPage.js";
import ExplorePage from "./pages/ExplorePage.js";
import DetailsPage from "./pages/DetailsPage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import AddPropertyPage from "./pages/AddPropertyPage.js";
import ManagePropertiesPage from "./pages/ManagePropertiesPage.js";
import AboutPage from "./pages/AboutPage.js";
import ContactPage from "./pages/ContactPage.js";
import { HelpCircle, ArrowLeft } from "lucide-react";

// Premium 404 Fallback Page
function NotFoundPage() {
  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center p-4 text-left">
      <div className="bg-white border border-slate-200 p-8 sm:p-12 rounded-3xl shadow-sm max-w-md w-full text-center space-y-6">
        <HelpCircle size={48} className="text-gold-500 mx-auto animate-bounce" />
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Portfolio Not Found</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            The luxury estate portfolio or page path you requested could not be resolved by our concierge router.
          </p>
        </div>
        <Link
          to="/"
          className="px-6 py-3.5 bg-primary-500 hover:bg-gold-500 text-white font-extrabold text-sm rounded-xl transition-all inline-flex items-center justify-center gap-2 shadow"
        >
          <ArrowLeft size={16} /> Return to Sanctum
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-gold-500 selection:text-white">
        {/* Sticky Navbar */}
        <Navbar />

        {/* Core Layout Main Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/properties/:id" element={<DetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/items/add" element={<AddPropertyPage />} />
            <Route path="/items/manage" element={<ManagePropertiesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}
