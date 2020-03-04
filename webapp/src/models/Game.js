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
        this.saveInFile();
    }

    getParticipants() {
        return this.participants;
    }

    saveInFile() {
        fs.writeFileSync(path.resolve(__dirname, "../participants.json"), JSON.stringify(this.getParticipants()));
    }
}

module.exports = Game;