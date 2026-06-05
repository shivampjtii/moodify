const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const generateToken = (id)=>{
    const token = jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

    cookieParser("token", token);
}

module.exports = generateToken;