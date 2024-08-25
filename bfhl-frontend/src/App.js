import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

function App() {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [dataInput, setDataInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(dataInput);
      const payload = {
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        data: parsedData
      };

      const result = await axios.post('https://bajaj-y4er.onrender.com/bfhl', payload);
      setResponse(result.data);
      setError(null);
    } catch (e) {
      setError('Invalid JSON or API Error');
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div className="mt-4">
        {selectedOptions.includes('Numbers') && (
          <div className="alert alert-primary">
            <strong>Numbers: </strong> {JSON.stringify(response.numbers)}
          </div>
        )}
        {selectedOptions.includes('Alphabets') && (
          <div className="alert alert-success">
            <strong>Alphabets: </strong> {JSON.stringify(response.alphabets)}
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div className="alert alert-warning">
            <strong>Highest Lowercase Alphabet: </strong> {JSON.stringify(response.highest_lowercase_alphabet)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">BFHL Challenge</h1>
      <div className="form-group">
        <label>User ID</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your User ID"
          value={userId}
          onChange={handleInputChange(setUserId)}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your Email"
          value={email}
          onChange={handleInputChange(setEmail)}
        />
      </div>
      <div className="form-group">
        <label>Roll Number</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your Roll Number"
          value={rollNumber}
          onChange={handleInputChange(setRollNumber)}
        />
      </div>
      <div className="form-group">
        <label>Data (JSON format)</label>
        <textarea
          className="form-control"
          placeholder='Enter your JSON data here, e.g., ["1", "a", "B", "2"]'
          rows="5"
          value={dataInput}
          onChange={handleInputChange(setDataInput)}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {response && (
        <div className="form-group mt-4">
          <label>Select the data to display:</label>
          <select multiple={true} className="form-control" onChange={handleOptionChange}>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest lowercase alphabet">Highest Lowercase Alphabet</option>
          </select>
        </div>
      )}
      {renderResponse()}
    </div>
  );
}

export default App;
