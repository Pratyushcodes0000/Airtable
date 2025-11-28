import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Style/ResponseListingPage.css";

const ResponseListingPage = () => {
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResponses = async () => {
    try {
      const res = await fetch(
        `https://airtable-backend-production.up.railway.app/api/forms/${formId}/responses`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      const data = await res.json();
      setResponses(data.responses || []);
    } catch (error) {
      console.log("Error fetching responses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  return (
    <div className="response-page-container">
      <h2 className="response-title">Form Responses</h2>

      {loading ? (
        <div className="response-loading">Loading...</div>
      ) : responses.length === 0 ? (
        <div className="response-empty">No responses found</div>
      ) : (
        <div className="response-table">
          
          {/* Table Header */}
          <div className="response-header">
            <div>Record ID</div>
            <div>Name</div>
            <div>Status</div>
            <div>Created At</div>
            <div>View</div>
          </div>

          {/* Table Rows */}
          {responses.map((r) => (
            <div className="response-row" key={r._id}>
              <div>{r.airtableRecordId}</div>
              <div>{r.answers?.Name || "-"}</div>
              <div>{r.answers?.Status || "-"}</div>
              <div>{new Date(r.createdAt).toLocaleString()}</div>
              <div>
                <button
                  className="view-btn"
                  onClick={() => {
                    window.location.href = `/responses/${r._id}`;
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResponseListingPage;
