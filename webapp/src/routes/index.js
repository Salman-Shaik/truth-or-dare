const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/mode', function (req, res, next) {
    res.render('mode', {title: 'Express'});
});

router.post('/participants', (req, res) => {
    let participantsList = req.body;
    const game = req.app.game;
    game.setParticipants(participantsList);
    res.send("Ok");
});

router.post('/mode', (req, res) => {
    let mode = req.body.mode;
    const game = req.app.game;
    game.setMode(mode);
    res.send("Ok");
});

module.exports = router;
