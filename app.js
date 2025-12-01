const express = require("express");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const authMiddleware = require("./authMiddleware");

// Importar rutas
const catsRoutes = require("./cats.js");
const productsRoutes = require("./cat_producto.js");
const productInfoRoutes = require("./product_info.js");
const commentRoutes = require("./comment_routes.js");
const publishRoute = require("./publish.js");
const buyRoute = require("./buy_route.js");
const cartInfoRoute = require("./cart_info_route.js");

const app = express();

app.use(cors());
app.use(express.json());

// LOGIN (sin middleware)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ mensaje: "Faltan datos" });
  }

  const token = jwt.sign(
    { username },
    "CLAVE_SECRETA_JWT",
    { expiresIn: "2h" }
  );

  res.json({
    mensaje: "Login exitoso",
    token,
    usuario: username
  });
});

// Todas las rutas protegidas
catsRoutes(app, fs, authMiddleware);
productsRoutes(app, fs, authMiddleware);
productInfoRoutes(app, fs, authMiddleware);
commentRoutes(app, fs, authMiddleware);
publishRoute(app, fs, authMiddleware);
buyRoute(app, fs, authMiddleware);
cartInfoRoute(app, fs, authMiddleware);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Servidor funcionando en http://localhost:" + PORT);
});
