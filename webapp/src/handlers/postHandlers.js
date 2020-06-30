const {v4: uuid} = require("uuid");

const setParticipants = (req, res) => {
    const uniqueID = uuid();
    res.cookie("gameId", uniqueID);
    let participantsList = req.body;
    const gameList = req.app.games;
    gameList.setParticipants(uniqueID, participantsList);
    res.status(201).send("Created");
};

const setMode = (req, res) => {
    let mode = req.body.mode;
    const gameList = req.app.games;
    const {gameId} = req.cookies;
    gameList.setMode(gameId, mode);
    res.status(201).send("Created");
};

module.exports = {
    setParticipants,
    setMode,
};
