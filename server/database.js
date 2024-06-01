import sqlite3 from 'sqlite3';
sqlite3.verbose();
const db = new sqlite3.Database(':memory:');

// Crear tabla notas
db.serialize(() => {
  db.run(`CREATE TABLE notas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    materia CHAR(100),
    estudiante CHAR(100),
    nota1 DECIMAL(3, 2),
    nota2 DECIMAL(3, 2),
    nota3 DECIMAL(3, 2),
    notaFinal DECIMAL(3, 2) GENERATED ALWAYS AS (ROUND(nota1 * 0.30 + nota2 * 0.30 + nota3 * 0.40, 2)) VIRTUAL
  )`);

  // Insertar datos de ejemplo
  const stmt = db.prepare("INSERT INTO notas (materia, estudiante, nota1, nota2, nota3) VALUES (?, ?, ?, ?, ?)");
  stmt.run("Matemáticas", "John Doe", 9.50, 8.75, 9.00);
  stmt.run("Historia", "Jane Smith", 7.00, 6.50, 8.00);
  stmt.run("Ciencias", "Alice Johnson", 8.25, 8.50, 9.00);
  stmt.finalize();
});

export default db;