import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";

const SignUpForm = () => {
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
    });
    const { 
      username, email, password1, password2, first_name, last_name,
      user_type, years_of_experience, specialties, portfolio_url, interests, address
    } = signUpData;
  
    const [errors, setErrors] = useState({});
  
    const navigate = useNavigate();
    
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpData({
      ...signUpData,
      [name]: name === 'interests' ? value.split(',').map(item => item.trim()) : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Sending registration data:', signUpData);
      const response = await axiosReq.post("/dj-rest-auth/registration/", signUpData);
      console.log('Registration successful:', response.data);
      navigate("/signin");
    } catch (err) {
      console.error('Registration error:', err.response?.data);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
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
                type="text"
                name="address"
                value={address}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.address?.map((message, idx) => (
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
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"}
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;