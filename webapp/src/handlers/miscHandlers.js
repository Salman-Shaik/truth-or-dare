const deleteGame = (req, res) => {
    const {gameId} = req.cookies;
    req.app.games.deleteData(gameId);
    res.send("Deleted");
};

const updateStatus = (req, res) => {
    const {status} = req.body;
    const {gameId} = req.cookies;
    req.app.active[gameId] = status;
    res.status(204).send("Updated");
};

module.exports = {
    deleteGame,
    updateStatus,
};
