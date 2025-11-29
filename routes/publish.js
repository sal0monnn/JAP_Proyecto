const publishRoutes = (app, fs) => {
  app.get('/publish', (req, res) => {
    const ruta = `./api/sell/publish.json`;  
    fs.readFile(ruta, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error al leer el archivo');
        return;
      }
      res.send(JSON.parse(data));
    });
  });
};

module.exports = publishRoutes;