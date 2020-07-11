const createError = require("http-errors");
const _ = require("lodash");

const redirectToHomepageIfNoParticipants = (req, res, next) => {
    const {gameId} = req.cookies;
    const noParticipants = _.isEmpty(req.app.games.getParticipants(gameId));
    const isBoardOrModePage = req.url === "/board" || req.url === "/mode";
    const isGameNotActive = !req.app.active[gameId];
    const condition = noParticipants && isBoardOrModePage && isGameNotActive;
    if (condition) {
        res.redirect("/");
        req.app.active[gameId] = false;
        return;
    }
    next();
};

const redirectToBoardIfGameIsActive = (req, res, next) => {
    const {gameId} = req.cookies;
    const isGameActive = !!req.app.active[gameId];
    if (isGameActive && (req.url === "/" || req.url === "/mode")) {
        res.redirect("/board");
        return;
    }
    next();
};

const errorHandler = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
    next();
};

const notFoundHandler = (req, res, next) => {
    next(createError(404));
};
module.exports = {
    redirectToHomepageIfNoParticipants,
    redirectToBoardIfGameIsActive,
    errorHandler,
    notFoundHandler,
};
