import React, { useState, useEffect } from 'react';

const AddNote = ({fetchNotes}) => {
  const [materia, setMateria] = useState('');
  const [estudiante, setEstudiante] = useState('');
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [nota3, setNota3] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteData = { materia, estudiante, nota1, nota2, nota3 };
    fetch('/api/notas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    })
      .then(response => response.json())
      .then(() => {
        fetchNotes(); // Refresh the notes list
      })
      .catch(error => console.error('Error adding note:', error));

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Materia:
          <select
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
          >
            <option value="">Select a subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="History">History</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Geography">Geography</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="Art">Art</option>
            <option value="Music">Music</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Estudiante:
          <select
            value={estudiante}
            onChange={(e) => setEstudiante(e.target.value)}
          >
            <option value="">Select Student</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Michael Johnson">Michael Johnson</option>
            <option value="Emily Brown">Emily Brown</option>
            <option value="William Taylor">William Taylor</option>
            <option value="Olivia Martinez">Olivia Martinez</option>
            <option value="James Wilson">James Wilson</option>
            <option value="Sophia Anderson">Sophia Anderson</option>
            <option value="Alexander Thomas">Alexander Thomas</option>
            <option value="Mia White">Mia White</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Nota 1:
          <input
            type="number"
            step="0.01"
            value={nota1}
            onChange={(e) => setNota1(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Nota 2:
          <input
            type="number"
            step="0.01"
            value={nota2}
            onChange={(e) => setNota2(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Nota 3:
          <input
            type="number"
            step="0.01"
            value={nota3}
            onChange={(e) => setNota3(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNote;