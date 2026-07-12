// {const express = require("express");
// const { registerController, loginController, logoutController, getMeController } = require("../controllers/auth.controller");
// const authUser = require("../middlewares/auth.middleware");
// const authRouter = express.Router();


// authRouter.post("/register", registerController);
// authRouter.post("/login", loginController);
// authRouter.post("/logout", logoutController);
// authRouter.get("/me", authUser, getMeController);


// module.exports = authRouter;}


const express = require("express");
const { registerController, loginController, logoutController, getMeController } = require("../controllers/auth.controller");
const authUser = require("../middlewares/auth.middleware");
const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/logout", logoutController);
authRouter.get("/me", authUser, getMeController)


module.exports = authRouter;