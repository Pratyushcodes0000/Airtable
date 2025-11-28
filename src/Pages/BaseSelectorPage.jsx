import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/BaseSelector.css";

export default function BaseSelector() {
  const [bases, setBases] = useState([]);
  const [Id,setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  console.log("JWT from localStorage:", jwt);
  // Fetch all bases from backend
  useEffect(() => {
    async function loadBases() {
      try {
  const res = await fetch("http://localhost:8000/api/airtable/bases", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    }
  });

  const data = await res.json();
  console.log("Bases:", data);

  // Check if backend returned data in correct structure
  if (!data || !Array.isArray(data.bases)) {
    console.error("Invalid bases response:", data);
    setBases([]);
    return;
  }

  setBases(data.bases);            // store array
  setLoading(false);               // stop spinner

  // Only set ID if at least one base exists
  if (data.bases.length > 0) {
    setId(data.bases[0].baseId);
  }

} catch (err) {
  console.error("Failed to load bases:", err);
}
    }

    loadBases();
  }, []);

  if (loading) return <div className="loading">Loading bases...</div>;

  return (
    <div className="base-selector-page">
      <h2>Select an Airtable Base</h2>

      <div className="base-grid">
        {bases.map((base) => (
          <div
            key={base.baseId}
            className="base-card"
            onClick={() => navigate(`/select-table/${base.baseId}`)}
          >
            <h3>{base.name}</h3>
            <p>Base ID: {base.baseId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
