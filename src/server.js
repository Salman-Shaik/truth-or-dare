const http = require("http");
const app = require("./app.js");
const Games = require("./models/Games.js");
const truths = require("./data/truths.json");
const dares = require("./data/dares.json");

app.initialize(new Games(), truths, dares);

const PORT = process.env.PORT || 8000;

let server = http.createServer(app);
server.listen(PORT);
console.log('\x1b[33m%s\x1b[0m',`Server is listening to ${PORT}`);
