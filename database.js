const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./clients.db");

// Criação da tabela (executado na inicialização)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      avatar TEXT,
      nome TEXT NOT NULL,
      cargo TEXT,
      idade INTEGER,
      projetos INTEGER,
      tempo_de_empresa INTEGER
    )
  `);
});

module.exports = db;
