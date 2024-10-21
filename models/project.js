import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title : String,
    description: String,
    link: {
        work: mongoose.SchemaTypes.Url,
        profile: mongoose.SchemaTypes.Url
    }
});

export default projectSchema;