import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Dashboard() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    codeforcesHandle: '',
    rating: 0
  });
  const [stats, setStats] = useState({
    problemsSolved: 0,
    contestsAttended: 0,
    currentRating: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/user');
      setUser(response.data);
      // Mock stats - replace with actual API call
      setStats({
        problemsSolved: 45,
        contestsAttended: 5,
        currentRating: response.data.rating || 1200
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mt-5">
          <div className="text-center">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-5">Welcome, {user.name}!</h1>

        <div className="row mb-5">
          <div className="col-md-3 mb-4">
            <div className="card bg-primary text-white">
              <div className="card-body">
                <h5 className="card-title">Problems Solved</h5>
                <p className="display-6">{stats.problemsSolved}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">Contests Attended</h5>
                <p className="display-6">{stats.contestsAttended}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card bg-info text-white">
              <div className="card-body">
                <h5 className="card-title">Codeforces Rating</h5>
                <p className="display-6">{stats.currentRating}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card bg-warning text-dark">
              <div className="card-body">
                <h5 className="card-title">Level</h5>
                <p className="display-6">
                  {stats.currentRating >= 1600 ? 'Expert' : stats.currentRating >= 1200 ? 'Candidate Master' : 'Beginner'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">My Information</h5>
                <hr />
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Codeforces:</strong> <a href={`https://codeforces.com/profile/${user.codeforcesHandle}`} target="_blank" rel="noopener noreferrer">{user.codeforcesHandle}</a></p>
                <a href="/profile" className="btn btn-sm btn-primary">Edit Profile</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Quick Actions</h5>
                <hr />
                <div className="d-grid gap-2">
                  <a href="/compiler" className="btn btn-outline-primary">Online Compiler</a>
                  <a href="/trainings" className="btn btn-outline-success">Training Problems</a>
                  <a href="/standings" className="btn btn-outline-info">View Standings</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;