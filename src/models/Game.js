const _ = require("lodash");

const Participant = require("./Participant");

class Game {
    constructor() {
        this.participants = [];
        this.mode = "";
    }

    setParticipants(participantsJson) {
        this.participants = participantsJson.map((participant) =>
            Participant.from(participant)
        );
    }

    getParticipants() {
        return this.participants;
    }

    getMode() {
        return this.mode;
    }

    setMode(mode) {
        this.mode = mode;
    }

    isDataEmpty() {
        return _.isEmpty(this.getParticipants()) || _.isEmpty(this.getMode());
    }
}

module.exports = Game;
