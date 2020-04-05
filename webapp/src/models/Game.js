const fs = require('fs');
const path = require("path");

const Participant = require("./Participant");

class Game {
    constructor() {
        this.participants = [];
        this.mode = "";
    }

    setParticipants(participantsJson) {
        this.participants = participantsJson.map(participant => Participant.from(participant));
    }

    getParticipants() {
        return this.participants;
    }

    getMode() {
        return this.mode;
    }

    setMode(mode) {
        this.mode = mode;
        this.saveInFile();
    }

    saveInFile() {
        fs.writeFileSync(path.resolve(__dirname, "../participants.json"), JSON.stringify(this));
    }
}

module.exports = Game;