import { Fragment, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AboutPage = () => {
    useEffect(() => {
        document.title = "About - NeuroSleep";
    }, []);

    return (
        <Fragment>

            {/* About Section */}
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h1 className="section-title fw-bold mb-4">About NeuroSleep</h1>
                    <p className="lead mx-auto" style={{ maxWidth: "700px" }}>
                        NeuroSleep is a cutting-edge web application designed to help you monitor and predict sleep disorders
                        like Insomnia and Sleep Apnea. This platform was created with passion by a team of four developers who
                        wanted to combine technology and healthcare insights to improve sleep quality for everyone.
                    </p>
                </div>

                {/* Team Section */}
                <div className="row g-4 justify-content-center">
                    {/* Member 1 */}
                    <div className="col-md-3 col-sm-6 mx-auto">
                        <div className="card team-card text-center p-3">
                            <img
                                src="assets/team1.jpg"
                                alt="Member 1"
                                className="team-img mx-auto mt-3"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Callisto Carlos (2211110837)</h5>
                                <p className="card-text">
                                    Backend Developer. Expert in Python and Flask, handling database integration and prediction APIs.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Member 2 */}
                    <div className="col-md-3 col-sm-6 mx-auto">
                        <div className="card team-card text-center p-3">
                            <img
                                src="assets/team2.jpg"
                                alt="Member 2"
                                className="team-img mx-auto mt-3"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Nadiyah Shofa Salsabila (221111320)</h5>
                                <p className="card-text">
                                    Fullstack Developer. Passionate about creating beautiful and user-friendly web
                                    interfaces, Expert in Python and Flask, handling database integration and prediction APIs.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Member 3 */}
                    <div className="col-md-3 col-sm-6 mx-auto">
                        <div className="card team-card text-center p-3">
                            <img
                                src="assets/team3.jpg"
                                alt="Member 3"
                                className="team-img mx-auto mt-3"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Cecillia Charlene (221112843)</h5>
                                <p className="card-text">
                                    Frontend Developer & UI/UX Designer. Passionate about creating beautiful and user-friendly web
                                    interfaces.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Member 2 */}
                    <div className="col-md-3 col-sm-6 mx-auto">
                        <div className="card team-card text-center p-3">
                            <img
                                src="assets/team4.jpg"
                                alt="Member 4"
                                className="team-img mx-auto mt-3"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Andrew Sachio Chiwira (221110500)</h5>
                                <p className="card-text">
                                    Frontend Developer & UI/UX Designer. Passionate about creating beautiful and user-friendly web
                                    interfaces.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inspiration Section */}
                <div className="mt-5 text-center">
                    <h2>Inspiration Behind NeuroSleep</h2>
                    <p className="lead mx-auto" style={{ maxWidth: "700px" }}>
                        The idea for NeuroSleep came from the growing awareness of how crucial sleep is for mental and physical
                        health. Our team was inspired by the desire to use technology to prevent sleep problems before they
                        impact everyday life. By combining user-friendly design, scientific research, and machine learning, we
                        created a tool to empower users to take control of their sleep quality.
                    </p>
                </div>
            </div>

            {/* Custom CSS */}
            <style>{`
        body {
          background-color: #f8f9fa;
        }

        .team-card {
          border-radius: 1rem;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .team-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
        }

        .team-img {
          border-radius: 50%;
          width: 150px;
          height: 150px;
          object-fit: cover;
        }

        .section-title {
          font-weight: 700;
          margin-bottom: 2rem;
        }
      `}</style>
        </Fragment>
    );
};

export default AboutPage;
