import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

const Card = ({ title, link, icon }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    // Simulate a delay (e.g., API call or navigation)
    setTimeout(() => {
      setLoading(false);
      window.location.href = link; // Navigate to the link
    }, 1000); // 1-second delay
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '10px' }}>
              {icon}
            </span>
            <span style={{ verticalAlign: 'middle' }}>{title}</span>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={20} color="#ffffff" /> // Loading spinner
            ) : (
              'Go'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;