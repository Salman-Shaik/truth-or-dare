const {getRandomItem} = require('../utils');

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {title: 'Express'});
});

router.get('/mode', (req, res, next) => {
    res.render('mode', {title: 'Express'});
});

router.get('/board', (req, res, next) => {
    const {length} = req.app.game.getParticipants();
    if (length === 0) {
        res.redirect("/");
    } else {
        res.render('board', {title: 'Express'});
    }

});

router.get('/participants', (req, res, next) => {
    res.send(req.app.game.getParticipants());
});

router.get("/truth", (req, res, next) => {
    const mode = req.app.game.getMode();
    const truths = req.app.truths[mode];
    res.send(getRandomItem(truths))
});

router.get("/dare", (req, res, next) => {
    const mode = req.app.game.getMode();
    const dares = req.app.dares[mode];
    res.send(getRandomItem(dares))
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
