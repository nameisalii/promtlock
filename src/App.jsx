import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BudgetLockTool from './pages/BudgetLockTool';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<BudgetLockTool />} />
      </Routes>
    </Router>
  );
}

export default App;
