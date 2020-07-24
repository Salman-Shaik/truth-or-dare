const express = require("express");
const compression = require('compression');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");

const router = require("./routes/index");
const {redirectToMobileUIFOrMobile} = require("./handlers/middleware");
const {redirectToBoardIfGameIsActive} = require("./handlers/middleware");
const {
    notFoundHandler,
    errorHandler,
    redirectToHomepageIfNoParticipants,
} = require("./handlers/middleware");

const app = express();

app.initialize = (game, truths, dares) => {
    app.games = game;
    app.truths = truths;
    app.dares = dares;
    app.active = [];
};

app.set("views", path.join(__dirname, "webapp/public/views"));
app.set("view engine", "pug");

app.use(compression())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "webapp/public")));
app.use(redirectToMobileUIFOrMobile);
app.use(redirectToHomepageIfNoParticipants);
app.use(redirectToBoardIfGameIsActive);
app.use("/", router);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
