import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Satsang1 from './pages/Satsang1/Satsang1';
import Satsang2 from './pages/Satsang2/Satsang2';
import Satsang3 from './pages/Satsang3/Satsang3';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/satsang1" element={<Satsang1 />} />
          <Route path="/satsang2" element={<Satsang2 />} />
          <Route path="/satsang3" element={<Satsang3 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;