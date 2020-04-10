const http = require('http');
const app = require('./src/app.js');
const Games = require('./src/models/Games.js');
const truths = require('./src/data/truths.json');
const dares = require('./src/data/dares.json');

app.initialize(new Games(),truths,dares);

const PORT = process.env.PORT || 8000;

let server = http.createServer(app);
server.listen(PORT);
console.log(`server is listening to ${PORT}.`);