import {createHeadingsRow, createRow, createTable} from "./common/ElementCreator";
import {getElement, parseGames} from "./common/methods";
import {fetchGames} from "./common/networkCalls";

const createGamesTable = (games) => {
    const table = createTable();
    const headingsRow = createHeadingsRow();
    const gameRows = games.map(game => createRow(game));
    table.appendChild(headingsRow);
    gameRows.forEach(row => table.appendChild(row));
    return table;
};

const assignTables = games => {
    const parsedGames = parseGames(games);
    const gamesTable = createGamesTable(parsedGames);
    const gamesDiv = getElement('.gamesDiv');
    gamesDiv.appendChild(gamesTable);
};

const showGames = (games) => {
    const gameList = games.gameList;
    assignTables(gameList);
};

const onload = async () => {
    const games = await fetchGames();
    showGames(games);
}
window.onload = onload;