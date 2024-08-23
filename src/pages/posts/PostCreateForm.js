import React, { useState } from "react";
import { Form, Button, Container, Alert, Image } from "react-bootstrap";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function PostCreateForm() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: null,
    image_filter: "normal",
    categories: [],
  });
  const { title, content, image, image_filter, categories } = postData;
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    setPostData({
      ...postData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
  
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image_filter", image_filter);
    if (image) {
      formData.append("image", image);
    }
    categories.forEach((category) => {
      formData.append("categories", category);
    });
  
    try {
      const { data } = await axiosReq.post("/posts/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };
  
  const textFields = (
    <>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Image</Form.Label>
        <Form.File
          id="image-upload"
          accept="image/*"
          onChange={handleChange}
          name="image"
        />
      </Form.Group>
      {errors?.image?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {image && (
        <Image src={URL.createObjectURL(image)} rounded fluid />
      )}

      <Form.Group>
        <Form.Label>Image Filter</Form.Label>
        <Form.Control
          as="select"
          name="image_filter"
          value={image_filter}
          onChange={handleChange}
        >
          <option value="normal">Normal</option>
          <option value="furniture">Furniture</option>
          <option value="antiques">Antiques</option>
          <option value="renovation&repair">Renovation & Repair</option>
          <option value="artworks">Artworks</option>
          <option value="tools">Tools</option>
          <option value="construction">Construction</option>
          <option value="other">Other</option>
        </Form.Control>
      </Form.Group>
      {errors?.image_filter?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Categories</Form.Label>
        <Form.Control
          type="text"
          name="categories"
          value={categories.join(", ")}
          onChange={(e) => setPostData({...postData, categories: e.target.value.split(", ")})}
          placeholder="Enter categories separated by commas"
        />
      </Form.Group>
      {errors?.categories?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => navigate(-1)}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Create
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Container className={`${appStyles.Content} ${styles.Container}`}>
        {textFields}
      </Container>
    </Form>
  );
}

export default PostCreateForm;