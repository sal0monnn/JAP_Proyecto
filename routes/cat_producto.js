module.exports = (app, fs, authMiddleware) => {

  // Ruta protegida → requiere token
  app.get('/cats/:id', authMiddleware, (req, res) => {
    const rutaProductos = `./api/cats_products/${req.params.id}.json`;

    fs.readFile(rutaProductos, "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("Error al leer el archivo");
      }
      res.json(JSON.parse(data));
    });
  });

};
