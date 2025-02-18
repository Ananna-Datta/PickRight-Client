import React, { useState, useEffect } from 'react';

const Recommendations = ({ email }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch recommendations from backend
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/recommendation`);
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        const data = await response.json();
        setRecommendations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [email]);

  if (loading) {
    return <div style={styles.loading}>Loading recommendations...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.recommendationsContainer}>
      <h2 style={styles.title}>Recommendations for {email}</h2>
      {recommendations.length === 0 ? (
        <p style={styles.noRecommendations}>No recommendations found.</p>
      ) : (
        <table style={styles.recommendationsTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Recommendation Title</th>
              <th style={styles.tableHeader}>Recommended Product Name</th>
              <th style={styles.tableHeader}>Recommended Product Image</th>
              <th style={styles.tableHeader}>Recommendation Reason</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((recommendation, index) => (
              <tr key={index} style={styles.tableRow}>
                <td>{recommendation.title}</td>
                <td>{recommendation.productName}</td>
                <td>
                  {recommendation.productImage ? (
                    <img
                      src={recommendation.productImage}
                      alt={recommendation.productName}
                      style={styles.productImage}
                    />
                  ) : (
                    <div style={styles.noImage}>No image available</div>
                  )}
                </td>
                <td>{recommendation.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  recommendationsContainer: {
    width: '90%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2rem',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '20px',
  },
  noRecommendations: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#e74c3c',
  },
  recommendationsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    padding: '15px',
    textAlign: 'left',
    border: '1px solid #ddd',
    backgroundColor: '#3498db',
    color: '#fff',
    fontSize: '1rem',
  },
  tableRow: {
    backgroundColor: '#f8f8f8',
    fontSize: '1rem',
  },
  productImage: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  noImage: {
    fontSize: '0.9rem',
    color: '#95a5a6',
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#e74c3c',
    marginTop: '20px',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#e74c3c',
    marginTop: '20px',
  },
};

export default Recommendations;
