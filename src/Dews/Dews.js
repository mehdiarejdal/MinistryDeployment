import React from 'react';
import { Link } from 'react-router-dom';
import './Dews.css'; 
import ministereEducationImage from './ministere-education.png'; 
import um6pLogoImage from './UM6P_logo.png'; 
import yourImage from './image1.png'
import yourIcon1 from './Financial Growth Analysis.png'
import yourIcon2 from './Financial Analytics.png'
import yourIcon3 from './High Risk.png'
import image3 from './image 3.png'

function Dews() {
  return (
    <div className="Dews">
      <header className="navbar">
        <div className="left-icons">
          <img src={um6pLogoImage} alt="UM6P Logo" />
          <img src={ministereEducationImage} alt="Ministere Education" />
        </div>
        <div className="right-buttons">
          <Link to="/student-data" className="option">Student Data</Link>
          <Link to="/data-analysis" className="option">Data Analysis</Link>
          <Link to="/at-risk" className="option">At Risk/Explanability</Link>
          <button className="blue-button">Login</button>
        </div>
      </header>
      <div className="content">
        <h2>Drop out Early Warning System</h2>
        <h1>DEWS</h1>
        <p>AI to predict student dropout risks, track academic progression,and visualize student performance.Empowering educators


with insights for early intervention and personalized support we ensure accurate predictions and ethical AI usage.</p>

      </div>
      <img src={yourImage} alt="Your Image" />
      <div className="boxes">
  <div className="box">
    <img src={yourIcon1} alt="Icon 1" />
    <h3>Student List</h3>
    <p>Maintaining a comprehensive student database involves accurate record-keeping and regular audits to uphold data integrity. Strict privacy measures protect student information, aligning with legal requirements like FERPA for ethical data management.</p>
  </div>
  <div className="box">
    <img src={yourIcon2} alt="Icon 2" />
    <h3>Data Analytics</h3>
    <p>Analyzing student performance data requires collecting diverse information and using statistical methods to identify trends. Regular updates and predictive analytics ensure timely insights for proactive support strategies.

</p>
  </div>
  <div className="box">
    <img src={yourIcon3} alt="Icon 3" />
    <h3>At Risk/Explainability</h3>
    <p>Identifying at-risk students involves using various assessment tools and collaborating with educators and parents to understand factors affecting their academic performance. Data-driven analysis helps pinpoint patterns contributing to their challenges, enabling tailored interventions.</p>
  </div>
</div>
<div className="context">
        <div className="left-section">
          <h1>AI for Education</h1>
          <p>Elevate your educational strategies with personalized advisory services. Our team of data scientists works alongside you, turning complex data into clear, actionable insights for improved student outcomes.</p>
          <button className="blue-button">Track Student</button>
        </div>
        <div className="right-section">
           <img src={image3} alt="image3" />
        </div>
      </div>
    </div>
  );
}

export default Dews;
