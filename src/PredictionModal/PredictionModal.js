import React from 'react';
import './PredictionModal.css';

function PredictionModal({ predictionResult, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>Close</button>
        <h2>Prediction Result</h2>
        {/* <p>Student ID: {predictionResult.studentId}</p> */}
        <p>Prediction: {predictionResult.prediction}</p>
        <p>Probability: {predictionResult.probability}</p>
      </div>
    </div>
  );
}

export default PredictionModal;
