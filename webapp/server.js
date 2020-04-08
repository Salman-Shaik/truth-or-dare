const http = require('http');
const app = require('./src/app.js');
const Game = require('./src/models/Game.js');
const truths = require('./src/data/truths.json');
const dares = require('./src/data/dares.json');

app.initialize(new Game(),truths,dares);

const PORT = process.env.PORT || 8000;

let server = http.createServer(app);
server.listen(PORT);
console.log(`server is listening to ${PORT}.`);