import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import { axiosReq, axiosRes } from "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostList from "./pages/posts/PostList";  // Import the new PostList component

function App() {
  useEffect(() => {
    const initializeAuth = () => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        axiosReq.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        axiosRes.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      }
    };

    initializeAuth();
  }, []);

  return (
    <Router>
      <CurrentUserProvider>
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Routes>
              <Route path="/" element={<PostList message="No results found. Adjust the search keyword." />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/posts/create" element={<PostCreateForm />} />
              <Route path="*" element={<p>Page not found!</p>} />
            </Routes>
          </Container>
        </div>
      </CurrentUserProvider>
    </Router>
  );
}

export default App;