import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/ReviewForm.module.css';

function ReviewForm({ professionalId, onReviewAdded }) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosReq.post('/reviews/', { professional: professionalId, rating, content });
      onReviewAdded(data);
      setRating(0);
      setContent('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <div className={styles.starRating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`fas fa-star ${star <= rating ? styles.active : ''}`}
              onClick={() => setRating(star)}
            ></i>
          ))}
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your review..."
        />
      </Form.Group>
      <Button type="submit">Submit Review</Button>
    </Form>
  );
}

export default ReviewForm;