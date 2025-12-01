const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;


  if (!authHeader) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "CLAVE_SECRETA_JWT");
    req.user = decoded; // guarda info del usuario
    next(); // permite seguir
  } catch (error) {
    return res.status(403).json({ mensaje: "Token inválido o expirado" });
  }
}

module.exports = authMiddleware;

