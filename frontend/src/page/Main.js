import { Outlet, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const MainPage = () => {
    const navigate = useNavigate();

    // Ambil data user dari localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Fungsi Logout
    const handleLogout = async () => {
        try {
            await axios.post("/api/logout");

            // Hapus data user di localStorage
            localStorage.removeItem("user");

            // Redirect ke halaman login
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout gagal:", error);
        }
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">
                        NeuroSleep
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            {/* Selalu tampil */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">
                                    About
                                </Link>
                            </li>

                            {/* Jika role === 'admin' */}
                            {user?.role === "admin" && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/predict">
                                            Prediction
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/history">
                                            History
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            onClick={handleLogout}
                                            className="nav-link btn btn-link text-white text-decoration-none"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}

                            {/* Jika role === 'user' */}
                            {user?.role === "user" && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/predict">
                                            Prediction
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            onClick={handleLogout}
                                            className="nav-link btn btn-link text-white text-decoration-none"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}

                            {/* Jika belum login */}
                            {!user && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Konten halaman */}
            <Outlet />
        </div>
    );
};

export default MainPage;
