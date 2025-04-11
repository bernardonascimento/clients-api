const express = require("express");
const cors = require("cors");
const authRoutes = require("./auth");
const clientRoutes = require("./routes/clients");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/clients", clientRoutes);

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
