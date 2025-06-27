import React from "react";
import "../styles/ProfileSuccess.css";
import { CheckCircle } from "lucide-react"; 

const ProfileSuccess = ({ fullName, email }) => {
  return (
    <div className="success-container">
      <CheckCircle size={48} color="#2d7a3e" />
      <h2>Profile Submitted Successfully!</h2>
      <p>{fullName}'s profile has been created and saved. A confirmation email was sent to {email}.</p>
    </div>
  );
};

export default ProfileSuccess;
