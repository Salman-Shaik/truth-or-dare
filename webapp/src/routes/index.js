const express = require('express');

const {getParticipants, getModePage, getBoardPage, getHomePage, getDare, getTruth} = require("../requestHandlers/getHandlers");
const {setParticipants, setMode} = require("../requestHandlers/postHandlers");

const router = express.Router();

router.get('/', getHomePage);
router.get('/mode', getModePage);
router.get('/board', getBoardPage);
router.get('/participants', getParticipants);
router.get("/truth", getTruth);
router.get("/dare", getDare);

router.post('/participants', setParticipants);
router.post('/mode', setMode);
module.exports = router;
