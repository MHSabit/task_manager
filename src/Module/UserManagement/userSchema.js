const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["admin", "user"],
    },
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;