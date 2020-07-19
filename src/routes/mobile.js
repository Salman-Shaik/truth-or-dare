const express = require("express");
const {setMode} = require("../handlers/postHandlers");
const {getMobileBoardPage, getMobileModePage, getMobileHomePage} = require("../handlers/getHandlers");

const mobileRouter = express.Router();

mobileRouter.get("/", getMobileHomePage);
mobileRouter.get("/mode", getMobileModePage);
mobileRouter.get("/board", getMobileBoardPage);

mobileRouter.post("/mode", setMode)

module.exports = mobileRouter;