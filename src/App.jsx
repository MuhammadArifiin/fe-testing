import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home"; // Main page with the table
import UpdatePage from "./UpdatePage"; // Update page component
import AddPage from "./AddPage"; // Add page component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/update/:id" element={<UpdatePage />} />
                <Route path="/add" element={<AddPage />} />
            </Routes>
        </Router>
    );
}

export default App;
