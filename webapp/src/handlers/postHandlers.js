const setParticipants = (req, res) => {
    let participantsList = req.body;
    const game = req.app.game;
    game.setParticipants(participantsList);
    res.status(201).send("Ok");
};

const setMode = (req, res) => {
    let mode = req.body.mode;
    const game = req.app.game;
    game.setMode(mode);
    res.status(201).send("Ok");
};

module.exports = {
    setParticipants,
    setMode
}