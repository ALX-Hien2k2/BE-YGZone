const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    userType: {
        type: Number,
        required: true,
    },
    avatar: {
        type: String,
    },
    address: {
        type: String,
    },
    bank_account_number: {
        type: String,
    },
});

module.exports = mongoose.model("User", userSchema, "Users");