import React, { useState } from 'react';
import { Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Contact.css'; // Create this file for styling

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    suggestion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable button during submission
  const [submissionError, setSubmissionError] = useState(''); // To display error messages
  const [submissionSuccess, setSubmissionSuccess] = useState(false); // To indicate successful submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmissionError(''); // Clear any previous error on input change
    setSubmissionSuccess(false); // Reset success message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError('');
    setSubmissionSuccess(false);

    try {
      // Determine the correct API endpoint based on the environment
      const apiUrl = process.env.NODE_ENV === 'production'
        ? 'https://quickquant-backend.onrender.com/api/contact'
        : 'http://localhost:5000/api/contact';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setIsSubmitting(false);

      if (response.ok) {
        setSubmissionSuccess(true);
        alert('Thank you for contacting us! We will get back to you soon.');
        // Reset the form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          suggestion: '',
        });
      } else {
        const errorData = await response.json();
        console.error('Contact form submission failed:', errorData);
        setSubmissionError(errorData.message || 'Something went wrong. Please try again later.');
        alert(errorData.message || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error submitting form:', error);
      setSubmissionError('Failed to connect to the server. Please try again later.');
      alert('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <div className="contact-page">
      <div className="container mt-4">
        <h2 className="text-center mb-4"> Contact Us </h2>
        <div className="text-center mb-4">
          <p>
            Hello, amazing learners! We’re thrilled that you’re using QuickQuant to master your skills.
            Whether you have feedback, questions, or suggestions to improve the app, we’d love to hear from you.
            Your input helps us make QuickQuant even better for everyone. Feel free to reach out—we’re here to help!
          </p>
        </div>

        {/* Contact Form */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-control"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="suggestion" className="form-label">Suggestion (optional)</label>
                <textarea
                  id="suggestion"
                  name="suggestion"
                  className="form-control"
                  rows="4"
                  value={formData.suggestion}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submissionError && <div className="mt-2 text-danger">{submissionError}</div>}
              {submissionSuccess && <div className="mt-2 text-success">Message sent successfully!</div>}
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-5">
          <h3> Contact Information</h3>
          <p>
            <Mail size={20} className="me-2" /> support@quickquant.com
          </p>
          <div className="social-links mt-3">
            <a href="https://www.facebook.com/arvindthetech" aria-label="Facebook">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com/arvindthetech" aria-label="Twitter">
              <Twitter size={24} />
            </a>
            <a href="https://www.instagram.com/arvindthetech/" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/arvindthetech/" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;