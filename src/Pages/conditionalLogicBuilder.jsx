import React, { useState } from "react";
import '../Style/conditionalLogicBuilder.css';

const ConditionalLogicModal = ({ open, onClose, fields = [], onSave }) => {
  const emptyRule = {
    ifField: "",
    operator: "",
    value: "",
    action: "",
    targetField: ""
  };

  const [rules, setRules] = useState([]);

  if (!open) return null;

  const addRule = () => {
    setRules([...rules, { ...emptyRule }]);
  };

  const updateRule = (index, key, value) => {
    const updated = [...rules];
    updated[index][key] = value;
    setRules(updated);
  };

  const deleteRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(rules);
    onClose();
  };

  return (
    <div className="logic-overlay">
      <div className="logic-modal">
        
        <div className="logic-header">
          <h2>Conditional Logic</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <p className="logic-subtitle">Create rules that control field visibility or requirements.</p>

        <div className="rules-container">
          {rules.length === 0 && (
            <div className="empty-state">No rules yet. Click “Add Rule” to start.</div>
          )}

          {rules.map((rule, index) => (
            <div className="rule-card" key={index}>
              <div className="row">
                <span>IF</span>
                <select
                  value={rule.ifField}
                  onChange={(e) => updateRule(index, "ifField", e.target.value)}
                >
                  <option value="">Select field</option>
                  {fields.map((f) => (
                    <option key={f.id} value={f.id}>{f.label}</option>
                  ))}
                </select>

                <select
                  value={rule.operator}
                  onChange={(e) => updateRule(index, "operator", e.target.value)}
                >
                  <option value="">Operator</option>
                  <option value="equals">equals</option>
                  <option value="not_equals">not equals</option>
                  <option value="contains">contains</option>
                  <option value="greater">greater than</option>
                  <option value="less">less than</option>
                </select>

                <input
                  placeholder="Value"
                  value={rule.value}
                  onChange={(e) => updateRule(index, "value", e.target.value)}
                />
              </div>

              <div className="row">
                <span>THEN</span>
                <select
                  value={rule.action}
                  onChange={(e) => updateRule(index, "action", e.target.value)}
                >
                  <option value="">Choose action</option>
                  <option value="show">Show</option>
                  <option value="hide">Hide</option>
                  <option value="require">Make Required</option>
                  <option value="disable">Disable Field</option>
                </select>

                <select
                  value={rule.targetField}
                  onChange={(e) => updateRule(index, "targetField", e.target.value)}
                >
                  <option value="">Field</option>
                  {fields.map((f) => (
                    <option key={f.id} value={f.id}>{f.label}</option>
                  ))}
                </select>

                <button className="delete-btn" onClick={() => deleteRule(index)}>🗑</button>
              </div>
            </div>
          ))}
        </div>

        <button className="add-btn" onClick={addRule}>+ Add Rule</button>

        <div className="actions">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="save" onClick={handleSave}>Save Rules</button>
        </div>
      </div>
    </div>
  );
};

export default ConditionalLogicModal;
