import { showErrorAlert } from "./methods";

export const fetchGames = async () =>
  await fetch("/games")
    .then((r) => r.text())
    .then((data) => JSON.parse(data))
    .catch((e) => showErrorAlert("Didn't Fetch, Please Try Again!"));

export const fetchParticipants = async () =>
  await fetch("/participants")
    .then((r) => r.text())
    .then((data) => JSON.parse(data))
    .catch((e) => showErrorAlert("Didn't Fetch, Please Try Again!"));

export const fetchTruth = async () =>
  await fetch("/truth")
    .then((r) => r.text())
    .catch((e) => showErrorAlert("Didn't Fetch, Please Try Again!"));

export const fetchDare = async () =>
  await fetch("/dare")
    .then((r) => r.text())
    .catch((e) => showErrorAlert("Didn't Fetch, Please Try Again!"));

export const saveParticipants = async (body) =>
  await fetch("/participants", {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: body,
  })
    .then((r) => +r.status)
    .catch((e) => showErrorAlert("Didn't Save, Please Try Again!"));

export const enableGroupEdition = async () =>
  await fetch("/groupEdition", {
    method: "get",
  })
    .then((r) => +r.status)
    .catch((e) => showErrorAlert("Didn't Save, Please Try Again!"));

export const saveMode = async (body) =>
  await fetch("mode", {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify(body),
  })
    .then((r) => +r.status)
    .catch((e) => showErrorAlert("Didn't Save, Please Try Again!"));

export const deleteGame = async () =>
  await fetch("/game", {
    headers: { "Content-Type": "application/json" },
    method: "delete",
  }).catch((e) => showErrorAlert("Didn't Delete, Please Try Again!"));

export const updateGameStatus = async (status) =>
  await fetch("/status", {
    headers: { "Content-Type": "application/json" },
    method: "put",
    body: JSON.stringify({ status }),
  }).catch((e) => showErrorAlert("Didn't Update, Please Try Again!"));
