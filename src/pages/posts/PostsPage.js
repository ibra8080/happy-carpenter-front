import React from "react";
import { useLocation } from "react-router-dom";
import PostList from "./PostList";
import styles from "../../styles/PostsPage.module.css";
import { Container } from "react-bootstrap";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";

function PostsPage() {
  const location = useLocation();

  return (
    <Container className={styles.PostsPage}>
      <PostList 
        message={
          <Container className={appStyles.Content}>
            <Asset message="No results found. Adjust the search keyword." />
          </Container>
        }
        filter=""
        key={location.key}  // This will cause a re-render when navigating to this page
      />
    </Container>
  );
}

export default PostsPage;