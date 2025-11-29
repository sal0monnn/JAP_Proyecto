const commentRoutes = (app, fs) => {
  app.get('/products/:id/comments', (req, res) => {
    const rutaComentario = `./api/products_comments/${req.params.id}.json`;  
    fs.readFile(rutaComentario, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error al leer el archivo');
        return;
      }
      res.send(JSON.parse(data));
    });
  });
};

module.exports = commentRoutes;


