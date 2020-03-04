class Participant {
    constructor(name, gender) {
        this.participantName = name;
        this.gender = gender;
    }

    static from(jsonBody) {
        return new Participant(jsonBody.participantName, jsonBody.gender)
    }
}

module.exports = Participant;