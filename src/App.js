import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <NavBar />
        <Container className={styles.Main}>
          <Routes>
            <Route path="/" element={<h1>Home page</h1>} />
            <Route path="/signin" element={<h1>Sign in</h1>} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="*" element={<p>Page not found!</p>} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;