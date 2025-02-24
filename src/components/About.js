import React from 'react';
import myphoto from '../assets/Arvind.jpg';
import './About.css'; // Create this file for styling

const About = () => {
  return (
    <div className="about-page" style={styles.page}>
      <div className="container mt-4">
        <h2 className="text-center mb-4" style={styles.heading}>🌟 About Us 🌟</h2>

        {/* App Description */}
        <div className="mb-5">
          <h3 style={styles.subHeading}>App Description</h3>
          <p style={styles.description}>
            QuickQuant is designed to help students improve their speed and accuracy while solving quantitative math and reasoning problems. Here’s how we do it:
          </p>
          <ul style={styles.list}>
            <li>🚀 <strong>Speed Enhancement:</strong> Practice with timed quizzes to improve your problem-solving speed.</li>
            <li>🧠 <strong>Concept Mastery:</strong> Learn and master key concepts with interactive learning modules.</li>
            <li>📊 <strong>Performance Tracking:</strong> Get detailed feedback and track your progress over time.</li>
          </ul>
        </div>


        {/* Vision Statement */}
        <div className="mb-5">
          <h3 style={styles.subHeading}>Our Vision</h3>
          <p style={styles.description}>
            At QuickQuant, we believe that every student has the potential to excel in quantitative math and reasoning, regardless of their background. Our mission is to help students overcome their fear of math and prepare effectively for competitive exams like SSC, Railway, and Banking. We especially focus on non-math stream students, providing them with the tools and confidence they need to succeed.
          </p>
        </div>

        {/* Future Features */}
        <div className="mb-5">
          <h3 style={styles.subHeading}>What’s Coming Next?</h3>
          <p style={styles.description}>
            We’re constantly working to make QuickQuant even better. Here are some exciting features we’re planning to add:
          </p>
          <ul style={styles.list}>
            <li>🧩 <strong>Reasoning and Quantitative Question-Solving:</strong> Chapter-wise practice with new methodologies.</li>
            <li>📚 <strong>PYQs (Previous Year Questions):</strong> Practice with real exam questions.</li>
            <li>💡 <strong>Tricks and Tips:</strong> Learn shortcuts and strategies to solve problems faster.</li>
            <li>📝 <strong>Formula Sheets:</strong> Quick reference guides for key concepts.</li>
            <li>🤖 <strong>Interactive Learning:</strong> AI-powered personalized learning experiences.</li>
          </ul>
        </div>

         {/* My Introduction */}
         <div className="mb-5 text-center">
          <h3 style={styles.subHeading}>Meet the Developer</h3>
          <div className="developer-intro">
            <img src={myphoto} alt="Arvind Kumar Patel" style={styles.photo}/>
            {/*<img
              src="/assets/Arvind.jpg" // Replace with your photo path
              alt="Arvind Kumar Patel"
              style={styles.photo}
            />*/}
            <h4 style={styles.name}>Arvind Kumar Patel</h4>
            <p style={styles.role}>Developer and Learner</p>
            <p style={styles.bio}>
              I am passionate developer with a strong interest in creating educational tools that make learning fun and effective. With a background in computer science and a love for teaching, he aims to bridge the gap between technology and education.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  page: {
    background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
    minHeight: '100vh',
    padding: '20px',
  },
  heading: {
    color: '#1E3A8A', // Deep Blue
    fontWeight: '700',
  },
  subHeading: {
    color: '#1E3A8A', // Deep Blue
    fontWeight: '600',
    marginBottom: '20px',
  },
  description: {
    fontSize: '18px',
    color: '#1F2937', // Dark Gray
    lineHeight: '1.6',
  },
  list: {
    fontSize: '16px',
    color: '#1F2937', // Dark Gray
    lineHeight: '1.8',
    paddingLeft: '20px',
  },
  photo: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginBottom: '20px',
    border: '4px solid #1E3A8A', // Deep Blue
  },
  name: {
    fontSize: '24px',
    color: '#1E3A8A', // Deep Blue
    fontWeight: '600',
    marginBottom: '10px',
  },
  role: {
    fontSize: '18px',
    color: '#1F2937', // Dark Gray
    marginBottom: '10px',
  },
  bio: {
    fontSize: '16px',
    color: '#1F2937', // Dark Gray
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto',
  },
};

export default About;