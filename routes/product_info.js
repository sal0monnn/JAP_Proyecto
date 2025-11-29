const productInfoRoutes = (app, fs) => {
  app.get('/products/:id', (req, res) => {
    const rutaProductInfo = `./api/products/${req.params.id}.json`;  
    fs.readFile(rutaProductInfo, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error al leer el archivo');
        return;
      }
      res.send(JSON.parse(data));
    });
  });
};

module.exports = productInfoRoutes;