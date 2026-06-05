const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Username must be unique"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email must be unique"]
    },
    password: {
        type: String,
        required: true,
        select: false
    }
})

userSchema.pre("save", function(){
    if(this.isModified("password")){
        this.password = bcrypt.hashSync(this.password, 10);
    }
});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;