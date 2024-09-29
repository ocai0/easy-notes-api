const EasyNotes = require("./notes.db");
const express = require("express");
const uuid = require("uuid")
const PORT = 3001;

const API = express();
API.use(express.json());

const easyNotesApi = new EasyNotes(true);
API.get("/", (req, res) => {
  const result = easyNotesApi.getAllItems();
  res.status(200).json(result);
});
API.get("/notes", async (req, res) => {
  const result = await easyNotesApi.getAllNotes()
  res.status(200).json(result);
});
API.post("/notes", async (req, res) => {
  const inputData = {
    uuid: uuid.v4(),
    data: req.body.data,
    view_extended: req.body.extended ?? 0,
    theme: req.body.theme ?? 'yellow',
    type: 1
  }
  try {
    const result = await easyNotesApi.createNote(inputData, req.body.parent_folder);
    return res.status(200).json(result);
  }
  catch(error) {
    console.error(error);
    return res.status(500).json({"error": error});
  }
});
API.get("/notes/:uuid", async (req, res) => {
  try {
    const result = await easyNotesApi.getNote({uuid: req.params.uuid});
    res.status(200).json(result)
  }
  catch(error) {
    console.error(error)
    res.status(500).json(error)
  }
  
});
API.put("/notes/:uuid", async (req, res) => {});
API.patch("/notes/:uuid", async (req, res) => {});
API.delete("/notes/:uuid", async (req, res) => {
  try {
    await easyNotesApi.softDeleteNote(req.params.uuid)
    res.status(204).json({"deleted": true});
  }
  catch(error) {
    res.status(500).json({"deleted": false, "message": error});
  }
});

API.listen(PORT, () => `The API is now running on port ${PORT}`);