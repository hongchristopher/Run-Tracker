import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddRunPage from './pages/AddRunPage';
import EditRunPage from './pages/EditRunPage';
import { useState } from 'react';

function App() {
  const [ runToEdit, setRunToEdit ] = useState([]);
  return (
    <div className="App">
      <Router>
        <div className="App-header">
		  <Routes>
          <Route path="/" element={<HomePage setRunToEdit={setRunToEdit}/>} />
          <Route path="/add-run" element={<AddRunPage/>}/>
          <Route path="/edit-run" element={<EditRunPage runToEdit={runToEdit} />} />
		  </Routes>
          </div>
      </Router>
    </div>
  );
};

export default App;