const mongoose = require("mongoose")


var User = mongoose.model("user", {
    username: String,
    password: String
})

module.exports = {
    User
}