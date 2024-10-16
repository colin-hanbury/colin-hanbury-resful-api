const mongoose = require("mongoose");

const {Skill} = require("../models/skill.js");
const {Experience} = require("../models/experience.js");

const candidateSchema = mongoose.Schema({
    forename: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    demand: {
        type: Number,
        required: true
    },
    skills: {
        type: [Skill],
        default: undefined
    },
    experience: {
        type: [Experience],
        default: undefined
      }

});

module.exports = mongoose.model('Candidate', candidateSchema);