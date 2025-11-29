const productsRoutes = (app, fs) => {
  app.get('/cats/:id', (req, res) => {
    const rutaProductos = `./api/cats_products/${req.params.id}.json`;  
    fs.readFile(rutaProductos, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error al leer el archivo');
        return;
      }
      res.send(JSON.parse(data));
    });
  });
};

module.exports = productsRoutes;