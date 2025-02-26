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
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [user, setUser] = useState(null); // State to store user details

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("https://quickquant-backend.onrender.com/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data); // Set user details
        } catch (err) {
          console.error("Failed to fetch user details", err);
          localStorage.removeItem("token"); // Remove invalid token
        }
      }
    };

    fetchUser();
  }, []);

  // Handle login/signup success
  const handleAuthSuccess = (token) => {
    localStorage.setItem("token", token); // Save token to localStorage
    fetchUserDetails(); // Fetch user details
  };

  // Fetch user details after login/signup
  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("https://quickquant-backend.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data); // Set user details
      } catch (err) {
        console.error("Failed to fetch user details", err);
      }
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setUser(null); // Clear user state
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

  return (
    <BrowserRouter basename="/quickquant">
      <div className="d-flex flex-column min-vh-100">
        {/* Pass user and logout handler to Header */}
        <Header user={user} onLogout={handleLogout} />
        <main className="container flex-grow-1 py-4">
          <Routes>
            {/* Home Page with Cards */}
            <Route
              path="/"
              element={
                <div className="row">
                  {cards.map((card, index) => (
                    <Card key={index} title={card.title} link={card.link} icon={card.icon} />
                  ))}
                </div>
              }
            />
            {/* Auth Page */}
            <Route
              path="/auth"
              element={<Auth onAuthSuccess={handleAuthSuccess} />}
            />
            {/* Other Pages */}
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
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
