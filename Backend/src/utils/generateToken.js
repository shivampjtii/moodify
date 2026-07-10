// const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const generateToken = (res, id)=>{
    const token = jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

    res.cookie("token", token)
}

module.exports = generateToken;