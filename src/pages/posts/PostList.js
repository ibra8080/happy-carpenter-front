import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Post from '../../components/Post';
import Asset from '../../components/Asset';
import appStyles from '../../App.module.css';
import styles from '../../styles/PostsPage.module.css';
import { useLocation } from 'react-router-dom';
import { Container, Form, Col, Row } from 'react-bootstrap';

function PostList({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");
  const [imageFilter, setImageFilter] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}&image_filter=${imageFilter}`);
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
  }, [filter, query, imageFilter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
          <Form.Control
            as="select"
            value={imageFilter}
            onChange={(event) => setImageFilter(event.target.value)}
            className="mr-sm-2"
          >
            <option value="">All Image Filters</option>
            <option value="normal">Normal</option>
            <option value="furniture">Furniture</option>
            <option value="antiques">Antiques</option>
            <option value="renovation&repair">Renovation & Repair</option>
            <option value="artworks">Artworks</option>
            <option value="tools">Tools</option>
            <option value="construction">Construction</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form>

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
      </Col>
    </Row>
  );
}

export default PostList;