const catsRoutes = (app, fs, authMiddleware) => {
  const ruta = './api/cats/cat.json';

  app.get('/cats', authMiddleware, (req, res) => {
    fs.readFile(ruta, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error al leer el archivo');
      }
      res.send(JSON.parse(data));
    });
  });
};

module.exports = catsRoutes;
