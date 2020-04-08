const createError = require('http-errors');
const redirectToHomepageIfNoParticipants = (req, res, next) => {
    if (req.app.game.getParticipants().length === 0 && req.url !== "/") {
        res.redirect("/");
        return;
    }
    next();
};

const errorHandler = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
    next();
};

const notFoundHandler = (req, res, next) => {
    next(createError(404));
};
module.exports = {
    redirectToHomepageIfNoParticipants,
    errorHandler,
    notFoundHandler
};