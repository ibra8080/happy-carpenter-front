import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/JobOfferForm.module.css';
import btnStyles from "../../styles/Button.module.css";


function JobOfferForm({ professionalId }) {
  const [jobOfferData, setJobOfferData] = useState({
    title: '',
    description: '',
    budget: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setJobOfferData({
      ...jobOfferData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosReq.post('/job-offers/', { 
        ...jobOfferData,
        professional: professionalId,
      });
      setSubmitted(true);
      setJobOfferData({ title: '', description: '', budget: '' });
      setError('');
    } catch (err) {
      console.log(err);
      setError('Failed to send job offer. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.jobOfferForm}>
      <Form.Group>
        <Form.Label>Job Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={jobOfferData.title}
          onChange={handleChange}
          placeholder="Enter job title"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={jobOfferData.description}
          onChange={handleChange}
          placeholder="Describe the job..."
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Budget</Form.Label>
        <Form.Control
          type="number"
          name="budget"
          value={jobOfferData.budget}
          onChange={handleChange}
          placeholder="Enter budget"
        />
      </Form.Group>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">Send Job Offer</Button>
      {submitted && <Alert variant="success">Job offer sent successfully!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
    </Form>
  );
}

export default JobOfferForm;