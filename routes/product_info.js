module.exports = (app, fs, authMiddleware) => {

  app.get('/products/:id', authMiddleware, (req, res) => {
    const rutaProductInfo = `./api/products/${req.params.id}.json`;

    fs.readFile(rutaProductInfo, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error al leer el archivo');
      }
      
      res.json(JSON.parse(data));
    });
  });

};
