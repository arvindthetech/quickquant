import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

// Import icons directly
import male1 from "../assets/avatar/male1.png";
import male2 from "../assets/avatar/male2.png";
import male3 from "../assets/avatar/male3.png";
import female1 from "../assets/avatar/female1.png";
import female2 from "../assets/avatar/female2.png";
import female3 from "../assets/avatar/female3.png";

const Profile = ({ user, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(user?.icon || male1); // Default icon
  const [profileData, setProfileData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: user?.phone || "+1 123 456 7890",
    bio: user?.bio || "Finance enthusiast...",
  });
  const navigate = useNavigate();

  // Pre-designed icons
  const icons = [
    { name: "male1", src: male1 },
    { name: "male2", src: male2 },
    { name: "male3", src: male3 },
    { name: "female1", src: female1 },
    { name: "female2", src: female2 },
    { name: "female3", src: female3 },
  ];

  // Handle logout
  const handleLogout = () => {
    onLogout();
    navigate("/"); // Redirect to home page
  };

  // Handle save changes
  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Save changes to backend (mock for now)
    setIsEditing(false);
  };

  return (
    <div className="profile-section">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-icon-container">
          <img
            src={selectedIcon} // Use the imported icon directly
            alt="Profile Icon"
            className="profile-icon"
          />
        </div>
        <h2 className="profile-name">{profileData.name}</h2>
        <p className="profile-username">{user?.username || "@johndoe123"}</p>
      </div>

      {/* User Information */}
      <div className="profile-info">
        <div className="profile-field">
          <strong>Email:</strong>
          <span>{profileData.email}</span>
        </div>
        <div className="profile-field">
          <strong>Phone:</strong>
          <span>{profileData.phone}</span>
        </div>
        <div className="profile-field">
          <strong>Bio:</strong>
          <span>{profileData.bio}</span>
        </div>
      </div>

      {/* Preferences */}
      <div className="profile-preferences">
        <div className="profile-preference">
          <span>Theme: Dark Mode</span>
          <label className="profile-toggle">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
        <div className="profile-preference">
          <span>Notifications</span>
          <label className="profile-toggle">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* Edit Profile and Logout Buttons */}
      <div className="profile-actions">
        <button
          className="profile-edit-button"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
        <button className="profile-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="profile-modal">
          <div className="profile-modal-content">
            <h3>Edit Profile</h3>
            <form onSubmit={handleSaveChanges}>
              <div className="profile-modal-field">
                <label>Name:</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                />
              </div>
              <div className="profile-modal-field">
                <label>Email:</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                />
              </div>
              <div className="profile-modal-field">
                <label>Phone:</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                />
              </div>
              <div className="profile-modal-field">
                <label>Bio:</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                />
              </div>
              <div className="profile-modal-field">
                <label>Avatar:</label>
                <div className="profile-icon-list">
                  {icons.map((icon) => (
                    <img
                      key={icon.name}
                      src={icon.src} // Use the imported icon directly
                      alt={icon.name}
                      className={`profile-icon-option ${
                        selectedIcon === icon.src ? "selected" : ""
                      }`}
                      onClick={() => setSelectedIcon(icon.src)}
                    />
                  ))}
                </div>
              </div>
              <button type="submit" className="profile-save-button">
                Save Changes
              </button>
              <button
                type="button"
                className="profile-cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;