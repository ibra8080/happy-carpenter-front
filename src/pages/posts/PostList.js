import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Post from '../../components/Post';
import Asset from '../../components/Asset';
import appStyles from '../../App.module.css';
import styles from '../../styles/PostsPage.module.css';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';

function PostList({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <div className={styles.SearchBar}>
            <i className={`fas fa-search ${styles.SearchIcon}`} />
            <Form onSubmit={(event) => event.preventDefault()}>
              <Form.Control
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="text"
                className="mr-sm-2"
                placeholder="Search posts"
              />
            </Form>
          </div>

          <div className={styles.PostsContainer}>
            {hasLoaded ? (
              <>
                {posts.results.length ? (
                  posts.results.map((post) => (
                    <Post key={post.id} {...post} setPosts={setPosts} />
                  ))
                ) : (
                  <Container className={appStyles.Content}>
                    <Asset message={message} />
                  </Container>
                )}
              </>
            ) : (
              <Container className={appStyles.Content}>
                <Asset spinner />
              </Container>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PostList;