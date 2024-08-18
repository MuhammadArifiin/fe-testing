import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
    const [nomor_anggota, setNomorAnggota] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/api/login",
                {
                    nomor_anggota,
                    password,
                }
            );
            localStorage.setItem("token", response.data.token);
            setSuccess("Login successful!");
            setError(null);
            alert("Registration successful! Redirecting to Jadwal...");
            setTimeout(() => {
                navigate("/jadwal");
            }, 100);
        } catch (err) {
            setError("Login failed. Please try again.");
            setSuccess(null);
            alert("Login failed. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div>
                    <label>Nomor Anggota:</label>
                    <input
                        type="text"
                        value={nomor_anggota}
                        onChange={(e) => setNomorAnggota(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
            </form>
        </div>
    );
};

export default Login;
