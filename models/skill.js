const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
    name : String,
    years: String,
});

module.exports = mongoose.model('Skill', skillSchema);