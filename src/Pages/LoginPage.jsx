import React from "react";
import "../Style/Login.css"; 

export default function LandingPage() {
  const handleLogin = () => {
    window.location.href = "https://airtable-backend-production.up.railway.app/api/auth/airtable/login";
  };

  return (
    <div className="landing-container">
      <button className="login-btn" onClick={handleLogin}>
        Login with Airtable
      </button>
    </div>
  );
}
