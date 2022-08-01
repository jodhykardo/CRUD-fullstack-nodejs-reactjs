const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = Schema({
    userName:{
        type: String,
        required: true,
    },
    userPassword:{
        type: String,
        required: true,
    },

    userStatus: {
        type: String,
        required: false,
    }
});


module.exports = User = mongoose.model("user", userSchema);