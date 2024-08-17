import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
    const [jadwalData, setJadwalData] = useState([]);

    useEffect(() => {
        fetchJadwalData();
    }, []);

    const fetchJadwalData = () => {
        axios
            .get("http://localhost:8000/api/jadwal") // Replace with your actual API endpoint
            .then((response) => {
                setJadwalData(response.data.data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8000/api/jadwal/${id}`) // Replace with your actual API endpoint
            .then((response) => {
                fetchJadwalData(); // Refresh the list
            })
            .catch((error) => console.error("Error deleting data:", error));
    };

    return (
        <div className="container">
            <h1>Jadwal Kegiatan</h1>
            <Link to="/add">
                <button>Add New Jadwal</button>
            </Link>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Kegiatan</th>
                        <th>Tanggal Mulai</th>
                        <th>Tanggal Selesai</th>
                        <th>Tempat</th>
                        <th>Iuran</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jadwalData.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.kegiatan}</td>
                            <td>{item.tgl_mulai}</td>
                            <td>{item.tgl_selesai}</td>
                            <td>{item.tempat}</td>
                            <td>{item.iuran}</td>
                            <td>
                                <Link to={`/update/${item.id}`}>
                                    <button>Update</button>
                                </Link>
                                <button onClick={() => handleDelete(item.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
