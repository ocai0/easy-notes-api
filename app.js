const SQLite = require("sqlite3");
const express = require("express");
const PORT = 3001;

const API = express();
API.use(express.json());

API.listen(PORT, `The API is now running on port ${PORT}`);