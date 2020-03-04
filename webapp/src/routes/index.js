const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/participants', (req, res) => {
    let participantsList = req.body;
    const game = req.app.game;
    game.setParticipants(participantsList);
    res.send("Ok");
});

module.exports = router;
