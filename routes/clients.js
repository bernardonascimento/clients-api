const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const db = require("../database");

router.use(authenticateToken);

// Listar todos os clientes
router.get("/", (req, res) => {
  db.all("SELECT * FROM clients", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Inserir novo cliente
router.post("/", (req, res) => {
  const { avatar, nome, cargo, idade, projetos, tempo_de_empresa } = req.body;
  const sql = `
    INSERT INTO clients (avatar, nome, cargo, idade, projetos, tempo_de_empresa)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.run(
    sql,
    [avatar, nome, cargo, idade, projetos, tempo_de_empresa],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, ...req.body });
    }
  );
});

// Atualizar cliente
router.put("/:id", (req, res) => {
  const { avatar, nome, cargo, idade, projetos, tempo_de_empresa } = req.body;
  const { id } = req.params;
  const sql = `
    UPDATE clients SET avatar = ?, nome = ?, cargo = ?, idade = ?, projetos = ?, tempo_de_empresa = ?
    WHERE id = ?
  `;
  db.run(
    sql,
    [avatar, nome, cargo, idade, projetos, tempo_de_empresa, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ message: "Cliente não encontrado" });
      res.json({ id: Number(id), ...req.body });
    }
  );
});

// Deletar cliente
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM clients WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ message: "Cliente não encontrado" });
    res.json({ message: "Cliente deletado com sucesso" });
  });
});

module.exports = router;
