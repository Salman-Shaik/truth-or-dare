const {getRandomItem} = require("../utils");

const getTruth = (req, res) => {
    const {gameId} = req.cookies;
    const mode = req.app.games.getMode(gameId);
    const truths = req.app.truths[mode];
    res.send(getRandomItem(truths))
};

const getDare = (req, res) => {
    const {gameId} = req.cookies;
    const mode = req.app.games.getMode(gameId);
    const dares = req.app.dares[mode];
    res.send(getRandomItem(dares))
};

const getHomePage = (req, res) => res.render('index', {title: 'Express'});
const getModePage = (req, res) => res.render('mode', {title: 'Express'});
const getBoardPage = (req, res) => res.render('board', {title: 'Express'});
const getParticipants = (req, res) => res.send(req.app.games.getParticipants(req.cookies.gameId));

module.exports = {
    getTruth,
    getDare,
    getHomePage,
    getBoardPage,
    getModePage,
    getParticipants
};