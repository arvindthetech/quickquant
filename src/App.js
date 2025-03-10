import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
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
import { Tabs, TabPanel } from "./components/Tabs";
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

  // Combine all cards for search functionality
  const allCards = [
    ...cards,
    ...quantitativeCards,
    ...reasoningCards,
    ...englishCards,
    ...generalAwarenessCards,
  ];

  // Filter suggestions based on search query
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
    <BrowserRouter basename="/quickquant">
      <div className="d-flex flex-column min-vh-100">
        <Header
          user={user}
          searchQuery={searchQuery}
          setSearchQuery={handleSearch}
          suggestions={suggestions}
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
                        <Card key={index} title={card.title} link={card.link} icon={card.icon} />
                      ))}
                    </div>
                  </TabPanel>
                  <TabPanel label="Quantitative Aptitude">
                    <div className="row">
                      {quantitativeCards.map((card, index) => (
                        <Card key={index} title={card.title} link={card.link} icon={card.icon} />
                      ))}
                    </div>
                  </TabPanel>
                  <TabPanel label="Reasoning">
                    <div className="row">
                      {reasoningCards.map((card, index) => (
                        <Card key={index} title={card.title} link={card.link} icon={card.icon} />
                      ))}
                    </div>
                  </TabPanel>
                  <TabPanel label="English Comprehension">
                    <div className="row">
                      {englishCards.map((card, index) => (
                        <Card key={index} title={card.title} link={card.link} icon={card.icon} />
                      ))}
                    </div>
                  </TabPanel>
                  <TabPanel label="General Awareness">
                    <div className="row">
                      {generalAwarenessCards.map((card, index) => (
                        <Card key={index} title={card.title} link={card.link} icon={card.icon} />
                      ))}
                    </div>
                  </TabPanel>
                </Tabs>
              }
            />
            <Route path="/auth" element={<Auth onAuthSuccess={handleAuthSuccess} />} />
            <Route path="/tables" element={<Table />} />
            <Route path="/squares" element={<Squares />} />
            <Route path="/cubes" element={<Cubes />} />
            <Route path="/square-roots" element={<SquareRoots />} />
            <Route path="/cube-roots" element={<CubeRoots />} />
            <Route path="/addition" element={<Addition />} />
            <Route path="/subtraction" element={<Subtraction />} />
            <Route path="/multiplication" element={<Multiplication />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
