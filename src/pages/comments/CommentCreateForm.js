import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function CommentCreateForm(props) {
  const { post, setPost, setComments } = props;
  const [content, setContent] = useState("");
  const currentUser = useCurrentUser();

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
        // Use the user's pk (which is the user ID) when creating the comment
        owner: currentUser.pk,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [
          {
            ...data,
            owner: currentUser.username,
            // Use profile.id which should be the correct profile ID
            profile_id: currentUser.profile.id,
            profile_image: currentUser.profile.image,
          },
          ...prevComments.results,
        ],
      }));
      setPost((prevPost) => ({
        ...prevPost,
        results: [{
          ...prevPost.results[0],
          comments_count: prevPost.results[0].comments_count + 1,
        }],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${currentUser?.profile?.id}`}>
            <Avatar src={currentUser?.profile?.image} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default CommentCreateForm;