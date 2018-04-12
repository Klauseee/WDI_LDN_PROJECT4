const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = require('bluebird');
const router = require('./config/router');
const { dbURI, port } = require('./config/environment');
const errorHandler = require('./lib/errorHandler');

const app = express();

mongoose.connect(dbURI);
app.use(bodyParser.json());

app.use('/api', router);
app.use('/*', (req, res) => res.sendFile(`${__dirname}/public`));

app.use(errorHandler);

app.use(express.static(`${__dirname}/public`));

app.listen(port, () => console.log(`Express running on port ${port}`));

module.exports = app;
