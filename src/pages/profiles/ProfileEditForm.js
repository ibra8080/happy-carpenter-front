import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import appStyles from "../../App.module.css";
import styles from "../../styles/ProfileEditForm.module.css";

function ProfileEditForm() {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
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
        if (currentUser?.profile?.id) {
          const { data } = await axiosReq.get(`/profiles/${currentUser.profile.id}/`);
          const { name, content, image, user_type, years_of_experience, specialties, portfolio_url, interests, address } = data;
          setProfileData({ name, content, image, user_type, years_of_experience, specialties, portfolio_url, interests, address });
        } else {
          console.log("No current user profile found");
          navigate("/");
        }
      } catch (err) {
        console.log("Error fetching profile:", err);
        navigate("/");
      }
    };
    fetchProfile();
}, [currentUser, navigate]);

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
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser(prevUser => ({
        ...prevUser,
        profile: data
      }));
      navigate(`/profiles/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  if (!currentUser?.profile || currentUser.profile.id !== parseInt(id)) {
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

        {/* Add other form fields here */}

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