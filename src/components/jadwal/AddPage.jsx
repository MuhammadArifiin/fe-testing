import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddPage() {
    const navigate = useNavigate();

    const [newJadwal, setNewJadwal] = useState({
        kegiatan: "",
        tgl_mulai: "",
        tgl_selesai: "",
        tempat: "",
        iuran: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewJadwal({ ...newJadwal, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/jadwal", newJadwal) // Replace with your actual API endpoint
            .then((response) => {
                navigate("/"); // Redirect to the home page
            })
            .catch((error) => console.error("Error adding data:", error));
    };

    return (
        <div className="container">
            <h1>Add New Jadwal</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="kegiatan"
                    value={newJadwal.kegiatan}
                    onChange={handleChange}
                    placeholder="Kegiatan"
                />
                <input
                    type="date"
                    name="tgl_mulai"
                    value={newJadwal.tgl_mulai}
                    onChange={handleChange}
                    placeholder="Tanggal Mulai"
                />
                <input
                    type="date"
                    name="tgl_selesai"
                    value={newJadwal.tgl_selesai}
                    onChange={handleChange}
                    placeholder="Tanggal Selesai"
                />
                <input
                    type="text"
                    name="tempat"
                    value={newJadwal.tempat}
                    onChange={handleChange}
                    placeholder="Tempat"
                />
                <input
                    type="number"
                    name="iuran"
                    value={newJadwal.iuran}
                    onChange={handleChange}
                    placeholder="Iuran"
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddPage;
