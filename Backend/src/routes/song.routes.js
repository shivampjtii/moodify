const express = require("express");
const upload = require("../middleware/upload.middleware");
const { uploadSong, getSong } = require("../controllers/song.controller");
const router = express.Router();

router.post("/", upload.single("song"), uploadSong)
router.get("/", getSong)

module.exports = router;