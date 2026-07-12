const redis = require("../config/cache");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const blacklistModel = require("../models/blacklist.model");

// const loginController = async (req, res)=>{
//     const {username, email, password} = req.body;
//     if(!username||!password){
//         return res.status(400).json({
//             message: "Username and password are required"
//         })
//     }

//     const user = await userModel.findOne({username}).select("+password");

//     if(!user){
//         return res.status(404).json({
//             message: "User not found"
//         })
//     }

//     if(!user.comparePassword(password)){
//         return res.status(401).json({
//             message: "Invalid credentials"
//         })
//     }
//     const token = jwt.sign({
//         id: user._id,
//         username: user.username
//     }, process.env.JWT_SECRET,{expiresIn:"3d"})

//     res.cookie("token", token);
//     return res.status(200).json({
//         message: "Login successful",
//         user: {
//             username: user.username,
//             email: user.email
//         }
//     })
// }

// const registerController = async (req, res)=>{
//     const {username, email, password} = req.body;
//     const isUserAlreadyExists = await userModel.findOne({
//         $or:[
//             {email},
//             {username}
//         ]
//     })

//     if(isUserAlreadyExists){
//         return res.status(409).json({
//             message: "User already exists",
//         })
//     }

//     const user = await userModel.create({
//         username,
//         email,
//         password
//     })
//     const token = jwt.sign({
//         id: user._id,
//         username: user.username
//     }, process.env.JWT_SECRET,{expiresIn:"3d"})

//     res.cookie("token", token);

//     return res.status(201).json({
//         message: "User registered successfully",
//         user:{
//             username: user.username,
//             email: user.email
//         }
//     })
// }

// const logoutController = async (req, res)=>{
//     const token = req.cookies.token;
//     res.clearCookie("token");
//     await redis.set(token, Date.now().toString(), "EX", 60*60);

//     return res.status(200).json({
//         message: "Logout Successfully"
//     })
// }

// const getMeController = async (req, res)=>{
//     const decoded = req.user;
//     const user = await userModel.findById(decoded.id);

//     if(!user){
//         return res.status(404).json({
//             message: "User not found"
//         })
//     }

//     return res.status(200).json({
//         user: {
//             username: user.username,
//             email: user.email
//         }
//     })
// }


const registerController = async (req, res)=>{
    const {username, email, password} = req.body;

    if(!username||!password||!email){
        return res.status(401).json({
            message:"All feilds are required"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    });
    if(isUserAlreadyExists){
        return res.status(402).json({
            message: "User Already exists"
        })
    }

    const user = await userModel.create({
        username, email, password
    });

    generateToken(res, user._id);

    return res.status(201).json({
        message: "User register successfully.",
        user: {
            username: user.username,
            email: user.email
        }
    })
}

const loginController = async(req,res)=>{
    const {username, email, password} = req.body;

    if(!password||!email){
        return res.status(401).json({
            message:"All feilds are required"
        })
    }

    const isUserExists = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    }).select("+password")

    if(!isUserExists){
        return res.status(404).json({
            message: "Invalid Credentials"
        })
    }

    const isPasswordValid = await isUserExists.comparePassword(password);
    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    generateToken(res,isUserExists._id);

    return res.status(200).json({
        message: "User logged in successfully.",
        user: {
            username: isUserExists.username,
            email: isUserExists.email
        }
    })
     
}

const logoutController = async(req,res)=>{
    const token = req.cookies.token;
    // console.log(token)
    const blacklistToken = await blacklistModel.create({token});

    res.clearCookie("token");
    return res.status(200).json({
        message: "User logout successfully"
    })
}

const getMeController = async (req,res)=>{
    const user = await userModel.findById(req.user.id);
    // console.log(res.user.id);
    return res.status(200).json({
        message: "User fetched successfully",
        user
    })
}



module.exports = {
    loginController,
    registerController,
    logoutController,
    getMeController
}