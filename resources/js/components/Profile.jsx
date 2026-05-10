import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Profile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    codeforcesHandle: '',
    rating: 0
  });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/api/user');
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load profile');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.put('/api/user/profile', user);
      setSuccess('Profile updated successfully');
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile');
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mt-5">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="card-title">My Profile</h2>
                  {!editing && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setEditing(true)}
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                {!editing ? (
                  <div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Name:</label>
                      <p>{user.name}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Email:</label>
                      <p>{user.email}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Phone:</label>
                      <p>{user.phone}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Department:</label>
                      <p>{user.department}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Codeforces Handle:</label>
                      <p>
                        <a
                          href={`https://codeforces.com/profile/${user.codeforcesHandle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {user.codeforcesHandle}
                        </a>
                      </p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Codeforces Rating:</label>
                      <p>{user.rating}</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={user.name}
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
                        value={user.email}
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
                        value={user.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Department</label>
                      <input
                        type="text"
                        className="form-control"
                        name="department"
                        value={user.department}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Codeforces Handle</label>
                      <input
                        type="text"
                        className="form-control"
                        name="codeforcesHandle"
                        value={user.codeforcesHandle}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-success">
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setEditing(false);
                          fetchUserProfile();
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
