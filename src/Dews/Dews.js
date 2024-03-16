

import React from 'react';
import { Link } from 'react-router-dom';
import './Dews.css'; // Add CSS file for styling

function Dews() {
  return (
    <div className="Dews">
      <header className="navbar">
        <div className="left-icons">
          <img src="icon1.png" alt="Icon 1" />
          <img src="icon2.png" alt="Icon 2" />
        </div>
        <div className="right-buttons">
         <Link to="/student-data" className="option">Student Data</Link>
         <Link to="/data-analysis" className="option">Data Analysis</Link>
         <Link to="/at-risk" className="option">At Risk/Explanability</Link>
         <button className="blue-button">Blue Button</button>
        </div>
      </header>
      <div className="content">
        <h1>Welcome to My Landing Page</h1>
        <p>This is a simple landing page built with React.</p>
        <img src="image.jpg" alt="Landing Page Image" />
      </div>
    </div>
  );
}

export default Dews;

