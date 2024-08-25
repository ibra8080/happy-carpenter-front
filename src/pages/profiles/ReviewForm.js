import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/ReviewForm.module.css';
import btnStyles from "../../styles/Button.module.css";


function ReviewForm({ professionalId, onReviewAdded }) {
  console.log('Professional ID:', professionalId);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
  
    if (content.trim() === '') {
      setError('Please enter a review');
      return;
    }
  
    try {
      const adjustedProfessionalId = professionalId - 2; // Adjust the ID
      console.log('Adjusted Professional ID:', adjustedProfessionalId);
      
      const response = await axiosReq.post('/reviews/', {
        professional: adjustedProfessionalId,
        rating,
        content
      });
      console.log('Review submission response:', response.data);
      onReviewAdded(response.data);
      setRating(0);
      setContent('');
      setSuccess('Review submitted successfully!');
    } catch (err) {
      console.error('Review submission error:', err.response?.data);
      setError(err.response?.data?.detail || 'An error occurred while submitting the review');
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
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">Submit Review</Button>
    </Form>
  );
}

export default ReviewForm;