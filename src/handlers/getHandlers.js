const MobileDetect = require("mobile-detect");
const { getRandomItem } = require("../utils");
const { v4: uuid } = require("uuid");

const getTruth = (req, res) => {
  const { gameId } = req.cookies;
  const mode = req.app.games.getMode(gameId);
  const participants = req.app.games.getParticipants(req.cookies.gameId);
  let randomParticipant;
  if (participants.length !== 0) {
    randomParticipant = getRandomItem(participants).participantName;
  } else {
    randomParticipant = "the person next to you";
  }
  const truths = req.app.truths[mode];
  let truth = getRandomItem(truths);
  if (truth.includes("[Participant]"))
    truth = truth.replace("[Participant]", randomParticipant);
  res.send(truth);
};

const getDare = (req, res) => {
  const { gameId } = req.cookies;
  const mode = req.app.games.getMode(gameId);
  const dares = req.app.dares[mode];
  res.send(getRandomItem(dares));
};

const getHomePage = (req, res) => res.render("index", { title: "Express" });
const getModePage = (req, res) => res.render("mode", { title: "Express" });
const getBoardPage = (req, res) => res.render("board", { title: "Express" });
const getAdminPage = (req, res) => res.render("admin", { title: "Express" });
const getMobileHomePage = (req, res) =>
  res.render("mobileHomePage", { title: "Express" });
const getMobileModePage = (req, res) =>
  res.render("mobileMode", { title: "Express" });
const getMobileBoardPage = (req, res) =>
  res.render("mobileBoard", { title: "Express" });

const getParticipants = (req, res) =>
  res.send(req.app.games.getParticipants(req.cookies.gameId));
const getGames = (req, res) => res.send(req.app.games);

const isDeviceMobile = (req, res) => {
  const md = new MobileDetect(req.headers["user-agent"]);
  return !!md.mobile()
    ? res.send({ isMobile: true })
    : res.send({ isMobile: false });
};

const setGroupEdition = (req, res) => {
  const uniqueID = uuid();
  res.cookie("groupEdition", true);
  res.cookie("gameId", uniqueID);
  const gameList = req.app.games;
  gameList.setParticipants(uniqueID, []);
  res.status(200).send("OK");
};

module.exports = {
  getTruth,
  getDare,
  getHomePage,
  getBoardPage,
  getModePage,
  getAdminPage,
  getMobileHomePage,
  getMobileModePage,
  getMobileBoardPage,
  getParticipants,
  isDeviceMobile,
  getGames,
  setGroupEdition,
};
