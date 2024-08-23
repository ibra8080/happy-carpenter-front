import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button, Card } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/ProfileDetail.module.css";

function ProfileDetail() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === profile?.owner;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}/`);
        setProfile(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, [id]);

  const handleDeleteProfile = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete your profile? This action cannot be undone.");
      if (confirmDelete) {
        await axiosReq.delete(`/profiles/${id}/`);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!profile) return <Asset spinner />;

  return (
    <Container className={appStyles.Content}>
      <Row className={styles.ProfileContainer}>
        <Col md={4}>
          <Image src={profile.image} alt={profile.owner} rounded fluid className={styles.ProfileImage} />
        </Col>
        <Col md={8}>
          <h2>{profile.owner}</h2>
          <p>{profile.user_type}</p>
          <p>{profile.content}</p>
          <Card className={styles.ProfileDetails}>
            <Card.Body>
              <Card.Text><strong>Years of Experience:</strong> {profile.years_of_experience || 'Not specified'}</Card.Text>
              <Card.Text><strong>Specialties:</strong> {profile.specialties || 'Not specified'}</Card.Text>
              {profile.portfolio_url && (
                <Card.Text>
                  <strong>Portfolio:</strong> <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer">View Portfolio</a>
                </Card.Text>
              )}
              <Card.Text><strong>Interests:</strong> {profile.interests.join(", ") || 'Not specified'}</Card.Text>
              <Card.Text><strong>Address:</strong> {profile.address || 'Not specified'}</Card.Text>
            </Card.Body>
          </Card>
          {is_owner && (
            <div className={styles.ProfileActions}>
              <Link to={`/profiles/${id}/edit`}>
                <Button variant="primary">Edit Profile</Button>
              </Link>
              <Button variant="danger" onClick={handleDeleteProfile}>Delete Profile</Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileDetail;