const express = require("express");
const { registerController, loginController, logoutController, getMeController } = require("../controllers/auth.controller");
const authRouter = express.Router();


authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);
authRouter.get("/me", getMeController);


module.exports = authRouter;