const catsRoutes = (app, fs) => {
  const ruta = './api/cats/cat.json';  
  app.get('/cats', (req, res) => {
    fs.readFile(ruta, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error al leer el archivo');
        return;
      }
      res.send(JSON.parse(data));
    });
  });
};

module.exports = catsRoutes;