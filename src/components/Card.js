import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Card = ({ title, link, icon }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    // Simulate a delay (e.g., API call or navigation)
    setTimeout(() => {
      setLoading(false);
    }, 500); // Reduced delay to 0.5 seconds for snappier feel
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card h-100">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '10px' }}>
              {icon}
            </span>
            <span style={{ verticalAlign: 'middle' }}>{title}</span>
          </div>
          <Link
            to={link}
            className="btn btn-primary" // Use btn-primary for consistent styling
            onClick={handleClick}
          >
            {loading ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              'Go'
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
