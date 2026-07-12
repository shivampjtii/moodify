const jwt = require("jsonwebtoken");
const redis = require("../config/cache");
const blacklistModel = require("../models/blacklist.model");

// async function authUser(req, res, next){
//     const token = req.cookies.token;
//     if(!token){
//         return res.status(401).json({
//             message: "token not provided"
//         })
//     }

//     const isTokenBlacklisted = await redis.get(token)

//     if (isTokenBlacklisted) {
//         return res.status(401).json({
//             message: "Invalid token"
//         })
//     }
    

//     try {
//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET,
//         )

//         req.user = decoded
//         next();
//     } catch (err) {
//         return res.status(401).json({
//             message: "Invalid token"
//         })
//     }

// }

async function authUser(req,res,next){
    const token = req.cookies.token;
    // console.log(token)

    if(!token){
        return res.status(401).json({
            message: "Token not provided."
        })
    };

    const isTokenBlacklisted = await blacklistModel.findOne({token});
    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    let decoded="";

    try{
        decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}



module.exports = authUser