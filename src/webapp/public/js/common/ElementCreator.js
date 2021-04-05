import { createElement } from "./methods";

const createHeadingCell = (text) => {
  const headingCell = createElement("th");
  headingCell.innerHTML = text;
  return headingCell;
};

const createCell = (text) => {
  const cell = createElement("td");
  cell.innerHTML = text;
  return cell;
};

const getParticipantNames = (participantsArrayAsString) => {
  const participantsArray = JSON.parse(participantsArrayAsString);
  return participantsArray.map((p) => p.participantName).join(", ");
};

export const createRow = (game) => {
  const row = createElement("tr");
  const id = createCell(game.id);
  const participants = createCell(
    getParticipantNames(JSON.stringify(game.participants))
  );
  const mode = createCell(game.mode);
  row.appendChild(id);
  row.appendChild(participants);
  row.appendChild(mode);
  return row;
};

export const createHeadingsRow = () => {
  const headingsRow = createElement("tr");
  const idHeading = createHeadingCell("Game ID");
  const participants = createHeadingCell("Participants");
  const mode = createHeadingCell("Mode");
  headingsRow.appendChild(idHeading);
  headingsRow.appendChild(participants);
  headingsRow.appendChild(mode);
  return headingsRow;
};

export const createTable = () => {
  const table = createElement("table");
  table.className = "games";
  table.id = "games";
  return table;
};
