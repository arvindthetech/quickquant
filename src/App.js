import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';
import Table from './components/Table';
import Squares from './components/Squares';
import Cubes from './components/Cubes';
import SquareRoots from './components/SquareRoots';
import CubeRoots from './components/CubeRoots';
import Addition from './components/Addition';
import Subtraction from './components/Subtraction';
import Multiplication from './components/Multiplication';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const cards = [
    { title: 'Tables', link: '/tables', icon: 'table_chart' },
    { title: 'Squares', link: '/squares', icon: 'exposure' },
    { title: 'Cubes', link: '/cubes', icon: 'view_in_ar' },
    { title: 'Square Roots', link: '/square-roots', icon: 'functions' },
    { title: 'Cube Roots', link: '/cube-roots', icon: 'calculate' },
    { title: 'Addition', link: '/addition', icon: 'add' },
    { title: 'Subtraction', link: '/subtraction', icon: 'remove' },
    { title: 'Multiplication', link: '/multiplication', icon: 'close' },
  ];

  return (
    <BrowserRouter basename="/quickquant">
      <div className="d-flex flex-column min-vh-100">
        <Header />
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
            {/* Other Pages */}
            <Route path="/tables" element={<Table />} />
            <Route path="/squares" element={<Squares />} />
            <Route path="/cubes" element={<Cubes />} />
            <Route path="/square-roots" element={<SquareRoots />} />
            <Route path="/cube-roots" element={<CubeRoots />} />
            <Route path="/addition" element={<Addition />} />
            <Route path="/subtraction" element={<Subtraction />} />
            <Route path="/multiplication" element={<Multiplication />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </BrowserRouter>
  );
};

export default App;
