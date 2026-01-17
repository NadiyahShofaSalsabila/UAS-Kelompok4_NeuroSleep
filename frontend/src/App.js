import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./page/Main.js";
import HomePage from "./page/Home.js";
import AboutPage from "./page/About.js";
import LoginPage from "./page/Login.js";
import RegisterPage from "./page/Register.js";
import PredictionPage from "./page/Prediction.js";
import HistoryPage from "./page/History.js";

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<MainPage />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="predict" element={<PredictionPage />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>
          {/* Route untuk menangani semua route yang tidak ada */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Fragment>
    );
  }
}

export default App;
