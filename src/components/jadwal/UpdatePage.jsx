import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdatePage() {
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate();

    const [jadwal, setJadwal] = useState({
        kegiatan: "",
        tgl_mulai: "",
        tgl_selesai: "",
        tempat: "",
        iuran: "",
    });

    useEffect(() => {
        // Fetch the existing data for the record to be updated
        axios
            .get(`http://localhost:8000/api/jadwal/${id}`) // Replace with your actual API endpoint
            .then((response) => {
                if (response.data.success) {
                    setJadwal(response.data.data);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJadwal({ ...jadwal, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/jadwal/${id}`, jadwal) // Replace with your actual API endpoint
            .then((response) => {
                if (response.data.success) {
                    navigate("/"); // Redirect to the home page
                }
            })
            .catch((error) => console.error("Error updating data:", error));
    };

    return (
        <div className="container">
            <h1>Update Jadwal</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="kegiatan"
                    value={jadwal.kegiatan}
                    onChange={handleChange}
                    placeholder="Kegiatan"
                />
                <input
                    type="date"
                    name="tgl_mulai"
                    value={jadwal.tgl_mulai}
                    onChange={handleChange}
                    placeholder="Tanggal Mulai"
                />
                <input
                    type="date"
                    name="tgl_selesai"
                    value={jadwal.tgl_selesai}
                    onChange={handleChange}
                    placeholder="Tanggal Selesai"
                />
                <input
                    type="text"
                    name="tempat"
                    value={jadwal.tempat}
                    onChange={handleChange}
                    placeholder="Tempat"
                />
                <input
                    type="number"
                    name="iuran"
                    value={jadwal.iuran}
                    onChange={handleChange}
                    placeholder="Iuran"
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdatePage;
