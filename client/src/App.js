import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [paths, setPaths] = useState([]);
  const [newPath, setNewPath] = useState({ name: '', description: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/paths')
      .then((response) => response.json())
      .then((data) => setPaths(data));
  }, []);

  const handleAddPath = () => {
    fetch('http://localhost:5000/api/paths', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPath),
    })
      .then((response) => response.json())
      .then((data) => {
        setPaths([...paths, data]);
        setNewPath({ name: '', description: '' });
      });
  };

  return (
    <div className="App">
      <h1>Learnly - Personalized Learning Paths</h1>
      <div>
        <input
          type="text"
          placeholder="Path Name"
          value={newPath.name}
          onChange={(e) => setNewPath({ ...newPath, name: e.target.value })}
        />
        <textarea
          placeholder="Path Description"
          value={newPath.description}
          onChange={(e) => setNewPath({ ...newPath, description: e.target.value })}
        />
        <button onClick={handleAddPath}>Add Path</button>
      </div>
      <ul>
        {paths.map((path) => (
          <li key={path.id}>
            <strong>{path.name}</strong>: {path.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

