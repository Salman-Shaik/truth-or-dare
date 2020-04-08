const fs = require('fs');
const path = require("path");
const _ = require('lodash');

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
        const data = this.isDataEmpty() ? JSON.stringify({}) : JSON.stringify(this);
        fs.writeFileSync(path.resolve(__dirname, "../data/participants.json"), data);
    }

    isDataEmpty() {
        return _.isEmpty(this.getParticipants()) || _.isEmpty(this.getMode());
    }

    deleteData() {
        this.setParticipants([]);
        this.setMode("");
    }
}

module.exports = Game;