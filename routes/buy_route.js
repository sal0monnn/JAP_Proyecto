const cartBuyRoute = (app, fs) => {
  const ruta = `./api/cart/buy.json'`; 
  app.get('/cart_buy', (req, res) => {
     
    fs.readFile(ruta, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error al leer el archivo');
        return;
      }
      res.send(JSON.parse(data));
    });
  });
};

module.exports = cartBuyRoute;