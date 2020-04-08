const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');

const indexRouter = require('./routes');
const {redirectToBoardIfGameIsActive} = require("./handlers/middleware");
const {notFoundHandler, errorHandler, redirectToHomepageIfNoParticipants} = require("./handlers/middleware");

const app = express();

app.initialize = (game, truths, dares) => {
    app.game = game;
    app.truths = truths;
    app.dares = dares;
    app.active = false;
};

app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(redirectToHomepageIfNoParticipants);
app.use(redirectToBoardIfGameIsActive);
app.use('/', indexRouter);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
