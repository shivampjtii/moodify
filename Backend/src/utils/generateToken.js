// const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const generateToken = (res, id)=>{
    const token = jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,      // true in production with HTTPS
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}

module.exports = generateToken;