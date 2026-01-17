import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Set judul tab browser
  useEffect(() => {
    document.title = "Login - NeuroSleep";
  }, []);

  // Handle perubahan input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "/api/login",
        {
          username: formData.username,
          password: formData.password,
        },
        {
          withCredentials: true, // agar Flask session tersimpan
        }
      );

      if (response.data.success) {
        console.log("Login berhasil:", response.data);

        // Simpan user info di localStorage
        localStorage.setItem("user", JSON.stringify(response.data));

        // Redirect ke halaman utama
        navigate("/", { replace: true });
      } else {
        setError(response.data.error || "Invalid username or password");
      }
    } catch (err) {
      console.error("Login gagal:", err);
      setError("Invalid username or password");
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
        <h2 className="text-center mb-4">Login NeuroSleep</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter your username"
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3 text-muted">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>

        {/* Inline style untuk button hover */}
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

export default LoginPage;
