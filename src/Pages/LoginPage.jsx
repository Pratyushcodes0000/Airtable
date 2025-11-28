import React from "react";
import "../Style/Login.css"; 

export default function LandingPage() {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/airtable/login";
  };

  return (
    <div className="landing-container">
      <button className="login-btn" onClick={handleLogin}>
        Login with Airtable
      </button>
    </div>
  );
}
