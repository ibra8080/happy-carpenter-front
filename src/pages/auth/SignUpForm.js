import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";


import {
  Form,
  Button,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";

const SignUpForm = () => {
  const setCurrentUser = useSetCurrentUser();
    const [signUpData, setSignUpData] = useState({
      username: "",
      email: "",
      password1: "",
      password2: "",
      first_name: "",
      last_name: "",
      user_type: "amateur",
      years_of_experience: "",
      specialties: "",
      portfolio_url: "",
      interests: [],
      address: "",
      profile_image: null,
    });
    const { 
      username, email, password1, password2, first_name, last_name,
      user_type, years_of_experience, specialties, portfolio_url, interests, address
    } = signUpData;
  
    const [errors, setErrors] = useState({});
    const [profileImagePreview, setProfileImagePreview] = useState(null);
  
    const navigate = useNavigate();
    
  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setSignUpData({
        ...signUpData,
        [name]: files[0],
      });
      setProfileImagePreview(URL.createObjectURL(files[0]));
    } else {
      setSignUpData({
        ...signUpData,
        [name]: name === 'interests' ? value.split(',').map(item => item.trim()) : value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const [key, value] of Object.entries(signUpData)) {
      if (key === "interests") {
        formData.append(key, JSON.stringify(value));
      } else if (key === "profile_image" && value instanceof File) {
        formData.append(key, value, value.name);
      } else {
        formData.append(key, value);
      }
    }
    
    try {
      const response = await axiosReq.post("/dj-rest-auth/registration/", formData);
      console.log("Registration response:", response.data);
      
      if (response.data.user) {
        // Assuming the backend returns the user data including the profile image URL
        setCurrentUser(response.data.user);
        navigate("/");
      } else {
        console.error("Unexpected response structure:", response.data);
        setErrors({ non_field_errors: ["An unexpected error occurred. Please try again."] });
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response) {
        console.error('Error response:', err.response.data);
        setErrors(err.response.data);
      } else {
        setErrors({ non_field_errors: ["An unexpected error occurred. Please try again."] });
      }
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2">
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>{message}</Alert>
            ))}

            <Form.Group controlId="email">
              <Form.Label className="d-none">Email (optional)</Form.Label>
              <Form.Control
                className={styles.Input}
                type="email"
                placeholder="Email (optional)"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.email?.map((message, idx) => (
              <Alert variant="warning" key={idx}>{message}</Alert>
            ))}

            <Form.Group controlId="first_name">
              <Form.Label className="d-none">First Name</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="First Name"
                name="first_name"
                value={first_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.first_name?.map((message, idx) => (
              <Alert variant="warning" key={idx}>{message}</Alert>
            ))}

            <Form.Group controlId="last_name">
              <Form.Label className="d-none">Last Name</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={last_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.last_name?.map((message, idx) => (
              <Alert variant="warning" key={idx}>{message}</Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">{message}</Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">{message}</Alert>
            ))}

            <Form.Group controlId="user_type">
              <Form.Label>User Type</Form.Label>
              <Form.Control
                className={styles.Input}
                as="select"
                name="user_type"
                value={user_type}
                onChange={handleChange}
                required
              >
                <option value="amateur">Amateur</option>
                <option value="professional">Professional</option>
              </Form.Control>
            </Form.Group>
            {errors.user_type?.map((message, idx) => (
              <Alert variant="warning" key={idx}>{message}</Alert>
            ))}

            {user_type === 'professional' && (
              <>
                <Form.Group controlId="years_of_experience">
                  <Form.Label>Years of Experience</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="number"
                    name="years_of_experience"
                    value={years_of_experience}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {errors.years_of_experience?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>{message}</Alert>
                ))}

                <Form.Group controlId="specialties">
                  <Form.Label>Specialties</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    name="specialties"
                    value={specialties}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {errors.specialties?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>{message}</Alert>
                ))}

                <Form.Group controlId="portfolio_url">
                  <Form.Label>Portfolio URL</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="url"
                    name="portfolio_url"
                    value={portfolio_url}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.portfolio_url?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>{message}</Alert>
                ))}
              </>
            )}

            <Form.Group controlId="interests">
              <Form.Label>Interests (comma-separated)</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                name="interests"
                value={interests.join(', ')}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.interests?.map((message, idx) => (
              <Alert variant="warning" key={idx}>{message}</Alert>
            ))}

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                name="address"
                value={address}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.address?.map((message, idx) => (
              <Alert variant="warning" key={idx}>{message}</Alert>
            ))}


          <Form.Group controlId="profile_image">
              <Form.Label className={styles.FileInputLabel}>Upload Profile Image</Form.Label>
              <Form.Control
                className={styles.FileInput}
                type="file"
                name="profile_image"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Group>
            {profileImagePreview && (
              <img
                src={profileImagePreview}
                alt="Profile preview"
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
              />
            )}
            {errors.profile_image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>{message}</Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;