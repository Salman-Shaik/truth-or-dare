const {getRandomItem} = require("../utils");

const getTruth = (req, res) => {
    const mode = req.app.game.getMode();
    const truths = req.app.truths[mode];
    res.send(getRandomItem(truths))
};

const getDare = (req, res) => {
    const mode = req.app.game.getMode();
    const dares = req.app.dares[mode];
    res.send(getRandomItem(dares))
};

const getHomePage = (req, res) => res.render('index', {title: 'Express'});
const getModePage = (req, res) => res.render('mode', {title: 'Express'});
const getBoardPage = (req, res) => res.render('board', {title: 'Express'});
const getParticipants = (req, res) => res.send(req.app.game.getParticipants());

module.exports = {
    getTruth,
    getDare,
    getHomePage,
    getBoardPage,
    getModePage,
    getParticipants
};