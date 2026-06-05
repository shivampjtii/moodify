const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const loginController = async (req, res)=>{
    const {username, email, password} = req.body;
    if(!username||!password){
        return res.status(400).json({
            message: "Username and password are required"
        })
    }

    const user = await userModel.findOne({username}).select("+password");

    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    if(!user.comparePassword(password)){
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token", token);
    return res.status(200).json({
        message: "Login successful",
        user: {
            username: user.username,
            email: user.email
        }
    })
}

const registerController = async (req, res)=>{
    const {username, email, password} = req.body;
    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "User already exists",
        })
    }

    const user = await userModel.create({
        username,
        email,
        password
    })
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token", token);

    return res.status(201).json({
        message: "User registered successfully",
        user
    })
}

const logoutController = async (req, res)=>{
    const token = req.cookies.token;
    res.clearCookie("token");

    return res.status(200).json({
        message: "Logout Successfully"
    })
}

const getMeController = async (req, res)=>{
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
}



module.exports = {
    loginController,
    registerController
}