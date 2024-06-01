import React, { useEffect, useState } from 'react';
import AddNote from './AddNote';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

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

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`/api/notas/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error deleting note');
      }
  
      await fetchNotes(); // Refresh the notes list after deletion
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  return (
    <div>
      <h1>Student Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.estudiante} - {note.materia}: {note.notaFinal + " "}-
            {" "}<button onClick={() => handleEdit(note)}>Modify</button>
            {" "}<button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <AddNote fetchNotes={fetchNotes} editingNote={editingNote} setEditingNote={setEditingNote} />
    </div>
  );
};

export default NotesList;