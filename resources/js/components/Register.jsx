import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    codeforcesHandle: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOAuth, setIsOAuth] = useState(false);
  const [handleReadOnly, setHandleReadOnly] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const oauth = urlParams.get('oauth');
    const token = urlParams.get('token');
    const existing = urlParams.get('existing');
    const error = urlParams.get('error');

    if (oauth === 'codeforces') {
      setIsOAuth(true);
      // Fetch OAuth data
      axios.get('/api/oauth/data')
        .then(response => {
          const data = response.data;
          if (data.handle) {
            setForm(prev => ({
              ...prev,
              codeforcesHandle: data.handle,
              email: data.email || prev.email,
              name: data.name || prev.name,
            }));
            setHandleReadOnly(true);
          }
        })
        .catch(err => {
          console.error('Failed to fetch OAuth data:', err);
        });
    }

    if (token && existing === 'true') {
      localStorage.setItem('userToken', token);
      window.location.href = '/dashboard';
    }

    if (error) {
      setError('OAuth authentication failed. Please try again.');
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCodeforcesLogin = () => {
    window.location.href = '/api/oauth/codeforces';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/register', form);
      setSuccess('Account created successfully! Redirecting...');
      localStorage.setItem('userToken', response.data.token);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title mb-4">Create Account</h2>
                
                {!isOAuth && (
                  <div className="mb-3">
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100 mb-3"
                      onClick={handleCodeforcesLogin}
                    >
                      <i className="fab fa-codeforces me-2"></i>
                      Continue with Codeforces
                    </button>
                    <div className="text-center mb-3">
                      <span className="text-muted">or register manually</span>
                    </div>
                  </div>
                )}
                
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Department</label>
                    <input
                      type="text"
                      className="form-control"
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Codeforces Handle</label>
                    <input
                      type="text"
                      className="form-control"
                      name="codeforcesHandle"
                      value={form.codeforcesHandle}
                      onChange={handleChange}
                      required
                      readOnly={handleReadOnly}
                      className={`form-control ${handleReadOnly ? 'bg-light' : ''}`}
                    />
                    {handleReadOnly && (
                      <small className="text-muted">Handle obtained from Codeforces and cannot be changed</small>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Register'}
                  </button>
                </form>
                <p className="mt-3 text-center">
                  Already have an account? <a href="/login">Login here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;