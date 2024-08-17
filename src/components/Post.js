import React from 'react';
import styles from '../styles/Post.module.css';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    // likes_count,  // Commented out for now
    // like_id,      // Commented out for now
    title,
    content,
    image,
    updated_at,
    postPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            <span className={styles.Owner}>{owner}</span>
          </Link>
          <div className="d-flex align-items-center">
            <span className={styles.Date}>{updated_at}</span>
            {is_owner && postPage && (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Edit post</Tooltip>}
              >
                <Link to={`/posts/${id}/edit`}>
                  <i className="fas fa-edit" />
                </Link>
              </OverlayTrigger>
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} className={styles.PostImage} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {/* Like functionality will go here */}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;