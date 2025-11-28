import React, { useEffect, useState } from "react";
import "../Style/ViewFormDetails.css";
import { useNavigate, useParams } from "react-router-dom";

const ViewFormDetails = () => {
  const navigate = useNavigate();
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch form details
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/forms/${formId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load form");

        const data = await res.json();
        setForm(data.form);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [formId]);

  if (loading) return <h2>Loading...</h2>;
  if (!form) return <h2>Could not load form.</h2>;

  return (
    <div className="view-form-details-container">
      <h1 className="page-title">Form Details</h1>

      {/* Basic Info */}
      <div className="detail-card">
        <h2>Basic Information</h2>
        <div className="detail-row"><strong>Form ID:</strong> {form._id}</div>
        <div className="detail-row"><strong>Owner:</strong> {form.owner}</div>
        <div className="detail-row"><strong>Base ID:</strong> {form.airtableBaseId}</div>
        <div className="detail-row"><strong>Table ID:</strong> {form.airtableTableId}</div>
        <div className="detail-row">
          <strong>Created:</strong> {new Date(form.createdAt).toLocaleString()}
        </div>
      </div>

      {/* Questions */}
      <div className="detail-card">
        <h2>Questions</h2>

        {form?.questions?.map((q) => (
          <div key={q._id} className="question-item">
            <div><strong>Label:</strong> {q.label}</div>
            <div><strong>Key:</strong> {q.questionKey}</div>
            <div><strong>Type:</strong> {q.type}</div>
            <div><strong>Airtable Field:</strong> {q.airtableFieldId}</div>
            <div><strong>Required:</strong> {q.required ? "Yes" : "No"}</div>
          </div>
        ))}
      </div>

      <button className="form-button" onClick={() => navigate(`/forms/${form._id}/responses`)}>
        View and Fill out Form
      </button>
    </div>
  );
};

export default ViewFormDetails;
