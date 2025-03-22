import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
//import { Play, Flag, RotateCcw, Moon, Sun } from "lucide-react"; // Lucide icons
import "./App.css";
import Header from "./components/Header";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Table from "./components/Table";
import Squares from "./components/Squares";
import Cubes from "./components/Cubes";
import SquareRoots from "./components/SquareRoots";
import CubeRoots from "./components/CubeRoots";
import Addition from "./components/Addition";
import Subtraction from "./components/Subtraction";
import Multiplication from "./components/Multiplication";
import Contact from "./components/Contact";
import About from "./components/About";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { Tabs, TabPanel } from "./components/Tabs";
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("https://quickquant-backend.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user details", err);
        localStorage.removeItem("token");
      }
    }
  };

  const handleAuthSuccess = (token) => {
    localStorage.setItem("token", token);
    fetchUserDetails();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const cards = [
    { title: "Tables", link: "/tables", icon: "table_chart" },
    { title: "Squares", link: "/squares", icon: "exposure" },
    { title: "Cubes", link: "/cubes", icon: "view_in_ar" },
    { title: "Square Roots", link: "/square-roots", icon: "functions" },
    { title: "Cube Roots", link: "/cube-roots", icon: "calculate" },
    { title: "Addition", link: "/addition", icon: "add" },
    { title: "Subtraction", link: "/subtraction", icon: "remove" },
    { title: "Multiplication", link: "/multiplication", icon: "close" },
  ];

  const quantitativeCards = [
    { title: "Percentage", link: "/percentage", icon: "percent" },
    { title: "Ratio & Proportion", link: "/ratio", icon: "linear_scale" },
    { title: "Profit & Loss", link: "/profit", icon: "attach_money" },
    { title: "Time & Work", link: "/time-work", icon: "timer" },
  ];

  const reasoningCards = [
    { title: "Syllogisms", link: "/syllogisms", icon: "psychology" },
    { title: "Analogies", link: "/analogies", icon: "compare" },
    { title: "Pattern Recognition", link: "/patterns", icon: "grid_view" },
    { title: "Sudoku", link: "/sudoku", icon: "view_module" },
  ];

  const englishCards = [
    { title: "Vocabulary", link: "/vocabulary", icon: "menu_book" },
    { title: "Grammar", link: "/grammar", icon: "edit_note" },
    { title: "Reading Comprehension", link: "/reading", icon: "chrome_reader_mode" },
    { title: "Synonyms & Antonyms", link: "/synonyms", icon: "swap_horiz" },
  ];

  const generalAwarenessCards = [
    { title: "Current Affairs", link: "/current", icon: "event_note" },
    { title: "History", link: "/history", icon: "history_edu" },
    { title: "Geography", link: "/geography", icon: "public" },
    { title: "Science", link: "/science", icon: "science" },
  ];

  const allCards = [
    ...cards,
    ...quantitativeCards,
    ...reasoningCards,
    ...englishCards,
    ...generalAwarenessCards,
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length >= 1) {
      const filtered = allCards
        .filter((card) =>
          card.title.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 3); // Show only top 3 suggestions
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <GoogleOAuthProvider clientId="634169635881-acs90s27ep4r01p540rbndb801qn76ao.apps.googleusercontent.com">
      <BrowserRouter basename="/quickquant">
        <div className={`App ${darkMode ? "dark-mode" : ""}`}>
          <Header
            user={user}
            searchQuery={searchQuery}
            setSearchQuery={handleSearch}
            suggestions={suggestions}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <main className="container flex-grow-1 py-4">
            <Routes>
              <Route
                path="/"
                element={
                  <Tabs>
                    <TabPanel label="Speed-Up Calculation">
                      <div className="row">
                        {cards.map((card, index) => (
                          <Card key={index} title={card.title} link={card.link} icon={card.icon} darkMode={darkMode} />
                        ))}
                      </div>
                    </TabPanel>
                    <TabPanel label="Quantitative Aptitude">
                      <div className="row">
                        {quantitativeCards.map((card, index) => (
                          <Card key={index} title={card.title} link={card.link} icon={card.icon} darkMode={darkMode} />
                        ))}
                      </div>
                    </TabPanel>
                    <TabPanel label="Reasoning">
                      <div className="row">
                        {reasoningCards.map((card, index) => (
                          <Card key={index} title={card.title} link={card.link} icon={card.icon} darkMode={darkMode} />
                        ))}
                      </div>
                    </TabPanel>
                    <TabPanel label="English Comprehension">
                      <div className="row">
                        {englishCards.map((card, index) => (
                          <Card key={index} title={card.title} link={card.link} icon={card.icon} darkMode={darkMode} />
                        ))}
                      </div>
                    </TabPanel>
                    <TabPanel label="General Awareness">
                      <div className="row">
                        {generalAwarenessCards.map((card, index) => (
                          <Card key={index} title={card.title} link={card.link} icon={card.icon} darkMode={darkMode} />
                        ))}
                      </div>
                    </TabPanel>
                  </Tabs>
                }
              />
              <Route path="/auth" element={<Auth onAuthSuccess={handleAuthSuccess} />} />
              <Route path="/tables" element={<Table darkMode={darkMode} />} />
              <Route path="/squares" element={<Squares darkMode={darkMode} />} />
              <Route path="/cubes" element={<Cubes darkMode={darkMode} />} />
              <Route path="/square-roots" element={<SquareRoots darkMode={darkMode} />} />
              <Route path="/cube-roots" element={<CubeRoots darkMode={darkMode} />} />
              <Route path="/addition" element={<Addition darkMode={darkMode} />} />
              <Route path="/subtraction" element={<Subtraction darkMode={darkMode} />} />
              <Route path="/multiplication" element={<Multiplication darkMode={darkMode} />} />
              <Route path="/contact" element={<Contact darkMode={darkMode} />} />
              <Route path="/about" element={<About darkMode={darkMode} />} />
              <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} darkMode={darkMode} />} />
              <Route path="/forgot-password" element={<ForgotPassword darkMode={darkMode} />} />
              <Route path="/reset-password" element={<ResetPassword darkMode={darkMode} />} />
            </Routes>
          </main>
          <Footer darkMode={darkMode} />
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;