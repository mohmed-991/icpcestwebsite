import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';

const token = localStorage.getItem('userToken');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
