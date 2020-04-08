const express = require('express');

const {getParticipants, getModePage, getBoardPage, getHomePage, getDare, getTruth} = require("../handlers/getHandlers");
const {setParticipants, setMode} = require("../handlers/postHandlers");

const router = express.Router();

router.get('/', getHomePage);
router.get('/mode', getModePage);
router.get('/board', getBoardPage);
router.get('/participants', getParticipants);
router.get("/truth", getTruth);
router.get("/dare", getDare);

router.post('/participants', setParticipants);
router.post('/mode', setMode);
router.delete('/game', (req, res) => {
    req.app.game.deleteData();
    res.send("Deleted")
});
router.put('/status', (req, res) => {
    const {status} = req.body;
    req.app.active = status;
    res.status(204).send("Updated");
});
module.exports = router;
