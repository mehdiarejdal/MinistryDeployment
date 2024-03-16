import React, { useState, useEffect } from 'react';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5757/data_cleaned');
      const data = await response.json();
      // console.log(data[0]["MoyenneGen_i1"]);
      setStudents(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Student List</h1>
      <table>
        <thead>
          <tr>
            <th>MoyenneGen_i1</th>
            <th>NbrJourAbsenceAutorise_i1</th>
            <th>NbrUniteAbsenceAutorise_i1</th>
            {/* Add other table headers here */}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.MoyenneGen_i1}</td>
              <td>{student.NbrJourAbsenceAutorise_i1}</td>
              <td>{student.NbrUniteAbsenceAutorise_i1}</td>
              {/* Add other table data here for each column */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
