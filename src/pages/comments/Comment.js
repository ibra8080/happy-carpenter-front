import React, { useState, useEffect } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosReq } from "../../api/axiosDefaults";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  const [ownerUsername, setOwnerUsername] = useState(owner);
  const [ownerProfileId, setOwnerProfileId] = useState(profile_id);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === ownerUsername;

  useEffect(() => {
    const fetchOwnerData = async () => {
      if (!isNaN(owner)) {
        try {
          const { data } = await axiosReq.get(`/profiles/${parseInt(owner) + 2}/`);
          setOwnerUsername(data.owner);
          setOwnerProfileId(data.id);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchOwnerData();
  }, [owner]);

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${ownerProfileId}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{ownerUsername}</span>
          <span className={styles.Date}>{updated_at}</span>
          <p>{content}</p>
        </Media.Body>
        {is_owner && (
          <MoreDropdown
            handleEdit={() => {}}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </div>
  );
};

export default Comment;