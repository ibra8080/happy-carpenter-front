import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import appStyles from "../../App.module.css";
import styles from "../../styles/ProfileEditForm.module.css";

function ProfileEditForm() {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
    user_type: "",
    years_of_experience: "",
    specialties: "",
    portfolio_url: "",
    interests: [],
    address: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}/`);
        const { name, content, image, user_type, years_of_experience, specialties, portfolio_url, interests, address } = data;
        setProfileData({ name, content, image, user_type, years_of_experience, specialties, portfolio_url, interests, address });
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, [id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const [key, value] of Object.entries(profileData)) {
      if (key === 'interests') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }

    try {
      await axiosReq.put(`/profiles/${id}/`, formData);
      navigate(`/profiles/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  if (currentUser?.username !== profileData.owner) {
    return <Alert variant="warning">You are not authorized to edit this profile.</Alert>;
  }

  return (
    <Container className={appStyles.Content}>
      <Form onSubmit={handleSubmit} className={styles.Form}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.name?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="content"
            value={profileData.content}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.content?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>User Type</Form.Label>
          <Form.Control
            as="select"
            name="user_type"
            value={profileData.user_type}
            onChange={handleChange}
          >
            <option value="amateur">Amateur</option>
            <option value="professional">Professional</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Years of Experience</Form.Label>
          <Form.Control
            type="number"
            name="years_of_experience"
            value={profileData.years_of_experience}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Specialties</Form.Label>
          <Form.Control
            type="text"
            name="specialties"
            value={profileData.specialties}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Portfolio URL</Form.Label>
          <Form.Control
            type="url"
            name="portfolio_url"
            value={profileData.portfolio_url}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Interests (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            name="interests"
            value={profileData.interests.join(", ")}
            onChange={(e) => setProfileData({ ...profileData, interests: e.target.value.split(", ") })}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={profileData.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          className={`${appStyles.Button} ${appStyles.Blue}`}
          onClick={() => navigate(-1)}
        >
          cancel
        </Button>
        <Button className={`${appStyles.Button} ${appStyles.Blue}`} type="submit">
          save
        </Button>
      </Form>
    </Container>
  );
}

export default ProfileEditForm;