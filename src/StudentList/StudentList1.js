import React, { useState, useEffect } from 'react';
import PredictionModal from '../PredictionModal/PredictionModal'; // Import your PredictionModal component
import './StudentList.css';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    fetchData(); 
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5757/data');
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCheckboxChange = (id_eleve) => {

    const index = selectedStudents.indexOf(id_eleve);
    if (index === -1) {
      setSelectedStudents([...selectedStudents, id_eleve]);
    } else {
      const updatedSelectedStudents = [...selectedStudents];
      updatedSelectedStudents.splice(index, 1);
      setSelectedStudents(updatedSelectedStudents);
    }
  };

  // const handlePredict = async () => {
  //   try {
  //     const studentId = selectedStudents[0]; 
  //     const response = await fetch(`http://localhost:5757/predictStudent/${studentId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ studentId: studentId }),
  //     });
  //     const result = await response.json();
  //     console.log('Response from server:', result);

  //     if (result.prediction && result.probability) {
  //       setPredictionResult(result.prediction); // Set prediction result
  //       setPredictionResult(result.probability); // Set probability
  //       setShowModal(true); // Show the modal
  //     } else {
  //       console.error('Error predicting:', result.error);
  //     }
  //   } catch (error) {
  //     console.error('Error predicting:', error);
  //   }
  // };
  const handlePredict = async () => {
    try {
      const studentId = selectedStudents[0]; 
      const response = await fetch(`http://localhost:5757/predictStudent/${studentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId: studentId }),
      });
      const result = await response.json();
      console.log('Response from server:', result);
  
      if (result.prediction && result.probability) {
        setPredictionResult({ prediction: result.prediction, probability: result.probability });
        setShowModal(true); 
      } else {
        console.error('Error predicting:', result.error);
      }
    } catch (error) {
      console.error('Error predicting:', error);
    }
  };
  
  const closeModal = () => {
    setShowModal(false); // Hide the modal
    setPredictionResult(null); // Reset prediction result when closing modal
  };

  return (
    <div>
      <h1>Student List</h1>
      <button className="predict-button" onClick={handlePredict}>Predict</button>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>ID Eleve</th>
              <th>ID Annee</th>
              <th>Moyenne Generale</th>
              <th>Moyenne Classe</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id_eleve} className="table-row">
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(student.studentId)}
                    checked={selectedStudents.includes(student.studentId)}
                  />
                </td>
                <td>{student.id_eleve}</td>
                <td>{student.id_annee}</td>
                <td>{student.MoyenneGen_i1}</td>
                <td>{student.MoyenneClasse_i1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && predictionResult && (
        <PredictionModal predictionResult={predictionResult} onClose={closeModal} />
      )}
    </div>
  );
}

export default StudentList;
