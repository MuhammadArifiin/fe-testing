import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home"; // Main page with the table
import UpdatePage from "./components/jadwal/UpdatePage"; // Update page component
import AddPage from "./components/jadwal/AddPage"; // Add page component
import Register from "./components/auth/Register"; // Register component
import Login from "./components/auth/Login"; // Login component
import PrivateRoute from "./PrivateRoute"; // PrivateRoute component
import Jadwal from "./components/jadwal/Jadwal";

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route
                    path="/jadwal"
                    element={
                        <PrivateRoute>
                            <Jadwal />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/add"
                    element={
                        <PrivateRoute>
                            <AddPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/update/:id"
                    element={
                        <PrivateRoute>
                            <UpdatePage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
