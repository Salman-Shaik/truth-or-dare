const setParticipants = (req, res) => {
    let participantsList = req.body;
    const game = req.app.game;
    game.setParticipants(participantsList);
    res.send("Ok");
};

const setMode = (req, res) => {
    let mode = req.body.mode;
    const game = req.app.game;
    game.setMode(mode);
    res.send("Ok");
};

module.exports = {
    setParticipants,
    setMode
}