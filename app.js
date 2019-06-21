require('./config/config');
require('./models/db');
require('./config/passportConfig');
//require('./config/passport1Config');// for admin
const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
  app.use(passport.initialize());
  app.use(passport.session());

app.use('', rtsIndex);

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));