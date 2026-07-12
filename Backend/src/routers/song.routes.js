const express = require("express");
const upload = require("../middlewares/upload.middleware");
const { uploadSong, getSong } = require("../controllers/song.controller");
const songRouter = express.Router();

songRouter.post("/", upload.single("song"), uploadSong);
songRouter.get("/", getSong);

module.exports = songRouter;