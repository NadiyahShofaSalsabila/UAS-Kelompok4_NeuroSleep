import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const PredictionPage = () => {
    useEffect(() => {
        document.title = "Sleep Disorder Prediction - NeuroSleep";
    }, []);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Name: "",
        Gender: "Male",
        Age: "",
        "Sleep Duration": "",
        "Quality of Sleep": "",
        "Physical Activity Level": "",
        "Stress Level": "",
        "Heart Rate": "",
        "Daily Steps": "",
        Systolic_BP: "",
        Diastolic_BP: "",
        "BMI Category": "Normal",
        Occupation: "Software Engineer",
    });

    const [prediction, setPrediction] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate("/login"); // kalau belum login, arahkan ke login
        }
    }, [navigate]);

    useEffect(() => {
        if (prediction) {
            // Scroll ke paling atas dengan halus
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [prediction]);

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setPrediction("");
        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                "/predict",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );


            setPrediction(response.data.prediction);
        } catch (err) {
            console.error(err);
            setError("Prediction failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h3 className="mb-4 text-center">🛌 Sleep Disorder Prediction</h3>

                {prediction && (
                    <div className="alert alert-info text-center">
                        <strong>Result:</strong> {prediction}
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger text-center">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Name"
                            placeholder="Enter your name"
                            value={formData.Name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <select
                            className="form-select"
                            name="Gender"
                            value={formData.Gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    {/* Age */}
                    <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            name="Age"
                            value={formData.Age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Sleep Duration */}
                    <div className="mb-3">
                        <label className="form-label">Sleep Duration (hours)</label>
                        <input
                            type="number"
                            step="0.1"
                            className="form-control"
                            name="Sleep Duration"
                            value={formData["Sleep Duration"]}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Quality of Sleep */}
                    <div className="mb-3">
                        <label className="form-label">Quality of Sleep (1–10)</label>
                        <input
                            type="number"
                            className="form-control"
                            name="Quality of Sleep"
                            value={formData["Quality of Sleep"]}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Physical Activity Level */}
                    <div className="mb-3">
                        <label className="form-label">Physical Activity Level</label>
                        <input
                            type="number"
                            className="form-control"
                            name="Physical Activity Level"
                            value={formData["Physical Activity Level"]}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Stress Level */}
                    <div className="mb-3">
                        <label className="form-label">Stress Level (1–10)</label>
                        <input
                            type="number"
                            className="form-control"
                            name="Stress Level"
                            value={formData["Stress Level"]}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Heart Rate */}
                    <div className="mb-3">
                        <label className="form-label">Heart Rate</label>
                        <input
                            type="number"
                            className="form-control"
                            name="Heart Rate"
                            value={formData["Heart Rate"]}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Daily Steps */}
                    <div className="mb-3">
                        <label className="form-label">Daily Steps</label>
                        <input
                            type="number"
                            className="form-control"
                            name="Daily Steps"
                            value={formData["Daily Steps"]}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Systolic BP */}
                    <div className="mb-3">
                        <label className="form-label">Systolic BP</label>
                        <input
                            type="number"
                            className="form-control"
                            name="Systolic_BP"
                            value={formData.Systolic_BP}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Diastolic BP */}
                    <div className="mb-3">
                        <label className="form-label">Diastolic BP</label>
                        <input
                            type="number"
                            className="form-control"
                            name="Diastolic_BP"
                            value={formData.Diastolic_BP}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* BMI Category */}
                    <div className="mb-3">
                        <label className="form-label">BMI Category</label>
                        <select
                            className="form-select"
                            name="BMI Category"
                            value={formData["BMI Category"]}
                            onChange={handleChange}
                            required
                        >
                            <option value="Overweight">Overweight</option>
                            <option value="Normal">Normal</option>
                            <option value="Obese">Obese</option>
                        </select>
                    </div>

                    {/* Occupation */}
                    <div className="mb-3">
                        <label className="form-label">Occupation</label>
                        <select
                            className="form-select"
                            name="Occupation"
                            value={formData.Occupation}
                            onChange={handleChange}
                            required
                        >
                            <option value="Software Engineer">Software Engineer</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Sales Representative">Sales Representative</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Nurse">Nurse</option>
                            <option value="Engineer">Engineer</option>
                            <option value="Accountant">Accountant</option>
                            <option value="Scientist">Scientist</option>
                            <option value="Lawyer">Lawyer</option>
                            <option value="Salesperson">Salesperson</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-100"
                    >
                        {loading ? "Predicting..." : "Predict"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PredictionPage;
