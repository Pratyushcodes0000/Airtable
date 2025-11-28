import React, { useEffect, useState } from "react";
import "../Style/Dashboard.css";
import { useNavigate } from "react-router-dom";

export default function FormDashboard() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    async function loadForms() {
      try {
        const res = await fetch("http://localhost:8000/api/my-forms", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load forms");

        const data = await res.json();
        setForms(data.forms);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadForms();
  }, [jwt]);

  if (loading) return <div className="dashboard-loading">Loading forms...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Your Forms</h1>

      {forms.length === 0 ? (
        <div className="dashboard-error">No forms created yet.</div>
      ) : (
        <div className="forms-grid">
          {forms.map(form => (
            <div className="form-card" key={form._id}>
              <h2 className="form-title">{form.name}</h2>

              <p className="form-meta">Base: {form.airtableBaseId}</p>
              <p className="form-meta">Table: {form.airtableTableId}</p>

              <p className="form-date">
                Created: {new Date(form.createdAt).toLocaleDateString()}
              </p>

              <button className="form-button" onClick={()=>navigate(`/form/${form._id}`)}>View Form Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
