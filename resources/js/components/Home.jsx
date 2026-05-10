import React from 'react';
import Navbar from './Navbar';

function Home() {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="col-md-12">
            <div className="jumbotron bg-light p-5 rounded-lg">
              <h1 className="display-4">Welcome to ICPC Community</h1>
              <p className="lead">
                Join our thriving community of competitive programmers and practice for the International Collegiate Programming Contest!
              </p>
              <hr className="my-4" />
              <p>Learn, compete, and grow with us. Whether you're a beginner or an experienced coder, there's a place for you here.</p>
              <div className="d-flex gap-2">
                <a className="btn btn-primary btn-lg" href="/compiler" role="button">
                  Try Online Compiler
                </a>
                <a className="btn btn-secondary btn-lg" href="/register" role="button">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Online Compiler</h5>
                <p className="card-text">
                  Write and compile C++ code directly in your browser. Perfect for practicing algorithms and solving problems.
                </p>
                <a href="/compiler" className="btn btn-sm btn-primary">
                  Use Compiler
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Live Standings</h5>
                <p className="card-text">
                  Check real-time standings and track your progress. Compete with your peers and see how you rank.
                </p>
                <a href="/standings" className="btn btn-sm btn-primary">
                  View Standings
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Training Materials</h5>
                <p className="card-text">
                  Access curated training materials and practice problems to improve your competitive programming skills.
                </p>
                <a href="/trainings" className="btn btn-sm btn-primary">
                  View Trainings
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-12">
            <h2 className="mb-4">About ICPC</h2>
            <p>
              The International Collegiate Programming Contest (ICPC) is the premier global programming competition where teams of three university students solve algorithmic problems.
            </p>
            <p>
              Our community is dedicated to helping you prepare for this exciting challenge through collaborative learning, practice problems, and mentorship.
            </p>
            <a href="/about" className="btn btn-outline-primary">
              Learn More About Us
            </a>
          </div>
        </div>
      </div>

      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p>© 2026 ICPC Community. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;