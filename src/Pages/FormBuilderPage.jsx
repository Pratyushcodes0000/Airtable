import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Style/FormBuilder.css";

import ConditionalLogicModal from "./conditionalLogicBuilder";

export default function FormBuilder() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) return <div>No form data provided.</div>;

  const { baseId, tableId, questions: initialQuestions } = state;

  const [title, setTitle] = useState("Untitled Form");
  const [questions, setQuestions] = useState(initialQuestions);

  // modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [currentLogicField, setCurrentLogicField] = useState(null);

  // handle label change
  const updateLabel = (key, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.questionKey === key ? { ...q, label: value } : q))
    );
  };

  // toggle required
  const toggleRequired = (key) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.questionKey === key ? { ...q, required: !q.required } : q
      )
    );
  };

  // reorder (move up)
  const moveUp = (index) => {
    if (index === 0) return;
    const newArr = [...questions];
    [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
    setQuestions(newArr);
  };

  // reorder (move down)
  const moveDown = (index) => {
    if (index === questions.length - 1) return;
    const newArr = [...questions];
    [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
    setQuestions(newArr);
  };

  // open conditional logic editor
  const openLogicEditor = (question) => {
    setCurrentLogicField(question);
    setModalOpen(true);
  };

  // save logic rules inside the question
  const saveLogicRules = (rules) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.questionKey === currentLogicField.questionKey
          ? { ...q, conditionalRules: rules }
          : q
      )
    );
  };

  // save form to backend
  const saveForm = async () => {
    const body = {
      airtableBaseId: baseId,
      airtableTableId: tableId,
      title,
      questions
    };

    const res = await fetch("https://airtable-backend-production.up.railway.app/api/forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log("Saved:", data);

    alert("Form Created!");
    navigate(`/dashboard`);
  };

  return (
    <div className="form-builder">
      <h2>Form Builder</h2>

      <input
        className="form-title-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Form Title"
      />

      <div className="question-list">
        {questions.map((q, i) => (
          <div key={q.questionKey} className="question-card">
            <div className="top-row">
              <strong>{q.label}</strong>
              <span className="type">{q.type}</span>
            </div>

            <div className="edit-row">
              <label>Label</label>
              <input
                type="text"
                value={q.label}
                onChange={(e) =>
                  updateLabel(q.questionKey, e.target.value)
                }
              />
            </div>

            <div className="edit-row">
              <label>Required</label>
              <input
                type="checkbox"
                checked={q.required}
                onChange={() => toggleRequired(q.questionKey)}
              />
            </div>

            <div className="actions">
              <button onClick={() => moveUp(i)}>↑ Move Up</button>
              <button onClick={() => moveDown(i)}>↓ Move Down</button>

              <button onClick={() => openLogicEditor(q)}>
                Conditional Logic
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="save-btn" onClick={saveForm}>
        Save Form
      </button>

      {/* Conditional Logic Modal */}
      <ConditionalLogicModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fields={questions}             // you can target ANY field
        onSave={saveLogicRules}        // save into the correct question
      />
    </div>
  );
}
