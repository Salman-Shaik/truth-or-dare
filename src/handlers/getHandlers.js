const {getRandomItem} = require("../utils");

const getTruth = (req, res) => {
    const {gameId} = req.cookies;
    const mode = req.app.games.getMode(gameId);
    const participants = req.app.games.getParticipants(req.cookies.gameId);
    let randomParticipant = getRandomItem(participants).participantName;
    const truths = req.app.truths[mode];
    let truth = getRandomItem(truths);
    if (truth.includes("[Participant]")) truth = truth.replace("[Participant]", randomParticipant);
    res.send(truth);
};

const getDare = (req, res) => {
    const {gameId} = req.cookies;
    const mode = req.app.games.getMode(gameId);
    const dares = req.app.dares[mode];
    res.send(getRandomItem(dares));
};

const getHomePage = (req, res) => res.render("index", {title: "Express"});
const getModePage = (req, res) => res.render("mode", {title: "Express"});
const getBoardPage = (req, res) => res.render("board", {title: "Express"});
const getAdminPage = (req, res) => res.render("admin", {title: "Express"});
const getParticipants = (req, res) => res.send(req.app.games.getParticipants(req.cookies.gameId));
const getGames = (req, res) => res.send(req.app.games);

module.exports = {
    getTruth,
    getDare,
    getHomePage,
    getBoardPage,
    getModePage,
    getAdminPage,
    getParticipants,
    getGames
};
