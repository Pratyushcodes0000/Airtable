import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Style/TableSelector.css";

export default function TableSelector() {
  const { baseId } = useParams();
  console.log("Base ID from params:", baseId);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
console.log("JWT from localStorage:", jwt);
  useEffect(() => {
    async function loadTables() {
      try {
        const res = await fetch(
          `http://localhost:8000/api/airtable/bases/${baseId}/tables`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            }
          }
        );

        const data = await res.json();
        console.log("Tables:", data);

        setTables(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    loadTables();
  }, [baseId]);

  if (loading) return <div className="loading">Loading tables...</div>;

  return (
    <div className="table-selector-page">
      <h2>Select a Table</h2>
      <p className="subtitle">Base ID: {baseId}</p>

      <div className="table-grid">
        {tables.map((table) => (
          <div
            key={table.tableId}
            className="table-card"
            onClick={() =>
              navigate(`/select-fields/${baseId}/${table.tableId}`)
            }
          >
            <h3>{table.name}</h3>
            <p>Table ID: {table.tableId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
