module.exports = (app, fs, authMiddleware) => {

  app.get('/cart/:id', authMiddleware, (req, res) => {

    const ruta = `./api/cart_info/${req.params.id}.json`;  //  llave corregida

    fs.readFile(ruta, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error al leer el archivo');
      }
      res.json(JSON.parse(data));
    });

  });

};
