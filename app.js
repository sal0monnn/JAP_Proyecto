const express= require('express')
const bodyParser = require('body-parser');

const app = express()
const fs = require('fs');
const cors = require('cors');   

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js')(app, fs);

const port=3000;

const server = app.listen(port, () => {
  console.log('activo en puerto ...', server.address().port);
});