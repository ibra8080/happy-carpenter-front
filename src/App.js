import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <Router>
          <div className={styles.App}>
            <NavBar />
            <Container className={styles.Main}>
              <Routes>
                <Route path="/" element={<h1>Home page</h1>} />
                <Route path="/signin" element={<SignInForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="*" element={<p>Page not found!</p>} />
              </Routes>
            </Container>
          </div>
        </Router>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;