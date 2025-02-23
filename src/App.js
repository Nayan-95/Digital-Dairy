import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dairy from "./Pages/dairy.jsx";
import LoginPage from "./Pages/login.jsx";
import Calender from "./Pages/calender.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dairy" element={<Dairy />} />
        <Route path="calender" element={<Calender/>}/>
      </Routes>
    </Router>
  );
}

export default App;
