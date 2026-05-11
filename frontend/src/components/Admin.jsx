import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Admin() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    open: false
  });
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await axios.get('/api/trainings');
      setTrainings(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Failed to fetch trainings:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await axios.post('/api/admin/training', form);
      setMessage('Training program added successfully!');
      setForm({ title: '', description: '', open: false });
      fetchTrainings();
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding training');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTraining = async (id) => {
    if (window.confirm('Are you sure you want to delete this training?')) {
      try {
        await axios.delete(`/api/admin/training/${id}`);
        setMessage('Training deleted successfully');
        fetchTrainings();
      } catch (err) {
        setError('Error deleting training');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">⚙️ Admin Dashboard</h2>

        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0">Add New Training Program</h5>
              </div>
              <div className="card-body">
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Training Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="e.g., Advanced Dynamic Programming"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Describe the training content..."
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="openCheck"
                      name="open"
                      checked={form.open}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="openCheck">
                      Open for Applications
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? '⏳ Adding...' : '➕ Add Training'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0">Manage Training Programs</h5>
              </div>
              <div className="card-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {trainings.length === 0 ? (
                  <p className="text-muted">No training programs yet.</p>
                ) : (
                  <div className="list-group">
                    {trainings.map((training) => (
                      <div key={training.id} className="list-group-item">
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{training.title}</h5>
                          <span className={`badge ${training.open ? 'bg-success' : 'bg-secondary'}`}>
                            {training.open ? 'Open' : 'Closed'}
                          </span>
                        </div>
                        <p className="mb-2 small">{training.description}</p>
                        <small className="text-muted">
                          Created: {new Date(training.created_at).toLocaleDateString()}
                        </small>
                        <div className="mt-2">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteTraining(training.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;