import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Standings() {
  const [standings, setStandings] = useState([]);
  const [group, setGroup] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadStandings = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await axios.get('/api/standings', { params: { group } });
      setStandings(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load standings');
      // Show mock data for demo
      setStandings([
        { handle: 'user1', score: 2500, group: 'Group 1', rating: 1600 },
        { handle: 'user2', score: 2300, group: 'Group 1', rating: 1550 },
        { handle: 'user3', score: 2100, group: 'Group 2', rating: 1400 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStandings();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">Live Standings</h2>
        <p className="text-muted">Track the performance of all participants in our training contests.</p>

        <div className="row mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                placeholder="Filter by group (e.g., Group 1)"
              />
              <button
                className="btn btn-primary"
                onClick={loadStandings}
                disabled={loading}
              >
                {loading ? '⏳ Loading...' : '🔄 Refresh'}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-warning">
            <strong>Note:</strong> {error} Showing mock data for demonstration.
          </div>
        )}

        {standings.length === 0 ? (
          <div className="alert alert-info">
            No standings data available yet. Participate in contests to appear here!
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: '60px' }}>#</th>
                  <th>Handle</th>
                  <th className="text-center">Score/Rating</th>
                  <th>Group</th>
                  <th className="text-center">Codeforces Profile</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((item, index) => (
                  <tr key={index} className={index < 3 ? 'table-light' : ''}>
                    <td>
                      <strong>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                      </strong>
                    </td>
                    <td>
                      <strong>{item.handle || item.codeforces_handle || item.name}</strong>
                    </td>
                    <td className="text-center">
                      <span className="badge bg-primary">
                        {item.score || item.points || item.solved || item.rating || 'N/A'}
                      </span>
                    </td>
                    <td>{item.group || item.team || 'Individual'}</td>
                    <td className="text-center">
                      <a
                        href={`https://codeforces.com/profile/${item.handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Standings;
