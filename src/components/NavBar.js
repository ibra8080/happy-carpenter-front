import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import axios from "axios";
import Avatar from "./Avatar";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      delete axios.defaults.headers.common['Authorization'];
      navigate("/signin");
    } catch (err) {
      console.log(err);
    } finally {
      setIsSigningOut(false);
    }
  };

  const addPostIcon = (
    <NavLink
      className={styles.NavLink}
      to="/posts/create"
      onClick={() => setExpanded(false)}
    >
      <i className="far fa-plus-square"></i>Add post
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        to="/feed"
        onClick={() => setExpanded(false)}
      >
        <i className="fas fa-stream"></i>Feed
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to="/liked"
        onClick={() => setExpanded(false)}
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      <button 
        className={styles.NavLink}
        onClick={handleSignOut}
        disabled={isSigningOut}
      >
        <i className="fas fa-sign-out-alt"></i>
        {isSigningOut ? 'Signing out...' : 'Sign out'}
      </button>
      <NavLink 
        to={`/profiles/${currentUser?.pk}`} 
        className={styles.NavLink}
        onClick={() => setExpanded(false)}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink 
        to="/signin" 
        className={styles.NavLink}
        onClick={() => setExpanded(false)}
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink 
        to="/signup" 
        className={styles.NavLink}
        onClick={() => setExpanded(false)}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top" expanded={expanded}>
      <Container>
        <NavLink to="/" className={styles.NavLink}>
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setExpanded(!expanded)}
          ref={ref} 
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink 
              to="/" 
              className={styles.NavLink}
              onClick={() => setExpanded(false)}
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;