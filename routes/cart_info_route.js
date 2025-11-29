const cartInfoRoute = (app, fs) => {
   
  app.get('/cart/:id', (req, res) => {
    const ruta = `./api/cart_info/${req.params.id}}.json`; 
    fs.readFile(ruta, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error al leer el archivo');
        return;
      }
      res.send(JSON.parse(data));
    });
  });
};

module.exports = cartInfoRoute;