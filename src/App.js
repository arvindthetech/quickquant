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
import Profile from "./components/Profile"; // ✅ Added Profile Component
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [user, setUser] = useState(null);

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

  return (
    <BrowserRouter basename="/quickquant">
      <div className="d-flex flex-column min-vh-100">
        <Header user={user} />
        <main className="container flex-grow-1 py-4">
          <Routes>
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
            <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} /> {/* ✅ Profile Page */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

