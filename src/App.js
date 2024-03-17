import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dews from './Dews/Dews';
import StudentList1 from './StudentList/StudentList1';

function App() {
  return (
    <Router>
      <Routes> {/* Utilisez Routes au lieu de Switch */}
        <Route exact path="/" element={<Dews />} /> 
        <Route path="/student-data" element={<StudentList1 />} />
        {/* ... autres routes */}
      </Routes>
    </Router>
  );
}
export default App;
