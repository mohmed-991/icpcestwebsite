import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await axios.get('/api/trainings');
      setTrainings(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load trainings');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mt-5">
          <div className="text-center">Loading training programs...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">Training Programs</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        {trainings.length === 0 ? (
          <div className="alert alert-info">
            No training programs available yet. Please check back later!
          </div>
        ) : (
          <div className="row">
            {trainings.map((training) => (
              <div key={training.id} className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{training.title}</h5>
                    <p className="card-text">{training.description}</p>
                    <p className="text-muted">
                      <small>Created: {new Date(training.created_at).toLocaleDateString()}</small>
                    </p>
                    {training.open ? (
                      <div className="d-flex gap-2">
                        <button className="btn btn-success btn-sm">✅ Enroll</button>
                        <button className="btn btn-outline-primary btn-sm">📖 View Details</button>
                      </div>
                    ) : (
                      <div className="alert alert-secondary mb-0" role="alert">
                        <small>Registration Closed</small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Trainings;