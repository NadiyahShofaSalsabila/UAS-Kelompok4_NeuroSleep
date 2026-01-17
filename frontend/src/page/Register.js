import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Set judul tab browser
  useEffect(() => {
    document.title = "Register - NeuroSleep";
  }, []);

  // Handle input perubahan
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "/api/register",
        {
          username: formData.username,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500); // Redirect otomatis ke login
      } else {
        setError(response.data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
        minHeight: "100vh",
      }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "400px", borderRadius: "1rem" }}
      >
        <h2 className="text-center mb-4">Register</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}
        {success && (
          <div className="alert alert-success text-center">{success}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-3 text-muted">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        {/* Inline styling untuk button hover */}
        <style>{`
          .btn-primary {
            background: #6B73FF;
            border: none;
          }
          .btn-primary:hover {
            background: #000DFF;
          }
        `}</style>
      </div>
    </div>
  );
};

export default RegisterPage;
