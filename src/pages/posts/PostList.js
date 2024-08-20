import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Post from '../../components/Post';
import Asset from '../../components/Asset';
import appStyles from '../../App.module.css';
import styles from '../../styles/PostsPage.module.css';
import { useLocation } from 'react-router-dom';
import { Container, Form, Col, Row, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

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

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
      className={styles.FilterButton}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </button>
  ));

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <div className={styles.SearchFilterContainer}>
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <i className={`fas fa-search ${styles.SearchIcon}`} />
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className="mr-sm-2"
              placeholder="Search posts"
            />
          </Form>
          <Dropdown className={styles.FilterDropdown}>
            <Dropdown.Toggle as={CustomToggle}>
              <FontAwesomeIcon icon={faFilter} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setImageFilter("")}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => setImageFilter("normal")}>Normal</Dropdown.Item>
              <Dropdown.Item onClick={() => setImageFilter("furniture")}>Furniture</Dropdown.Item>
              <Dropdown.Item onClick={() => setImageFilter("antiques")}>Antiques</Dropdown.Item>
              <Dropdown.Item onClick={() => setImageFilter("renovation&repair")}>Renovation & Repair</Dropdown.Item>
              <Dropdown.Item onClick={() => setImageFilter("artworks")}>Artworks</Dropdown.Item>
              <Dropdown.Item onClick={() => setImageFilter("tools")}>Tools</Dropdown.Item>
              <Dropdown.Item onClick={() => setImageFilter("construction")}>Construction</Dropdown.Item>
              <Dropdown.Item onClick={() => setImageFilter("other")}>Other</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

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