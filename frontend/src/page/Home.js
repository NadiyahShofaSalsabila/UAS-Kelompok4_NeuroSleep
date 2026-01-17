import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
    useEffect(() => {
        document.title = "NeuroSleep";
    }, []);

    return (
        <Fragment>
            {/* Hero Section */}
            < div className="container mb-5 mt-4" >
                <div className="card shadow p-5 text-center">
                    <h1 className="mb-3">🛌 Discover Your Sleep Health Instantly!</h1>
                    <p className="lead mb-4">
                        Sleep is one of the most important pillars of health, yet many
                        people struggle without even realizing it. This website helps you
                        understand your sleep patterns and identify potential sleep
                        disorders such as Insomnia or Sleep Apnea before they affect your
                        daily life.
                        By entering simple information about your daily habits, physical
                        activity, vital signs, and sleep duration, you can receive accurate,
                        personalized insights into your sleep health within seconds.
                        With these insights, you can make informed decisions to improve your
                        sleep quality, boost your energy, and enhance your overall
                        well-being. Don’t wait for sleep problems to take a toll—start
                        monitoring your sleep today and take the first step toward
                        healthier, more restful nights.
                    </p>
                    <Link to="/predict" className="btn btn-lg btn-predict">
                        Let’s Predict
                    </Link>
                </div>
            </div >

            {/* Images Section */}
            < div className="container mt-5" >
                <div className="row text-center mb-4">
                    <div className="col-md-4 mb-3">
                        <img
                            src="assets/images/sleep1.jpg"
                            className="img-fluid rounded shadow sleep-img"
                            alt="Sleep 1"
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <img
                            src="assets/images/sleep2.jpg"
                            className="img-fluid rounded shadow sleep-img"
                            alt="Sleep 2"
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <img
                            src="assets/images/sleep3.jpg"
                            className="img-fluid rounded shadow sleep-img"
                            alt="Sleep 3"
                        />
                    </div>
                </div>
            </div >

            {/* Custom CSS */}
            < style > {`
        .btn-predict {
          background: linear-gradient(45deg, #6a11cb, #2575fc);
          color: white;
          font-weight: bold;
          border: none;
          padding: 12px 30px;
          border-radius: 50px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          text-transform: uppercase;
        }
        .btn-predict:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
          background: linear-gradient(45deg, #2575fc, #6a11cb);
        }
        .sleep-img {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }
      `}</style >
        </Fragment>
    );
};

export default HomePage;