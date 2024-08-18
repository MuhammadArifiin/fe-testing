import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Jadwal() {
    const [jadwalData, setJadwalData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchJadwalData();
    }, []);

    const fetchJadwalData = () => {
        axios
            .get("http://localhost:8000/api/jadwal")
            .then((response) => {
                setJadwalData(response.data.data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8000/api/jadwal/${id}`)
            .then((response) => {
                fetchJadwalData(); // Refresh the list
            })
            .catch((error) => console.error("Error deleting data:", error));
    };

    const handleLogout = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found, redirecting to home...");
            navigate("/"); // Redirect if no token found
            return;
        }

        axios
            .post(
                "http://localhost:8000/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                localStorage.removeItem("token"); // Remove the token from localStorage
                navigate("/"); // Redirect to the home page
            })
            .catch((error) => {
                console.error("Error logging out:", error);
                localStorage.removeItem("token"); // Even if there's an error, remove token
                navigate("/"); // Redirect to the home page
            });
    };

    return (
        <div className="container">
            <h1>Jadwal Kegiatan</h1>
            <Link to="/add">
                <button>Add Jadwal</button>
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
            <br />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Jadwal;
