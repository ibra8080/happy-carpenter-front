import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Image, Button, Card, Modal, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/ProfileDetail.module.css";

function ProfileDetail() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}/`);
        setProfile(data);
        setError(null);
      } catch (err) {
        console.log("Error fetching profile:", err);
        setError("Failed to fetch profile. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const handleSoftDelete = async () => {
    try {
      await axiosReq.patch(`/profiles/${id}/`, { is_active: false });
      setProfile(prevProfile => ({
        ...prevProfile,
        is_active: false
      }));
      if (currentUser?.profile?.id === parseInt(id)) {
        setCurrentUser(prevUser => ({
          ...prevUser,
          profile: {
            ...prevUser.profile,
            is_active: false
          }
        }));
      }
      setShowDeleteModal(false);
    } catch (err) {
      console.log("Error deleting profile:", err);
      setError("Failed to delete profile. Please try again.");
    }
  };

  const is_owner = currentUser?.profile?.id === parseInt(id);

  if (isLoading) return <Asset spinner />;
  if (error) return <Alert variant="warning">{error}</Alert>;
  if (!profile) return <Alert variant="warning">Profile not found</Alert>;

  return (
    <Container className={appStyles.Content}>
      <Row className={styles.ProfileContainer}>
        <Col md={4}>
          <Image src={profile.image} alt={profile.owner} rounded fluid className={styles.ProfileImage} />
        </Col>
        <Col md={8}>
          <h2>{profile.name || profile.owner}</h2>
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
              <Card.Text><strong>Interests:</strong> {profile.interests?.join(", ") || 'Not specified'}</Card.Text>
              <Card.Text><strong>Address:</strong> {profile.address || 'Not specified'}</Card.Text>
            </Card.Body>
          </Card>
          {is_owner && (
            <div className={styles.ProfileActions}>
              <Link to={`/profiles/${id}/edit`}>
                <Button variant="primary">Edit Profile</Button>
              </Link>
              <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete Profile</Button>
            </div>
          )}
        </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your profile? This action can't be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleSoftDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProfileDetail;