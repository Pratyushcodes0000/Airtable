import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export default function OAuthCallback() {
  const { setJwt, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract ?jwt= from the URL
  const getJWTFromURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get("jwt");
  };

  useEffect(() => {
    const finishLogin = async () => {
      const jwt = getJWTFromURL();

      if (!jwt) {
        console.error("No JWT found in URL.");
        navigate("/login");
        return;
      }

      // Save in context
      setJwt(jwt);

      // Save in localStorage
      localStorage.setItem("jwt", jwt);

      // OPTIONAL: Fetch user profile using your backend
      try {
        const res = await fetch("http://localhost:8000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed fetching user:", err);
      }

      // Redirect to dashboard
      navigate("/select-base");
    };

    finishLogin();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Authenticating...</h2>
      <p>Please wait while we finalize your login.</p>
    </div>
  );
}
