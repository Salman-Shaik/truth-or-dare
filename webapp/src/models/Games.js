const fs = require('fs');
const path = require("path");
const Game = require("./Game")

class Games {

    constructor() {
        this.gameList = {};
    }

    setGame(id, game) {
        this.gameList[id] = game;
    }

    setParticipants(id, participants) {
        this.setGame(id, new Game());
        this.getGame(id).setParticipants(participants);
    }

    setMode(id, mode) {
        this.getGame(id).setMode(mode);
        this.saveInFile();
    }

    getParticipants(id) {
        const game = this.getGame(id);
        return game ? game.getParticipants() : [];
    }

    getMode(id) {
        return this.getGame(id).getMode();
    }

    getGame(id) {
        return this.gameList[id];
    }

    deleteData(id) {
        delete this.gameList[id];
        this.saveInFile();
    }

    saveInFile() {
        fs.writeFileSync(path.resolve(__dirname, "../data/games.json"), JSON.stringify(this.gameList));
    }
}

module.exports = Games;