import mongoose from "mongoose";

import experienceSchema from "./experience.js";

const colinSchema = mongoose.Schema({
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
        type: [String],
        default: undefined
    },
    experience: {
        type: [experienceSchema],
        default: undefined
      }

});

export default colinSchema;