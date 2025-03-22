/* import React, { useState } from 'react';
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

export default Card; */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Card = ({ title, link, icon, darkMode }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    // Simulate a delay (e.g., API call or navigation)
    setTimeout(() => {
      setLoading(false);
    }, 500); // Reduced delay to 0.5 seconds for snappier feel
  };

  return (
    <div className="col-6 col-md-4 col-lg-3 mb-4"> {/* Adjusted for 2 cards per row on mobile */}
      <Link
        to={link}
        className={`card h-100 ${darkMode ? 'dark-mode' : ''}`}
        onClick={handleClick}
        style={{ textDecoration: 'none', color: 'inherit' }} // Remove default link styling
      >
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <div className="text-center">
            <span className="material-icons" style={{ fontSize: '2rem', marginBottom: '10px' }}>
              {icon}
            </span>
            <h5 className="card-title mb-0">{title}</h5>
          </div>
          {loading && (
            <div className="mt-3">
              <ClipLoader size={20} color={darkMode ? '#ffffff' : '#000000'} />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Card;