const _ = require("lodash");
const createError = require("http-errors");
const MobileDetect = require('mobile-detect');

const pageHandler = {};
pageHandler["/"] = (res) => res.redirect('/mobile')
pageHandler["/board"] = (res) => res.redirect('/mobile/board')
pageHandler["/mode"] = (res) => res.redirect('/mobile/mode')
pageHandler["/mobile"] = (res) => res.redirect('/')
pageHandler["/mobile/board"] = (res) => res.redirect('/board')
pageHandler["/mobile/mode"] = (res) => res.redirect('/mode')

const isDesktopPages = (url) => url === "/board" || url === "/mode" || url === "/";

const redirectToMobileUIForMobile = (req, res, next) => {
    const {headers, url} = req;
    const md = new MobileDetect(headers['user-agent']);
    const mobileCondition = !!md.mobile() && isDesktopPages(url);
    const desktopCondition = !md.mobile() && url.includes("mobile");
    if (mobileCondition || desktopCondition) return pageHandler[url](res);
    next();
}

const redirectToHomepageIfNoParticipants = (req, res, next) => {
    const {gameId} = req.cookies;
    const noParticipants = _.isEmpty(req.app.games.getParticipants(gameId));
    const isBoardOrModePage = req.url.includes("/board") || req.url.includes("/mode");
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
    const isIndexOrModePage = req.url === "/" || req.url.includes("/mode") || req.url === "/mobile/";
    if (isGameActive && isIndexOrModePage) return res.redirect("/board");
    next();
};

const errorHandler = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
    next();
};

const notFoundHandler = (req, res, next) => next(createError(404));

module.exports = {
    redirectToHomepageIfNoParticipants,
    redirectToBoardIfGameIsActive,
    redirectToMobileUIFOrMobile: redirectToMobileUIForMobile,
    errorHandler,
    notFoundHandler,
};
