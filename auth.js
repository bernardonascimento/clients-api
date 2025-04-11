const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const SECRET = "SECRET_TOKEN_SUPER";

const USER = {
  email: "admin@gmail.com",
  password: "1234",
};

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === USER.email && password === USER.password) {
    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Credenciais inválidas" });
  }
});

module.exports = router;
module.exports.SECRET = SECRET;
