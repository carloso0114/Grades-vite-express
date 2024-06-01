import React, { useEffect, useState } from 'react';
import AddNote from './AddNote';

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes()
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notas');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNotes(data.notas);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  return (
    <div>
      <h1>Student Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.estudiante} - {note.materia}: {note.notaFinal + " "}
          </li>
        ))}
      </ul>
      <AddNote fetchNotes={fetchNotes} />
    </div>
  );
};

export default NotesList;