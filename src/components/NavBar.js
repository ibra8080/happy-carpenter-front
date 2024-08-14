import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { CurrentUserContext, SetCurrentUserContext } from "../App";
import axios from "axios";
import Avatar from "./Avatar";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  const currentUser = useContext(CurrentUserContext);
  const setCurrentUser = useContext(SetCurrentUserContext);

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink 
        to={`/profiles/${currentUser?.profile_id}`} 
        className={({ isActive }) => 
          `${styles.NavLink} ${isActive ? styles.Active : ""}`
        }
      >
        <Avatar src={currentUser?.profile_image} text={currentUser?.username} height={40} />
      </NavLink>
      <NavLink 
        to="/" 
        className={styles.NavLink} 
        onClick={handleSignOut}
      >
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink 
        to="/signin" 
        className={({ isActive }) => 
          `${styles.NavLink} ${isActive ? styles.Active : ""}`
        }
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink 
        to="/signup" 
        className={({ isActive }) => 
          `${styles.NavLink} ${isActive ? styles.Active : ""}`
        }
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/" className={styles.NavLink}>
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `${styles.NavLink} ${isActive ? styles.Active : ""}`
              }
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