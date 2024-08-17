import React from 'react';
import styles from '../styles/Post.module.css';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import { axiosRes } from '../api/axiosDefaults';

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      if (setPosts) {
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.filter((post) => post.id !== id),
        }));
      }
      if (postPage) {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

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
            {is_owner && (
              <>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Edit post</Tooltip>}
                >
                  <i className={`fas fa-edit ${styles.Icon}`} onClick={handleEdit} />
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Delete post</Tooltip>}
                >
                  <i className={`fas fa-trash-alt ${styles.Icon}`} onClick={handleDelete} />
                </OverlayTrigger>
              </>
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