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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here (e.g., send data to backend)
    console.log('Form Data:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      suggestion: '',
    });
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
              <button type="submit" className="btn btn-primary w-100">
                 Send Message
              </button>
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