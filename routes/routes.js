const catRoutes = require('./cats.js');
const productsRoutes = require('./cat_producto.js');
const productInfoRoutes = require('./product_info.js');
const commentRoutes = require('./comment_routes.js');
const publishRoute = require('./publish.js');
const buyRoute = require('./buy_route.js');
const cartInfoRoute = require('./cart_info_route.js');
const jwt = require("jsonwebtoken");

module.exports = function (app, fs, authMiddleware) {

  // RUTAS PROTEGIDAS (REQUIEREN TOKEN)
  app.use("/cats", authMiddleware);
  app.use("/products", authMiddleware);
  app.use("/product-info", authMiddleware);
  app.use("/comments", authMiddleware);
  app.use("/publish", authMiddleware);
  app.use("/buy", authMiddleware);
  app.use("/cart-info", authMiddleware);

  // CARGAR RUTAS REALES
  catRoutes(app, fs);
  productsRoutes(app, fs);
  productInfoRoutes(app, fs);
  commentRoutes(app, fs);
  publishRoute(app, fs);
  buyRoute(app, fs);
  cartInfoRoute(app, fs);

  // LOGIN (NO REQUIERE TOKEN)
  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ mensaje: "Faltan datos" });
    }

    // acepta cualquier usuario/contraseña
    const id = username;

    const token = jwt.sign(
      { id, username },
      "CLAVE_SECRETA_JWT",
      { expiresIn: "2h" }
    );

    res.json({
      mensaje: "Login exitoso",
      token,
      user: { id, username }
    });
  });

};
