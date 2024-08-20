import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
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
          <p>Years of Experience: {profile.years_of_experience}</p>
          <p>Specialties: {profile.specialties}</p>
          {profile.portfolio_url && (
            <p>
              Portfolio: <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer">View Portfolio</a>
            </p>
          )}
          <p>Interests: {profile.interests.join(", ")}</p>
          <p>Address: {profile.address}</p>
          {is_owner && (
            <Link to={`/profiles/${id}/edit`}>
              <Button variant="primary">Edit Profile</Button>
            </Link>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileDetail;