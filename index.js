const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = require('bluebird');
const router = require('./config/router');
const { dbURI, port } = require('./config/environment');

const app = express();

mongoose.connect(dbURI);
app.use(bodyParser.json());

app.use('/api', router);
app.use('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html `));

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({ message: 'Unprocessable Entity' });
  }
  res.status(500).json({ message: 'Internal Server Error' });
  next();
});

app.use(express.static(`${__dirname}/public`));

app.listen(port, () => console.log(`Express running on port ${port}`));

module.exports = app;
