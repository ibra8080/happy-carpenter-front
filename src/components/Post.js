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
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
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
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      console.log(`Attempting to like post ${id}`);
      console.log('Current user:', currentUser);
      const response = await axiosRes.post('/likes/', { 
        post: id,
        owner: currentUser?.pk // Send the user's primary key (ID)
      });
      console.log('Full response:', response);
      const { data } = response;
      console.log('Like response data:', data);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.error("Error in handleLike:", err.response?.data || err.message);
      console.error("Full error object:", err);
      if (err.response) {
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);
      }
    }
  };
  
  

  const handleUnlike = async () => {
    try {
      console.log(`Attempting to unlike post ${id}`);
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
      console.log('Post unliked successfully');
    } catch (err) {
      console.error("Error in handleUnlike:", err.response?.data || err.message);
      console.error("Full error object:", err);
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
        <Card.Img 
          src={image} 
          alt={title} 
          className={styles.PostImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://res.cloudinary.com/ds5wgelgc/image/upload/v1722748736/default_post_ixahqa.jpg";
          }}
        />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
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