import mongoose from "mongoose";

const experienceSchema = mongoose.Schema({
    employer : {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    years: {
        type: Number,
        required: true,
    },
    details: {
        type: [String],
        required: false
    },
});
export default experienceSchema;