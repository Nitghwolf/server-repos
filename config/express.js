const express = require('express');

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const logger = require('morgan');
const cors = require('cors');


const sessionConfig = {
  store: new FileStore(),
  name: 'user_sid',
  secret: process.env.SESSION_SECRET || 'G(8x>|Ai^"+&', 
  resave: false, 
  saveUninitialized: false, 
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, 
    httpOnly: true,
  },
};

function expressConfig(app) {
  app.use(logger('dev'));
  app.use(express.static(`${__dirname}/../public`));
  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());

  app.use(session(sessionConfig));

  const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:4000'],
    optionsSuccessStatus: 200,
    credentials: true,
  };

  app.use(cors(corsOptions));
}

module.exports = expressConfig;