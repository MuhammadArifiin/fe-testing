import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        nomor_anggota: "",
        nama: "",
        fe_password: "",
        jabatan: "",
        divisi: "",
        foto: null,
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "file" ? files[0] : value, // Handle file input
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]); // Append each key-value pair to FormData
        });

        try {
            await axios.post("http://localhost:8000/api/register", data, {
                headers: {
                    "Content-Type": "multipart/form-data", // Set the correct header for file upload
                },
            });
            setSuccess("Registration successful!");
            setError(null);
            alert("Registration successful! Redirecting to Jadwal...");
        } catch (err) {
            setError("Registration failed. Please try again.");
            setSuccess(null);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <div>
                    <label>Nomor Anggota:</label>
                    <input
                        type="text"
                        name="nomor_anggota"
                        value={formData.nomor_anggota}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Nama:</label>
                    <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="fe_password"
                        value={formData.fe_password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Jabatan:</label>
                    <input
                        type="text"
                        name="jabatan"
                        value={formData.jabatan}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Divisi:</label>
                    <input
                        type="text"
                        name="divisi"
                        value={formData.divisi}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Foto:</label>
                    <input
                        type="file"
                        name="foto"
                        onChange={handleChange} // Remove `value` for file input
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
