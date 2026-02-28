const express = require("express");
const { registerUser, loginUser, getMe, logoutUser } = require("../controllers/auth.controller");
const authUser = require("../middleware/auth.middleware");


const router = express.Router();
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/get-me", authUser, getMe)
router.get("/logout", logoutUser)

module.exports = router;