const express = require("express");

const {getParticipants, getGames, getModePage, getBoardPage, getAdminPage, getHomePage, getDare, getTruth} = require("../handlers/getHandlers");
const {setParticipants, setMode} = require("../handlers/postHandlers");
const {updateStatus, deleteGame} = require("../handlers/miscHandlers");

const router = express.Router();

router.get("/", getHomePage);
router.get("/mode", getModePage);
router.get("/board", getBoardPage);
router.get("/admin", getAdminPage);
router.get("/participants", getParticipants);
router.get("/games", getGames);
router.get("/truth", getTruth);
router.get("/dare", getDare);

router.post("/participants", setParticipants);
router.post("/mode", setMode);

router.delete("/game", deleteGame);
router.put("/status", updateStatus);

module.exports = router;
