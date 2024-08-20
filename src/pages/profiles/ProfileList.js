import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/ProfileList.module.css";

function ProfileList() {
  const [profiles, setProfiles] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axiosReq.get("/profiles/");
        setProfiles(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <Container className={appStyles.Content}>
      {hasLoaded ? (
        <Row>
          {profiles.results.map((profile) => (
            <Col key={profile.id} xs={12} md={6} lg={4} className="mb-4">
              <Card className={styles.ProfileCard}>
                <Card.Img variant="top" src={profile.image} alt={profile.owner} className={styles.ProfileImage} />
                <Card.Body>
                  <Card.Title>{profile.owner}</Card.Title>
                  <Card.Text>{profile.user_type}</Card.Text>
                  <Link to={`/profiles/${profile.id}`} className={styles.ProfileLink}>
                    View Profile
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
}

export default ProfileList;