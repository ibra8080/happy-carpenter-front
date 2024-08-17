import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { axiosReq, axiosRes } from "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostsPage from "./pages/posts/PostsPage";
import PostPage from "./pages/posts/PostPage";  // Import the new PostPage component

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
              <Route path="/" element={<PostsPage />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/posts/create" element={<PostCreateForm />} />
              <Route path="/posts/:id" element={<PostPage />} />  {/* New route for individual post view */}
              <Route path="*" element={<p>Page not found!</p>} />
            </Routes>
          </Container>
        </div>
      </CurrentUserProvider>
    </Router>
  );
}

export default App;