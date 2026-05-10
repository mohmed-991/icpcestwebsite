import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Compiler() {
  const [code, setCode] = useState('#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    cout << "Hello, ICPC community!" << endl;\n    return 0;\n}');
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOutput('');
    setError('');
    setStatus('');
    setLoading(true);

    try {
      const response = await axios.post('/api/compile', {
        language: 'cpp',
        code,
        stdin
      });
      setStatus(response.data.status);
      setOutput(response.data.stdout || '');
      setError(response.data.stderr || '');
    } catch (err) {
      setStatus('error');
      setError(err.response?.data?.message || 'Compiler service unavailable');
    } finally {
      setLoading(false);
    }
  };

  const resetCode = () => {
    setCode('#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    cout << "Hello, ICPC community!" << endl;\n    return 0;\n}');
    setStdin('');
    setOutput('');
    setError('');
    setStatus('');
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid mt-4" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <h2 className="mb-4">💻 Online C++ Compiler</h2>
        <p className="text-muted">Write and test your C++ code instantly. No installation required!</p>

        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0">C++ Code Editor</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Source Code</label>
                    <textarea
                      className="form-control"
                      rows="15"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                      style={{ fontFamily: 'monospace' }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Standard Input (stdin)</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={stdin}
                      onChange={(e) => setStdin(e.target.value)}
                      style={{ fontFamily: 'monospace' }}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success" disabled={loading}>
                      {loading ? '⏳ Compiling...' : '▶️ Run Code'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={resetCode}>
                      🔄 Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="row mb-3">
              {status && (
                <div className="col-12">
                  <div className={`alert ${status === 'success' ? 'alert-success' : 'alert-danger'}`}>
                    <strong>Status:</strong> {status === 'success' ? '✅ Success' : '❌ Error'}
                  </div>
                </div>
              )}
            </div>

            {output && (
              <div className="card mb-3">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">Output</h5>
                </div>
                <div className="card-body">
                  <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                    {output}
                  </pre>
                </div>
              </div>
            )}

            {error && (
              <div className="card">
                <div className="card-header bg-danger text-white">
                  <h5 className="mb-0">Error/Warnings</h5>
                </div>
                <div className="card-body">
                  <pre style={{ backgroundColor: '#fff3cd', padding: '10px', borderRadius: '4px', color: '#856404' }}>
                    {error}
                  </pre>
                </div>
              </div>
            )}

            {!output && !error && (
              <div className="alert alert-info">
                <strong>ℹ️ Tip:</strong> Write your C++ code on the left and click "Run Code" to see the results here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compiler;
