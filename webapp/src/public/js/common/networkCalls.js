const fetchParticipants = async () =>
  await fetch("/participants")
    .then((res) => res.text())
    .then((data) => JSON.parse(data));

const saveParticipants = async (body) =>
  await fetch("/participants", {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: body,
  })
    .then((res) => +res.status)
    .catch((e) => showErrorAlert("Didn't Save, Please Try Again!"));

const saveMode = async (body) =>
  await fetch("mode", {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify(body),
  })
    .then((r) => +r.status)
    .catch((e) => showErrorAlert("Didn't Save, Please Try Again!"));

const deleteGame = async () =>
  await fetch("/game", {
    headers: { "Content-Type": "application/json" },
    method: "delete",
  }).catch((e) => showErrorAlert("Didn't Delete, Please Try Again!"));

const updateGameStatus = async (status) =>
  await fetch("/status", {
    headers: { "Content-Type": "application/json" },
    method: "put",
    body: JSON.stringify({ status }),
  }).catch((e) => showErrorAlert("Didn't Update, Please Try Again!"));
