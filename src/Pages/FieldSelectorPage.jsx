import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Style/FieldSelector.css";

export default function FieldSelector() {
  const { baseId, tableId } = useParams();
  const [fields, setFields] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    async function loadFields() {
      try {
        const res = await fetch(
          `http://localhost:8000/api/airtable/bases/${baseId}/tables/${tableId}/fields`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json"
            }
          }
        );

        const data = await res.json();
        console.log("Fields:", data);

        setFields(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    loadFields();
  }, [baseId, tableId]);

  const toggleField = (field) => {
    const key = field.name; // FIXED — use name as unique key

    setSelected((prev) => {
      if (prev[key]) {
        const clone = { ...prev };
        delete clone[key];
        return clone;
      }

      return {
        ...prev,
        [key]: {
          questionKey: key,
          airtableFieldId: key,
          label: field.name,
          type: field.type,
          required: false,
          conditionalRules: null
        }
      };
    });
  };

  const setLabel = (fieldName, newLabel) => {
    setSelected((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        label: newLabel
      }
    }));
  };

  const toggleRequired = (fieldName) => {
    setSelected((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        required: !prev[fieldName].required
      }
    }));
  };

  const proceed = () => {
    const questions = Object.values(selected);

    navigate("/builder/preview", {
      state: {
        baseId,
        tableId,
        questions
      }
    });
  };

  if (loading) return <div className="loading">Loading fields...</div>;

  return (
    <div className="field-selector-page">
      <h2>Select Fields</h2>
      <p className="subtitle">
        Base: {baseId} <br /> Table: {tableId}
      </p>

      <div className="field-list">
        {fields.map((field) => {
          const key = field.name;
          const isSelected = !!selected[key];

          return (
            <div key={key} className={`field-card ${isSelected ? "selected" : ""}`}>
              <div className="top-row">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleField(field)}
                />
                <h3>{field.name}</h3>
              </div>

              <p className="field-type">{field.type}</p>

              {isSelected && (
                <div className="field-options">
                  <label>
                    Label:
                    <input
                      type="text"
                      value={selected[key].label}
                      onChange={(e) => setLabel(key, e.target.value)}
                    />
                  </label>

                  <label className="required-toggle">
                    Required:
                    <input
                      type="checkbox"
                      checked={selected[key].required}
                      onChange={() => toggleRequired(key)}
                    />
                  </label>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {Object.keys(selected).length > 0 && (
        <button className="continue-btn" onClick={proceed}>
          Continue to Form Builder →
        </button>
      )}
    </div>
  );
}
