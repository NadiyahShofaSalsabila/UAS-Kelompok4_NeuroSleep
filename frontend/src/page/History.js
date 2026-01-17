import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sleep Disorder Prediction History - NeuroSleep";
    }, []);

    // Cek login dan role admin
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.role !== "admin") {
            navigate("/");
        } else {
            fetchHistory();
        }
    }, [navigate]);

    // Ambil data dari backend
    const fetchHistory = async () => {
        try {
            const res = await axios.get("/history", {
                withCredentials: true,
            });
            setHistory(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load history");
        } finally {
            setLoading(false);
        }
    };

    // Hapus satu data
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this record?")) return;
        try {
            await axios.delete(`/delete/${id}`, {
                withCredentials: true,
            });
            setHistory(history.filter((item) => item.id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete record");
        }
    };

    // Hapus semua data
    const handleDeleteAll = async () => {
        if (!window.confirm("Are you sure to delete all history?")) return;
        try {
            await axios.delete("/delete_all", {
                withCredentials: true,
            });
            setHistory([]);
        } catch (err) {
            console.error(err);
            alert("Failed to delete all records");
        }
    };

    if (loading) {
        return <div className="container mt-5 text-center">Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mt-5 alert alert-danger text-center">
                {error}
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h3 className="mb-4 text-center">📝 Prediction History</h3>

            {history.length > 0 && (
                <div className="mb-3">
                    <button
                        className="btn btn-danger ms-2"
                        onClick={handleDeleteAll}
                        title="Delete All"
                    >
                        <i className="bi bi-trash me-2"></i> Delete All
                    </button>
                </div>
            )}

            {history.length === 0 ? (
                <div className="alert alert-info text-center">
                    No history found.
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Sleep Duration</th>
                                <th>Quality of Sleep</th>
                                <th>Physical Activity</th>
                                <th>Stress Level</th>
                                <th>Heart Rate</th>
                                <th>Daily Steps</th>
                                <th>Systolic BP</th>
                                <th>Diastolic BP</th>
                                <th>BMI Category</th>
                                <th>Occupation</th>
                                <th>Prediction</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.age}</td>
                                    <td>{item.sleep_duration}</td>
                                    <td>{item.quality_of_sleep}</td>
                                    <td>{item.physical_activity}</td>
                                    <td>{item.stress_level}</td>
                                    <td>{item.heart_rate}</td>
                                    <td>{item.daily_steps}</td>
                                    <td>{item.systolic_bp}</td>
                                    <td>{item.diastolic_bp}</td>
                                    <td>{item.bmi_category}</td>
                                    <td>{item.occupation}</td>
                                    <td>{item.prediction}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(item.id)}
                                            title="Delete"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default HistoryPage;
