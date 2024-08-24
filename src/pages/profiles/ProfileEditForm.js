import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Image } from "react-bootstrap";
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
      } else if (key === 'image' && value instanceof File) {
        formData.append(key, value);
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

  const handleImageChange = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(profileData.image);
      setProfileData({
        ...profileData,
        image: URL.createObjectURL(event.target.files[0])
      });
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

        <Form.Group>
          <Form.Label>Bio</Form.Label>
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
          <Form.Label>Profile Image</Form.Label>
          {profileData.image && (
            <figure>
              <Image src={profileData.image} fluid />
            </figure>
          )}
          <Form.File
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>
        {errors?.image?.map((message, idx) => (
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
        {errors?.user_type?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Years of Experience</Form.Label>
          <Form.Control
            type="number"
            name="years_of_experience"
            value={profileData.years_of_experience}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.years_of_experience?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Specialties</Form.Label>
          <Form.Control
            type="text"
            name="specialties"
            value={profileData.specialties}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.specialties?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Portfolio URL</Form.Label>
          <Form.Control
            type="url"
            name="portfolio_url"
            value={profileData.portfolio_url}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.portfolio_url?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Interests (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            name="interests"
            value={profileData.interests.join(', ')}
            onChange={(e) => setProfileData({...profileData, interests: e.target.value.split(', ')})}
          />
        </Form.Group>
        {errors?.interests?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={profileData.address}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.address?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Button
          className={`${appStyles.Button} ${appStyles.Blue}`}
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button className={`${appStyles.Button} ${appStyles.Blue}`} type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
}

export default ProfileEditForm;