import React from 'react';
import Navbar from './Navbar';

function About() {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-4">About Our ICPC Community</h1>

        <div className="row mb-5">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Our Mission</h5>
                <p>
                  Our community is dedicated to fostering excellence in competitive programming and preparing the next generation of ICPC champions. We believe that with the right guidance, practice, and support, every student can achieve their programming potential.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Community</h5>
                <p className="display-6">500+</p>
                <p className="text-muted">Active Members</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Achievements</h5>
                <p className="display-6">25+</p>
                <p className="text-muted">Contest Wins</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Resources</h5>
                <p className="display-6">1000+</p>
                <p className="text-muted">Practice Problems</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-12">
            <h2 className="mb-4">Our Leadership Team</h2>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">👨‍💼 Dr. Ahmed El-Sayed</h5>
                    <p className="text-muted">Community Founder & Director</p>
                    <p>
                      With over 15 years of experience in competitive programming and education, Dr. Ahmed leads our vision to make ICPC accessible to all students.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">👩‍💼 Eng. Fatima Hassan</h5>
                    <p className="text-muted">Training & Development Lead</p>
                    <p>
                      Fatima oversees our comprehensive training programs and ensures every member gets the support they need to succeed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-12">
            <h2 className="mb-4">What We Offer</h2>
            <ul className="list-group">
              <li className="list-group-item">✅ Online C++ Compiler for instant code testing</li>
              <li className="list-group-item">✅ Curated Training Problems and Solutions</li>
              <li className="list-group-item">✅ Live Contests and Competitions</li>
              <li className="list-group-item">✅ Detailed Performance Analytics</li>
              <li className="list-group-item">✅ Mentorship from Experienced Programmers</li>
              <li className="list-group-item">✅ Integration with Codeforces for Real-time Stats</li>
              <li className="list-group-item">✅ Community Forum and Discussion Board</li>
              <li className="list-group-item">✅ Monthly Webinars and Workshops</li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="alert alert-info" role="alert">
              <h4 className="alert-heading">Get Involved!</h4>
              <p>
                Interested in joining our community? <a href="/register" className="alert-link">Register now</a> to start your journey toward becoming a competitive programming champion!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;