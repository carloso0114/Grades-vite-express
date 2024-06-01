import express from 'express';
import db from './database.js';

const app = express();
app.use(express.json());

// Endpoint para obtener todas las notas
app.get('/api/notas', (req, res) => {
  db.all("SELECT * FROM notas", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ notas: rows });
  });
});

// Endpoint para agregar una nueva nota
app.post('/api/notas', (req, res) => {
  const { materia, estudiante, nota1, nota2, nota3 } = req.body;
  db.run(
    `INSERT INTO notas (materia, estudiante, nota1, nota2, nota3) VALUES (?, ?, ?, ?, ?)`,
    [materia, estudiante, nota1, nota2, nota3],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Endpoint para eliminar una nota existente por ID
app.delete('/api/notas/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM notas WHERE id = ?`, id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Note deleted successfully', changes: this.changes });
  });
});

// Endpoint para actualizar parcialmente una nota por ID
app.patch('/api/notas/:id', (req, res) => {
  const { id } = req.params;
  const { materia, estudiante, nota1, nota2, nota3 } = req.body;

  const fields = [];
  const values = [];

  if (materia !== undefined) {
    fields.push('materia = ?');
    values.push(materia);
  }
  if (estudiante !== undefined) {
    fields.push('estudiante = ?');
    values.push(estudiante);
  }
  if (nota1 !== undefined) {
    fields.push('nota1 = ?');
    values.push(nota1);
  }
  if (nota2 !== undefined) {
    fields.push('nota2 = ?');
    values.push(nota2);
  }
  if (nota3 !== undefined) {
    fields.push('nota3 = ?');
    values.push(nota3);
  }

  if (fields.length === 0) {
    res.status(400).json({ error: 'No fields to update' });
    return;
  }

  values.push(id);

  const sql = `UPDATE notas SET ${fields.join(', ')} WHERE id = ?`;
  db.run(sql, values, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Note updated successfully', changes: this.changes });
  });
});


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});