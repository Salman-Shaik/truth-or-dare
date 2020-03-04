const http = require('http');
const app = require('./src/app.js');
const Game = require('./src/models/Game.js');

app.initialize(new Game());

const PORT = process.env.PORT || 8000;

let server = http.createServer(app);
server.listen(PORT);
console.log(`server is listening to ${PORT}.`);