const express = require("express");
const mobileRouter = require('./mobile')

const {isDeviceMobile} = require("../handlers/getHandlers");
const {getModePage, getBoardPage, getAdminPage, getHomePage} = require("../handlers/getHandlers");
const {getParticipants, getGames, getDare, getTruth} = require("../handlers/getHandlers");
const {setParticipants, setMode} = require("../handlers/postHandlers");
const {updateStatus, deleteGame} = require("../handlers/miscHandlers");

const router = express.Router();
router.use("/mobile", mobileRouter);

router.get("/", getHomePage);
router.get("/mode", getModePage);
router.get("/board", getBoardPage);
router.get("/admin", getAdminPage);
router.get("/isMobile", isDeviceMobile)

router.get("/participants", getParticipants);
router.get("/games", getGames);
router.get("/truth", getTruth);
router.get("/dare", getDare);

router.post("/participants", setParticipants);
router.post("/mode", setMode);

router.delete("/game", deleteGame);
router.put("/status", updateStatus);

module.exports = router;
