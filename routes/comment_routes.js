module.exports = (app, fs, authMiddleware) => {

  app.get('/products/:id/comments', authMiddleware, (req, res) => {
    const rutaComentario = `./api/products_comments/${req.params.id}.json`;

    fs.readFile(rutaComentario, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error al leer el archivo');
      }
      res.json(JSON.parse(data));
    });
  });

};


