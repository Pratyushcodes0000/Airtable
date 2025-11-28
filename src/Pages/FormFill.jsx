import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Style/FormFill.css";

const FormFill = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/forms/${formId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        const data = await res.json();
        setForm(data.form);
      } catch (error) {
        console.error("Failed to load form:", error);
      }
    };

    fetchForm();
  }, [formId]);

  const handleChange = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/api/forms/${formId}/submit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ answers: responses }),
    });
    console.log("Submitted:", responses);
  };

  if (!form) return <p>Loading form...</p>;

  return (
    <div className="form-fill-container">
      <h1 className="form-title">{form.title}</h1>
      <p className="form-description">{form.description}</p>

      <form className="form-card" onSubmit={handleSubmit}>
       {form.questions?.map((q) => (
  <div key={q._id} className="form-field">
    <label>{q.label}</label>

    {q.type === "textarea" ? (
      <textarea
        className="input"
        onChange={(e) => handleChange(q.questionKey, e.target.value)}
      />
    ) : (
      <input
        type={q.type}
        className="input"
        onChange={(e) => handleChange(q.questionKey, e.target.value)}
      />
    )}
  </div>
))}

        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default FormFill;
