module.exports = (app, fs, authMiddleware) => {

  const ruta = `./api/cart/buy.json`;  

  app.get('/cart_buy', authMiddleware, (req, res) => {

    fs.readFile(ruta, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error al leer el archivo');
      }
      res.json(JSON.parse(data));
    });

  });

};
