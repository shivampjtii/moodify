// {const cookieParser = require("cookie-parser");
// const express = require("express");
// const authRouter = require("./routers/auth.routes");

// const app = express();
// app.use(express.json());
// app.use(cookieParser());


// app.use("/api/auth", authRouter);



// module.exports = app;}

const cors = require("cors")


const express = require("express");
const authRouter = require("./routers/auth.routes");
const cookieParser = require("cookie-parser");
const songRouter = require("./routers/song.routes");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use("/api/auth", authRouter);
app.use("/api/song", songRouter);


module.exports = app;
