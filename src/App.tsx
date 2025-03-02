import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BirthdayGreeting from './components/BirthdayGreeting';
import Surprise from './components/Surprise';
import Message from './components/Message';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BirthdayGreeting />} />
        <Route path="/surprise" element={<Surprise />} />
        <Route path="/message" element={<Message />} />
      </Routes>
    </Router>
  );
}

export default App;