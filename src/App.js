import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dairy from "./Pages/dairy.jsx";
import LoginPage from "./Pages/login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dairy" element={<Dairy />} />
      </Routes>
    </Router>
  );
}

export default App;
